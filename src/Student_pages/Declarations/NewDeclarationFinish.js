/* NewDeclarationFinish.js */
import "./NewDeclarationFinish.css";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../data/firebase";
import { useNavigate } from "react-router";
import {
  Container,
  Button,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  Spinner,
} from "react-bootstrap";

const NewDeclarationFinish = ({
  lastStepCompleted,
  selectedCourses,
  savedDeclarationID,
}) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [printing, setPrinting] = useState(false);

  // update the user's document in Firestore
  useEffect(() => {
    // simulate a delay when the component is mounted for the first time
    setTimeout(() => {
      setLoading(false);
      lastStepCompleted();
    }, 1500);
    setLoading(true);

    // get the user's email
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      // get the user's document
      const userDoc = doc(db, "users", userEmail);
      // update the user's document
      getDoc(userDoc).then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();

          // filter out the finalized declarations
          let updatedDeclarations = (userData.declarations || []).filter(
            (declaration) => declaration.state !== "finalized"
          );

          // check if we have to update an existing declaration
          if (savedDeclarationID) {
            updatedDeclarations = updatedDeclarations.map((declaration) =>
              declaration.id === savedDeclarationID
                ? {
                    ...declaration,
                    courses: selectedCourses,
                    state: "finalized",
                  }
                : declaration
            );
          } else {
            // add a new declaration
            const newDeclaration = {
              // make the id, the date and the time
              id:
                new Date().toLocaleDateString() +
                " " +
                new Date().toLocaleTimeString(),
              date: new Date().toLocaleDateString(),
              time: new Date().toLocaleTimeString(),
              courses: selectedCourses,
              state: "finalized", // "finalized" or "temporary
              period: "2023-2024 Χειμερινό",
            };
            updatedDeclarations.push(newDeclaration);
          }
          // update the user's document
          updateDoc(userDoc, {
            declarations: updatedDeclarations,
          });
        } else {
          console.log("No user data found in Firestore");
        }
      });
    }
  }, []);

  // simulate a delay when the "print" button is clicked
  const handlePrint = () => {
    setPrinting(true);
    setTimeout(() => {
      setPrinting(false);
    }, 1500);
  };
  return (
    <div className="newdeclaration-finish">
      <Container fluid>
        {loading ? (
          <>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <h3> Αποστολή...</h3>
          </>
        ) : (
          <Container fluid>
            <h2 className="new-declaration-finish-message">
              Υπεβλήθη επιτυχώς!
            </h2>
            <ButtonGroup className="mb-2">
              <Button href="/" variant="secondary" className="float-end">
                Αρχική
              </Button>
              <Button
                href="declarations"
                variant="secondary"
                className="float-end"
                onClick={() => navigate("../declarations")}
              >
                Δηλώσεις
              </Button>
              <Button className="float-end" onClick={handlePrint}>
                {printing ? (
                  <Spinner animation="border" role="status" size="sm" />
                ) : (
                  "Εκτύπωση"
                )}
              </Button>
              <DropdownButton
                as={ButtonGroup}
                title="Λήψη"
                id="bg-nested-dropdown"
              >
                <Dropdown.Item></Dropdown.Item>
                <Dropdown.Item>.pdf</Dropdown.Item>
                <Dropdown.Item>.xls</Dropdown.Item>
              </DropdownButton>
            </ButtonGroup>
          </Container>
        )}
      </Container>
    </div>
  );
};
export default NewDeclarationFinish;
