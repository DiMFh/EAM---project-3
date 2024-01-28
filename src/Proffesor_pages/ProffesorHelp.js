import "./ProffesorHelp.css";
import { Breadcrumb, Container,  Accordion, Row, Col } from "react-bootstrap";




export default function ProffesorHelp({ current }) {


  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Αρχική</Breadcrumb.Item>
        <Breadcrumb.Item active>Βοήθεια</Breadcrumb.Item>
      </Breadcrumb>
       <div className="proffesor-help">
       <Container style={{ borderRadius: '15px', padding: '20px' }}>
       <Row className="mb-2 justify-content-between" >
        <Col md={12}>
            <p className="text-center fs-5 fw-bold">Ερωτήσεις για:</p>
        </Col>
            </Row>
          <Accordion>
          <Accordion.Item eventKey="0">
  <Accordion.Header><strong>Διαχείριση Μαθημάτων</strong></Accordion.Header>
  <Accordion.Body>    
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Που μπορώ να βρω την επιλογή αυτή και πως την χρησομοποιώ;</Accordion.Header>
        <Accordion.Body>
        <ul>
  <li>Κλικ στην επιλογή Καθηγητές στο πάνω μέρος της σελίδας</li>
  <li>Κλικ στην επιλογή Διαχείριση Μαθημάτων</li>
  <li>Κλικ στο μάθημα που ενδιαφέρεται ο Καθηγητής/η Καθηγήτρια</li>
  <ul>
    <li>Κλικ στην επιλογή eClass Μαθήματος για την επίσκεψη της ιστοσελίδας του μαθήματος </li>
    <li>Κλικ στην επιλογή Βαθμολογία για την προεσκόπιση της Βαθμολογίας στο μάθημα αυτό</li>
  </ul>
</ul>
        </Accordion.Body>
      </Accordion.Item>
     
     </Accordion>
    </Accordion.Body>
    </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header><strong>Βαθμολογία</strong></Accordion.Header>
            <Accordion.Body>
            <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Πως μπορώ να επξεργαστώ και να υποβάλω το βαθμολόγιο ενός Μαθήματος;</Accordion.Header>
        <Accordion.Body>
        <ul>
          <li>Κλικ στην επιλογή Καθηγητές στο πάνω μέρος της σελίδας</li>
          <li>Κλικ στην επιλογή Βαθμολόγια</li>
          <li>Κλικ στην επιλογή Επιλογή Μαθήματος</li>
          <li>Κλικ στο επιλογή Νέο βαθμολόγιο του μαθήματος που επιθυμεί ο Καθηγητής/ η Καθηγήτρια</li>
          <li>Eισαγωγή στην περιοχή Βαθμός , βαθμού για κάθε φοιτητή. </li>
          <ul>
            <li>Κλικ στην επιλογή Εισαγωγή απο αρχείο για να την υποβολή βαθμών μαζικά</li>
            <li>Κλικ στην επιλογή Έλεγχος για την επιβεβαίωση ότι δώθηκε ο βαθμός κάθε φοιτήτή</li>
          </ul>
          <li>Κλικ στην επιλογή Επόμενο για την προεσκόπηση του βαθμολογίου</li>
          <ul>
          <li>Κλικ στην επιλογή Υποβολή για ολοκλήρωση της δήλωσης </li>
          <ul>
            <li>Κλικ στην επιλογή Ολοκλήρωση</li>
          </ul>
          <li>Κλικ στην επιλογή Επεξεργασία για την τροποποποίηση του Βαθμολογίου</li>
    <li>Κλικ στην επιλογή Προσωρινή αποθήκευση : Ο καθηγητής / Η καθηγήτρια  απλώς αποθηκεύει το Βαθμολόγιο που έχει δημιουργήσει . </li>
          
          </ul>

        </ul>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Πώς μπορώ να δω παλιά Βαθμολόγια που δημιούργησα;</Accordion.Header>
        <Accordion.Body>
        <ul>
            <li>Κλικ στην επιλογή Καθηγητές</li>
            <li>Κλικ στην επιλογή Βαθμολόγια</li>
            <li>Κλικ στην επιλογή Ιστορικό Βαθμολογιών</li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>
     </Accordion>
            </Accordion.Body>
          </Accordion.Item>
          </Accordion>
        </Container>



      </div>
    </>
  );
}