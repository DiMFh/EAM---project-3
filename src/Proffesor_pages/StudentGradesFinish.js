/* StudentGradesFinish.js */
import "./StudentGrades.css";
import { useState, useEffect } from "react";
import {
  Container,
  Button,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  Spinner,
} from "react-bootstrap";

function StudentGradesFinish() {
  const [loading, setLoading] = useState(true);
  const [printing, setPrinting] = useState(false);

  useEffect(() => {
    // simulate a dilay when the component is mounted for the first time
    setTimeout(() => {
      setLoading(false);
      // lastStepCompleted(); // gia ton spinner
    }, 1500);
    setLoading(true);
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
