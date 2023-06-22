import React, { useState } from 'react';
import firebase from './firebasecon';
// import firebase from './firebase'; // Assuming the Firebase configuration is in a file named firebase.js

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User signed up successfully
        const user = userCredential.user;
        const userId = user.uid;

        // Add user to Firestore "users" collection
        firebase.firestore().collection('users').doc(userId).set({
          email: email,
          // Include any additional user data you want to save
        })
        .then(() => {
          console.log('User added to Firestore: ', userId);
          // Perform additional actions after signup and data save, such as redirecting to a different page
        })
        .catch((error) => {
          console.error('Error adding user to Firestore: ', error);
          // Handle Firestore data save error
        });
      })
      .catch((error) => {
        console.error('Error signing up: ', error);
        // Handle signup error, such as displaying an error message to the user
      });
  };

  return (
    <div>
      <h2>Signup</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign up</button>
    </div>
  );
};

export default Signup;
