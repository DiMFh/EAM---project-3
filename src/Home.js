// Home.js
import React from 'react';
import Header from './Header';
import headerimg from "./images/EKPA.jpg";
import InfoCardsContainer from "./InfoCardsContainer";
import "./App.css";

const Home = () => {
  const currentPage = "home";
  return (
    <div>
      <Header currentPage={currentPage} />
      <main className="main-content">
        {/* Edw vazoume olous tous components */}
        <header className="header">
          <h1>
            {" "}
            Γραμματίες Εθνικού και Καποδιστριακού <br></br> Πανεπιστημίου Αθηνών
          </h1>
          <img className="homepage-img" src={headerimg} alt="headerimg" />
        </header>
        <InfoCardsContainer />
      </main>
    </div>
  );
};

export default Home;