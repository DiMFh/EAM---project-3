import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {doc,getDoc} from 'firebase/firestore'

export default function LoginForm({db}){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  async function handleLogin (e){
    e.preventDefault();

    const ref = doc(db,"users",email);

    const res = await getDoc(ref);

    if(res.exists() && res.data().email && res.data().password === password){

      const user_role = res.data().role
      const user_email = res.data().email

      localStorage.setItem('role',user_pole)
      localStorage.setItem('email',user_pole)
      window.location.href = './home'
      console.l

    }
  }
}


const LoginForm = () => {
  const [email, setEmail] = useState(''); //hook for email,password
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false); // New state for error

  const handleSubmit = (event) => {
    event.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // The user is signed in!
        // userCredential.user will contain information about the signed in user.
        console.log('Successful login:', userCredential.user);
      })
      .catch((error) => {
        // An error occurred. Handle it here.
        setIsError(true);
        console.error(error);
      });
  };

  return (
    <div className="login-form-container">
        <Link to="/" className="home-button">Home</Link>
      <form onSubmit={handleSubmit} className="login-form">
        <h1>ΕΛΛΗΝΙΚΗ ΔΗΜΟΚΡΑΤΙΑ</h1>
        <h2>Εθνικόν και Καποδιστριακόν Πανεπιστήμιον Αθηνών</h2>
        <p>ΙΔΡΥΘΕΝ ΤΟ 1837</p>
        <div className={`input-group ${isError ? 'error' : ''}`}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => {
              setEmail(e.target.value);
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
