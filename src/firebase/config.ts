
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDummyKey",
  authDomain: "attendancewise-studio.firebaseapp.com",
  projectId: "attendancewise-studio",
  storageBucket: "attendancewise-studio.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

export function getFirebaseConfig() {
  return firebaseConfig;
}

export function initializeFirebaseApp(): FirebaseApp {
  const apps = getApps();
  if (apps.length > 0) {
    return apps[0];
  }
  return initializeApp(firebaseConfig);
}
