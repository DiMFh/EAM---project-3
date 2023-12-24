import React, { useState } from "react";
import logo from "./images/new_logo_circle.png";
import { Link } from "react-router-dom";

import "./Header.css";

export default function Header() {
  const [activeLink, setActiveLink] = useState(null);

  const linkStyle = (link) => ({
    display: 'inline-block',
    padding: '10px 20px',
    margin: '10px',
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: link === activeLink ? '#28a745' : '#007BFF',
    borderRadius: '5px',
  });

  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header-logo" />
      <div>
        <div>
          <Link to="/" style={linkStyle('home')} onClick={() => setActiveLink('home')}>Αρχική</Link>
          <Link to="/sections" style={linkStyle('sections')} onClick={() => setActiveLink('sections')}>Τμήματα</Link>
          <Link to="/register" style={linkStyle('register')} onClick={() => setActiveLink('register')}>Εγγραφή</Link>
          <Link to="/login" style={linkStyle('login')} onClick={() => setActiveLink('login')}>Είσοδος</Link>
        </div>
      </div>
    </header>
  );
}