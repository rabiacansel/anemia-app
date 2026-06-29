import { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { uploadToCloudinary } from "../services/cloudinary";
import { analyzeImages } from "../services/api";

export default function useAnemiaDetection() {
  const [palmImage, setPalmImage] = useState(null);
  const [eyeImage, setEyeImage] = useState(null);
  const [nailImage, setNailImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const setImageByType = (type, uri) => {
    if (type === "palm") setPalmImage(uri);
    if (type === "eye") setEyeImage(uri);
    if (type === "nail") setNailImage(uri);
  };

  const pickImage = async (type) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    setImageByType(type, result.assets[0].uri);
  }
};


  // 📸 Kamera çek
const takePhoto = async (type) => {
  try {
    console.log("Kamera butonuna basıldı", type);

    const permission = await ImagePicker.requestCameraPermissionsAsync();
    console.log("Permission:", permission);

    if (!permission.granted) {
      Alert.alert("Kamera izni verilmedi.");
      return;
    }

    console.log("Kamera açılıyor...");

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log("Result:", result);

    if (!result.canceled) {
      setImageByType(type, result.assets[0].uri);
    }
  } catch (err) {
    console.log("Camera Error:", err);
    Alert.alert("Hata", err.message);
  }
};
  // 🗑️ silme
  const removeImage = (type) => {
    if (type === "palm") setPalmImage(null);
    if (type === "eye") setEyeImage(null);
    if (type === "nail") setNailImage(null);
  };

  // 🧠 analiz
const analyze = async () => {
  try {
    setLoading(true);

    const payload = [];

    if (palmImage) {
      const url = await uploadToCloudinary(palmImage);
      payload.push({
        type: "palm",
        image: url,
      });
    }

    if (eyeImage) {
      const url = await uploadToCloudinary(eyeImage);
      payload.push({
        type: "eye",
        image: url,
      });
    }

    if (nailImage) {
      const url = await uploadToCloudinary(nailImage);
      payload.push({
        type: "nail",
        image: url,
      });
    }

    const data = await analyzeImages(payload);

    Alert.alert(
      data.label,
      `Olasılık: %${(data.probability * 100).toFixed(1)}`
    );

  } catch (err) {
    Alert.alert("Hata", err.message);
  }

  setLoading(false);
};
  return {
    palmImage,
    eyeImage,
    nailImage,
    loading,
    pickImage,
    takePhoto,
    removeImage,
    analyze,
  };
}
