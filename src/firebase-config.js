import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app"
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDWeJRPLWRQ-i9uc1qpf3m54VeqS_Os4Sk",
    authDomain: "medical-account-c42c0.firebaseapp.com",
    projectId: "medical-account-c42c0",
    storageBucket: "medical-account-c42c0.appspot.com",
    messagingSenderId: "827551951161",
    appId: "1:827551951161:web:c9214642585b314e6560e8",
    measurementId: "G-FCRWHD5WHK"
  }

  const test=initializeApp(firebaseConfig)

  const db=getFirestore(test)
  export const auth = firebase.auth()
  export { db }