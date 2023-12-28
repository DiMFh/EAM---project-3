import React, { useState } from 'react';
import { useNavigate,Link } from "react-router-dom";
import {doc,getDoc} from 'firebase/firestore';
import Header from './Header';

export default function LoginForm({db}){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();
  const currentPage = "login";

  async function handleLogin (e){
    e.preventDefault();

    const ref = doc(db,"users",email);

    const res = await getDoc(ref);

    if(res.exists() && res.data().email === email && res.data().password === password){

      const user_role = res.data().role
      const user_email = res.data().email

      localStorage.setItem('role',user_role)
      localStorage.setItem('email',user_email)
      navigate('/certificate');
      console.log("Found User:", res.data());
    } else {
        console.log("No such document!");

    }
  }


  return (
    <div className="login-form-container">
     <Header currentPage={currentPage} /> 
     <Link to="/" className="home-button">Home</Link>
     <h1>ΕΛΛΗΝΙΚΗ ΔΗΜΟΚΡΑΤΙΑ</h1>
      <h2>Εθνικόν και Καποδιστριακόν Πανεπιστήμιον Αθηνών</h2>
      <p>ΙΔΡΥΘΕΝ ΤΟ 1837</p>
      <form onSubmit={handleLogin} className='login-container'>
            <h2>Login</h2>
            <div className='login-row'>
                <label>Email:</label>
                &nbsp;&nbsp;&nbsp;
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='login-row'>
                <label>Password:</label>
                &nbsp;&nbsp;&nbsp;
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type='submit'>Login</button>
            <a href='/register'>Create new user</a>
        </form>
    </div>

  )

  
}


