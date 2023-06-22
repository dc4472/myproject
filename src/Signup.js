import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import firebase from './firebasecon';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null)
  const navigate=useNavigate()

  const handleSignup = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User signed up successfully
        const user = userCredential.user;
        const userId = user.uid;

        // Create a nested collection for the user
        firebase.firestore().collection('users').doc(userId).set({
          email: email,
          bills: [] // Initialize an empty array for bills
        })
        .then(() => {
          console.log('User added to Firestore:', userId);
          // navigate
          navigate('/')
        })
        .catch((error) => {
          console.error('Error adding user to Firestore:', error);
          // Handle Firestore data save error
          setError(error.message)
        });
      })
      .catch((error) => {
        console.error('Error signing up:', error);
        // Handle signup error, such as displaying an error message to the user
        setError(error.message)
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
      {error && <p>{error}</p>}
      <br />
      <br />
      <p>
          Already have an account?
          <Link className="loginText" to="/login"> Log in</Link>
      </p>
    </div>
  );
};

export default Signup;
