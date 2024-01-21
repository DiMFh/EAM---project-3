/* StudentGrades.js */
import "./StudentGrades.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../data/firebase";
import {
  Breadcrumb,
  Container,
  Row,
  Col,
  Card,
  Accordion,
  Table,
  ButtonGroup,
  Button,
  Offcanvas,
  Spinner,
} from "react-bootstrap";
import {
  calculateAverageGrade,
  calculateMaxGrade,
  calculateMedianGrade,
  calculateMinGrade,
  calculatePassPercentage,
} from "./HelperFunctions";
import { useAccordionButton } from "react-bootstrap";

function StudentGrades() {
  const navigate = useNavigate();
  const [savedGrades, setSavedGrades] = useState([]);
  const [showCanvas, setShowCanvas] = useState(false);
  const [currentGrades, setCurrentGrades] = useState(""); // for the offcanvas
  const [printing, setPrinting] = useState(false); // for the 'print' button

  const handleShowCanvas = (grades) => {
    setCurrentGrades(grades);
    setShowCanvas(true);
  };
  const handleCloseCanvas = () => setShowCanvas(false);

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      const userDoc = doc(db, "users", userEmail);
      getDoc(userDoc).then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setSavedGrades(userData.studentGrades || []);
        } else {
          console.log("No user data found in Firestore");
        }
      });
    }
  }, []);

  // group the studentGrades by period
  const [gradesByPeriod, setGradesByPeriod] = useState({});
  useEffect(() => {
    const grouped = groupGradesByPeriod(savedGrades);
    setGradesByPeriod(grouped);
  }, [savedGrades]);

  function groupGradesByPeriod(grades) {
    return grades.reduce((acc, grade) => {
      const period = grade.period;
      if (!acc[period]) {
        acc[period] = [];
      }
      acc[period].push(grade);
      return acc;
    }, {});
  }

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () => {
      navigate("../student-grades-create");
    });

    return (
      <button
        type="button"
        className="create-grades-button"
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

  // simulate a delay when the "print" button is clicked
  const handlePrint = () => {
    setPrinting(true);
    setTimeout(() => {
      setPrinting(false);
    }, 1500);
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="./">Αρχική</Breadcrumb.Item>
        <Breadcrumb.Item active>Βαθμολόγια</Breadcrumb.Item>
      </Breadcrumb>
      <div className="main">
        <Container>
          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header>
                <CustomToggle eventKey="0" className="create-grades-button">
                  Επιλογή Μαθήματος
                </CustomToggle>
              </Card.Header>
            </Card>
            <Accordion.Item eventKey={"0"}>
              <Accordion.Header>Ιστορικό Βαθμολογιών</Accordion.Header>
              <Accordion.Body>
                <Accordion>
                  {Object.entries(gradesByPeriod).map(
                    ([period, grades], index) => (
                      <Accordion.Item eventKey={index.toString()}>
                        <Accordion.Header>{period}</Accordion.Header>
                        <Accordion.Body>
                          <Table className="table table-hover">
                            <thead>
                              <tr>
                                <th>Δήλωση</th>
                                <th>Μάθημα</th>
                                <th>Έλαβαν βαθμό</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {grades.map((grade, idx) => (
                                <tr key={idx}>
                                  <td>
                                    {grade.date} {grade.time}
                                  </td>
                                  <td>{grade.course.name}</td>

                                  <td>{grade.grades.length}</td>
                                  <td>
                                    <ButtonGroup className="mb-2">
                                      <Button
                                        variant="outline-secondary"
                                        onClick={handlePrint}
                                      >
                                        {printing ? (
                                          <Spinner
                                            animation="border"
                                            role="status"
                                            size="sm"
                                          />
                                        ) : (
                                          "Εκτύπωση"
                                        )}
                                      </Button>
                                      <Button
                                        variant="outline-success"
                                        onClick={() => handleShowCanvas(grade)}
                                      >
                                        Προβολή
                                      </Button>
                                      <Offcanvas
                                        show={showCanvas}
                                        onHide={handleCloseCanvas}
                                        placement="end"
                                        backdrop={false}
                                      >
                                        <Offcanvas.Header closeButton>
                                          <Offcanvas.Title>
                                            {currentGrades.date}{" "}
                                            {currentGrades.time}
                                          </Offcanvas.Title>
                                        </Offcanvas.Header>
                                        <Offcanvas.Body>
                                          <h5>{grade.course.name}</h5>
                                          <Row>
                                            <Col>
                                              <strong>Αριθμός Μητρώου</strong>
                                            </Col>
                                            <Col>
                                              <strong>Βαθμός</strong>
                                            </Col>
                                          </Row>
                                          {currentGrades &&
                                            Object.entries(
                                              currentGrades.grades
                                            ).map(([key, grade]) => {
                                              return (
                                                <>
                                                  <Row>
                                                    <Col>{grade.id}</Col>
                                                    <Col>{grade.grade}</Col>
                                                  </Row>
                                                </>
                                              );
                                            })}
                                          {currentGrades && (
                                            <>
                                              <Row>
                                                {" "}
                                                <p></p>
                                              </Row>
                                              <Row>
                                                {" "}
                                                Ποσοστό Επιτυχίας:{" "}
                                                {calculatePassPercentage(
                                                  currentGrades.grades
                                                ).toFixed(2)}
                                                %
                                              </Row>
                                              <Row>
                                                {" "}
                                                Μέσος όρος :{" "}
                                                {calculateAverageGrade(
                                                  currentGrades.grades
                                                ).toFixed(2)}
                                              </Row>
                                              <Row>
                                                {" "}
                                                Διάμεσος :{" "}
                                                {calculateMedianGrade(
                                                  currentGrades.grades
                                                ).toFixed(2)}
                                              </Row>
                                              <Row>
                                                {" "}
                                                Μέγιστος :{" "}
                                                {calculateMaxGrade(
                                                  currentGrades.grades
                                                )}
                                              </Row>
                                              <Row>
                                                {" "}
                                                Ελάχιστος :{" "}
                                                {calculateMinGrade(
                                                  currentGrades.grades
                                                )}
                                              </Row>
                                            </>
                                          )}
                                        </Offcanvas.Body>
                                      </Offcanvas>
                                    </ButtonGroup>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </Accordion.Body>
                      </Accordion.Item>
                    )
                  )}
                </Accordion>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </div>
    </>
  );
}

export default StudentGrades;
