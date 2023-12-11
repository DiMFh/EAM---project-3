// Header.js
import React from "react";
import logo from "./images/new_logo_circle.png";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header-logo" />
      <nav>
        {/* Edw vazoume ta navigation items */}
        <a href="/">Αρχική</a>
        <a href="/sections">Τμήματα</a>
        <a href="/register">Εγγραφή</a>
        <a href="/login" className="login">
          Είσοδος
        </a>
      </nav>
    </header>
  );
}
