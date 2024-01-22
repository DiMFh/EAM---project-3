//npm install mdb-react-ui-kit


import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
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
      <section style={{ backgroundColor: '#eee' }}>
        {userData && (
          <MDBContainer className="py-5">
            <MDBRow>
              <MDBCol lg="6">
                <MDBCard className="mb-4">
                  <MDBCardBody className="text-center">
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      alt="avatar"
                      className="rounded-circle"
                      style={{ width: '200px' }}
                      fluid />
                    
                    <div className="d-flex justify-content-center mb-2">
                      <MDBCol lg="4">
                        <p className="text-muted mb-1"><strong>Email: </strong> {userData.email}</p>
                        <p className="text-muted mb-1"><strong>Ρόλος: </strong> {userData.role}</p>
                      </MDBCol>  
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol lg="6">
                <MDBCard className="mb-2">
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Όνομα: </MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9" className="d-flex">
                        <MDBCardText className="text-muted">{userData.firstname}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
                <MDBCard className="mb-2">
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Επίθετο: </MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9" className="d-flex">
                        <MDBCardText className="text-muted">{userData.lastname}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
                <MDBCard className="mb-2">
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Ημερομηνία Γέννησης: </MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9" className="d-flex">
                        <MDBCardText className="text-muted">{userData.birthdate}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
                <MDBCard className="mb-2">
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Αριθμός Επικοινωνίας: </MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9" className="d-flex">
                        <MDBCardText className="text-muted">{userData.Codephone}</MDBCardText>
                        <MDBCardText className="text-muted">{userData.phone}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
                <MDBCard className="mb-2">
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Πόλη: </MDBCardText>
                        <MDBCardText>Διεύθυνση: </MDBCardText>
                        <MDBCardText>Ταχυδρομικός Κώδικας: </MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9" className="text-start">
                        <MDBCardText className="text-muted me-2">{userData.city}</MDBCardText>
                        <MDBCardText className="text-muted">{userData.address}</MDBCardText>
                        <MDBCardText className="text-muted">{userData.zip}</MDBCardText>
                      </MDBCol>

                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>   
            </MDBRow>  
          </MDBContainer>
        )}
      </section>
    );

};

export default ProfilePage;
