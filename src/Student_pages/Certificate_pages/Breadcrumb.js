import React from 'react';
import "./Breadcrumb.css";
import { Link } from "react-router-dom";


const Breadcrumb = () => {
    return ( 
        <div className="top-left-component">
        {/* <Link to="/certificate-request" className="certificate-request" ><h4>Αίτηση Παροχής Πιστοποιητικού</h4></Link> */}
        <Link to="/" className="home-link">
        <span>Αρχική &gt;&gt;</span>
        </Link>
        <Link to="/certificate" ><span className="purple-text">Πιστοποιητικά</span></Link>
        
      </div>
     );
}
 
export default Breadcrumb;