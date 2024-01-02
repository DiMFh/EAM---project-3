import React from "react";
import logo from "./images/new_logo_fully_transparent.png";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { useUserRole } from "./UserRoleContext";

export default function Header() {
  const { userRole } = useUserRole();

  return (
    <header className="header">
      <NavLink to="/">
        <img src={logo} alt="Logo" className="header-logo" />
      </NavLink>
      <nav>
        {userRole === 'public' && (
          <>
            <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : undefined}>Αρχική</NavLink>
            <NavLink to="/sections" className={({ isActive }) => isActive ? "active-link" : undefined}>Τμήματα</NavLink>
            <NavLink to="/register" className={({ isActive }) => isActive ? "active-link" : undefined}>Εγγραφή</NavLink>
            <NavLink to="/login" className={({ isActive }) => isActive ? "active-link" : "login"}>Είσοδος</NavLink>
          </>
        )}
        {userRole === 'student' && (
          <>
            <NavLink to="/report" className={({ isActive }) => isActive ? "active-link" : undefined}>Δηλώσεις</NavLink>
            <NavLink to="/grades" className={({ isActive }) => isActive ? "active-link" : undefined}>Βαθμολογία</NavLink>
            <NavLink to="/certificate" className={({ isActive }) => isActive ? "active-link" : undefined}>Πιστοποιητικά</NavLink>
            <NavLink to="/help" className={({ isActive }) => isActive ? "active-link" : undefined}>Βοήθεια</NavLink>
          </>
        )}
        {userRole === 'professor' && (
          <>
            {/* Example links */}
            <NavLink to="/course-management" className={({ isActive }) => isActive ? "active-link" : undefined}>Course Management</NavLink>
            <NavLink to="/student-grades" className={({ isActive }) => isActive ? "active-link" : undefined}>Student Grades</NavLink>
            {/* ... other links ... */}
          </>
        )}
      </nav>
      
    </header>
  );
}