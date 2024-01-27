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
        <div className="container mt-5">
          <h1 className="text-center">Ο λογαριασμός σας</h1>
          <div className="row justify-content-center">
            {userData && (
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header">
                    <h2>Στοιχεία Χρήστη</h2>
                  </div>
                  <div className="card-body">
                    <p className="profile-detail"><strong>Τηλέφωνο: </strong> {userData.phone}</p>
                    <p className="profile-detail"><strong>Διεύθυνση: </strong> {userData.address}</p>
                    <p className="profile-detail"><strong>Ημερομηνία Γέννησης: </strong> {userData.birthdate}</p>
                    <p className="profile-detail"><strong>Ρόλος: </strong> {userData.role}</p>
                    {/* Εδώ μπορείτε να προσθέσετε περαιτέρω λειτουργικότητα ανάλογα με τον ρόλο του χρήστη */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );

};

export default ProfilePage;
