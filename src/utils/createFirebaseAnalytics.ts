import { Analytics, getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

const firebaseApp = initializeApp(
  {
    apiKey: 'AIzaSyCzL-YOlUNKPb-a6s2k5N-qB-Tgagzppcc',
    authDomain: 'thrive-e9e0a.firebaseapp.com',
    projectId: 'thrive-e9e0a',
    storageBucket: 'thrive-e9e0a.appspot.com',
    messagingSenderId: '539596544474',
    appId: '1:539596544474:web:01d51a4fed2b02638688e3',
    measurementId: 'G-FPJMK4RSQZ',
  },
  {
    automaticDataCollectionEnabled: false,
  },
);

export let firebaseAnalytics: Analytics | null = null;

export const createFirebaseAnalytics = () => {
  if (firebaseAnalytics || process.env.NODE_ENV === 'development') {
    return;
  }

  firebaseAnalytics = getAnalytics(firebaseApp);
};
