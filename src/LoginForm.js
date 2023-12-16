import React, { useState } from 'react';
import users from './data/users.json'; // Import json file
import "./LoginForm.css";

const LoginForm = () => {
  const [username, setUsername] = useState(''); //hook for username,password
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false); // New state for error

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Find a user with the entered username and password
    const user = users.find(u => u.username === username && u.password === password);
    //if user exist
    if (user) { //we can add some code here for red letter if not correct
      console.log('Successful login:', user);
      setIsError(false); // Reset error state on successful login
    } else { //if user dont not exist
      console.log('Incorrect login credentials');
      setIsError(true); // Set error state on failed login
      setPassword(''); // Clear password field
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>ΕΛΛΗΝΙΚΗ ΔΗΜΟΚΡΑΤΙΑ</h1>
        <h2>Εθνικόν και Καποδιστριακόν Πανεπιστήμιον Αθηνών</h2>
        <p>ΙΔΡΥΘΕΝ ΤΟ 1837</p>
        <div className={`input-group ${isError ? 'error' : ''}`}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => {
                setUsername(e.target.value);
            }}
            required
            style={{ color: isError ? 'red' : '' }} 
            />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Είσοδος</button>
      </form>
    </div>
  );
};

export default LoginForm;
