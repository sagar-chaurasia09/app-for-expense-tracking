import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Updated with your actual Firebase config from the screenshot
const firebaseConfig = {
  apiKey: "AIzaSyCHtFpCqL4y0ovxTyTl8Im7piOYbPc_h7o",
  authDomain: "expensetracker-19d17.firebaseapp.com",
  projectId: "expensetracker-19d17",
  storageBucket: "expensetracker-19d17.firebasestorage.app",
  messagingSenderId: "309304314273",
  appId: "1:309304314273:web:100d0d74a70a5e4b5223e0",
  measurementId: "G-RBXSQDJGRF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase services for the app to use
// Using native persistence for session management
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);

export default app;
