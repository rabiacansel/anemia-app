from os import path
from xml.parsers.expat import model

import joblib
import numpy as np
import cv2
from utils.preprocess import (
    conjunctiva_roi,
    nail_roi,
    extract_features_from_roi,
    palm_roi
)

# MODELLERİ YÜKLE
palm_model = joblib.load(r"models/palm_model.pkl")
nail_model = joblib.load(r"models/nail_model.pkl")
eye_model = joblib.load(r"models/conjunctiva_model.pkl")

print("Palm:", palm_model.classes_)
print("Nail:", nail_model.classes_)
print("Eye:", eye_model.classes_)


def predict_from_image_sets(palm_path=None, nail_path=None, eye_path=None):

    results = {}

    # ---------------- PREDICT HELPERS ----------------
    def palm_predict(model, roi_func, path):
        try:
            roi = roi_func(path)
            if roi is None:
                return None  # veya average probability
            features = extract_features_from_roi(roi)
            prob = model.predict_proba(features)[0][1]
            return prob
        except Exception as e:
            print("PALM ERROR:", e)
            return None
    
    def predict(model, roi_func, path):
        try:
            _, _, roi = roi_func(path)
            if roi is None:
                return None
            features = extract_features_from_roi(roi)
            prob = model.predict_proba(features)[0][1]
            return prob
        except Exception as e:
            print("ERROR:", e)
        return None

    # ---------------- SINGLE PREDICTIONS ----------------
    if palm_path:
        results["palm_prob"] = palm_predict(palm_model, palm_roi, palm_path)

    if nail_path:
        results["nail_prob"] = predict(nail_model, nail_roi, nail_path)

    if eye_path:
        results["eye_prob"] = predict(eye_model, conjunctiva_roi, eye_path)

    # ---------------- FUSION LOGIC ----------------
    probs = results

    palm = probs.get("palm_prob")
    nail = probs.get("nail_prob")
    eye = probs.get("eye_prob")

    weights = {}
    values = {}

    if palm is not None:
        weights["palm"] = 0.45
        values["palm"] = palm

    if nail is not None:
        weights["nail"] = 0.35
        values["nail"] = nail

    if eye is not None:
        weights["eye"] = 0.20
        values["eye"] = eye

    total_weight = sum(weights.values())

    final_prob = 0.0

    if total_weight > 0:
        for k in weights:
            final_prob += (weights[k] / total_weight) * values[k]
    else:
        final_prob = None  # veya "insufficient data"

    # ---------------- LABEL ----------------
    label = "Anemi riski var" if final_prob >= 0.5 else "Anemi riski yok"

    print("Palm prob:", palm)
    print("Nail prob:", nail)
    print("Eye prob:", eye)
    print("Final prob:", final_prob)

    # ---------------- RETURN ----------------
    return {
        "probability": float(final_prob),
        "label": label,
        "details": {
            "palm_prob": float(palm) if "palm_prob" in probs else None,
            "nail_prob": float(nail) if "nail_prob" in probs else None,
            "eye_prob": float(eye) if "eye_prob" in probs else None,
        },
        "used_modalities": list(probs.keys())
    }
