import React from "react";
import logo from "./images/new_logo_fully_transparent.png";
import "./Header.css";

export default function Header({ currentPage }) {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header-logo" />
      <nav>
        {/* Edw vazoume ta navigation items */}
        {currentPage === "home" && (
          <>
            <a href="/">Αρχική</a>
            <a href="/sections">Τμήματα</a>
            <a href="/register">Εγγραφή</a>
            <a href="/login" className="login">
              Είσοδος
            </a>
          </>
        )}
        {currentPage !== "home" && (
          <>
            <a href="/">Αρχική</a>
            <a href="/login" className="login">
              Είσοδος
            </a>
          </>
        )}
      </nav>
    </header>
  );
}