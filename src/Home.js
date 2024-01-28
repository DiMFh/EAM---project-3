// Home.js
import React from "react";
import headerimg from "./images/EKPA.jpg";
import InfoCardsContainer from "./InfoCardsContainer";
import Homecarousel from "./Homecarousel";
import "./App.css";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Homecarousel className="parent" />
    </div>
  );
};

export default Home;
