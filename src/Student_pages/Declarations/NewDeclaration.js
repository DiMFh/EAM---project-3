/* NewDeclaration.js */
import "./NewDeclaration.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
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
  Button,
  Spinner,
} from "react-bootstrap";
import NewDeclarationPreview from "./NewDeclarationPreview";

const NewDeclaration = () => {
  const [selectedCourses, setselectedCourses] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  //  ***clear the selected courses from the local storage when the component is mounted for the first time
  useEffect(() => {
    localStorage.removeItem("selectedCourses");
  }, []);

  // ****get the courses from the database
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

  // ****group courses by semester after they are fetched from the database
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

  // ****handle the course selection
  function handleCourseSelection(course) {
    setselectedCourses((prevCourses) => {
      // Check if the course is already selected
      if (prevCourses.includes(course)) {
        // Remove it from the selected
        return prevCourses.filter(
          (selectedCourse) => selectedCourse.id !== course.id
        );
      } else {
        // Add it to the selected
        return [...prevCourses, course];
      }
    });
  }

  // ****handle the search term changes
  const [searchTerm, setsearchTerm] = useState("");
  const handleSearch = (e) => {
    setsearchTerm(e.target.value.toLowerCase());
  };

  // ***loading button functionality (and go to preview)
  const [isLoading, setLoading] = useState(false);
  const goToPreview = () => {
    setShowPreview(true);
  };
  const goBackToSelection = () => {
    const storedCourses = JSON.parse(localStorage.getItem("selectedCourses"));
    if (storedCourses) {
      setselectedCourses(storedCourses);
    }
    setShowPreview(false);
  };
  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise((resolve) => setTimeout(resolve, 1000));
    }
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
        // go to preview
        console.log("The selected courses are: ", selectedCourses);
        goToPreview();
      });
    }
  }, [isLoading]);
  const handleClick = () => {
    // Store the selected courses in the local storage
    localStorage.setItem("selectedCourses", JSON.stringify(selectedCourses));
    setLoading(true);
  };

  return (
    <>
      {!showPreview ? (
        <div className="newdeclarations">
          <Breadcrumb>
            <Breadcrumb.Item href="./">Αρχική</Breadcrumb.Item>
            <Breadcrumb.Item href="./declarations">Δηλώσεις</Breadcrumb.Item>
            <Breadcrumb.Item active>Νέα Δήλωση</Breadcrumb.Item>
          </Breadcrumb>
          <Container>
            {/* Search-Επιστροφή-Επόμενο */}
            <Row className="mb-2" md={3}>
              <Col sm={"auto"}>
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
              <Col md={7}>
                <Button variant="outline-dark" className="float-end">
                  Πίσω
                </Button>
              </Col>
              <Col md={1}>
                {/*If the selectedCourses is empty, make the button disabled */}

                <Button
                  variant="success"
                  className="float-end"
                  disabled={isLoading || selectedCourses.length === 0} // if it is loading or there are no selected courses, disable the button
                  onClick={!isLoading ? handleClick : null}
                >
                  {/* if it is loading, return a spinner */}
                  {isLoading && (
                    <Spinner as="span" animation="border" size="sm" />
                  )}
                  {/* if it is not loading, return the text */}
                  {!isLoading && "Επόμενο"}
                </Button>
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
                          <Accordion.Header>
                            Εξάμηνο {semester}
                          </Accordion.Header>
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
                                        // set the checkbox to checked if the course is already selected
                                        checked={selectedCourses.some(
                                          (selectedCourse) =>
                                            selectedCourse.id === course.id
                                        )}
                                        onChange={() =>
                                          handleCourseSelection(course)
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
      ) : (
        <NewDeclarationPreview
          selectedCourses={selectedCourses}
          goBackToSelection={goBackToSelection}
        />
      )}
    </>
  );
};

export default NewDeclaration;
