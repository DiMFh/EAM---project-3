import React, { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import "./Certificaterequest.css"
import { Link } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CustomProgressBar from './Progressbar';
import Button from 'react-bootstrap/Button';
import MyModal from './Popup'
import Breadcrumb from 'react-bootstrap/Breadcrumb';

export default function Certificaterequest()  {
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);

  const handleCloseModal1 = () => setShowModal1(false);
  const handleShowModal1 = () => setShowModal1(true);

  const handleCloseModal2 = () => setShowModal2(false);
  const handleShowModal2 = () => setShowModal2(true);

  const handleCloseModal3 = () => setShowModal3(false);
  const handleShowModal3 = () => setShowModal3(true);

  const handleCloseModal4 = () => setShowModal4(false);
  const handleShowModal4 = () => setShowModal4(true);

  const handleCloseModal5 = () => setShowModal5(false);
  const handleShowModal5 = () => setShowModal5(true);
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

      <Breadcrumb>
        <Breadcrumb.Item href="/student-page">Αρχική</Breadcrumb.Item>
        <Breadcrumb.Item href="/student-page/certificate/">Πιστοποιητικά</Breadcrumb.Item>
        <Breadcrumb.Item active>Αίτηση Παροχής Πιστοποιητικού</Breadcrumb.Item>
      </Breadcrumb>

      <CustomProgressBar animated now={80} />


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
                 <button class="btn btn-secondary dropdown-toggle color-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                   Επιλογή 
                 </button>
                 <ul class="dropdown-menu">
                  
                 <div class="info-container">
                  <h6>Πληροφορίες :</h6>
                  <div class="the_text ">
                    <p>
                      Το πιστοποιητικό αυτό επιβεβαιώνει την φοιτητική ιδιότητα ενός φοιτητή και αποδεικνύει ότι ο φοιτητής είναι εγγεγραμμένος στο τμήμα.
                    </p>
                  </div>
                </div>
                  <div class="blue-box">
                   <li>
                   <Button variant="primary" onClick={handleShowModal1}>
                    Επιλογή
                    </Button>
                    {/* <a class="dropdown-item" href="#">Επιλογή</a> */}
                    </li>
                   </div>
                   <MyModal showModal={showModal1} handleCloseModal={handleCloseModal1} />
                 </ul>
              </div>

              </div>

              <div class="rectangle3">
                <div className="overlap-group-4">
                  <div className="text-wrapper-12">Φορολογικής χρήσης</div>
                </div>
                <div class="dropdown-center">
                 <button class="btn btn-secondary dropdown-toggle color-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                   Επιλογή
                 </button>
                 <ul class="dropdown-menu">
                  
                 <div class="info-container">
                  <h6>Πληροφορίες :</h6>
                  <div class="the_text ">
                    <p>
                      Το πιστοποιητικό αυτό επιβεβαιώνει την φοιτητική ιδιότητα ενός φοιτητή και αποδεικνύει ότι ο φοιτητής είναι εγγεγραμμένος στο τμήμα.
                    </p>
                  </div>
                </div>
                  <div class="blue-box">
                   <li>
                   <Button variant="primary" onClick={handleShowModal2}>
                    Επιλογή
                    </Button>
                    {/* <a class="dropdown-item" href="#">Επιλογή</a> */}
                    </li>
                   </div>
                   <MyModal showModal={showModal2} handleCloseModal={handleCloseModal2} />
                 </ul>
              </div>
              </div>

              <div class="rectangle4">
                <div className="overlap-group-4">
                  <div className="text-wrapper-12">Αναλυτικής Βαθμολογίας</div>
                </div>
                <div class="dropdown-center">
                 <button class="btn btn-secondary dropdown-toggle color-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                   Επιλογή
                 </button>
                 <ul class="dropdown-menu">
                  
                 <div class="info-container">
                  <h6>Πληροφορίες :</h6>
                  <div class="the_text ">
                    <p>
                      Το πιστοποιητικό αυτό επιβεβαιώνει την φοιτητική ιδιότητα ενός φοιτητή και αποδεικνύει ότι ο φοιτητής είναι εγγεγραμμένος στο τμήμα.
                    </p>
                  </div>
                </div>
                  <div class="blue-box">
                   <li>
                   <Button variant="primary" onClick={handleShowModal3}>
                    Επιλογή
                    </Button>
                    {/* <a class="dropdown-item" href="#">Επιλογή</a> */}
                    </li>
                   </div>
                   <MyModal showModal={showModal3} handleCloseModal={handleCloseModal3} />
                 </ul>
              </div>
              </div>


              <div class="rectangle5">
                <div className="overlap-group-4">
                  <div className="text-wrapper-12">Στρατολογικής Χρήσης(Συν.)</div>
                </div>
                <div class="dropdown-center">
                 <button class="btn btn-secondary dropdown-toggle color-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                   Επιλογή 
                 </button>
                 <ul class="dropdown-menu">
                  
                 <div class="info-container">
                  <h6>Πληροφορίες :</h6>
                  <div class="the_text ">
                    <p>
                      Το πιστοποιητικό αυτό επιβεβαιώνει την φοιτητική ιδιότητα ενός φοιτητή και αποδεικνύει ότι ο φοιτητής είναι εγγεγραμμένος στο τμήμα.
                    </p>
                  </div>
                </div>
                  <div class="blue-box">
                   <li>
                   <Button variant="primary" onClick={handleShowModal4}>
                    Επιλογή
                    </Button>
                    {/* <a class="dropdown-item" href="#">Επιλογή</a> */}
                    </li>
                   </div>
                   <MyModal showModal={showModal4} handleCloseModal={handleCloseModal4} />
                 </ul>
              </div>
              </div>

              <div class="rectangle6">
                <div className="overlap-group-4">
                  <div className="text-wrapper-12">Στρατολογικής Χρήσης(Αναλ.)</div>
                </div>
                <div class="dropdown-center">
                 <button class="btn btn-secondary dropdown-toggle color-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                   Επιλογή
                 </button>
                 <ul class="dropdown-menu">
                  
                 <div class="info-container">
                  <h6>Πληροφορίες :</h6>
                  <div class="the_text ">
                    <p>
                      Το πιστοποιητικό αυτό επιβεβαιώνει την φοιτητική ιδιότητα ενός φοιτητή και αποδεικνύει ότι ο φοιτητής είναι εγγεγραμμένος στο τμήμα.
                    </p>
                  </div>
                </div>
                  <div class="blue-box">
                   <li>
                   <Button variant="primary" onClick={handleShowModal5}>
                    Επιλογή
                    </Button>
                    {/* <a class="dropdown-item" href="#">Επιλογή</a> */}
                    </li>
                   </div>
                   <MyModal showModal={showModal5} handleCloseModal={handleCloseModal5} />
                 </ul>
              </div>
              </div>
                
              

       </div>

       <Link to="/certificate" className="certificate">
          <div class="small-box">
            <span className="cancel"> Ακύρωση </span>
          </div>
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