import React from "react";
import logo from "./images/new_logo_fully_transparent.png";
import profileIcon from "./icons/user.png";
import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserRole } from "./UserRoleContext";

export default function Header() {
  const { userRole, setUserRole } = useUserRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role"); // clear the role from local storage
    setUserRole("public"); // update the role in the context
    navigate("/"); // redirect to the home page
  };

  const handleLogoClick = () => {
    if (userRole === "student") {
      navigate("/");
    } else if (userRole === "professor") {
      navigate("/");
    } else {
      navigate("/");
    }
  };

  return (
    <header className="header">
      <img
        src={logo}
        alt="Logo"
        className="header-logo"
        onClick={handleLogoClick}
        style={{ cursor: "pointer" }}
      />
      <nav>
        {userRole === "public" && (
          <>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "active-link" : undefined
              }
            >
              Αρχική
            </NavLink>
            <NavLink
              to="/sections"
              className={({ isActive }) =>
                isActive ? "active-link" : undefined
              }
            >
              Τμήματα
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? "active-link" : undefined
              }
            >
              Εγγραφή
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "active-link" : "login")}
            >
              Είσοδος
            </NavLink>
          </>
        )}
        {userRole === "student" && (
          <>
            <NavLink
              to="/declarations"
              className={({ isActive }) =>
                isActive ? "active-link" : undefined
              }
            >
              Δηλώσεις
            </NavLink>
            <NavLink
              to="/grades"
              className={({ isActive }) =>
                isActive ? "active-link" : undefined
              }
            >
              Βαθμολογία
            </NavLink>
            <NavLink
              to="/certificate"
              className={({ isActive }) =>
                isActive ? "active-link" : undefined
              }
            >
              Πιστοποιητικά
            </NavLink>
            <NavLink
              to="/help"
              className={({ isActive }) =>
                isActive ? "active-link" : undefined
              }
            >
              Βοήθεια
            </NavLink>
          </>
        )}
        {userRole === "professor" && (
          <>
            {/* Example links */}
            <NavLink
              to="/course-management"
              className={({ isActive }) =>
                isActive ? "active-link" : undefined
              }
            >
              Διαχείριση Μαθημάτων
            </NavLink>
            <NavLink
              to="/student-grades"
              className={({ isActive }) =>
                isActive ? "active-link" : undefined
              }
            >
              Βαθμολόγια
            </NavLink>
            {/* ... other links ... */}
          </>
        )}
      </nav>
      {userRole === "student" || userRole === "professor" ? (
        <NavLink
          to={
            userRole === "student"
              ? "/profile"
              : "/profile"
          }
          className={({ isActive }) => (isActive ? "active-link" : undefined)}
        >
          <img src={profileIcon} alt="Profile" className="profile-icon" />
        </NavLink>
      ) : null}
      {userRole !== "public" && (
        <NavLink to="/" className="logout-button" onClick={handleLogout}>
          Αποσύνδεση
        </NavLink>
      )}
    </header>
  );
}
