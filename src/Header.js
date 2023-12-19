// Header.js
import React from "react";
import logo from "./images/new_logo_circle.png";
import "./Header.css";
import { Link } from "react-router-dom";
//import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header-logo" />
      <div>
        <div>
         {/* Here we put the navigation items */}
          <Link to="/">Αρχική</Link> {/* Home link */}
          <Link to="/sections">Τμήματα</Link>
          <Link to="/register">Εγγραφή</Link> {/* Register link */}
          <Link to="/login" className="login">Είσοδος</Link>
        </div>
      </div>
    </header>
  );
}
