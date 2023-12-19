import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./LoginForm";
import RegisterForm from './RegisterForm'; 
import Home from './Home';
import Section from './Section';


export default function App() {
  return (
    <div className="App">
      {/* Initialize the React Router */}
      <BrowserRouter>
        {/* Render the Header component */}
        <Header />
        <div className="main-content">
          {/* Define the routing for different pages */}
          <Routes>
            {/* Define a route for the login page */}
            <Route path="/login" element={<LoginForm />} /> 
            {/* Define a route for the register page */}  
            <Route path="/register" element={<RegisterForm />} /> 
            {/* Define a route for the sections page */}
            <Route path="/sections" element={<Section/>} /> 
            {/* Define a route for the home page */}
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
        {/* Render the Footer component */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

