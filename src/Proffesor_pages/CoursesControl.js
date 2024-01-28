/* CoursesControl.js */
import "./CoursesControl.css";

import { useNavigate } from "react-router";
import {
  Breadcrumb,
  Container,
  Table,
  ButtonGroup,
  Button,
  Accordion,
  ListGroup,
} from "react-bootstrap";

function CoursesControl() {
  const mycourses = {
    1: {
      id: "ΥΣ08",
      name: "Επικοινωνία Ανθρώπου Μηχανής",
      semester: "1ο",
      students: "12",
      description: "Το καλύτερο μάθημα του κόσμου...",
      ects: "6",
      type: "Υποχρεωτικό (YM)",
    },
    2: {
      id: "ΥΣ09",
      name: "Διαδραστικά Συστήματα",
      semester: "1ο",
      students: "14",
      description:
        "Να πάρετε το μεταπτυχιακό του τμήματος να μάθετε περισσότερα.",
      ects: "6",
      type: "Υποχρεωτικό (YM)",
    },
  };

  const navigate = useNavigate();

  const handlenewGrades = () => {
    navigate("../student-grades");
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="./">Αρχική</Breadcrumb.Item>
        <Breadcrumb.Item active>Διαχείριση Μαθημάτων</Breadcrumb.Item>
      </Breadcrumb>
      <div className="course-control-main">
        <Container
          style={{ borderRadius: "15px", padding: "20px", marginTop: "100px" }}
        >
          <ListGroup>
            <ListGroup.Item as="li" variant="primary">
              <strong>Τα μαθήματά σας</strong>
            </ListGroup.Item>
          </ListGroup>
          <Accordion alwaysOpen>
            {Object.keys(mycourses).map((course, index) => (
              <Accordion.Item eventKey={course}>
                <Accordion.Header>{mycourses[course].name}</Accordion.Header>
                <Accordion.Body>
                  <Table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Κωδικός</th>
                        <th>Περιγραφή</th>
                        <th>Εξάμηνο</th>
                        <th>Βαρύτητα</th>
                        <th>Εγγεγραμμένοι</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{mycourses[course].id}</td>
                        <td>{mycourses[course].description}</td>
                        <td>{mycourses[course].semester}</td>
                        <td>{mycourses[course].ects} ECTS</td>
                        <td>{mycourses[course].students}</td>
                        <td>
                          <ButtonGroup className="mb-2">
                            <Button variant="outline-primary">
                              eClass Μαθήματος
                            </Button>
                            <Button
                              variant="outline-success"
                              onClick={handlenewGrades}
                            >
                              Βαθμολόγια
                            </Button>
                          </ButtonGroup>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Container>
      </div>
    </>
  );
}

export default CoursesControl;
