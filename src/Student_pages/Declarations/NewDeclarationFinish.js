/* NewDeclarationFinish.js */
import "./NewDeclarationFinish.css";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";

const NewDeclarationFinish = () => {
  const [loading, setLoading] = useState(true);
  // simulate a delay when the component is mounted for the first time
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setLoading(true);
  }, []);
  return (
    <div className="newdeclaration-finish">
      <Container>
        <Row>
          <Col>
            <Button variant="success" className="float-end">
              Εκτύπωση
            </Button>
          </Col>
        </Row>
        {loading ? (
          <>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <h3> Αποστολή στην Γραμματεία...</h3>
          </>
        ) : (
          <h2 className="new-declaration-finish-message">
            Η αίτηση ολοκληρώθηκε με επιτυχία!
          </h2>
        )}
      </Container>
    </div>
  );
};
export default NewDeclarationFinish;
