import React from "react";
import logo from "./images/new_logo_fully_transparent.png";
import "./Header.css";
// import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Header({ currentPage }) {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header-logo" />
      <nav>
        {/* Edw vazoume ta navigation items */}
        {(currentPage === "home" || currentPage === "sections" || currentPage === "login" || currentPage === "register") && (
          <>
            <Link to="/">Αρχική</Link>
            <Link to="/sections">Τμήματα</Link>
            <Link to="/register">Εγγραφή</Link>
            <Link to="/login" className="login">
              Είσοδος
            </Link>
            <Link to="/certificate">Πιστοποιητικά</Link>
          </>
        )}
        {currentPage === "certificate" && (
          <>
             <Link to="/report">Δηλώσεις</Link>
             <Link to="/grades">Βαθμολογία</Link>
             <Link to="/certificate">Πιστοποιητικά</Link>
             <Link to="/help">Βοήθεια</Link>
          </>
        )}
      </nav>
    </header>
  );
}