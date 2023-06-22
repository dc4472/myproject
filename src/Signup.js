import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { db } from './firebase-config'; // Import the Firestore database object

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Create user account with email and password
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log('User credential:', userCredential);
      // Access the user's unique ID
      const userId = userCredential.user.uid;

      // Store user data in Firestore
      await db.collection('users').doc(userId).set({
        email: email,
        // Add more user data fields as needed
      });

      // User account created and data stored successfully
      navigate('/');
    } catch (error) {
      console.log('Error creating account:', error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
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
        <button type="submit">Create Account</button>
        <br />
        <br />
        <Link to={'/'}>Already have an account? Log in</Link>
      </form>
    </div>
  );
};

export default Signup;
