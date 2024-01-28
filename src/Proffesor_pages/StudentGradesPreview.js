/* StudentGradesPreview.js */
import "./StudentGrades.css";
import StudentGradesFinish from "./StudentGradesFinish";
import warningImage from "../images/warning.png";
import successImage from "../images/success.png";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../data/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  Form,
  Modal,
} from "react-bootstrap";
function StudentGradesPreview({
  course,
  students,
  savedGradesID,
  handleBack,
  handleNextStep,
}) {
  const [showNames, setShowNames] = useState(false);
  const handleShowNames = () => setShowNames(!showNames);

  // *** Modal for the submit button
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const handleCloseSubmitModal = () => setShowSubmitModal(false);
  const handleShowSubmitModal = () => setShowSubmitModal(true);

  // *** Modal for the temporary save button
  const [showTempSaveModal, setShowTempSaveModal] = useState(false);
  const handleCloseTempSaveModal = () => setShowTempSaveModal(false);
  const handleShowTempSaveModal = () => setShowTempSaveModal(true);

  // *** Modal after the declaration is saved
  const [showSaveFinishedModal, setShowSaveFinishedModal] = useState(false);
  const handleCloseSaveFinishedModal = () => setShowSaveFinishedModal(false);
  const handleShowSaveFinishedModal = () => setShowSaveFinishedModal(true);

  const handleTempSave = () => {
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
            grades: students,
            state: "temporary", // "finalized" or "temporary
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

    // show the 'finished modal
    handleCloseTempSaveModal();
    handleShowSaveFinishedModal();
  };

  const navigate = useNavigate();
  const handleGoToHistory = () => {
    navigate("../student-grades");
  };

  // function to calculate the average grade
  const calculateAverage = () => {
    let sum = 0;
    Object.entries(students).forEach(([studentId, student]) => {
      sum += Number(student.grade);
    });
    return (sum / Object.keys(students).length).toFixed(2);
  };

  const [goToFinish, setGoToFinish] = useState(false);
  const handleGoToFinish = () => {
    setGoToFinish(true);
    handleNextStep();
  };

  return (
    <>
      {goToFinish ? (
        <StudentGradesFinish
          lastStepCompleted={handleNextStep}
          savedGradesID={savedGradesID}
          grades={students}
          course={course}
        />
      ) : (
        <>
          <Container>
            {/* buttons section */}
            <Row className="mb-2" md={4}>
              <Col sm={"auto"}></Col>
              <Col md={5} style={{ width: "48%" }}>
                <Button
                  variant="outline-dark"
                  className="float-end"
                  onClick={handleBack}
                >
                  Επεξεργασία
                </Button>
              </Col>
              <Col md={3} style={{ width: "18%" }}>
                <Button
                  variant="secondary"
                  className="float-end"
                  onClick={handleShowTempSaveModal}
                >
                  Προσωρινή αποθήκευση
                </Button>
              </Col>
              <Col md={1}>
                <Button
                  type="submit"
                  variant="success"
                  onClick={handleShowSubmitModal}
                >
                  Υποβολή
                </Button>
              </Col>
              <Col></Col>
            </Row>
            {/* Main Section */}
            <ListGroup>
              <ListGroup.Item as="li" variant="primary">
                <strong>Προεπισκόπηση βαθμολογίου</strong>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Table className="table table-hover">
                  <tbody>
                    <tr>
                      <td style={{ textAlign: "left", width: "15%" }}>
                        <strong>Μάθημα:</strong>
                      </td>
                      <td style={{ textAlign: "left" }}>{course.name}</td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", width: "15%" }}>
                        <strong>Περίοδος:</strong>
                      </td>
                      <td style={{ textAlign: "left" }}>2023/2024 Χειμερινό</td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", width: "15%" }}>
                        <strong>Εξάμηνο:</strong>
                      </td>
                      <td style={{ textAlign: "left" }}>5ο</td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", width: "15%" }}>
                        <strong>Βαθμολογήθηκαν:</strong>
                      </td>
                      <td style={{ textAlign: "left" }}> {course.students}</td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left", width: "15%" }}>
                        <strong>Μέση βαθμολογία:</strong>
                      </td>
                      <td style={{ textAlign: "left" }}>
                        {" "}
                        {calculateAverage()}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </ListGroup.Item>
            </ListGroup>
            <div style={{ width: "20%" }}>
              <Form>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Εμφάνιση ονομάτων"
                  onChange={handleShowNames}
                />
              </Form>
            </div>
            {/* students table */}
            <Table className="table table-hover">
              <thead>
                <tr className="table-head">
                  <th style={{ width: "5%", textAlign: "left" }}>Α/Α</th>
                  <th style={{ textAlign: "left", width: "20%" }}>
                    Αριθμός Μητρώου
                  </th>
                  {showNames ? (
                    <th style={{ textAlign: "left", width: "20%" }}>
                      Ονοματεπώνυμο
                    </th>
                  ) : (
                    <th style={{ textAlign: "left", width: "20%" }}></th>
                  )}
                  <th style={{ textAlign: "left" }}>Βαθμός</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(students).map(([studentId, student]) => (
                  <tr key={studentId}>
                    <td>{Number(studentId) + 1}.</td>
                    <td style={{ textAlign: "left" }}>{student.id}</td>
                    {showNames ? (
                      <td style={{ textAlign: "left", width: "20%" }}>
                        {student.name}
                      </td>
                    ) : (
                      <td style={{ textAlign: "left", width: "20%" }}></td>
                    )}
                    <td style={{ textAlign: "left" }}>{student.grade}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
          {/* Modal for the submit button */}
          <Modal
            show={showSubmitModal}
            onHide={handleCloseSubmitModal}
            backdrop="static"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Υποβολή Βαθμών</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-md-4">
                  <img
                    src={warningImage}
                    alt="warning"
                    style={{
                      width: "60%",
                      marginLeft: "40px",
                      marginBlockStart: "10px",
                    }}
                  />
                </div>
                <div className="col-md-8">
                  <p>
                    Επιλέγοντας Ολοκλήρωση, το βαθμολόγιο θα αποσταλεί στην
                    Γραμματεία. Προηγούμενες βαθμολογίες της τρέχουσας περιόδου
                    δεν θα ληφθούν υπ όψη.
                  </p>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseSubmitModal}>
                Πίσω
              </Button>
              <Button variant="success" onClick={handleGoToFinish}>
                Ολοκλήρωση
              </Button>
            </Modal.Footer>
          </Modal>
          {/* Modal for the temporary save button */}
          <Modal
            show={showTempSaveModal}
            onHide={handleCloseTempSaveModal}
            backdrop="static"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Προσωρινή αποθήκευση</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-md-4">
                  <img
                    src={warningImage}
                    alt="warning"
                    style={{
                      width: "60%",
                      marginLeft: "40px",
                      marginBlockStart: "10px",
                    }}
                  />
                </div>
                <div className="col-md-8">
                  <p>
                    Επιλέγοντας Αποθήκευση, το βαθμολόγιο θα αποθηκευτεί στο
                    ιστορικό σας, αλλά δεν θα αποσταλεί στην Γραμματεία. Θα
                    μπορείτε να το επεξεργαστείτε και να το υποβάλετε αργότερα.
                  </p>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-dark" onClick={handleCloseTempSaveModal}>
                Πίσω
              </Button>
              <Button variant="secondary" onClick={handleTempSave}>
                Αποθήκευση
              </Button>
            </Modal.Footer>
          </Modal>
          {/* Modal after the declaration is saved */}
          <Modal
            show={showSaveFinishedModal}
            onHide={handleCloseSaveFinishedModal}
            backdrop="static"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Αποθηκεύτηκε!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={successImage}
                  alt="success"
                  style={{ marginBlockaStart: "10px" }}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-success" onClick={handleGoToHistory}>
                Μετάβαση στο ιστορικό
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
}
export default StudentGradesPreview;
