/* Declarations.js */
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
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
  Offcanvas,
} from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap";

const Declarations = () => {
  const navigate = useNavigate();
  const [savedDeclarations, setSavedDeclarations] = useState([]);
  const [showCanvas, setShowCanvas] = useState(false);
  const [currentDeclaration, setCurrentDeclaration] = useState(""); // for the offcanvas

  const handleShowCanvas = (declaration) => {
    setCurrentDeclaration(declaration);
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

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="./">Αρχική</Breadcrumb.Item>
        <Breadcrumb.Item active>Δηλώσεις</Breadcrumb.Item>
      </Breadcrumb>
      <div className="main">
        <Container style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
          <Accordion
            defaultActiveKey="0"
            style={{ backgroundColor: "rgba(255, 255, 255, o)" }}
          >
            <Card style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
              <Card.Header>
                <CustomToggle eventKey="0" className="new-declaration-button">
                  Νέα Δήλωση
                </CustomToggle>
              </Card.Header>
            </Card>
            <Accordion.Item
              eventKey={"0"}
              style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
            >
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
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {declarations.map((declaration, idx) => (
                                <tr key={idx}>
                                  <td>
                                    {declaration.date} {declaration.time}
                                  </td>
                                  <td>{declaration.courses.length}</td>
                                  <td>
                                    <Button
                                      variant="outline-secondary"
                                      onClick={() =>
                                        handleShowCanvas(declaration)
                                      }
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
                                          {currentDeclaration.date}{" "}
                                          {currentDeclaration.time}
                                        </Offcanvas.Title>
                                      </Offcanvas.Header>
                                      <Offcanvas.Body>
                                        <Row>
                                          <Col>
                                            <h5>Μαθήματα</h5>
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
