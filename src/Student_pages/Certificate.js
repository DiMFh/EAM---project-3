import React from "react";
import "./Certificate.css";
import { NavLink ,  Outlet} from "react-router-dom";
import Breadcrumb from './Breadcrumb';

export default function Certificate() {
  return (
    <div className="certificate">
      <Breadcrumb />
      <div className="grey-box">
        <div className="white-box">
          <nav>
            <NavLink to="certificate-request" className="certificate-request">
              <h4>Αίτηση Παροχής Πιστοποιητικού</h4>
            </NavLink>
          </nav>
        </div>
        <div className="white-box">
          <NavLink to="certificate-state" className="certificate-state">
            <h4>Κατάσταση Παροχής Πιστοποιητικών</h4>
          </NavLink>
        </div>
        <div className="blue-text">
          <NavLink to="/student-page" className="return">
            <h4>Επιστροφή</h4>
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
}