import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      {/* Edw vazoume to footer content */}
      <div className="footer-item">Τηλέφωνο: +30 (210) 1234567</div>
      <div className="footer-item">
        Email:{" "}
        <a href="mailto: lakislalakis@gmail.com">lakislalakis@gmail.com</a>
      </div>
    </footer>
  );
}