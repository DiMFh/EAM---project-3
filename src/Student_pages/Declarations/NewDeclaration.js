/* NewDeclaration.js */
import "./NewDeclaration.css";
import { useState, useEffect } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../data/firebase";
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
  // get the courses from the database
  const [coursesDB, setCoursesDB] = useState([]);
  useEffect(() => {
    async function getCourses() {
      try {
        const allCoursesDocRef = doc(db, "courses", "all_courses");
        const allCoursesDoc = await getDoc(allCoursesDocRef);

        if (allCoursesDoc.exists()) {
          // The 'all_courses' document contains all the courses
          const coursesData = allCoursesDoc.data();
          setCoursesDB(coursesData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting the course: ", error);
      }
    }
    getCourses();
  }, []);

  // group courses by semester after they are fetched from the database
  const [coursesBySemester, setCoursesBySemester] = useState({});
  useEffect(() => {
    console.log("CoursesDB: ", coursesDB);

    if (typeof coursesDB === "object" && coursesDB !== null) {
      const groupedCourses = Object.values(coursesDB).reduce((acc, course) => {
        const semester = course.semester || "Unknown";
        if (!acc[semester]) {
          acc[semester] = [];
        }
        acc[semester].push(course);
        return acc;
      }, {});
      setCoursesBySemester(groupedCourses);
    }
  }, [coursesDB]);

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
                                <td>{course.id}</td>
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
