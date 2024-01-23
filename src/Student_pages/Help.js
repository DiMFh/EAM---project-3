import "./Help.css";
import { Breadcrumb, Container,  Accordion, Row, Col } from "react-bootstrap";




export default function Help({ current }) {


  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="/student-page">Αρχική</Breadcrumb.Item>
        <Breadcrumb.Item active>Βοήθεια</Breadcrumb.Item>
      </Breadcrumb>
       <div className="help">
       <Container>
       <Row className="mb-2 justify-content-between" >
        <Col md={12}>
            <p className="text-center fs-5 fw-bold">Ερωτήσεις για:</p>
        </Col>
            </Row>
          <Accordion>
          <Accordion.Item eventKey="0">
  <Accordion.Header><strong>Δηλώσεις</strong></Accordion.Header>
  <Accordion.Body>    
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Πως μπορώ να κάνω δήλωση μαθημάτων;</Accordion.Header>
        <Accordion.Body>
          This is the body of the nested Accordion Item.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Πως μπορώ να δω προηγούμενες δηλώσεις που έκανα στο παρελθόν;</Accordion.Header>
        <Accordion.Body>
          This is the body of the second nested Accordion Item.
        </Accordion.Body>
      </Accordion.Item>
     </Accordion>
    </Accordion.Body>
    </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header><strong>Πιστοποιητικά</strong></Accordion.Header>
            <Accordion.Body>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header><strong>Προφιλ</strong></Accordion.Header>
            <Accordion.Body>
            </Accordion.Body>
          </Accordion.Item>
          </Accordion>
        </Container>



      </div>
    </>
  );
}