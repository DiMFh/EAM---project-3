import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        {/* Edw vazoume olous tous components */}
        <h1> I would like to thank ChatGPT!</h1>
      </main>
      <Footer />
    </div>
  );
}
