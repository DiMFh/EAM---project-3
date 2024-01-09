/* Declarations.js */
import { useState } from "react";
import { useNavigate } from "react-router";
import "./Declarations.css";
import arrowDown from "../../icons/down_arrow_icon.svg";
import arrowUp from "../../icons/up_arrow_icon.svg";

const Declarations = () => {
  const [newDeclarationOpen, setnewDeclarationOpen] = useState(false);
  const [currSemesterOpen, setcurrSemesterOpen] = useState(false);
  const [historyOpen, sethistoryOpen] = useState(false);
  const navigate = useNavigate();

  const handleNewDeclarationClick = () => {
    setnewDeclarationOpen(!newDeclarationOpen);
    navigate("../new-declaration");
  };

  const handleCurrSemesterClick = () => {
    setcurrSemesterOpen(!currSemesterOpen);
  };

  const handleHistoryClick = () => {
    sethistoryOpen(!historyOpen);
  };

  return (
    <div className="declarations">
      <div className="declarations-options-container">
        <button
          className="declarations-options-button"
          onClick={handleNewDeclarationClick}
        >
          Νέα Δήλωση
        </button>
        {newDeclarationOpen && <p>Πάμε για δήλωση</p>}
        <button
          className="declarations-options-button"
          onClick={handleCurrSemesterClick}
        >
          Δηλώσεις τρέχουσας περιόδου
          <img
            src={currSemesterOpen ? arrowUp : arrowDown}
            alt={currSemesterOpen ? "Close" : "Close"}
            className="arrow-icon"
          ></img>
        </button>
        {currSemesterOpen && (
          <div className="declarations-options-secondary">
            <button className="declarations-options-secondary-button">
              Δήλωση 1
            </button>
            <button className="declarations-options-secondary-button">
              Δήλωση 2
            </button>
            <button className="declarations-options-secondary-button">
              Δήλωση 3
            </button>
          </div>
        )}
        <button
          className="declarations-options-button"
          onClick={handleHistoryClick}
        >
          Ιστορικό δηλώσεων
          <img
            src={historyOpen ? arrowUp : arrowDown}
            alt={historyOpen ? "Close" : "Close"}
            className="arrow-icon"
          ></img>
        </button>
        {historyOpen && (
          <div className="declarations-options-secondary">
            <button className="declarations-options-secondary-button">
              Δήλωση 1
            </button>
            <button className="declarations-options-secondary-button">
              Δήλωση 2
            </button>
            <button className="declarations-options-secondary-button">
              Δήλωση 3
            </button>
            <button className="declarations-options-secondary-button">
              Δήλωση 4
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Declarations;
