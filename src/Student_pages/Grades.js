import React, { useState, useEffect } from 'react';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import './Grades.css'; 
import { Breadcrumb, Container, Card, Accordion, Table } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap";
import { useNavigate } from "react-router";


const GradesPage = ({ db }) => {
    const [userCourses, setUserCourses] = useState([]);
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
              console.log(userCourses);
              const coursesInfo = coursesDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
              console.log(coursesInfo);
              const mergedCourses = userCourses.map(userCourse => {
                const courseInfo = coursesInfo.find(course => course.id === userCourse.id);
                return { ...userCourse, ...courseInfo }; // Συγχώνευση των δεδομένων
              });
              console.log(mergedCourses);
              setCoursesData(mergedCourses);
            }
          }
        };
      
        fetchCoursesData();
      }, [db]);
      
      
      

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="./">Αρχική</Breadcrumb.Item>
                <Breadcrumb.Item active>Βαθμολογίες</Breadcrumb.Item>
            </Breadcrumb>
            <div className="mainpage">
                <Container>
                <Accordion defaultActiveKey="0">
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
                                        <th scope="col">Βαθμός</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {coursesData.map((course, index) => (
                                        <tr key={index}>
                                        <td>{course.name}</td> {/* Εμφανίζει το όνομα του μαθήματος */}
                                        <td>{course.id}</td> {/* Εμφανίζει τον κωδικό του μαθήματος */}
                                        <td>{course.ects}</td> {/* Εμφανίζει τη βαρύτητα του μαθήματος */}
                                        <td>{course.type}</td> {/* Εμφανίζει τον τύπο του μαθήματος */}
                                        <td>{course.grade}</td> {/* Εμφανίζει τον βαθμό του μαθήματος */}
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
