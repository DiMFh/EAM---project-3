/* NewDeclarationPreview.js */
import "./NewDeclarationPreview.css";
import image from "../../images/warning.png";
import { useState } from "react";
import {
  Container,
  Col,
  Row,
  Button,
  Modal,
  ListGroup,
  Table,
} from "react-bootstrap";

const NewDeclarationPreview = ({
  selectedCourses,
  goBackToSelection,
  goToFinish,
  maxCourses,
}) => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

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
        show={showModal}
        onHide={handleCloseModal}
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
export default NewDeclarationPreview;
