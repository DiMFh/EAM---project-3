/* StudentGradesNew.js */
import "./StudentGrades.css";
import { students12 } from "../Proffesor_pages/students12";
import { students14 } from "../Proffesor_pages/students14";
import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Table,
  Button,
  ListGroup,
  Form,
} from "react-bootstrap";

function StudentGradesNew({ course, handleBacktoStart }) {
  const students = course.students === "12" ? students12 : students14;

  // ***keep track of the grades
  const [grades, setGrades] = useState({});
  const handleGradeChange = (studentId, newGrade) => {
    setGrades((prevGrades) => ({
      ...prevGrades,
      [studentId]: newGrade,
    }));
  };

  // ***keep track of the form validation
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    let isValid = true;
    Object.entries(grades).forEach(([studentId, grade]) => {
      if (!isValidGrade(grade)) {
        isValid = false;
      }
    });

    if (isValid) {
      // Process the form submission
      // ...
    } else {
      event.stopPropagation();
    }
    console.log(grades);
    setValidated(true);
  };

  // Helper function to check if grade is valid
  const isValidGrade = (grade) => {
    const value = parseFloat(grade);
    // return value >= 0 && value <= 20;
    return !isNaN(value) && value >= 0 && value <= 20;
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="./">Αρχική</Breadcrumb.Item>
        <Breadcrumb.Item href="./student-grades">Βαθμολόγια</Breadcrumb.Item>
        <Breadcrumb.Item active>Νέo Βαθμολόγιο</Breadcrumb.Item>
      </Breadcrumb>
      <div className="student-grades-main">
        <Container>
          {/* buttons section */}
          <Row className="mb-2" md={3}>
            <Col sm={"auto"}></Col>
            <Col md={7}>
              <Button variant="outline-dark" className="float-end" onClick={handleBacktoStart}>
                Πίσω
              </Button>
            </Col>
            <Col md={1}>
              <Button
                type="submit"
                variant="success"
                onClick={(e) => handleSubmit(e)}
              >
                Επόμενο
              </Button>
            </Col>
            <Col></Col>
          </Row>
          {/* Main Section */}
          <ListGroup>
            <ListGroup.Item as="li" variant="primary">
              <strong>{course.name}</strong>
            </ListGroup.Item>
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
                      <strong>Εξάμηνο:</strong>
                    </td>
                    <td style={{ textAlign: "left" }}>5ο</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", width: "15%" }}>
                      <strong>Εγγεγραμμένοι:</strong>
                    </td>
                    <td style={{ textAlign: "left" }}> {course.students}</td>
                  </tr>
                </tbody>
              </Table>
            </ListGroup.Item>
          </ListGroup>
          <Table className="table table-hover">
            <thead>
              <tr className="table-head">
                <th></th>
                <th></th>
                <th>Α.Μ</th>
                <th>Ονομα/Επώνυμο</th>
                <th>Εξάμηνο Φοίτησης</th>
                <th>Βαθμολογία</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Object.values(students).map((student, index) => (
                <tr>
                  <td style={{ width: "10%" }}></td>
                  <td>{index + 1}.</td>
                  <td>{student.id}</td>
                  <td style={{ textAlign: "left" }}>{student.name}</td>
                  <td>{student.semester}</td>
                  <td style={{ width: "8%" }}>
                    <Form
                      noValidate
                      validated={validated && isValidGrade(grades[student.id])}
                      onSubmit={(e) => handleSubmit(e)}
                    >
                      <Form.Group
                        as={Col}
                        className="mb-3"
                        controlId="formBasicEmail"
                      >
                        <Form.Control
                          type="text"
                          name="grade"
                          placeholder="Βαθμός"
                          required
                          value={grades[student.id] || ""}
                          onChange={(e) =>
                            handleGradeChange(student.id, e.target.value)
                          }
                          isInvalid={
                            validated && !isValidGrade(grades[student.id])
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          Μη έγκυρο
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form>
                  </td>
                  <td style={{ width: "10%" }}></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </>
  );
}

export default StudentGradesNew;
