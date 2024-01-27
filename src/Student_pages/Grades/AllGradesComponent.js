import React, { useState, useEffect } from 'react';
import { doc, getDoc, collection, getDocs, } from 'firebase/firestore';
import { Table, Container,} from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';




const AllGradesComponent = ({ db }) => {
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
                <Tab eventKey="Everything" title="Ολα">
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
                        {coursesData.map((course, index) => (
                            <tr key={index}>
                                <td style={{ color: course.grade < 5 ? 'red' : 'green' }}>{course.semesterInfo}</td>
                                <td style={{ color: course.grade < 5 ? 'red' : 'green' }}>{course.grade}</td>
                                <td style={{ color: course.grade < 5 ? 'red' : 'green' }}>{course.name}</td>
                                <td style={{ color: course.grade < 5 ? 'red' : 'green' }}>{course.semester}</td>
                                <td style={{ color: course.grade < 5 ? 'red' : 'green' }}>{course.ects}</td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="mt-3 d-flex justify-content-end">
                    <button className="btn btn-primary me-2">Εκτύπωση</button>
                    <button  className="btn btn-danger">Εξαγωγή σε PDF</button>
                </div>
                </Tab>
                <Tab eventKey="OnlyPass" title="Περασμένα">
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
                            {coursesData.filter(course => course.grade >= 5).map((course, index) => (
                                <tr key={index}>
                                    <td style={{color: 'green'}}>{course.semesterInfo}</td>
                                    <td style={{color: 'green'}}>{course.grade}</td>
                                    <td style={{color: 'green'}}>{course.name}</td>
                                    <td style={{color: 'green'}}>{course.semester}</td>
                                    <td style={{color: 'green'}}>{course.ects}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="mt-3 d-flex justify-content-end">
                        <button className="btn btn-primary me-2">Εκτύπωση</button>
                        <button  className="btn btn-danger">Εξαγωγή σε PDF</button>
                    </div>
                </Tab>
                <Tab eventKey="OnlyFail" title="Αποτυχίες">
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
                            {coursesData.filter(course => course.grade < 5).map((course, index) => (
                                <tr key={index}>
                                    <td style={{color: 'red'}}>{course.semesterInfo}</td>
                                    <td style={{color: 'red'}}>{course.grade}</td>
                                    <td style={{color: 'red'}}>{course.name}</td>
                                    <td style={{color: 'red'}}>{course.semester}</td>
                                    <td style={{color: 'red'}}>{course.ects}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="mt-3 d-flex justify-content-end">
                        <button className="btn btn-primary me-2">Εκτύπωση</button>
                        <button  className="btn btn-danger">Εξαγωγή σε PDF</button>
                    </div>
                </Tab>
            </Tabs>
        </Container>
        );

}
export default AllGradesComponent;