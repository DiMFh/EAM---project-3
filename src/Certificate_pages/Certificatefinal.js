import React from "react";
import {Outlet} from "react-router-dom";
import Breadcrumb from './Breadcrumb';
// import AnimatedExample from './AnimatedExample';
import "./Certificatefinal.css";
import image2 from './image2.png';
import { Link } from "react-router-dom";


export default function Certificatefinal({ current }) {
  const currentPage = "certificate-";
  return (
    <div className="certificate">
      {/* <Breadcrumb /> */}
      {/* Centered Box */}
      <div className="certificate-box">
      <img src={image2} alt="Certificate Success" style={{ width: '30%'  }} />
      <h5 className="success-message">Η αίτηση ολοκληρώθηκε με επιτυχία!</h5>
      <button className="button">
            <Link to="/certificate" style={{ textDecoration: 'none', color: 'black' }}>
              Επιστροφή Στην Αρχική
            </Link>
        </button>
      </div>
      <Outlet />
    </div>
  );
}