/* StudentGrades.js */
import warningimage from "../images/warning.png";
import "./StudentGrades.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
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
  Modal,
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
  const [currentGrades, setCurrentGrades] = useState(""); // for the offcanvas, and the modal
  const [printing, setPrinting] = useState({}); // for the 'print' button

  const handleShowCanvas = (grades) => {
    setCurrentGrades(grades);
    setShowCanvas(true);
  };
  const handleCloseCanvas = () => setShowCanvas(false);

  // *** Modal for the delete button
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = (grades) => {
    setCurrentGrades(grades);
    setShowDeleteModal(true);
  };

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
  const handlePrint = (uniqueID) => {
    setPrinting((prev) => ({ ...prev, [uniqueID]: true }));
    setTimeout(() => {
      setPrinting((prev) => ({ ...prev, [uniqueID]: false }));
    }, 1500);
  };

  // *** Actions after the 'edit' button is clicked on a temporary grade
  const handleEdit = (gradesID) => {
    // store the id of the grades to edited in localStorage
    localStorage.setItem("editingGradesID", gradesID);
    // navigate to the edit page
    navigate("../student-grades-create");
  };

  // *** Actions after the 'delete' button is clicked
  const handleDelete = (currentgradesid) => {
    // get the user's email
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      // get the user's document
      const userDoc = doc(db, "users", userEmail);
      // update the user's document
      getDoc(userDoc).then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          const updatedGrades = userData.studentGrades.filter(
            (grades) => grades.id !== currentgradesid
          );
          updateDoc(userDoc, {
            studentGrades: updatedGrades,
          });
          setSavedGrades(updatedGrades);
        } else {
          console.log("No user data found in Firestore");
        }
      });
    }
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
                                <th>Βαθμολόγιο</th>
                                <th>Μάθημα</th>
                                <th>Έλαβαν βαθμό</th>
                                <th>Κατάσταση</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* first display the finalized, and then the temrporary */}
                              {grades
                                .filter((grade) => grade.state === "finalized")
                                .map((grade, idx) => (
                                  <tr key={idx}>
                                    <td>
                                      {grade.date} {grade.time}
                                    </td>
                                    <td>{grade.course.name}</td>

                                    <td>{grade.grades.length}</td>
                                    <td>
                                      <span className="text-success">
                                        Εγκρίθηκε
                                      </span>
                                    </td>
                                    <td
                                      style={{
                                        display: "flex",
                                        justifyContent: "right",
                                      }}
                                    >
                                      <ButtonGroup className="mb-2">
                                        <Button variant="outline-primary">
                                          Λήψη
                                        </Button>
                                        <Button
                                          variant="outline-success"
                                          onClick={() => handlePrint(grade.id)}
                                        >
                                          {printing[grade.id] ? (
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
                                          variant="outline-secondary"
                                          onClick={() =>
                                            handleShowCanvas(grade)
                                          }
                                        >
                                          Προβολή
                                        </Button>
                                        <Offcanvas
                                          show={
                                            showCanvas &&
                                            currentGrades === grade
                                          }
                                          onHide={handleCloseCanvas}
                                          placement="end"
                                          backdrop={false}
                                        >
                                          <Offcanvas.Header closeButton>
                                            <Offcanvas.Title>
                                              {currentGrades.date}{" "}
                                              {currentGrades.time}
                                              <p></p>
                                              <span className="badge bg-success">
                                                Εγκρίθηκε
                                              </span>
                                            </Offcanvas.Title>
                                          </Offcanvas.Header>
                                          <Offcanvas.Body>
                                            <h5>{grade.course.name}</h5>
                                            <Row>
                                              <Col>
                                                <strong>Αριθμό Μητρώου</strong>
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
                              {grades
                                .filter((grade) => grade.state === "temporary")
                                .map((grade, idx) => (
                                  <tr key={idx}>
                                    <td>
                                      {grade.date} {grade.time}
                                    </td>
                                    <td>{grade.course.name}</td>

                                    <td>{grade.grades.length}</td>
                                    <td>
                                      <span className="text-warning">
                                        Πρόχειρο
                                      </span>
                                    </td>
                                    <td
                                      style={{
                                        display: "flex",
                                        justifyContent: "right",
                                      }}
                                    >
                                      <ButtonGroup className="mb-2">
                                        <Button
                                          variant="outline-warning"
                                          onClick={() => handleEdit(grade.id)}
                                        >
                                          Επεξεργασία
                                        </Button>
                                        <Button
                                          variant="outline-danger"
                                          onClick={() =>
                                            handleShowDeleteModal(grade)
                                          }
                                        >
                                          Διαγραφή
                                        </Button>
                                        <Button
                                          variant="outline-secondary"
                                          onClick={() =>
                                            handleShowCanvas(grade)
                                          }
                                        >
                                          Προβολή
                                        </Button>
                                        <Offcanvas
                                          show={
                                            showCanvas &&
                                            currentGrades === grade
                                          }
                                          onHide={handleCloseCanvas}
                                          placement="end"
                                          backdrop={false}
                                        >
                                          <Offcanvas.Header closeButton>
                                            <Offcanvas.Title>
                                              {currentGrades.date}{" "}
                                              {currentGrades.time}
                                              <p></p>
                                              <span className="badge bg-warning">
                                                Πρόχειρο
                                              </span>
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
                                        <Modal
                                          show={showDeleteModal}
                                          onHide={handleCloseDeleteModal}
                                          backdrop="static"
                                          centered
                                        >
                                          <Modal.Header closeButton>
                                            <Modal.Title>
                                              Διαγραφή Βαθμολογίου
                                            </Modal.Title>
                                          </Modal.Header>
                                          <Modal.Body>
                                            <div className="row">
                                              <div className="col-md-4">
                                                <img
                                                  src={warningimage}
                                                  alt="Warning"
                                                  style={{
                                                    width: "60%",
                                                    marginLeft: "40px",
                                                    marginBlockStart: "10px",
                                                  }}
                                                />
                                              </div>
                                              <div className="col-md-8">
                                                <h6> Στοιχεία Βαθμολογίου</h6>
                                                <p>
                                                  Ημέρα αποθήκευσης:{" "}
                                                  {currentGrades.date}
                                                </p>
                                                <p>Ώρα: {currentGrades.time}</p>
                                                <p>
                                                  {" "}
                                                  Μάθημα: {grade.course.name}
                                                </p>
                                                <p>
                                                  {" "}
                                                  Το ανωτέρω βαθμολόγιο
                                                  πρόκειται να διαγραφεί
                                                  οριστικά. Δεν θα μπορείτε να
                                                  το επαναφέρετε. Συνέχεια;
                                                </p>
                                              </div>
                                            </div>
                                          </Modal.Body>
                                          <Modal.Footer>
                                            <Button
                                              variant="secondary"
                                              onClick={handleCloseDeleteModal}
                                            >
                                              Πίσω
                                            </Button>
                                            <Button
                                              variant="danger"
                                              onClick={() =>
                                                handleDelete(currentGrades.id)
                                              }
                                            >
                                              Διαγραφή
                                            </Button>
                                          </Modal.Footer>
                                        </Modal>
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
