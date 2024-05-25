
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"
import { getStorage } from "firebase/storage"; 



const firebaseConfig = {
  apiKey: "AIzaSyB1PcBBErPKfLUFTs3lZ_61Rh3P4_evZ2U",
  authDomain: "stemii1.firebaseapp.com",
  projectId: "stemii1",
  storageBucket: "stemii1.appspot.com",
  messagingSenderId: "81693031531",
  appId: "1:81693031531:web:a7aac086dfccf852ad052e"
};



const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 
export const auth = getAuth(app); 
export const storage = getStorage(app)