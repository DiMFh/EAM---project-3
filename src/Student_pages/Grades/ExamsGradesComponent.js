import React, { useState, useEffect } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { Table, Container, Accordion } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const ExamsGradesComponent = ({ db }) => {
  const [key, setKey] = useState("Everything");

  const [semestersData, setSemestersData] = useState({});

  useEffect(() => {
    const fetchCoursesData = async () => {
      const userEmail = localStorage.getItem("email");
      if (userEmail) {
        const userRef = doc(db, "users", userEmail);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userCourses = userSnap.data().courses;
          const coursesRef = collection(db, "courses");
          const coursesDocs = await getDocs(coursesRef);
          const coursesInfo = coursesDocs.docs.flatMap((doc) => {
            const coursesData = doc.data();
            return Object.values(coursesData);
          });

          const mergedCourses = [];
          for (const userCourse of userCourses) {
            const courseInfo = coursesInfo.find(
              (course) => course.id === userCourse.id
            );
            if (courseInfo) {
              mergedCourses.push({ ...userCourse, ...courseInfo });
            } else {
              console.log(
                `No matching course found for course ID: ${userCourse.id}`
              );
            }
          }
          console.log(mergedCourses);
          let expandedCoursesData = mergedCourses.flatMap((course) =>
            course.semesters.map((semester) => ({
              ...course,
              semesterInfo: semester.semester,
              grade: semester.grade,
            }))
          );
          expandedCoursesData = expandedCoursesData.sort((a, b) =>
            a.semesterInfo.localeCompare(b.semesterInfo)
          );
          console.log(expandedCoursesData);

          let semesters = {};
          expandedCoursesData.forEach((course) => {
            if (!semesters[course.semesterInfo]) {
              semesters[course.semesterInfo] = [];
            }
            semesters[course.semesterInfo].push(course);
          });
          console.log(semesters);
          setSemestersData(semesters);
        }
      }
    };
    fetchCoursesData();
  }, [db]);

  return (
    <Container>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="Everything" title="Όλα">
          <Accordion alwaysOpen>
            {Object.entries(semestersData).map(([semester, courses], index) => (
              <>
                <Accordion.Item eventKey={index.toString()}>
                  <Accordion.Header eventKey={String(index)}>
                    {semester}
                  </Accordion.Header>
                </Accordion.Item>

                <Accordion.Collapse eventKey={String(index)}>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Εξεταστική</th>
                        <th>Βαθμός</th>
                        <th>Όνομα</th>
                        <th>Εξάμηνο</th>
                        <th>ECTS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((course) => (
                        <tr key={index}>
                          <td
                            style={{
                              color: course.grade < 5 ? "red" : "green",
                            }}
                          >
                            {course.semesterInfo}
                          </td>
                          <td
                            style={{
                              color: course.grade < 5 ? "red" : "green",
                            }}
                          >
                            {course.grade}
                          </td>
                          <td
                            style={{
                              color: course.grade < 5 ? "red" : "green",
                            }}
                          >
                            {course.name}
                          </td>
                          <td
                            style={{
                              color: course.grade < 5 ? "red" : "green",
                            }}
                          >
                            {course.semester}
                          </td>
                          <td
                            style={{
                              color: course.grade < 5 ? "red" : "green",
                            }}
                          >
                            {course.ects}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Accordion.Collapse>
              </>
            ))}
            <div className="mt-3 d-flex justify-content-end">
              <button className="btn btn-primary me-2">Εκτύπωση</button>
              <button className="btn btn-danger">Εξαγωγή σε PDF</button>
            </div>
          </Accordion>
        </Tab>
        <Tab eventKey="OnlyPass" title="Επιτυχίες">
          <Accordion alwaysOpen>
            {Object.entries(semestersData).map(([semester, courses], index) => {
              const passedCourses = courses.filter(
                (course) => course.grade >= 5
              );

              if (passedCourses.length === 0) {
                return null;
              }

              return (
                <>
                  <Accordion.Item eventKey={index.toString()}>
                    <Accordion.Header eventKey={String(index)}>
                      {semester}
                    </Accordion.Header>
                  </Accordion.Item>

                  <Accordion.Collapse eventKey={String(index)}>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Βαθμός</th>
                          <th>Όνομα</th>
                          <th>Εξάμηνο</th>
                          <th>ECTS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {passedCourses.map((course, courseIndex) => (
                          <tr key={courseIndex}>
                            <td style={{ color: "green" }}>{course.grade}</td>
                            <td style={{ color: "green" }}>{course.name}</td>
                            <td style={{ color: "green" }}>
                              {course.semester}
                            </td>
                            <td style={{ color: "green" }}>{course.ects}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Accordion.Collapse>
                </>
              );
            })}
            <div className="mt-3 d-flex justify-content-end">
              <button className="btn btn-primary me-2">Εκτύπωση</button>
              <button className="btn btn-danger">Εξαγωγή σε PDF</button>
            </div>
          </Accordion>
        </Tab>
        <Tab eventKey="OnlyFail" title="Αποτυχίες">
          <Accordion alwaysOpen>
            {Object.entries(semestersData).map(([semester, courses], index) => {
              const failedCourses = courses.filter(
                (course) => course.grade < 5
              );

              if (failedCourses.length === 0) {
                return null;
              }

              return (
                <>
                  <Accordion.Item eventKey={index.toString()}>
                    <Accordion.Header eventKey={String(index)}>
                      {semester}
                    </Accordion.Header>
                  </Accordion.Item>

                  <Accordion.Collapse eventKey={String(index)}>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Βαθμός</th>
                          <th>Όνομα</th>
                          <th>Εξάμηνο</th>
                          <th>ECTS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {failedCourses.map((course, courseIndex) => (
                          <tr key={courseIndex}>
                            <td style={{ color: "red" }}>{course.grade}</td>
                            <td style={{ color: "red" }}>{course.name}</td>
                            <td style={{ color: "red" }}>{course.semester}</td>
                            <td style={{ color: "red" }}>{course.ects}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Accordion.Collapse>
                </>
              );
            })}
            <div className="mt-3 d-flex justify-content-end">
              <button className="btn btn-primary me-2">Εκτύπωση</button>
              <button className="btn btn-danger">Εξαγωγή σε PDF</button>
            </div>
          </Accordion>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default ExamsGradesComponent;
