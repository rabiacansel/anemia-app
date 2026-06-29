from fastapi import FastAPI
from pydantic import BaseModel
import requests
import numpy as np
import cv2
import tempfile

from utils.inference import predict_from_image_sets

app = FastAPI()

class RequestData(BaseModel):
    images: list  # frontend URL listesi


def download_image(url):
    response = requests.get(url)
    img_array = np.frombuffer(response.content, np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

    temp_path = tempfile.NamedTemporaryFile(delete=False, suffix=".jpg").name
    cv2.imwrite(temp_path, img)

    return temp_path


@app.post("/analyze")
def analyze(data: RequestData):

    palm_path = None
    nail_path = None
    eye_path = None

    for item in data.images:

        img_path = download_image(item["image"])
        type_ = item["type"]

        if type_ == "palm":
            palm_path = img_path

        elif type_ == "nail":
            nail_path = img_path

        elif type_ == "eye":
            eye_path = img_path

    result = predict_from_image_sets(
        palm_path=palm_path,
        nail_path=nail_path,
        eye_path=eye_path
    )

    return result