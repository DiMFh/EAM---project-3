/* StudentGradesNew.js */
import "./StudentGrades.css";
import StudentGradesPreview from "./StudentGradesPreview";
import StudentGradesStepper from "./StudentGradesStepper";
import image from "../images/warning.png";
import { students12 } from "../Proffesor_pages/students12";
import { students14 } from "../Proffesor_pages/students14";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../data/firebase";
import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Table,
  Button,
  ListGroup,
  Form,
  Stack,
  OverlayTrigger,
  Tooltip,
  Modal,
  Spinner,
} from "react-bootstrap";

function StudentGradesNew({ course, savedGradesID, handleBacktoStart }) {
  const students = course.students === "12" ? students12 : students14;

  const [activeStep, setActiveStep] = useState(0); // For the stepper
  // ***stepper functionality
  const nextStep = () => {
    if (activeStep < 3) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const prevStep = () => {
    if (activeStep > 0) setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // ***keep track of the grades
  const [grades, setGrades] = useState({});
  const handleGradeChange = (studentId, newGrade) => {
    setGrades((prevGrades) => ({
      ...prevGrades,
      [studentId]: newGrade,
    }));
  };

  useEffect(() => {
    // if there are saved grades, put them in the state
    if (savedGradesID) {
      // get the grades from the database
      const userEmail = localStorage.getItem("email");
      if (userEmail) {
        const userDoc = doc(db, "users", userEmail);
        getDoc(userDoc).then((docSnap) => {
          const userData = docSnap.data();
          const gradesToEdit = userData.studentGrades.find(
            (studentGrade) => studentGrade.id === savedGradesID
          );
          // console.log("gradesToEdit", gradesToEdit);
          if (gradesToEdit) {
            gradesToEdit.grades.forEach((grade) => {
              handleGradeChange(grade.id, grade.grade);
            });
          } else {
            console.log("No grades to edit");
          }
        });
      }
    }
  }, [savedGradesID]);

  // ***keep track of the form validation
  const [validated, setValidated] = useState(false);
  const [allValid, setAllValid] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    let isValid = true;
    Object.entries(grades).forEach(([studentId, grade]) => {
      if (!isValidGrade(grade)) {
        isValid = false;
      }
    });

    if (isValid) {
      // Process the form submission
      // ...
    } else {
      event.stopPropagation();
    }
    setValidated(true);

    // check if ALL grades are valid, if yes, then allow the user to submit
    let allvalid = true;
    // if the length of the object 'grades' is not equal to the number of students
    if (Object.keys(grades).length !== Object.keys(students).length) {
      allvalid = false;
    } else {
      Object.entries(grades).forEach(([studentId, grade]) => {
        if (!isValidGrade(grade)) {
          allvalid = false;
          console.log("not valide grade: " + grade);
        }
      });
    }
    setAllValid(allvalid);
  };

  // Helper function to check if grade is valid
  const isValidGrade = (grade) => {
    const value = parseFloat(grade);
    // return value >= 0 && value <= 20;
    return !isNaN(value) && value >= 0 && value <= 10;
  };

  // ***handle the 'next' button
  const [goPreview, setGoPreview] = useState(false);
  const [studentsWithGrades, setStudentsWithGrades] = useState([]);
  const handleGoPreview = () => {
    // merge the grades with the students
    const mergedStudentsWithGrades = Object.values(students).map((student) => ({
      ...student,
      grade: grades[student.id],
    }));

    setStudentsWithGrades(mergedStudentsWithGrades);
    setGoPreview(true);
    nextStep();
  };

  // ***handle the 'back' button from the preview
  const handleBackfromPreview = () => {
    setGoPreview(false);
    setValidated(false);
    setAllValid(false);
    prevStep();
  };

  // *** Modal for the 'upload' button
  const [showUploadModal, setShowUploadModal] = useState(false);
  const handleCloseUploadModal = () => setShowUploadModal(false);
  const handleShowUploadModal = () => setShowUploadModal(true);

  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    setUploading(true);
    Object.values(students).forEach((student) => {
      handleGradeChange(student.id, Math.floor(Math.random() * 10 + 1));
    });

    // simulate a delay when the button is clicked
    setTimeout(() => {
      setUploading(false);
      handleCloseUploadModal();
    }, 1500);
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="./">Αρχική</Breadcrumb.Item>
        <Breadcrumb.Item href="./student-grades">Βαθμολόγια</Breadcrumb.Item>
        <Breadcrumb.Item href="./student-grades-new">
          Επιλογή Μαθήματος
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Νέo Βαθμολόγιο</Breadcrumb.Item>
      </Breadcrumb>
      <StudentGradesStepper activeStep={activeStep} />
      <div className="student-grades-main">
        {goPreview ? (
          <StudentGradesPreview
            course={course}
            students={studentsWithGrades}
            savedGradesID={savedGradesID}
            handleBack={handleBackfromPreview}
            handleNextStep={nextStep}
          />
        ) : (
          <Container sm={{ mt: 10 }}>
            {/* buttons section */}
            <Row className="mb-2" md={3}>
              <Col sm={"auto"}></Col>
              <Col md={7}>
                <Button
                  variant="outline-dark"
                  className="float-end"
                  onClick={handleBacktoStart}
                >
                  Πίσω
                </Button>
              </Col>
              <Col md={1}>
                {allValid ? (
                  <Button
                    type="submit"
                    variant="success"
                    onClick={handleGoPreview}
                  >
                    Επόμενο
                  </Button>
                ) : (
                  <OverlayTrigger
                    overlay={
                      <Tooltip id="tooltip-disabled">
                        Ελέγξτε τους βαθμούς πριν προχωρήσετε
                      </Tooltip>
                    }
                  >
                    <span className="d-inline-block">
                      <Button
                        variant="success"
                        disabled={true}
                        style={{ pointerEvents: "none" }}
                      >
                        Επόμενο
                      </Button>
                    </span>
                  </OverlayTrigger>
                )}
              </Col>
              <Col></Col>
            </Row>
            {/* Main Section */}
            <ListGroup>
              <ListGroup.Item as="li" variant="primary">
                <strong>{course.name}</strong>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Table className="table table-hover">
                  <tbody>
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
                        <strong>Εγγεγραμμένοι:</strong>
                      </td>
                      <td style={{ textAlign: "left" }}> {course.students}</td>
                    </tr>
                  </tbody>
                </Table>
              </ListGroup.Item>
            </ListGroup>
            <Stack direction="horizontal" gap={2}>
              <div className="p-2">
                <Button
                  type="upload"
                  variant="outline-primary"
                  onClick={handleShowUploadModal}
                >
                  Εισαγωγή από αρχείο
                </Button>
              </div>
              <div className="p-2 ms-auto">
                Ελέγξτε ότι έχετε καταχωρίσει βαθμολογίες για όλους τους
                φοιτητές:
              </div>
              <div className="p-2">
                <Button
                  type="submit"
                  variant="outline-success"
                  onClick={(e) => handleSubmit(e)}
                >
                  Έλεγχος
                </Button>
              </div>
            </Stack>
            <Table className="table table-hover">
              <thead>
                <tr className="table-head">
                  <th></th>
                  <th></th>
                  <th>Α.Μ</th>
                  <th>Ονομα/Επώνυμο</th>
                  <th>Εξάμηνο Φοίτησης</th>
                  <th>Βαθμός</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {Object.values(students).map((student, index) => (
                  <tr>
                    <td style={{ width: "10%" }}></td>
                    <td>{index + 1}.</td>
                    <td>{student.id}</td>
                    <td style={{ textAlign: "left" }}>{student.name}</td>
                    <td>{student.semester}</td>
                    <td style={{ width: "8%" }}>
                      <Form
                        noValidate
                        validated={
                          validated && isValidGrade(grades[student.id])
                        }
                        onSubmit={(e) => handleSubmit(e)}
                      >
                        <Form.Group
                          as={Col}
                          className="mb-3"
                          controlId="formBasicEmail"
                        >
                          <Form.Control
                            type="text"
                            name="grade"
                            placeholder="Βαθμός"
                            required
                            value={grades[student.id] || ""}
                            onChange={(e) =>
                              handleGradeChange(student.id, e.target.value)
                            }
                            isInvalid={
                              validated && !isValidGrade(grades[student.id])
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Μη έγκυρο
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Form>
                    </td>
                    <td style={{ width: "10%" }}></td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Stack direction="horizontal" gap={2}>
              <div className="p-2 ms-auto"></div>
              <div className="p-2">
                <Button
                  type="submit"
                  variant="outline-success"
                  onClick={(e) => handleSubmit(e)}
                >
                  Έλεγχος
                </Button>
              </div>
            </Stack>
          </Container>
        )}
        <Modal
          show={showUploadModal}
          onHide={handleCloseUploadModal}
          backdrop="static"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title> Μεταφόρτωση αρχείου</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-4">
                <img
                  src={image}
                  alt="Certificate Example"
                  style={{
                    width: "60%",
                    marginLeft: "40px",
                    marginBlockStart: "10px",
                  }}
                />
              </div>
              <div className="col-md-8">
                <p>
                  <strong>Προσοχή:</strong> Για να γίνει επιτυχής καταγραφή των
                  βαθμολογιών θα πρέπει να έχετε συμπληρώσει σωστά την{" "}
                  <a href="#">φόρμα εισαγωγής</a>. Το μόνο που έχετε να κάνετε
                  είναι να συμπληρώσετε τον βαθμό δίπλα από το αντίστοιχο όνομα
                  κάθε φοιτητή που θα βρίσκεται ήδη στη λίστα.{" "}
                  <strong>Παρακαλούμε </strong>
                  <strong style={{ textDecoration: "underline", color: "red" }}>
                    ΜΗ
                  </strong>{" "}
                  <strong> μορφοποιείτε τη φόρμα.</strong> Βαθμολογίες που
                  είχατε εισάγει πριν τη μεταφόρτωση του αρχείου θα
                  αντικατασταθούν.
                </p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUploadModal}>
              Πίσω
            </Button>
            <Button variant="outline-primary">Λήψη Φόρμας</Button>
            <Button variant="primary" onClick={handleUpload}>
              {uploading ? (
                <Spinner animation="border" role="status" size="sm" />
              ) : (
                "Μεταφόρτωση"
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default StudentGradesNew;
