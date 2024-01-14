/* NewDeclaration.js */
import "./NewDeclaration.css";
import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Accordion,
  Table,
  Breadcrumb,
} from "react-bootstrap";

const NewDeclaration = () => {
  // put some example courses
  const [courses, setCourses] = useState([
    {
      id: "1",
      name: "Γραμμική Άλγεβρα",
      code: "K03",
      ects: "6",
      type: "Υποχρεωτικό (ΥΜ)",
      semester: "1ο",
    },
    {
      id: "2",
      name: "Εισαγωγή στον Προγραμματισμό",
      code: "K04",
      ects: "7",
      type: "Υποχρεωτικό (ΥΜ)",
      semester: "1ο",
    },
    {
      id: "3",
      name: "Αρχιτεκτονική Υπολογιστών Ι",
      code: "K14",
      ects: "7",
      type: "Υποχρεωτικό (ΥΜ)",
      semester: "2ο",
    },
    {
      id: "4",
      name: "Εφαρμοσμένα Μαθηματικά",
      code: "K20β",
      ects: "6",
      type: "Προαιρετικό (ΠΜ)",
      semester: "2ο",
    },
    {
      id: "5",
      name: "Αντικειμενοστραφής Προγραμματισμός",
      code: "K10",
      ects: "8",
      type: "Υποχρεωτικό (ΥΜ)",
      semester: "3ο",
    },
    {
      id: "6",
      name: "Πιθανότητες και Στατιστική",
      code: "K13",
      ects: "6",
      type: "Υποχρεωτικό (ΥΜ)",
      semester: "3ο",
    },
    {
      id: "7",
      name: "Αλγόριθμοι και Πολυπλοκότητα",
      code: "K17",
      ects: "8",
      type: "Υποχρεωτικό (ΥΜ)",
      semester: "4ο",
    },
    {
      id: "8",
      name: "Δίκτυα Επικοινωνιών Ι",
      code: "K16",
      ects: "6",
      type: "Υποχρεωτικό (ΥΜ)",
      semester: "4ο",
    },
  ]);

  // Group courses by semester
  const coursesBySemester = courses.reduce((acc, course) => {
    if (!acc[course.semester]) {
      acc[course.semester] = [];
    }
    acc[course.semester].push(course);
    return acc;
  }, {});

  // handle the course selection
  const [selectedCourses, setselectedCourses] = useState([]);
  function handleCourseSelection(courseId) {
    setselectedCourses((prevCourses) => {
      // Check if the course is already selected
      if (prevCourses.includes(courseId)) {
        // Remove it from the selected
        return prevCourses.filter((id) => id !== courseId);
      } else {
        // Add it to the selected
        return [...prevCourses, courseId];
      }
    });
  }

  const [searchTerm, setsearchTerm] = useState("");
  // handle the search term changes
  const handleSearch = (e) => {
    setsearchTerm(e.target.value.toLowerCase());
  };

  return (
    <div className="newdeclarations">
      <Breadcrumb>
        <Breadcrumb.Item href="./">Αρχική</Breadcrumb.Item>
        <Breadcrumb.Item href="./declarations">Δηλώσεις</Breadcrumb.Item>
        <Breadcrumb.Item active>Νέα Δήλωση</Breadcrumb.Item>
      </Breadcrumb>
      <Container>
        {/* Search part */}
        <Row className="mb-3">
          <Col md={8}>
            <Form className="d-flext">
              <FormControl
                type="search"
                value={searchTerm}
                onChange={handleSearch}
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
              <Accordion alwaysOpen>
                {Object.entries(coursesBySemester).map(
                  ([semester, courses], index) => (
                    <Accordion.Item eventKey={index.toString()}>
                      <Accordion.Header>Εξάμηνο {semester}</Accordion.Header>
                      <Accordion.Body>
                        <Table className="table table-hover">
                          <thead>
                            <tr className="table-head">
                              <th scope="col">Επιλογή</th>
                              <th scope="col">Όνομα</th>
                              <th scope="col">Κωδικός</th>
                              <th scope="col">Βαρύτητα</th>
                              <th scope="col">Τύπος</th>
                            </tr>
                          </thead>
                          <tbody>
                            {courses.map((course) => (
                              <tr key={course.id} className="table-row">
                                <td>
                                  <Form.Check
                                    aria-label="select"
                                    onChange={() =>
                                      handleCourseSelection(course.id)
                                    }
                                    isValid
                                  />
                                </td>
                                <td className="table-course-name">
                                  {course.name}
                                </td>
                                <td>{course.code}</td>
                                <td>{course.ects} ECTS</td>
                                <td>{course.type}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Accordion.Body>
                    </Accordion.Item>
                  )
                )}
              </Accordion>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Ελεύθερα Μαθήματα</Accordion.Header>
            <Accordion.Body></Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </div>
  );
};

export default NewDeclaration;
