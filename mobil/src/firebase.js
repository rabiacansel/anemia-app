import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3Gew1-ibEMOE4BerB8-qpJZdY5N8Zz_4",
  authDomain: "anemia-e87da.firebaseapp.com",
  projectId: "anemia-e87da",
  storageBucket: "anemia-e87da.firebasestorage.app",
  messagingSenderId: "96139915010",
  appId: "1:96139915010:web:70bb5dc8a1dfd404ee1c1b"
};

const app = initializeApp(firebaseConfig);

// 🔐 Auth (kalıcı login fix)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);
export const storage = getStorage(app);