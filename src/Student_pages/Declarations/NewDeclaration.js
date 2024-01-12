/* NewDeclaration.js */
import "./NewDeclaration.css";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Accordion,
} from "react-bootstrap";

const NewDeclaration = () => {
  return (
    <Container className="my-5">
      {/* Search part */}
      <Row className="mb-3">
        <Col md={8}>
          <Form className="d-flext">
            <FormControl
              type="search"
              placeholder="Αναζήτηση μαθήματος"
              className="mr-2"
              aria-label="Search"
            />
          </Form>
        </Col>
      </Row>

      {/* Table part */}
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Προπτυχιακά</Accordion.Header>
          <Accordion.Body>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Κωδικός</th>
                  <th scope="col">Όνομα</th>
                  <th scope="col">Εξάμηνο</th>
                  <th scope="col">Επιλογή</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">ΠΛΗΡ101</th>
                  <td>Εισαγωγή στην Πληροφορική</td>
                  <td>1</td>
                  <td>
                    <Form.Check aria-label="option 1" />
                  </td>
                </tr>
                <tr>
                  <th scope="row">ΠΛΗΡ102</th>
                  <td>Προγραμματισμός Ι</td>
                  <td>1</td>
                  <td>
                    <Form.Check aria-label="option 1" />
                  </td>
                </tr>
                <tr>
                  <th scope="row">ΠΛΗΡ103</th>
                  <td>Μαθηματικά Ι</td>
                  <td>1</td>
                  <td>
                    <Form.Check aria-label="option 1" />
                  </td>
                </tr>
              </tbody>
            </table>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Ελεύθερα Μαθήματα</Accordion.Header>
          <Accordion.Body>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Κωδικός</th>
                  <th scope="col">Όνομα</th>
                  <th scope="col">Εξάμηνο</th>
                  <th scope="col">Επιλογή</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">ΠΛΗΡ101</th>
                  <td>Εισαγωγή στην Πληροφορική</td>
                  <td>1</td>
                  <td>
                    <Form.Check aria-label="option 1" />
                  </td>
                </tr>
                <tr>
                  <th scope="row">ΠΛΗΡ102</th>
                  <td>Προγραμματισμός Ι</td>
                  <td>1</td>
                  <td>
                    <Form.Check aria-label="option 1" />
                  </td>
                </tr>
                <tr>
                  <th scope="row">ΠΛΗΡ103</th>
                  <td>Μαθηματικά Ι</td>
                  <td>1</td>
                  <td>
                    <Form.Check aria-label="option 1" />
                  </td>
                </tr>
              </tbody>
            </table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default NewDeclaration;
