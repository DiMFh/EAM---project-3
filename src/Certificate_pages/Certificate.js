import React from "react";
import "./Certificate.css";
// import Certificaterequest from "./Certificaterequest";
// import {  Routes, Route } from "react-router-dom";
// import Certificatecontent from "./Certificatecontent"; // Changed the import name
import { NavLink ,  Outlet} from "react-router-dom";
import Breadcrumb from './Breadcrumb';

export default function Certificate({ current }) {
  const currentPage = "certificate";
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
          <NavLink to="/" className="return">
            <h4>Επιστροφή</h4>
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

// ParentComponent.js
// import React from 'react';
// import DefaultHeader from './DefaultHeader';

// const ParentComponent = ({ children, showHeader = true }) => {
//   return (
//     <div>
//       {showHeader && <DefaultHeader />}
//       {children}
//     </div>
//   );
// };

// export default ParentComponent;


// // ChildComponent.js
// import React from 'react';
// import ParentComponent from './ParentComponent';
// import CustomHeader from './CustomHeader';

// const ChildComponent = () => {
//   return (
//     <ParentComponent showHeader={false}>
//       <CustomHeader />
//       {/* Rest of the child component content */}
//     </ParentComponent>
//   );
// };

// export default ChildComponent;