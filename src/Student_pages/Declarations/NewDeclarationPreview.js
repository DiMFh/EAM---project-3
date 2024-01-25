/* NewDeclarationPreview.js */
import "./NewDeclarationPreview.css";
import image from "../../images/warning.png";
import successImage from "../../images/success.png";
import { useState } from "react";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../data/firebase";
import { useNavigate } from "react-router";
import {
  Container,
  Col,
  Row,
  Button,
  Modal,
  ListGroup,
  Table,
  Spinner,
} from "react-bootstrap";

const NewDeclarationPreview = ({
  selectedCourses,
  goBackToSelection,
  goToFinish,
  maxCourses,
}) => {
  const navigate = useNavigate();

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

  // *** Actions after the  'temp save' is clicked
  const [loading, setLoading] = useState(false);

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
          const Declaration = {
            id:
              new Date().toLocaleDateString() +
              " " +
              new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            courses: selectedCourses,
            state: "temporary", // "finalized" or "temporary
            period: "2023-2024 Χειμερινό",
          };
          updateDoc(userDoc, {
            declarations: arrayUnion(Declaration),
          });
        } else {
          console.log("No user data found in Firestore");
        }
      });
    }

    // simulate a delay when the button is clicked
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);

    // show the 'finished' modal
    handleCloseTempSaveModal();
    handleShowSaveFinishedModal();
  };

  const handleGoToHistory = () => {
    navigate("../declarations");
  };

  return (
    <div className="newdeclaration-preview">
      <Container>
        {/* buttons section */}
        <Row className="mb-2" md={4}>
          <Col sm={"auto"}></Col>
          <Col md={5} style={{ width: "48%" }}>
            <Button
              variant="outline-dark"
              className="float-end"
              onClick={goBackToSelection}
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
            <Button variant="success" onClick={handleShowSubmitModal}>
              Υποβολή
            </Button>
          </Col>
        </Row>
        {/* selected courses section */}
        <ListGroup>
          <ListGroup.Item as="li" variant="primary">
            <strong>Επιλεγμένα μαθήματα</strong>
          </ListGroup.Item>
        </ListGroup>
        <Table className="table table-hover">
          <tbody>
            {selectedCourses.map((course, index) => (
              <tr>
                <td>{index + 1}. </td>
                <td style={{ textAlign: "left" }}>{course.name}</td>
                <td>Εξάμηνο {course.semester}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ListGroup>
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
                    <strong>Τρέχον εξάμηνο:</strong>
                  </td>
                  <td style={{ textAlign: "left" }}>5ο</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left", width: "15%" }}>
                    <strong>Σύνολο Μαθημάτων:</strong>
                  </td>
                  <td style={{ textAlign: "left" }}>
                    {selectedCourses.length}
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left", width: "15%" }}>
                    <strong>Μέγιστο όριο</strong>
                  </td>
                  <td style={{ textAlign: "left" }}>{maxCourses}</td>
                </tr>
              </tbody>
            </Table>
          </ListGroup.Item>
        </ListGroup>
      </Container>
      <Modal
        show={showSubmitModal}
        onHide={handleCloseSubmitModal}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Η Δήλωση είναι σχεδόν έτοιμη</Modal.Title>
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
                Επιλέγοντας Υποβολή, μία αίτηση δήλωσης θα αποσταλεί στην
                Γραμματεία. Προηγούμενες δηλώσεις της τρέχουσας περιόδου δεν θα
                ληφθούν υπ όψη.
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSubmitModal}>
            Πίσω
          </Button>
          <Button variant="success" onClick={goToFinish}>
            Ολοκλήρωση
          </Button>
        </Modal.Footer>
      </Modal>
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
                Επιλέγοντας Αποθήκευση, η δήλωση θα αποθηκευτεί στο ιστορικό των
                δηλώσεών σας, αλλά δεν θα αποσταλεί στην Γραμματεία. Θα μπορείτε
                να την επεξεργαστείτε ξανά αργότερα, και να την υποβάλετε μέχρι
                το τέλος της περιόδου δήλωσης.
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleCloseTempSaveModal}>
            Πίσω
          </Button>
          <Button variant="secondary" onClick={handleTempSave}>
            {loading ? (
              <Spinner animation="border" role="status" size="sm" />
            ) : (
              "Αποθήκευση"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
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
              alt="Certificate Example"
              style={{
                marginBlockStart: "10px",
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={handleGoToHistory}>
            Μετάβαση στο ιστορικό
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default NewDeclarationPreview;
