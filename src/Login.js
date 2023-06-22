import React, { useState } from 'react';
import firebase from './firebasecon'; // Assuming the Firebase configuration is in a file named firebase.js

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User logged in successfully
        const user = userCredential.user;
        console.log('User logged in:', user.uid);
        // Perform additional actions after login, such as redirecting to a different page
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        // Handle login error, such as displaying an error message to the user
      });
  };

  return (
    <div>
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
};

export default Login;