// Home.js
import React from 'react';
import headerimg from "./images/EKPA.jpg";
import InfoCardsContainer from "./InfoCardsContainer";
import Homecarousel from "./Homecarousel";
import "./App.css";
import "./Home.css";

const Home = () => {
  return (
    // <div>
    //     {/* Edw vazoume olous tous components */}
    //     <header className="header">
    //       <h1>
    //         {" "}
    //         Γραμματίες Εθνικού και Καποδιστριακού <br></br> Πανεπιστημίου Αθηνών
    //       </h1>
    //       <img className="homepage-img" src={headerimg} alt="headerimg" />
    //     </header>
    //     <InfoCardsContainer />
    // </div>
    <div>
    <Homecarousel className="parent"/>
    </div>
  );
};

export default Home;