/* StudentGradesFinish.js */
import "./StudentGrades.css";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../data/firebase";
import {
  Container,
  Button,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  Spinner,
} from "react-bootstrap";

function StudentGradesFinish({ lastStepCompleted, grades, course }) {
  const [loading, setLoading] = useState(true);
  const [printing, setPrinting] = useState(false);

  useEffect(() => {
    // simulate a delay when the component is mounted for the first time
    setTimeout(() => {
      setLoading(false);
      lastStepCompleted(); // gia ton spinner
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
          const newGrades = {
            id:
              new Date().toLocaleDateString() +
              " " +
              new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            course: course,
            grades: grades,
            state: "finalized", // "finalized" or "temporary
            period: "2023-2024 Χειμερινό",
          };
          updateDoc(userDoc, {
            studentGrades: arrayUnion(newGrades),
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
    <>
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
            <h2> Το βαθμολόγιο έχει σταλεί στην γραμματεία.</h2>
            <ButtonGroup className="mb-2">
              <Button href="/" variant="secondary" className="float-end">
                Αρχική
              </Button>
              <Button
                href="student-grades"
                variant="secondary"
                className="float-end"
              >
                Βαθμολόγια
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
    </>
  );
}

export default StudentGradesFinish;
