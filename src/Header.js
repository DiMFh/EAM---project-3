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
          {/* Edw vazoume ta navigation items */}
          {/*<Link to="/">Αρχική</Link>*/}
          <a href="/sections">Τμήματα</a>
          <a href="/register">Εγγραφή</a>
          <Link to="/login" className="login">Είσοδος</Link>
        </div>
      </div>
    </header>
  );
}
