import React from "react";
// import Header from "./Header";
import Footer from "./Footer";
// import determineCurrentPage from "./Utils";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Register from './Register'; 
import Home from './Home';
import Sections from './Sections';
import Certificate from './Certificate';
// import { useLocation } from 'react-router-dom';

export default function App() {
  // const currentPage = determineCurrentPage();
  // const location = useLocation();

  return (
    <div className="App">
      <BrowserRouter>
        
        <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sections" element={<Sections />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/certificate" element={<Certificate />} />
            </Routes>
        </div>
      <Footer />
      </BrowserRouter>
    </div>
  );
}
