import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import './Profile.css';

const ProfilePage = ({ db }) => {
  const [userData, setUserData] = useState(null);
  const userEmail = localStorage.getItem('email');

    useEffect(() => {
        async function fetchUserData() {
        if (userEmail) {
            try {
            const docRef = doc(db, "users", userEmail);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setUserData(docSnap.data());
            } else {
                console.log("No user data found in Firestore");
            }
            } catch (error) {
            console.error("Error fetching user data:", error);
            }
        }
        }

        fetchUserData();
    }, [db, userEmail]);

    return (
        <div>
            <h1>Ο λογαριασμος σας:</h1> 
            <div className="container">
                <div>
                    <h2>Στοιχεία Χρήστη:</h2>
                </div>
                {userData && (
                    <div>
                        <p className="profile-detail"><label>Email:</label> {userData.email}</p>
                        <p className="profile-detail"><label>Τηλέφωνο:</label> {userData.telephone}</p>
                        <p className="profile-detail"><label>Διεύθυνση:</label> {userData.address}</p>
                        <p className="profile-detail"><label>Ημερομηνία Γέννησης:</label> {userData.date}</p>
                        <p className="profile-detail"><label>Ρόλος:</label> {userData.role}</p>
                    
                        {userData.role === 'student' && (
                            <div>
                                <h2>Μαθήματα και Βαθμοί:</h2>
                                <ul className="courses-list">
                                    {userData.courses.map((course, index) => (
                                        <li key={index}><span className="course-name">{course.name}:</span> {course.grade}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                 )}
            </div>
        </div>
    );

};

export default ProfilePage;
