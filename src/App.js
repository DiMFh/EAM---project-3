import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./LoginForm";

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
          </Routes>
        </div>
        {/* Render the Footer component */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

