import React from 'react';
import Header from "../Header";
import { Outlet } from "react-router-dom";
import "./Certificaterequest.css"
import Dropdown from './Dropdown';
import Progressbar from "./Progressbar"

export default function Certificaterequest()  {
  const currentPage = "certificate-request";
  return (
    <div className="certificate-request">
      <Header currentPage={currentPage} />
      <div className="label">
    <p className="div">
      <span className="text-wrapper">Αρχική σελίδα&nbsp;&nbsp; &gt;&gt; Πιστοποιητικά&nbsp;&nbsp;&gt;&gt; </span>
      <span className="span">Αίτηση Παροχής Πιστοποιητικού</span>
      <span className="text-wrapper-2">&gt;ιστοποιητικά</span>
    </p>
    </div>
    <div className="div-wrapper">
          <div className="text-wrapper-9">Επιλογή Αίτησης Πιστοποιητικού</div>
        </div>
                 
       <div className="box">
      <div className="rectangle" />
      <div className="group-wrapper">
              <div className="group-4">
              <div class="rectangle2">
              {/* <div className="up-arrow">
                <div className="arrow-container">
                  <div className="arrow-up"></div>
                </div>
                </div> */}
                <button class="dropdown-btn"><Dropdown/></button>
                
                <div class="dropdown-content">
                  {/* <!-- Your dropdown content goes here --> */}
                 
                  <a href="#">Option 1</a>
                  <a href="#">Option 2</a>
                  <a href="#">Option 3</a>
                </div>
              </div>
                <div className="overlap-group-4">
                  <div className="text-wrapper-12">Φοιτητικής ιδιότητας</div>
                  {/* <img className="vector-2" alt="Vector" src="vector-5-2.svg" /> */}
                </div>
              </div>

       </div>
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