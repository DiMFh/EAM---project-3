import "./Help.css";
import { Breadcrumb, Container,  Accordion, Row, Col } from "react-bootstrap";




export default function Help({ current }) {


  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Αρχική</Breadcrumb.Item>
        <Breadcrumb.Item active>Βοήθεια</Breadcrumb.Item>
      </Breadcrumb>
       <div className="help">
       <Container style={{ borderRadius: '15px', padding: '20px' }}>
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
        <ul>
  <li>Κλικ στην επιλογή Φοιτητές στο πάνω μέρος της σελίδας</li>
  <li>Κλικ στην επιλογή Δηλώσεις</li>
  <li>Κλικ στην επιλογή Νέα Δήλωση</li>
  <li>Επιλογή των μαθημάτων που θα περιλαμβάνονται στην δήλωση (μέγιστος αριθμός : 7)</li>
  <ul>
    <li>Κλικ στην επιλογή Υποβολή για ολοκλήρωση της δήλωσης </li>
    <ul>
      <li>Κλικ στην επιλογή Ολοκλήρωση</li>
    </ul>
    <li>Κλικ στην επιλογή Επεξεργασία για την τροποποποίηση της δήλωσης</li>
    <li>Κλικ στην επιλογή Προσωρινή αποθήκευση : Ο/Η φοιτητής/τρια απλώς αποθηκεύει την δήλωση που έχει κάνει . </li>
  </ul>
</ul>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Πως μπορώ να δω προηγούμενες δηλώσεις που έκανα στο παρελθόν;</Accordion.Header>
        <Accordion.Body>
        <ul>
        <li>Κλικ στην επιλογή Φοιτητές στο πάνω μέρος της σελίδας</li>
        <li>Κλικ στην επιλογή Δηλώσεις</li>
        <li>Κλικ στην επιλογή Προηγούμενες Δηλώσεις</li>
        </ul>
        </Accordion.Body>
      </Accordion.Item>
     </Accordion>
    </Accordion.Body>
    </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header><strong>Πιστοποιητικά</strong></Accordion.Header>
            <Accordion.Body>
            <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Πως μπορώ να κάνω αίτηση για πιστοποιητικό;</Accordion.Header>
        <Accordion.Body>
        <ul>
        <li>Κλικ στην επιλογή Φοιτητές στο πάνω μέρος της σελίδας</li>
        <li>Κλικ στην επιλογή Πιστοποιητικά</li>
        <li>Κλικ στην επιλογή Αίτηση Παροχής Πιστοποιητικού</li>
        <li>Επιλογή του πιστοποιητικού που θέλει να αιτηθεί ο/η φοιτητής/τρια</li>
        <li>Κλικ στην επιλογή Ολοκλήρωση</li>
        </ul>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Πόσα πιστοποιητικά μπορώ να αιτηθώ ταυτόχρονα;</Accordion.Header>
        <Accordion.Body>
          Ο/Η φοιτητής/τρια μπορεί να αιτηθεί μόνο ένα πιστοποιητικό κάθε φορά .
        </Accordion.Body>
      </Accordion.Item>
     </Accordion>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header><strong>Προφιλ</strong></Accordion.Header>
            <Accordion.Body>
            <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Μπορώ να αλλάξω ορισμένα στοιχεία μου και πως;</Accordion.Header>
        <Accordion.Body>
          Ο/Η φοιτητής/τρια μπορεί να αλλάξει ορισμένα προσωπικά στοιχεία του όπως την Πόλη, την Διεύθυνση και τον Ταχυδρομικό του Κώδικια , όπως και την εικόνα προφιλ .<br/> <br/>
        Αυτό μπορεί να επιτευχθεί ακολουθώντας τα παρακάτω βήματα: <br/> <br/>
        <ul>
        <li>Κλικ στην επιλογή Ο λογαριασμός μου στο πάνω μέρος της σελίδας</li>
        <li>Κλικ στην επιλογή Προφίλ</li>
        <li>Κλικ στην επιλογή Επεξεργασία Στοιχείων</li>
        <ul>
          <li>Κλικ στην επιλογή Αποθήκευση Αλλαγών</li>
        </ul>
        <li>Κλικ στην επιλογή Επιλογή Εικόνας (για την αλλαγή εικόνας προφιλ)</li>
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