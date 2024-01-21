/* NewDeclarationPreview.js */
import "./NewCertificatePreview.css";
import image from "../../images/warning.png";
import { useState } from "react";
import { useEffect } from 'react';
import {
  Container,
  Col,
  Row,
  Button,
  Modal,
  ListGroup,
  Table,
} from "react-bootstrap";

const NewCertificatePreview = ({
  selectedCourses,
  goBackToSelection,
  goToFinish,
  maxCourses,
}) => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const certificateNames = {
    "student_status": "Φοιτητικής Ιδιότητας",
    "detailed_grades": "Αναλυτικής βαθμολογίας",
    "military_use_brief": "Στρατολογικής Χρήσης (Συνοπτικό)",
    "military_use_detailed": "Στρατολογικής Χρήσης (Αναλυτικό)",
    "tax_use": "Φορολογικής Χρήσης"
  };
  const selectedCertificateId = localStorage.getItem('selectedCertificateId');
  

  return (
    <div className="newdeclaration-preview">
      <Container>
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
          
          <td style={{ textAlign: "left" }}>{certificateNames[selectedCertificateId]}</td>
          </tr>
        </tbody>
      </Table>
        <ListGroup>
          
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
                Γραμματεία. Εάν πατήσετε Ολοκλήρωση, δεν θα έχετε την δυνατότητα να την ακυρώσετε. 
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