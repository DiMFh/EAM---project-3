import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import determineCurrentPage from "./Utils";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Register from './Register'; 
import Home from './Home';
import Sections from './Sections';


export default function App() {
  const currentPage = determineCurrentPage();

  return (
    <div className="App">
      <BrowserRouter>
        <Header currentPage={currentPage} />
        <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sections" element={<Sections />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
        </div>
      <Footer />
      </BrowserRouter>
    </div>
  );
}




