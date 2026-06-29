!apt-get update
!apt-get install -y cmake g++ git libopencv-dev


!git clone https://github.com/leosocy/RobustPalmRoi.git
%cd RobustPalmRoi


%cd /content/RobustPalmRoi

!find src -name "*.cpp" -exec sed -i 's/CV_RETR_EXTERNAL/cv::RETR_EXTERNAL/g' {} \;
!find src -name "*.cpp" -exec sed -i 's/CV_CHAIN_APPROX_NONE/cv::CHAIN_APPROX_NONE/g' {} \;
!find src -name "*.cpp" -exec sed -i 's/CV_FILLED/cv::FILLED/g' {} \;
!find src -name "*.cpp" -exec sed -i 's/CV_BGR2YCrCb/cv::COLOR_BGR2YCrCb/g' {} \;
!find src -name "*.cpp" -exec sed -i 's/CV_THRESH_OTSU/cv::THRESH_OTSU/g' {} \;
!find src -name "*.cpp" -exec sed -i 's/CV_DIST_L2/cv::DIST_L2/g' {} \;
!find src -name "*.cpp" -exec sed -i 's/CV_DIST_MASK_3/cv::DIST_MASK_3/g' {} \;

 %cd build
!rm -rf *
!cmake ..
!make -j4

%cd /content/RobustPalmRoi/pypackage

 !pip install .

 from rpr import HandlerChain
print("RPR OK")

 !find /content/RobustPalmRoi -name "*.yaml"

 !find / -name "librobust-palm-roi.so" 2>/dev/null

 !echo "/content/RobustPalmRoi/build" | tee /etc/ld.so.conf.d/robustpalm.conf
!ldconfig
 
 import ctypes

ctypes.CDLL("/content/RobustPalmRoi/build/librobust-palm-roi.so")

 from rpr import HandlerChain

chain = HandlerChain("/content/RobustPalmRoi/samples/config.yaml")
print("OK")

 from rpr import HandlerChain
import cv2
import numpy as np
import matplotlib.pyplot as plt

chain = HandlerChain("/content/RobustPalmRoi/samples/config.yaml")

# ❗ numpy değil, file açıyoruz
with open("/content/drive/MyDrive/anemia_detection/test_dataset/palm_1.JPG", "rb") as f:
    roi_bytes = chain.process_image(f)

roi = np.frombuffer(roi_bytes, np.uint8)
roi = cv2.imdecode(roi, cv2.IMREAD_COLOR)

roi = cv2.cvtColor(roi, cv2.COLOR_BGR2RGB)

plt.imshow(roi)
plt.axis("off")
plt.show()

 

