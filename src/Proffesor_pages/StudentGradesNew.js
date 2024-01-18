/* StudentGradesNew.js */
import "./StudentGrades.css";
import StudentGradesPreview from "./StudentGradesPreview";
import { students12 } from "../Proffesor_pages/students12";
import { students14 } from "../Proffesor_pages/students14";
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Table,
  Button,
  ListGroup,
  Form,
  Stack,
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
  const [allValid, setAllValid] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
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
    setValidated(true);

    // check if ALL grades are valid, if yes, then allow the user to submit
    let allvalid = true;
    // if the length of the object 'grades' is not equal to the number of students
    if (Object.keys(grades).length !== Object.keys(students).length) {
      allvalid = false;
    } else {
      Object.entries(grades).forEach(([studentId, grade]) => {
        if (!isValidGrade(grade)) {
          allvalid = false;
          console.log("not valide grade: " + grade);
        }
      });
    }
    setAllValid(allvalid);
  };

  // Helper function to check if grade is valid
  const isValidGrade = (grade) => {
    const value = parseFloat(grade);
    // return value >= 0 && value <= 20;
    return !isNaN(value) && value >= 0 && value <= 10;
  };

  // ***handle the 'next' button
  const [goPreview, setGoPreview] = useState(false);
  const [studentsWithGrades, setStudentsWithGrades] = useState([]);
  const handleGoPreview = () => {
    // merge the grades with the students
    const mergedStudentsWithGrades = Object.values(students).map((student) => ({
      ...student,
      grade: grades[student.id],
    }));

    setStudentsWithGrades(mergedStudentsWithGrades);
    setGoPreview(true);
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="./">Αρχική</Breadcrumb.Item>
        <Breadcrumb.Item href="./student-grades">Βαθμολόγια</Breadcrumb.Item>
        <Breadcrumb.Item active>Νέo Βαθμολόγιο</Breadcrumb.Item>
      </Breadcrumb>
      <div className="student-grades-main">
        {goPreview ? (
          <StudentGradesPreview course={course} students={studentsWithGrades} />
        ) : (
          <Container>
            {/* buttons section */}
            <Row className="mb-2" md={3}>
              <Col sm={"auto"}></Col>
              <Col md={7}>
                <Button
                  variant="outline-dark"
                  className="float-end"
                  onClick={handleBacktoStart}
                >
                  Πίσω
                </Button>
              </Col>
              <Col md={1}>
                <Button
                  type="submit"
                  variant="success"
                  disabled={!allValid}
                  onClick={handleGoPreview}
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
            <Stack direction="horizontal" gap={2}>
              <div className="p-2 ms-auto">
                Ελέγξτε ότι έχετε καταχωρίσει βαθμολογίες για όλους τους
                φοιτητές:
              </div>
              <div className="p-2">
                <Button
                  type="submit"
                  variant="outline-success"
                  onClick={(e) => handleSubmit(e)}
                >
                  Έλεγχος
                </Button>
              </div>
            </Stack>
            <Table className="table table-hover">
              <thead>
                <tr className="table-head">
                  <th></th>
                  <th></th>
                  <th>Α.Μ</th>
                  <th>Ονομα/Επώνυμο</th>
                  <th>Εξάμηνο Φοίτησης</th>
                  <th>Βαθμός</th>
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
                        validated={
                          validated && isValidGrade(grades[student.id])
                        }
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
            <Stack direction="horizontal" gap={2}>
              <div className="p-2 ms-auto"></div>
              <div className="p-2">
                <Button
                  type="submit"
                  variant="outline-success"
                  onClick={(e) => handleSubmit(e)}
                >
                  Έλεγχος
                </Button>
              </div>
            </Stack>
          </Container>
        )}
      </div>
    </>
  );
}

export default StudentGradesNew;
