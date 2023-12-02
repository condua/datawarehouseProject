// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile,    } from 'firebase/auth';

import firebase from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot, getDocs,doc,getDoc, query, where,updateDoc } from 'firebase/firestore';
import 'firebase/storage'; 
import 'firebase/database'; // Đối với Realtime Database
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsbuHaW8UYeHMz7JutxkxOWtIwVgwTDYY",
  authDomain: "data-warehouse-18412.firebaseapp.com",
  projectId: "data-warehouse-18412",
  storageBucket: "data-warehouse-18412.appspot.com",
  messagingSenderId: "1038654617127",
  appId: "1:1038654617127:web:d4495499760424163f0002",
  measurementId: "G-Z6148P6K2F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

const auth = getAuth(app);

export  { signInWithEmailAndPassword ,createUserWithEmailAndPassword,auth,updateProfile,updateDoc ,firestore,storage, collection, addDoc, onSnapshot, getDocs,doc,getDoc, query,where,ref,uploadBytes  };