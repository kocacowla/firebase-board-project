import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics'; // 여기에서 불필요한 `/`를 제거했습니다.

// Firebase 설정값을 .env에서 가져옵니다.
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firebase Analytics 사용 (필요한 경우만)
let analytics;
if (process.env.REACT_APP_FIREBASE_MEASUREMENT_ID) {
    analytics = getAnalytics(app);
}

export { app, analytics };
export const auth = getAuth(app);
export const db = getFirestore(app);
