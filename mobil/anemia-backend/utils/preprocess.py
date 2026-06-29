import cv2
import numpy as np
from rpr import HandlerChain

def conjunctiva_roi(img_path, show=False):
    img = cv2.imread(img_path)
    if img is None:
        raise ValueError(f"Görüntü okunamadı: {img_path}")

    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
    L, A, B = cv2.split(lab)

    _, thresh = cv2.threshold(A, 0, 255, cv2.THRESH_TRIANGLE)
    mask = thresh

    kernel = np.ones((7,7), np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel, iterations=2)
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel, iterations=2)

    num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(mask, connectivity=8)

    areas = stats[1:, cv2.CC_STAT_AREA]

    if len(areas) == 0:
        clean_mask = np.zeros_like(mask)
    else:
        largest_label = 1 + np.argmax(areas)
        clean_mask = np.zeros_like(mask)
        clean_mask[labels == largest_label] = 255

    clean_mask = cv2.morphologyEx(clean_mask, cv2.MORPH_CLOSE, kernel, iterations=3)

    roi = cv2.bitwise_and(img_rgb, img_rgb, mask=clean_mask)

    return img_rgb, clean_mask, roi


def nail_roi(img_path, tip_ratio=0.25, show=False):

    img = cv2.imread(img_path)
    if img is None:
        raise ValueError(f"Görüntü okunamadı: {img_path}")

    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
    _, A, _ = cv2.split(lab)

    _, thresh = cv2.threshold(A, 0, 255, cv2.THRESH_TRIANGLE)

    mask = thresh

    roi = cv2.bitwise_and(img_rgb, img_rgb, mask=mask)

    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    if len(contours) == 0:
        clean_mask = np.zeros_like(mask)
        roi_tip = roi
    else:
        c = max(contours, key=cv2.contourArea)

        x, y, w, h = cv2.boundingRect(c)

        tip_h = int(h * tip_ratio)

        roi_tip = roi[y : y + tip_h, x : x + w]

    return img_rgb, mask, roi_tip

_chain = HandlerChain("config.yaml")

def palm_roi(img_path):
    with open(img_path, "rb") as f:
        roi_bytes = _chain.process_image(f)

    roi = np.frombuffer(roi_bytes, np.uint8)
    roi = cv2.imdecode(roi, cv2.IMREAD_COLOR)

    if roi is None:
        raise ValueError("ROI decode edilemedi")

    roi = cv2.cvtColor(roi, cv2.COLOR_BGR2RGB)
    return roi



def extract_features_from_roi(roi):
    """
    ROI görüntüsünden feature çıkarır (single image version)
    """

    if roi is None or roi.size == 0:
        raise ValueError("Geçersiz ROI")

    R = roi[:, :, 0]
    G = roi[:, :, 1]
    B = roi[:, :, 2]

    gray = cv2.cvtColor(roi, cv2.COLOR_RGB2GRAY)
    hsv = cv2.cvtColor(roi, cv2.COLOR_RGB2HSV)
    H, S, V = cv2.split(hsv)

    lab = cv2.cvtColor(roi, cv2.COLOR_RGB2LAB)
    L, a, b = cv2.split(lab)

    R_mean = np.mean(R)
    G_mean = np.mean(G)
    B_mean = np.mean(B)

    features = [
        np.mean(R), np.std(R),
        np.mean(G), np.std(G),
        np.mean(B), np.std(B),

        np.mean(L), np.std(L),
        np.mean(a), np.std(a),
        np.mean(b), np.std(b),

        np.mean(H), np.std(H),
        np.mean(S), np.std(S),
        np.mean(V), np.std(V),

        np.percentile(R, 25), np.percentile(R, 50), np.percentile(R, 75),
        np.percentile(G, 25), np.percentile(G, 50), np.percentile(G, 75),
        np.percentile(B, 25), np.percentile(B, 50), np.percentile(B, 75),

        R_mean / (G_mean + 1e-6),
        R_mean / (B_mean + 1e-6),
        G_mean / (B_mean + 1e-6),

        R_mean / (R_mean + G_mean + B_mean + 1e-6),
        G_mean / (R_mean + G_mean + B_mean + 1e-6),
        B_mean / (R_mean + G_mean + B_mean + 1e-6),

        np.mean(gray),
        np.std(gray),
        np.var(gray)
    ]

    return np.array(features, dtype=np.float32).reshape(1, -1)