import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth(); // Get the authentication instance
      await signInWithEmailAndPassword(auth, email, password); // Sign in with email and password
      // User is successfully logged in
      navigate('/home');
    } catch (error) {
      console.log('Error logging in:', error);
      setError('Username password combination incorrect, please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Log in</button>
        {error && <p className="error">{error}</p>}
        <br />
        <br />
        <Link to={'/signup'}>No account? Sign up </Link>
      </form>
    </div>
  );
};

export default Login;
