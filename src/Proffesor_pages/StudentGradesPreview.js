/* StudentGradesPreview.js */
import "./StudentGrades.css";
import StudentGradesFinish from "./StudentGradesFinish";
import { useState } from "react";
import {
  Table,
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  Form,
} from "react-bootstrap";
function StudentGradesPreview({ course, students }) {
  const [showNames, setShowNames] = useState(false);
  const handleShowNames = () => setShowNames(!showNames);

  // function to calculate the average grade
  const calculateAverage = () => {
    let sum = 0;
    Object.entries(students).forEach(([studentId, student]) => {
      sum += Number(student.grade);
    });
    return (sum / Object.keys(students).length).toFixed(2);
  };

  const [goToFinish, setGoToFinish] = useState(false);
  const handleGoToFinish = () => setGoToFinish(true);

  return (
    <>
      {goToFinish ? (
        <StudentGradesFinish />
      ) : (
        <Container>
          {/* buttons section */}
          <Row className="mb-2" md={3}>
            <Col sm={"auto"}></Col>
            <Col md={7}>
              <Button variant="outline-dark" className="float-end">
                Πίσω
              </Button>
            </Col>
            <Col md={1}>
              <Button
                type="submit"
                variant="success"
                onClick={handleGoToFinish}
              >
                Υποβολή
              </Button>
            </Col>
            <Col></Col>
          </Row>
          {/* Main Section */}
          <ListGroup>
            <ListGroup.Item as="li" variant="primary">
              <strong>Προεπισκόπηση βαθμολογίου</strong>
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <Table className="table table-hover">
                <tbody>
                  <tr>
                    <td style={{ textAlign: "left", width: "15%" }}>
                      <strong>Μάθημα:</strong>
                    </td>
                    <td style={{ textAlign: "left" }}>{course.name}</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", width: "15%" }}>
                      <strong>Περίοδος:</strong>
                    </td>
                    <td style={{ textAlign: "left" }}>2023/2024 Χειμερινό</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", width: "15%" }}>
                      <strong>Εξάμηνο:</strong>
                    </td>
                    <td style={{ textAlign: "left" }}>5ο</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", width: "15%" }}>
                      <strong>Βαθμολογήθηκαν:</strong>
                    </td>
                    <td style={{ textAlign: "left" }}> {course.students}</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", width: "15%" }}>
                      <strong>Μέση βαθμολογία:</strong>
                    </td>
                    <td style={{ textAlign: "left" }}> {calculateAverage()}</td>
                  </tr>
                </tbody>
              </Table>
            </ListGroup.Item>
          </ListGroup>
          <div style={{ width: "20%" }}>
            <Form>
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Εμφάνιση ονομάτων"
                onChange={handleShowNames}
              />
            </Form>
          </div>
          {/* students table */}
          <Table className="table table-hover">
            <thead>
              <tr className="table-head">
                <th style={{ width: "5%", textAlign: "left" }}>Α/Α</th>
                <th style={{ textAlign: "left", width: "20%" }}>
                  Αριθμός Μητρώου
                </th>
                {showNames ? (
                  <th style={{ textAlign: "left", width: "20%" }}>
                    Ονοματεπώνυμο
                  </th>
                ) : (
                  <th style={{ textAlign: "left", width: "20%" }}></th>
                )}
                <th style={{ textAlign: "left" }}>Βαθμός</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(students).map(([studentId, student]) => (
                <tr key={studentId}>
                  <td>{Number(studentId) + 1}.</td>
                  <td style={{ textAlign: "left" }}>{student.id}</td>
                  {showNames ? (
                    <td style={{ textAlign: "left", width: "20%" }}>
                      {student.name}
                    </td>
                  ) : (
                    <td style={{ textAlign: "left", width: "20%" }}></td>
                  )}
                  <td style={{ textAlign: "left" }}>{student.grade}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      )}
    </>
  );
}
export default StudentGradesPreview;
