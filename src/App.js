import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import headerimg from "./images/EKPA.jpg";
import InfoCardsContainer from "./InfoCardsContainer";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Header />
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
      <Footer />
    </div>
  );
}
