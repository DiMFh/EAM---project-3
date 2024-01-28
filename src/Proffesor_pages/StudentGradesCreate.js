/* StudentGrades.js */
import "./StudentGradesCreate.css";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../data/firebase";
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
      students: "14",
    },
  };

  const [newGrades, setNewGrades] = useState(false); // when the 'new grades' is clicked
  const [selectedCourse, setSelectedCourse] = useState(null); // the course that the user selected to add grades
  const handleNewGrades = (course) => {
    setSelectedCourse(course);
    setNewGrades(true);
  };

  const [savedGradesID, setSavedGradesID] = useState(null); // the id of the saved grades, to edit them
  // Check if there is an editingGradesID in the local storage, to edit the grades
  useEffect(() => {
    const editingGradesID = localStorage.getItem("editingGradesID");
    if (editingGradesID) {
      // get the grades from the database

      const userEmail = localStorage.getItem("email");

      if (userEmail) {
        const userDoc = doc(db, "users", userEmail);
        getDoc(userDoc).then((docSnap) => {
          const userData = docSnap.data();
          const gradesToEdit = userData.studentGrades.find(
            (studentGrade) => studentGrade.id === editingGradesID
          );
          // console.log("gradesToEdit", gradesToEdit);
          if (gradesToEdit) {
            setSavedGradesID(editingGradesID);
            handleNewGrades(gradesToEdit.course); // the component where the user edits the grades should be rendered
          } else {
            console.log("No grades to edit");
          }
        });
      }

      // remove the editingGradesID from the local storage
      localStorage.removeItem("editingGradesID");
    }
  }, []);

  useEffect(() => {
    console.log("newGrades", newGrades);
  }, [newGrades]);
  const handleBacktoStart = () => {
    setNewGrades(false);
  };

  return (
    <>
      {!newGrades ? (
        <>
          <Breadcrumb>
            <Breadcrumb.Item href="./">Αρχική</Breadcrumb.Item>
            <Breadcrumb.Item href="student-grades">Βαθμολόγια</Breadcrumb.Item>
            <Breadcrumb.Item active>Επιλογή Μαθήματος</Breadcrumb.Item>
          </Breadcrumb>
          <div className="main">
            <Container
              style={{
                borderRadius: "15px",
                padding: "20px",
                marginTop: "100px",
              }}
            >
              <Accordion defaultActiveKey="0" alwaysOpen>
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
        <StudentGradesNew
          course={selectedCourse}
          savedGradesID={savedGradesID}
          handleBacktoStart={handleBacktoStart}
        />
      )}
    </>
  );
}

export default StudentGrades;
