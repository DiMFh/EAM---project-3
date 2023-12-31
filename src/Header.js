import React from "react";
import logo from "./images/new_logo_fully_transparent.png";
import "./Header.css";
import { NavLink ,  Outlet} from "react-router-dom";
// import { Link } from "react-router-dom";

export default function Header({ currentPage }) {
  console.log("Current Page:", currentPage);
  return (
    <div className="App">
    <header className="header">
      <NavLink to="/">
        <img src={logo} alt="Logo" className="header-logo" />
      </NavLink>
      <nav>
        {(currentPage === "home" || currentPage === "sections" || currentPage === "login" || currentPage === "register") && (
          <>
            <NavLink to="/" className={({ isActive}) => isActive ? 'active-link' : undefined} >Αρχική</NavLink>
            <NavLink to="/sections" className={({ isActive}) => isActive ? 'active-link' : undefined} >Τμήματα</NavLink>
            <NavLink to="/register" className={({ isActive}) => isActive ? 'active-link' : undefined} >Εγγραφή</NavLink>
            <NavLink to="/login" className={({ isActive}) => isActive ? 'active-link' : "login"}>
              Είσοδος
            </NavLink>
            {/* <NavLink to="/certificate">Πιστοποιητικά</NavLink> */}
          </>
        )}
        {(currentPage === "certificate" || currentPage === "certificate-request" || currentPage === "student-page") && (
          <>
             <NavLink to="/report" className={({ isActive}) => isActive ? 'active-link' : undefined} >Δηλώσεις</NavLink>
             <NavLink to="/grades" className={({ isActive}) => isActive ? 'active-link' : undefined} >Βαθμολογία</NavLink>
             <NavLink to="/certificate" className={({ isActive}) => isActive ? 'active-link' : undefined} >Πιστοποιητικά</NavLink>
             <NavLink to="/help" className={({ isActive}) => isActive ? 'active-link' : undefined} >Βοήθεια</NavLink>
          </>
        )}
      </nav>
    </header>

      <main>
          <Outlet/>
      </main>

      </div>

  );
}