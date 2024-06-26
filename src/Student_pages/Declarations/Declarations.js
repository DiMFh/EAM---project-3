/* Declarations.js */
import warningimage from "../../images/warning.png";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../data/firebase";
import { useNavigate } from "react-router";
import "./Declarations.css";
import {
  Breadcrumb,
  Container,
  Row,
  Col,
  Card,
  Accordion,
  Table,
  Button,
  ButtonGroup,
  Offcanvas,
  Spinner,
  Modal,
} from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap";

const Declarations = () => {
  const navigate = useNavigate();
  const [savedDeclarations, setSavedDeclarations] = useState([]);
  const [showCanvas, setShowCanvas] = useState(false);
  const [currentDeclaration, setCurrentDeclaration] = useState(""); // for the offcanvas, and the modal

  const handleShowCanvas = (declaration) => {
    setCurrentDeclaration(declaration);
    setShowCanvas(true);
  };
  const handleCloseCanvas = () => setShowCanvas(false);

  // *** Modal for the delete button
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = (declaration) => {
    setCurrentDeclaration(declaration);
    setShowDeleteModal(true);
  };

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      const userDoc = doc(db, "users", userEmail);
      getDoc(userDoc).then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setSavedDeclarations(userData.declarations || []);
        } else {
          console.log("No user data found in Firestore");
        }
      });
    }
  }, []);

  // group the declarations by period
  const [declarationsByPeriod, setDeclarationsByPeriod] = useState({});
  useEffect(() => {
    const grouped = groupDeclarationsByPeriod(savedDeclarations);
    setDeclarationsByPeriod(grouped);
  }, [savedDeclarations]);

  function groupDeclarationsByPeriod(declarations) {
    return declarations.reduce((acc, declaration) => {
      const period = declaration.period;
      if (!acc[period]) {
        acc[period] = [];
      }
      acc[period].push(declaration);
      return acc;
    }, {});
  }

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () => {
      navigate("../new-declaration");
    });

    return (
      <button
        type="button"
        className="new-declaration-button"
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

  const [printing, setPrinting] = useState(false);
  // simulate a delay when the "print" button is clicked
  const handlePrint = () => {
    setPrinting(true);
    setTimeout(() => {
      setPrinting(false);
    }, 1500);
  };

  // *** Actions after the 'edit' button is clicked on a temporary declaration
  const handleEdit = (declarationid) => {
    // store the id of the declaration to be edited in localStorage
    localStorage.setItem("editingDeclarationId", declarationid);
    navigate("../new-declaration");
  };

  const handleDelete = (declarationid) => {
    // get the user's email
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      // get the user's document
      const userDoc = doc(db, "users", userEmail);
      // update the user's document
      getDoc(userDoc).then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          const updatedDeclarations = userData.declarations.filter(
            (declaration) => declaration.id !== declarationid
          );
          updateDoc(userDoc, {
            declarations: updatedDeclarations,
          });
          setSavedDeclarations(updatedDeclarations);
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
        <Breadcrumb.Item active>Δηλώσεις</Breadcrumb.Item>
      </Breadcrumb>
      <div className="main-container">
        <Container style={{ borderRadius: "15px", padding: "20px" }}>
          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header>
                <CustomToggle eventKey="0" className="new-declaration-button">
                  Νέα Δήλωση
                </CustomToggle>
              </Card.Header>
            </Card>
            <Accordion.Item eventKey={"0"}>
              <Accordion.Header>Ιστορικό Δηλώσεων</Accordion.Header>
              <Accordion.Body>
                <Accordion>
                  {Object.entries(declarationsByPeriod).map(
                    ([period, declarations], index) => (
                      <Accordion.Item eventKey={index.toString()}>
                        <Accordion.Header>{period}</Accordion.Header>
                        <Accordion.Body>
                          <Table className="table table-hover">
                            <thead>
                              <tr>
                                <th>Δήλωση</th>
                                <th>Μαθήματα</th>
                                <th>Κατάσταση</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* first display the finalized, and then the temporary declarations */}
                              {declarations
                                .filter(
                                  (declaration) =>
                                    declaration.state === "finalized"
                                )
                                .map((declaration, idx) => (
                                  <tr key={idx}>
                                    <td>
                                      {declaration.date} {declaration.time}
                                    </td>
                                    <td>{declaration.courses.length}</td>
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
                                          variant="outline-secondary"
                                          onClick={() =>
                                            handleShowCanvas(declaration)
                                          }
                                        >
                                          Προβολή
                                        </Button>
                                        <Offcanvas
                                          show={
                                            showCanvas &&
                                            currentDeclaration === declaration
                                          }
                                          onHide={handleCloseCanvas}
                                          placement="end"
                                          backdrop={false}
                                        >
                                          <Offcanvas.Header closeButton>
                                            <Offcanvas.Title>
                                              {currentDeclaration.date}{" "}
                                              {currentDeclaration.time}
                                              <p></p>
                                              <span className="badge bg-success">
                                                Εγκρίθηκε
                                              </span>
                                            </Offcanvas.Title>
                                          </Offcanvas.Header>
                                          <Offcanvas.Body>
                                            <Row>
                                              <Col>
                                                <h5>Μαθήματα:</h5>
                                                {currentDeclaration &&
                                                  Object.entries(
                                                    currentDeclaration.courses
                                                  ).map(([key, course]) => {
                                                    return (
                                                      <p>
                                                        {course.name} (
                                                        {course.semester} Εξ.)
                                                      </p>
                                                    );
                                                  })}
                                              </Col>
                                            </Row>
                                          </Offcanvas.Body>
                                        </Offcanvas>
                                      </ButtonGroup>
                                    </td>
                                  </tr>
                                ))}
                              {declarations
                                .filter(
                                  (declaration) =>
                                    declaration.state === "temporary"
                                )
                                .map((declaration, idx) => (
                                  <tr key={idx}>
                                    <td>
                                      {declaration.date} {declaration.time}
                                    </td>
                                    <td>{declaration.courses.length}</td>
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
                                          onClick={() =>
                                            handleEdit(declaration.id)
                                          }
                                        >
                                          Επεξεργασία
                                        </Button>
                                        <Button
                                          variant="outline-danger"
                                          onClick={() =>
                                            handleShowDeleteModal(declaration)
                                          }
                                        >
                                          Διαγραφή
                                        </Button>
                                        <Button
                                          variant="outline-secondary"
                                          onClick={() =>
                                            handleShowCanvas(declaration)
                                          }
                                        >
                                          Προβολή
                                        </Button>
                                        <Offcanvas
                                          show={
                                            showCanvas &&
                                            currentDeclaration === declaration
                                          }
                                          onHide={handleCloseCanvas}
                                          placement="end"
                                          backdrop={false}
                                        >
                                          <Offcanvas.Header closeButton>
                                            <Offcanvas.Title>
                                              {currentDeclaration.date}{" "}
                                              {currentDeclaration.time}
                                              <p></p>
                                              <span className="badge bg-warning">
                                                Πρόχειρο
                                              </span>
                                            </Offcanvas.Title>
                                          </Offcanvas.Header>
                                          <Offcanvas.Body>
                                            <Row>
                                              <Col>
                                                <h5>Μαθήματα:</h5>
                                                {currentDeclaration &&
                                                  Object.entries(
                                                    currentDeclaration.courses
                                                  ).map(([key, course]) => {
                                                    return (
                                                      <p>
                                                        {course.name} (
                                                        {course.semester} Εξ.)
                                                      </p>
                                                    );
                                                  })}
                                              </Col>
                                            </Row>
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
                                              Διαγραφή Δήλωσης
                                            </Modal.Title>
                                          </Modal.Header>
                                          <Modal.Body>
                                            <div className="row">
                                              <div className="col-md-4">
                                                <img
                                                  src={warningimage}
                                                  alt="Certificate Example"
                                                  style={{
                                                    width: "60%",
                                                    marginLeft: "40px",
                                                    marginBlockStart: "10px",
                                                  }}
                                                />
                                              </div>
                                              <div className="col-md-8">
                                                <h6> Στοιχεία δήλωσης</h6>
                                                <p>
                                                  Ημέρα αποθήκευσης:{" "}
                                                  {currentDeclaration.date}
                                                </p>
                                                <p>
                                                  {" "}
                                                  Ωρα: {currentDeclaration.time}
                                                </p>
                                                <p>
                                                  {" "}
                                                  Δηλωμένα μαθήματα:{" "}
                                                  {declaration.courses.length}
                                                </p>
                                                <p>
                                                  Η ανωτέρω δήλωση πρόκειται να
                                                  διαγραφεί οριστικά. Δεν θα
                                                  μπορείτε να την επαναφέρετε.
                                                  Συνέχεια;
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
                                                handleDelete(declaration.id)
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
};

export default Declarations;
