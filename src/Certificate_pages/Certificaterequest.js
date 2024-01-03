import React from 'react';
import { Outlet } from "react-router-dom";
import "./Certificaterequest.css"
import Dropdown from './Dropdown';
import { Link } from "react-router-dom";

export default function Certificaterequest()  {
  return (
    <div className="certificate-request">
      <div className="breadcrumb">
        <Link to="/student-page" className="student-page">
          <span className="home-page">Αρχική &gt; </span>
         </Link>
         <Link to="/certificate" className="certificate">
          <span className="previous-page">&gt; Πιστοποιητικά &gt;&gt;</span>
         </Link>
         <Link to="/certificate/certificate-request" className="certificatreq">
         <span className="certificaterequest" style={{ color: 'purple', fontWeight: 'bold', textDecoration: 'underline' }}>
            Αίτηση Παροχής Πιστοποιητικού
         </span>
         </Link>
      </div>
      <div className="choose-request">
          <div className="text-wrapper">Επιλογή Αίτησης Πιστοποιητικού</div>
      </div>
                 
       <div className="box"> {/*ειναι όλο το γκρι με τα στοιχεία μέσα και το css του ειναι για να μετακινείτια πιο δεξιά αριστερά κλπ*/ }
      <div className="rectangle" />
      <div className="group-wrapper">
              <div class="rectangle2">
              <button class="dropdown-btn"><Dropdown/></button>
                <div class="dropdown-content">
                  <a href="#">Option 1</a>
                  <a href="#">Option 2</a>
                  <a href="#">Option 3</a>
                </div>

                <div className="overlap-group-4">
                  <div className="text-wrapper-12">Φοιτητικής ιδιότητας</div>
                  {/* <img className="vector-2" alt="Vector" src="vector-5-2.svg" /> */}
                </div>
              </div>

              <div class="rectangle3">
              <button class="dropdown-btn"><Dropdown/></button>
                <div class="dropdown-content">
                  <a href="#">Option 1</a>
                  <a href="#">Option 2</a>
                  <a href="#">Option 3</a>
                </div>

                <div className="overlap-group-4">
                  <div className="text-wrapper-12">Φορολογικής χρήσης</div>
                </div>
              </div>

              <div class="rectangle4">
              <button class="dropdown-btn"><Dropdown/></button>
                <div class="dropdown-content">
                  <a href="#">Option 1</a>
                  <a href="#">Option 2</a>
                  <a href="#">Option 3</a>
                </div>

                <div className="overlap-group-4">
                  <div className="text-wrapper-12">Αναλυτικής Βαθμολογίας</div>
                </div>
              </div>


              <div class="rectangle5">
              <button class="dropdown-btn"><Dropdown/></button>
                <div class="dropdown-content">
                  <a href="#">Option 1</a>
                  <a href="#">Option 2</a>
                  <a href="#">Option 3</a>
                </div>

                <div className="overlap-group-4">
                  <div className="text-wrapper-12">Στρατολογικής Χρήσης (Συνοπτικό)</div>
                </div>
              </div>

              <div class="rectangle6">
              <button class="dropdown-btn"><Dropdown/></button>
                <div class="dropdown-content">
                  <a href="#">Option 1</a>
                  <a href="#">Option 2</a>
                  <a href="#">Option 3</a>
                </div>

                <div className="overlap-group-4">
                  <div className="text-wrapper-12">Στρατολογικής Χρήσης (Αναλυτικό)</div>
                </div>
              </div>
                
              

       </div>

       <Link to="/certificate" className="certificate">
          <span className="cancel"> Ακύρωση </span>
         </Link>
       {/* <div className="cancel">Ακύρωση</div> */}
       { /* <div class="progress-bar">
            <div class="step">
              <span class="circle active">1</span>
              <span class="labelp">Βήμα 1</span>
            </div>
            <div class="step">
              <span class="circle active">2</span>
              <span class="labelp">Βήμα 2</span>
            </div>
            <div class="step">
              <span class="circle">3</span>
              <span class="labelπ">Βήμα 3</span>
            </div>
          </div> */ }
          {/* <Progressbar/> */}

      </div> 

      
      <Outlet/>

    </div>
  );
};