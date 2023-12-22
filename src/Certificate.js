// // Certificate.js
import React from "react";
import "./Certificate.css";
import { Link } from "react-router-dom";
import Header from "./Header";

const Certificate = () => {
  const currentPage = "certificate";

  return (
    <div className="certificate">
      <Header currentPage={currentPage} />
      <div className="grey-box">
      <div className="white-box">
          <Link to="/certificate-request" className="certificate-request" ><h4>Αίτηση Παροχής Πιστοποιητικού</h4></Link>
        </div>
        <div className="white-box">
          <Link to="/certificate-state" className="certificate-state" ><h4>Κατάσταση Παροχής Πιστοποιητικών</h4></Link>
        </div>
        <div className="blue-text">
          <Link to="/" className="return" ><h4>Επιστροφή</h4></Link>
        </div>
      </div>
    </div>
   );
 };

export default Certificate;