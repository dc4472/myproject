import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals'
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/compat/auth'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


const firebaseConfig = {
 
  apiKey: "AIzaSyDWeJRPLWRQ-i9uc1qpf3m54VeqS_Os4Sk",
  authDomain: "medical-account-c42c0.firebaseapp.com",
  projectId: "medical-account-c42c0",
  storageBucket: "medical-account-c42c0.appspot.com",
  messagingSenderId: "827551951161",
  appId: "1:827551951161:web:c9214642585b314e6560e8",
  measurementId: "G-FCRWHD5WHK"

}

firebase.initializeApp(firebaseConfig);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
