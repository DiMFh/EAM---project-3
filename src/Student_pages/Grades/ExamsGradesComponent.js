import React, { useState, useEffect } from 'react';
import { doc, getDoc, collection, getDocs, } from 'firebase/firestore';
import { Table, Container, Accordion, Card, Button } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


const ExamsGradesComponent = ({ db }) => {
    const [key, setKey] = useState('Everything');
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
                    const coursesInfo = coursesDocs.docs.flatMap(doc => {
                        const coursesData = doc.data();
                        return Object.values(coursesData);
                    });
                    
                    const mergedCourses = [];
                    for (const userCourse of userCourses) {
                        const courseInfo = coursesInfo.find(course => course.id === userCourse.id);
                        if (courseInfo) {
                            mergedCourses.push({ ...userCourse, ...courseInfo});
                        } else {
                            console.log(`No matching course found for course ID: ${userCourse.id}`);
                        }
                    }
                    console.log(mergedCourses);
                    // Δημιουργία του expandedCoursesData
                    let expandedCoursesData = mergedCourses.flatMap(course => 
                        course.semesters.map(semester => ({
                            ...course,
                            semesterInfo: semester.semester,
                            grade: semester.grade
                        }))
                    );
                    expandedCoursesData = expandedCoursesData.sort((a, b) => a.semesterInfo.localeCompare(b.semesterInfo));        
                    setCoursesData(expandedCoursesData);
                    console.log(expandedCoursesData);
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
                        <Accordion defaultActiveKey="0">
                            {Object.entries(coursesData
                                .reduce((acc, course) => {
                                    // Ομαδοποίηση μαθημάτων ανά εξεταστική περίοδο
                                    acc[course.semesterInfo] = acc[course.semesterInfo] || [];
                                    acc[course.semesterInfo].push(course);
                                    return acc;
                                }, {}))
                                .map(([semester, courses], index) => (
                                    <Card key={index}>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey={`${index}`}>
                                                {semester}
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey={`${index}`}>
                                            <Card.Body>
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th>Όνομα</th>
                                                            <th>Βαθμός</th>
                                                            <th>Εξάμηνο</th>
                                                            <th>ECTS</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {courses.map((course, idx) => (
                                                            <tr key={idx}>
                                                                <td>{course.name}</td>
                                                                <td>{course.grade}</td>
                                                                <td>{course.semester}</td>
                                                                <td>{course.ects}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                ))}
                        </Accordion>
                    </Tab>
                    <Tab eventKey="OnlyPass" title="Περασμένα">
                    </Tab>
                    <Tab eventKey="OnlyFail" title="Αποτυχίες">
                    </Tab>
                </Tabs>
            </Container>
        );




}

export default ExamsGradesComponent;