import React, { useState, useEffect } from 'react';
import { doc, getDoc, collection, getDocs, } from 'firebase/firestore';
import './Grades.css'; 
import { Breadcrumb, Container,  Accordion, Table } from "react-bootstrap";



const GradesPage = ({ db }) => {

    const [coursesData, setCoursesData] = useState([]);

    useEffect(() => {
        const fetchCoursesData = async () => {
          const userEmail = localStorage.getItem('email');
          if (userEmail) {
            const userRef = doc(db, "users", userEmail);
            const userSnap = await getDoc(userRef);
      
            if (userSnap.exists()) {
                const userCourses = userSnap.data().courses;
                const coursesRef = collection(db, "courses");
                const coursesDocs = await getDocs(coursesRef);
                // console.log(userCourses);
                const coursesInfo = coursesDocs.docs.flatMap(doc => {
                    const coursesData = doc.data();
                    return Object.values(coursesData);
                });
                // console.log(coursesInfo);
                const mergedCourses = [];
                for (const userCourse of userCourses) {
                    const courseInfo = coursesInfo.find(course => course.id === userCourse.id);
                    if (courseInfo) {
                        mergedCourses.push({ ...userCourse, ...courseInfo });
                    } else {
                        console.log(`No matching course found for course ID: ${userCourse.id}`);
                        
                    }
                }
                // console.log(mergedCourses);
                setCoursesData(mergedCourses);
            }
          }
        };
      
        fetchCoursesData();
      }, [db]);

      const getCoursesBySemester = (semester) => {
        return coursesData.filter(coursesData => coursesData.semester === `${semester}ο`);
      };
      
      
      
      

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="./">Αρχική</Breadcrumb.Item>
                <Breadcrumb.Item active>Βαθμολογίες</Breadcrumb.Item>
            </Breadcrumb>
            <div className="mainpage">
                <Container style={{marginTop: "100px"}}>
                <h1>Ενημερωθείτε για τις βαθμολογίες σας</h1>
                <Accordion >
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Εξάμηνα</Accordion.Header>
                        <Accordion.Body>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                            <Accordion.Header>Εξάμηνο 1ο</Accordion.Header>
                            <Accordion.Body>
                                <Table className="table table-hover">
                                    <thead>
                                        <tr className="table-head">
                                            <th scope="col">Όνομα</th>
                                            <th scope="col">Κωδικός</th>
                                            <th scope="col">Βαρύτητα</th>
                                            <th scope="col">Τύπος</th>
                                            <th scope="col">Βαθμός</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getCoursesBySemester(1).map(course => (
                                        <tr key={course.id}>
                                            <td>{course.name}</td>
                                            <td>{course.id}</td>
                                            <td>{course.ects}</td>
                                            <td>{course.type}</td>
                                            <td>{course.grade || 'Δ/Α'}</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="1">
                            <Accordion.Header>Εξάμηνο 2ο</Accordion.Header>
                            <Accordion.Body>
                                <Table className="table table-hover">
                                    <thead>
                                        <tr className="table-head">
                                            <th scope="col">Όνομα</th>
                                            <th scope="col">Κωδικός</th>
                                            <th scope="col">Βαρύτητα</th>
                                            <th scope="col">Τύπος</th>
                                            <th scope="col">Βαθμός</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getCoursesBySemester(2).map(course => (
                                        <tr key={course.id}>
                                            <td>{course.name}</td>
                                            <td>{course.id}</td>
                                            <td>{course.ects}</td>
                                            <td>{course.type}</td>
                                            <td>{course.grade || 'Δ/Α'}</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="2">
                            <Accordion.Header>Εξάμηνο 3ο</Accordion.Header>
                            <Accordion.Body>
                                <Table className="table table-hover">
                                    <thead>
                                        <tr className="table-head">
                                            <th scope="col">Όνομα</th>
                                            <th scope="col">Κωδικός</th>
                                            <th scope="col">Βαρύτητα</th>
                                            <th scope="col">Τύπος</th>
                                            <th scope="col">Βαθμός</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getCoursesBySemester(3).map(course => (
                                        <tr key={course.id}>
                                            <td>{course.name}</td>
                                            <td>{course.id}</td>
                                            <td>{course.ects}</td>
                                            <td>{course.type}</td>
                                            <td>{course.grade || 'Δ/Α'}</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="3">
                            <Accordion.Header>Εξάμηνο 4ο</Accordion.Header>
                            <Accordion.Body>
                                <Table className="table table-hover">
                                    <thead>
                                        <tr className="table-head">
                                            <th scope="col">Όνομα</th>
                                            <th scope="col">Κωδικός</th>
                                            <th scope="col">Βαρύτητα</th>
                                            <th scope="col">Τύπος</th>
                                            <th scope="col">Βαθμός</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getCoursesBySemester(4).map(course => (
                                        <tr key={course.id}>
                                            <td>{course.name}</td>
                                            <td>{course.id}</td>
                                            <td>{course.ects}</td>
                                            <td>{course.type}</td>
                                            <td>{course.grade || 'Δ/Α'}</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Όλα Τα Μαθήματα</Accordion.Header>
                        <Accordion.Body>
                            <Table className="table table-hover">
                                <thead>
                                    <tr className="table-head">
                                        <th scope="col">Όνομα</th>
                                        <th scope="col">Κωδικός</th>
                                        <th scope="col">Βαρύτητα</th>
                                        <th scope="col">Τύπος</th>
                                        <th scope="col">Εξάμηνο</th>
                                        <th scope="col">Βαθμός</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {coursesData.map((course, index) => (
                                        <tr key={index}>
                                        <td>{course.name}</td> 
                                        <td>{course.id}</td> 
                                        <td>{course.ects}</td> 
                                        <td>{course.type}</td>
                                        <td>{course.semester}</td>
                                        <td>{course.grade}</td>
                                        </tr>
                                    ))}
                                </tbody>


                            </Table>
                        </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>
                </Container>
            </div>
        </>
    );
};


 
 export default GradesPage;
