import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {

    apiKey: "AIzaSyDWeJRPLWRQ-i9uc1qpf3m54VeqS_Os4Sk",
    authDomain: "medical-account-c42c0.firebaseapp.com",
    projectId: "medical-account-c42c0",
    storageBucket: "medical-account-c42c0.appspot.com",
    messagingSenderId: "827551951161",
    appId: "1:827551951161:web:c9214642585b314e6560e8",
    measurementId: "G-FCRWHD5WHK"

};

firebase.initializeApp(firebaseConfig);

export default firebase;
