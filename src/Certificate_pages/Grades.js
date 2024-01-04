import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import './Grades.css'; 

const GradesPage = ({ db }) => {
    const [courses, setCourses] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState('all');
    const [activeCourse, setActiveCourse] = useState(null);
    const userEmail = localStorage.getItem('email');

    useEffect(() => {
        const fetchUserGrades = async () => {
            const userRef = doc(db, "users", userEmail);
            const docSnap = await getDoc(userRef);
    
            if (docSnap.exists()) {
                setCourses(docSnap.data().courses || []);
            } else {
                console.log("Δεν βρέθηκε χρήστης με αυτό το email");
            }
        };
    
        fetchUserGrades();
    }, [userEmail, db]);

    const handleSemesterChange = (e) => {
        setSelectedSemester(e.target.value);
    };

    const handleCourseClick = (courseId) => {
        setActiveCourse(activeCourse === courseId ? null : courseId);
    };

    const filteredCourses = selectedSemester === 'all' 
        ? courses 
        : courses.filter(course => course.semester.toString() === selectedSemester);

    return (
        <div className="container">
            <h1>Βαθμολογίες Φοιτητή</h1>
            <label htmlFor="semester-select">Επιλέξτε Εξάμηνο:</label>
            <select id="semester-select" onChange={handleSemesterChange}>
                <option value="all">Όλα τα Μαθήματα</option>
                {/* άλλες επιλογές εξαμήνων */}
            </select>

            <table>
                <thead>
                    <tr>
                        <th>Μάθημα</th>
                        <th>Βαθμός</th>
                        <th>Εξάμηνο</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCourses.map((course) => (
                        <React.Fragment key={course.id}>
                            <tr onClick={() => handleCourseClick(course.id)}>
                                <td>{course.name}</td>
                                <td>{course.grade}</td>
                                <td>{course.semester}</td>
                            </tr>
                            {activeCourse === course.id && (
                                <tr>
                                    <td colSpan="3">
                                        <div className="course-details">
                                            <p>Περιγραφή: {course.description}</p>
                                            <p>Καθηγητής: {course.professor}</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GradesPage;
