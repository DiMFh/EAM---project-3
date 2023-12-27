import React from "react";
import "./Certificate.css";
import { Link } from "react-router-dom";

import Breadcrumb from '../Breadcrumb';

const Certificatecontent = () => {
  return (
    <div className="certificate">
      <Breadcrumb/>
      <div className="grey-box">
        <div className="white-box">
          <Link to="certificate-request" className="certificate-request">
            <h4>Αίτηση Παροχής Πιστοποιητικού</h4>
          </Link>
        </div>
        <div className="white-box">
          <Link to="certificate-state" className="certificate-state" ><h4>Κατάσταση Παροχής Πιστοποιητικών</h4></Link>
        </div>
        <div className="blue-text">
          <Link to="/" className="return" ><h4>Επιστροφή</h4></Link>
        </div>
      </div>
    </div>
   );
 };

export default Certificatecontent;




// import React from "react";
// import "./Certificate.css";
// import { Link } from "react-router-dom";
// import Header from "./Header";
// import Breadcrumb from './Breadcrumb';

// const Certificatecontent = () => { // Changed the component name
//   const currentPage = "certificate";

//   return (
//     <div className="certificate">
//       <Header currentPage={currentPage} />
//       <Breadcrumb/>
//       <div className="grey-box">
//         <div className="white-box">
//           <Link to="/certificate-request" className="certificate-request">
//             <h4>Αίτηση Παροχής Πιστοποιητικού</h4>
//           </Link>
//         </div>
//         <div className="white-box">
//           <Link to="/certificate-state" className="certificate-state">
//             <h4>Κατάσταση Παροχής Πιστοποιητικών</h4>
//           </Link>
//         </div>
//         <div className="blue-text">
//           <Link to="/" className="return">
//             <h4>Επιστροφή</h4>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificatecontent;