import React, { useState } from 'react';
import { useNavigate,Link } from "react-router-dom";
import {doc,getDoc} from 'firebase/firestore';
import Header from './Header';
import { NavLink } from "react-router-dom";
import { Outlet} from "react-router-dom";
import { useLocation } from "react-router-dom";



const LoginForm = ({db, showHeader = true}) =>{
  const location = useLocation();
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
      navigate('/student-page');
      console.log("Found User:", res.data());
    } else {
        console.log("No such document!");

    }
  }


  return (
    <div className="login-form-container">
      
      
      {showHeader && <Header currentPage={currentPage} />}
      {location.pathname === "/login" && (
      <>
      
        <Link to="/" className="home-button">
          Home
        </Link>
        <div>
          <h1>ΕΛΛΗΝΙΚΗ ΔΗΜΟΚΡΑΤΙΑ</h1>
          <h2>Εθνικόν και Καποδιστριακόν Πανεπιστήμιον Αθηνών</h2>
          <p>ΙΔΡΥΘΕΝ ΤΟ 1837</p>
          <form onSubmit={handleLogin} className="login-container">
            <h2>Login</h2>
            <div className="login-row">
              <label>Email:</label>
              &nbsp;&nbsp;&nbsp;
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login-row">
              <label>Password:</label>
              &nbsp;&nbsp;&nbsp;
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <a href="/register">Create new user</a>

            
          </form>
          <nav>
              <NavLink to="student-page" className="student-page">
                <button type="submit">Login</button>
              </NavLink>
            </nav>
        </div>
        
      </>
    )}
  </div>
 );

}
export default LoginForm;
