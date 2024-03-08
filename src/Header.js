import React from "react";
import logo from "./images/new_logo_fully_transparent.png";
import profileIcon from "./icons/user.png";
import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserRole } from "./UserRoleContext";

import { Navbar, NavDropdown, Row } from "react-bootstrap";

export default function Header() {
  const { userRole, setUserRole } = useUserRole();
  const navigate = useNavigate();

  // get the email from local storage
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
      <div className="segment-1">
        <img
          src={logo}
          alt="Logo"
          className="header-logo"
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        />
      </div>

      <div className="segment-2">
        <nav>
          <Navbar>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "active-link" : undefined
              }
            >
              Αρχική
            </NavLink>

            <NavLink
              to="/subjects"
              className={({ isActive }) =>
                isActive ? "active-link" : undefined
              }
            >
              Μαθήματα
            </NavLink>
            {userRole !== "public" && (
              <>
                <div className="custom-collapse">
                  <Navbar.Collapse>
                    <NavDropdown
                      title="Φοιτητές"
                      id="basic-nav-dropdown"
                      className={
                        userRole === "student"
                          ? "custom-dropdown"
                          : "custom-dropdown-disabled"
                      }
                      disabled={userRole !== "student"}
                    >
                      <NavDropdown.Item>
                        <NavLink
                          to="/declarations"
                          className={({ isActive }) =>
                            isActive ? "active-link" : undefined
                          }
                        >
                          Δηλώσεις
                        </NavLink>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <NavLink
                          to="/grades"
                          className={({ isActive }) =>
                            isActive ? "active-link" : undefined
                          }
                        >
                          Βαθμολογίες
                        </NavLink>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <NavLink
                          to="/certificate"
                          className={({ isActive }) =>
                            isActive ? "active-link" : undefined
                          }
                        >
                          Πιστοποιητικά
                        </NavLink>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <NavLink
                          to="/help"
                          className={({ isActive }) =>
                            isActive ? "active-link" : undefined
                          }
                        >
                          Βοήθεια
                        </NavLink>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Navbar.Collapse>
                </div>
                <div className="custom-collapse">
                  <Navbar.Collapse>
                    <NavDropdown
                      title="Καθηγητές"
                      id="basic-nav-dropdown"
                      className={
                        userRole === "professor"
                          ? "custom-dropdown"
                          : "custom-dropdown-disabled"
                      }
                      disabled={userRole !== "professor"}
                    >
                      <NavDropdown.Item>
                        <NavLink
                          to="/courses-control"
                          className={({ isActive }) =>
                            isActive ? "active-link" : undefined
                          }
                        >
                          Διαχείριση Μαθημάτων
                        </NavLink>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <NavLink
                          to="/student-grades"
                          className={({ isActive }) =>
                            isActive ? "active-link" : undefined
                          }
                        >
                          Βαθμολόγια
                        </NavLink>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <NavLink
                          to="/proffesor-help"
                          className={({ isActive }) =>
                            isActive ? "active-link" : undefined
                          }
                        >
                          Βοήθεια
                        </NavLink>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Navbar.Collapse>
                </div>
              </>
            )}
          </Navbar>
        </nav>
      </div>

      <div className="segment-3">
        {userRole === "public" ? (
          <Navbar>
            <div className="custom-collapse">
              <Navbar.Collapse>
                <NavDropdown
                  title="Σύνδεση"
                  id="basic-nav-dropdown"
                  className="custom-dropdown"
                >
                  <NavDropdown.Item>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        isActive ? "active-link" : "login"
                      }
                    >
                      Είσοδος
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        isActive ? "active-link" : undefined
                      }
                    >
                      Εγγραφή
                    </NavLink>
                  </NavDropdown.Item>
                </NavDropdown>
              </Navbar.Collapse>
            </div>
          </Navbar>
        ) : (
          <>
            <NavLink
              to={
                userRole === "student"
                  ? "/profile-student"
                  : "/profile-professor"
              }
              className={({ isActive }) =>
                isActive ? "active-link" : undefined
              }
            >
              <img src={profileIcon} alt="Profile" className="profile-icon" />
            </NavLink>
            <Navbar>
              <Navbar.Collapse>
                <Row>
                  <NavDropdown
                    title="Ο λογαριασμός μου"
                    id="basic-nav-dropdown"
                    className="custom-dropdown"
                  >
                    <NavDropdown.Item>
                      <NavLink
                        to={
                          userRole === "student"
                            ? "/profile-student"
                            : "/profile-professor"
                        }
                        className={({ isActive }) =>
                          isActive ? "active-link" : undefined
                        }
                      >
                        Προφίλ
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <NavLink style={{backgroundColor: "transparent"}} >My Eclass</NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <NavLink style={{backgroundColor: "transparent"}} >My Webmail</NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      <NavLink
                        to="/"
                        className="logout-button"
                        onClick={handleLogout}
                        style={{backgroundColor: "transparent"}}
                      >
                        Αποσύνδεση
                      </NavLink>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Row>
              </Navbar.Collapse>
            </Navbar>
          </>
        )}
      </div>
    </header>
  );
}
