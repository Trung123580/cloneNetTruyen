import { initializeApp } from 'firebase/app';
import { getAuth, FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyCpMWComvM2pxCYslyBBY5pP4BQ2DzeCsw',
  authDomain: 'nettruyen-f0399.firebaseapp.com',
  projectId: 'nettruyen-f0399',
  storageBucket: 'nettruyen-f0399.appspot.com',
  messagingSenderId: '855471068832',
  appId: '1:855471068832:web:c3c272d3ddccb9e0b99bc5',
  measurementId: 'G-R943GG10T1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const FbProvider = new FacebookAuthProvider();
const GgProvider = new GoogleAuthProvider();
export { auth, FbProvider, GgProvider };
