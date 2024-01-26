//npm install mdb-react-ui-kit


import React, { useState, useEffect } from 'react';
import { doc, getDoc,updateDoc  } from 'firebase/firestore';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from 'mdb-react-ui-kit';
import { NavLink,useNavigate} from "react-router-dom";
import { Breadcrumb } from 'react-bootstrap';
// import './Profile.css';
import { useUserRole } from "../UserRoleContext";

const ProfilePage = ({ db }) => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newData, setNewData] = useState({});
  const { setUserRole } = useUserRole();
  const userEmail = localStorage.getItem('email');

  const navigate = useNavigate();

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

    const handleImageChange = (e) => {
      
      if (e.target.files && e.target.files[0]) {
        let selectedFile = e.target.files[0];
        let reader = new FileReader();
        reader.onload = (e) => {
          
          setNewData({ ...newData, avatar: e.target.result });
        };
        reader.readAsDataURL(selectedFile);
      }
    };

    const handleEdit = () => {
      setEditMode(true);
      setNewData({ ...userData }); // Αρχικοποιήστε τη φόρμα με τα υπάρχοντα δεδομένα
    };

    const handleSave = async () => {
      try {
        const docRef = doc(db, "users", userEmail);
        await updateDoc(docRef, newData);
        setUserData(newData);
        setEditMode(false);
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    };
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setNewData({ ...newData, [name]: value });
    };

    const handleLogout = () => {
      localStorage.removeItem("role"); // clear the role from local storage
      setUserRole("public");
      navigate("/"); // redirect to the home page
    };

    return (
      <section>
      <Breadcrumb>
        <Breadcrumb.Item href="./">Αρχική</Breadcrumb.Item>
        <Breadcrumb.Item active>Προφίλ</Breadcrumb.Item>
      </Breadcrumb>
      
        {userData && (
          <MDBContainer className="py-5">
            <h2>Γειά σου {userData.firstname}!</h2>
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
                      <div>
                        <label htmlFor="imageUpload" className="btn btn-primary btn-sm mt-2">
                          Επιλογή Εικόνας
                        </label>
                        <input
                          type="file"
                          id="imageUpload"
                          style={{ display: 'none' }}
                          onChange={handleImageChange} // Μέθοδος για την επεξεργασία της νέας εικόνας
                        />
                    </div>
                    <div className="d-flex justify-content-center mb-2">
                      <MDBCol lg="4">
                        <p className="text-muted mb-1" style={{ textAlign: 'left' }}><strong>Email: </strong> {userData.email}</p>
                        <p className="text-muted mb-1" style={{ textAlign: 'left' }}><strong>Ρόλος: </strong> {userData.role}</p>
                      </MDBCol>  
                    </div>
                    
                  </MDBCardBody>
                </MDBCard>
                <MDBCard className="mb-4">
                  <MDBCardBody className="text-center">
                    <p className="text-muted mb-1" style={{ textAlign: 'left' }}><strong>Δείτε ακόμα: </strong> {userData.school}</p>
                    <nav className="nav">
                      <NavLink to="/student-page/grades" className="nav-link">Βαθμολογίες</NavLink>
                      <NavLink to="/student-page/declarations" className="nav-link">Δηλώσεις</NavLink>
                      <NavLink to="/student-page/certificate" className="nav-link">Πιστοποιητικά</NavLink>
                    </nav>
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
                  {/* Κάρτα για την πόλη */}
                  <MDBCol sm="4">
                    <MDBCard>
                      <MDBCardBody>
                        <MDBCardText>Πόλη:</MDBCardText>
                        {editMode ? (
                          <input
                            type="text"
                            name="city"
                            value={newData.city}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <MDBCardText className="text-muted">{userData.city}</MDBCardText>
                        )}
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>

                  {/* Κάρτα για τη διεύθυνση */}
                  <MDBCol sm="4">
                    <MDBCard>
                      <MDBCardBody>
                        <MDBCardText>Διεύθυνση:</MDBCardText>
                        {editMode ? (
                          <input
                            type="text"
                            name="address"
                            value={newData.address}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <MDBCardText className="text-muted">{userData.address}</MDBCardText>
                        )}
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>

                  {/* Κάρτα για τον ταχυδρομικό κώδικα */}
                  <MDBCol sm="4">
                    <MDBCard>
                      <MDBCardBody>
                        <MDBCardText>Ταχυδρομικός Κώδικας:</MDBCardText>
                        {editMode ? (
                          <input
                            type="text"
                            name="zip"
                            value={newData.zip}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <MDBCardText className="text-muted">{userData.zip}</MDBCardText>
                        )}
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>

                <div style={{ marginTop: '40px' }}>
                  {!editMode ? 
                    <button onClick={handleEdit} className="btn btn-primary btn-rounded" type="button">
                      Επεξεργασία Στοιχείων
                    </button>
                    :
                    <button onClick={handleSave} className="btn btn-success btn-rounded" type="button">
                      Αποθήκευση Αλλαγών
                    </button>
                  }
                </div>
              </MDBCardBody>

                          </MDBCard>  
                                    
                          
                            </MDBCol> 
                            <NavLink
                              to="/"
                              className="logout-button"
                              onClick={handleLogout}
                            >
                              Αποσύνδεση
                            </NavLink>  
                          </MDBRow>  
                        </MDBContainer>
                      )}
                    </section>
                  );

              };

export default ProfilePage;
