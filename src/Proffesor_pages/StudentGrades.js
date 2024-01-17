/* StudentGrades.js */
import "./StudentGrades.css";
import { useState } from "react";
import {
  Breadcrumb,
  Container,
  Accordion,
  Table,
  Button,
} from "react-bootstrap";
import StudentGradesNew from "./StudentGradesNew";

function StudentGrades() {
  const mycourses = {
    1: {
      id: "ΥΣ08",
      name: "Επικοινωνία Ανθρώπου Μηχανής",
      semester: "1ο",
      students: "12",
    },
    2: {
      id: "ΥΣ09",
      name: "Διαδραστικά Συστήματα",
      semester: "1ο",
      students: "12",
    },
    3: {
      id: "K08",
      name: "Εισαγωγή στον Προγραμματισμό",
      semester: "1ο",
      students: "14",
    },
    4: {
      id: "K17",
      name: "Αλγόριθμοι και Πολυπλοκότητα",
      semester: "4ο",
      students: "14",
    },
  };


  const [newGrades, setNewGrades] = useState(false); // when the 'new grades' is clicked
  const [selectedCourse, setSelectedCourse] = useState(null); // the course that the user selected to add grades
  const handleNewGrades = (course) => {
    setSelectedCourse(course);
    setNewGrades(true);
  };


    const handleBacktoStart = () => {
        setNewGrades(false);
    }

  return (
    <>
      {!newGrades ? (
        <>
          <Breadcrumb>
            <Breadcrumb.Item href="./">Αρχική</Breadcrumb.Item>
            <Breadcrumb.Item active>Βαθμολόγια</Breadcrumb.Item>
          </Breadcrumb>
          <div className="student-grades-main">
            <Container>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey={"0"} disabled="true">
                  <Accordion.Header>
                    Χειμερινό Εξάμηνο 2023-2024
                  </Accordion.Header>
                  <Accordion.Body>
                    <Table className="table table-hover">
                      <thead>
                        <tr className="table-head">
                          <th className="narrow-column">Μάθημα</th>
                          <th>Κωδικός</th>
                          <th>Εξάμηνο</th>
                          <th>Εγγεγραμμένοι</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(mycourses).map(([key, course]) => {
                          return (
                            <tr className="table-row">
                              <td style={{ textAlign: "left", width: "25%" }}>
                                {course.name}
                              </td>
                              <td>{course.id}</td>
                              <td>{course.semester}</td>
                              <td>{course.students}</td>
                              <td>
                                <Button
                                  variant="outline-success"
                                  onClick={() => handleNewGrades(course)}
                                >
                                  Νέο βαθμολόγιο
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey={"1"} disabled>
                  <Accordion.Header>Εαρινό Εξάμηνο 2023-2024</Accordion.Header>
                </Accordion.Item>
              </Accordion>
            </Container>
          </div>
        </>
      ) : (
        <StudentGradesNew course={selectedCourse} handleBacktoStart={handleBacktoStart}/>
      )}
    </>
  );
}

export default StudentGrades;
