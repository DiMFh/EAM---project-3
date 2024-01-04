import React, { useEffect } from 'react';
import { Outlet } from "react-router-dom";
import "./Certificaterequest.css"
import Dropdown from './Dropdown';
import { Link } from "react-router-dom";
// import Dropdown2 from './Dropdown2';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Certificaterequest()  {

  useEffect(() => {
    const dropdownButton = document.getElementById('dropdownMenuButton');

    if (dropdownButton) {
      const handleDropdownClick = () => {
        const dropdownMenu = dropdownButton.nextElementSibling;
        dropdownMenu.classList.toggle('show');
      };

      dropdownButton.addEventListener('click', handleDropdownClick);

      // Cleanup event listener on component unmount
      return () => {
        dropdownButton.removeEventListener('click', handleDropdownClick);
      };
    }
  }, []); 



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
              {/* <button class="dropdown-btn"><Dropdown/></button>
                <div class="dropdown-content">
                  <a href="#">Option 1</a>
                  <a href="#">Option 2</a>
                  <a href="#">Option 3</a>
                </div> */}
                <div className="overlap-group-4">
                  <div className="text-wrapper-12">Φοιτητικής ιδιότητας</div>
                  {/* <img className="vector-2" alt="Vector" src="vector-5-2.svg" /> */}
                </div>
                <div class="dropdown-center">
                 <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                   Περισσότερα 
                 </button>
                 <ul class="dropdown-menu">
                  
                 <div class="info-container">
                  <h6>Πληροφορίες :</h6>
                  <div class="the_text blue-box">
                    <p>
                      Το πιστοποιητικό αυτό επιβεβαιώνει την φοιτητική ιδιότητα ενός φοιτητή και αποδεικνύει ότι ο φοιτητής είναι εγγεγραμμένος στο τμήμα.
                    </p>
                  </div>
                </div>
                   <li><a class="dropdown-item" href="#">Επιλογή</a></li>
                 </ul>
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