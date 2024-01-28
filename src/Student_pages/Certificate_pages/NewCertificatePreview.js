/* NewDeclarationPreview.js */
import "./NewCertificatePreview.css";
import image from "../../images/warning.png";
import { useState } from "react";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../data/firebase";
import {
  Container,
  Col,
  Row,
  Button,
  Modal,
  ListGroup,
  Table,
} from "react-bootstrap";

const NewCertificatePreview = ({ goBackToSelection, goToFinish }) => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [birth, setBirth] = useState(null);
  const [address, setAddress] = useState(null);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);

  const certificateNames = {
    student_status: "Φοιτητικής Ιδιότητας",
    detailed_grades: "Αναλυτικής βαθμολογίας",
    military_use_brief: "Στρατολογικής Χρήσης (Συνοπτικό)",
    military_use_detailed: "Στρατολογικής Χρήσης (Αναλυτικό)",
    tax_use: "Φορολογικής Χρήσης",
  };
  const selectedCertificateId = localStorage.getItem("selectedCertificateId");
  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      const userDoc = doc(db, "users", userEmail);
      getDoc(userDoc).then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setName(userData.firstname);
          setSurname(userData.lastname);
          setBirth(userData.birthdate);
          setAddress(userData.address);
          setEmail(userData.email);
          setRole(userData.role);
        } else {
          console.log("No user data found in Firestore");
        }
      });
    }
  }, []);

  return (
    <div className="newcertificate-preview">
      <Container style={{ borderRadius: "15px", padding: "20px" }}>
        {/* buttons section */}
        <Row className="mb-2" md={3}>
          <Col sm={"auto"}></Col>
          <Col md={7}>
            <Button
              variant="outline-dark"
              className="float-end"
              onClick={goBackToSelection}
            >
              Επεξεργασία
            </Button>
          </Col>
          <Col md={1}>
            <Button variant="success" onClick={handleShowModal}>
              Επόμενο
            </Button>
          </Col>
        </Row>
        {/* selected courses section */}
        <ListGroup>
          <ListGroup.Item as="li" variant="primary">
            <strong>Επιλεγμένo Πιστοποιητικό</strong>
          </ListGroup.Item>
        </ListGroup>
        <Table className="table table-hover">
          <tbody>
            <tr>
              <td style={{ textAlign: "left" }}>
                {certificateNames[selectedCertificateId]}
              </td>
            </tr>
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
                    <strong>Ημερομηνία:</strong>
                  </td>
                  <td style={{ textAlign: "left" }}>
                    {new Date().toLocaleDateString()}
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left", width: "15%" }}>
                    <strong>Ισχύς:</strong>
                  </td>
                  <td style={{ textAlign: "left" }}>3 μήνες</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left", width: "15%" }}>
                    <strong>Όνομα:</strong>
                  </td>
                  <td style={{ textAlign: "left" }}>{name}</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left", width: "15%" }}>
                    <strong>Επίθετο:</strong>
                  </td>
                  <td style={{ textAlign: "left" }}>{surname}</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left", width: "15%" }}>
                    <strong>Ημερομηνία Γέννησης:</strong>
                  </td>
                  <td style={{ textAlign: "left" }}>{birth}</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left", width: "15%" }}>
                    <strong>Διεύθυνση:</strong>
                  </td>
                  <td style={{ textAlign: "left" }}>{address}</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left", width: "15%" }}>
                    <strong>Ηλεκτρονική Διεύθυνση:</strong>
                  </td>
                  <td style={{ textAlign: "left" }}>{email}</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left", width: "15%" }}>
                    <strong>Ιδιότητα:</strong>
                  </td>
                  <td style={{ textAlign: "left" }}>{role}</td>
                </tr>

              </tbody>
            </Table>
          </ListGroup.Item>
        </ListGroup>
      </Container>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Η Αίτηση είναι σχεδόν έτοιμη</Modal.Title>
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
                Επιλέγοντας Υποβολή, η αίτηση πιστοποιητικού θα αποσταλεί στην
                Γραμματεία. Εάν πατήσετε Ολοκλήρωση, δεν θα έχετε την δυνατότητα
                να την ακυρώσετε.
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Ακύρωση
          </Button>
          <Button variant="success" onClick={goToFinish}>
            Ολοκλήρωση
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default NewCertificatePreview;
