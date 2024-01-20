/* NewDeclarationFinish.js */
import "./NewCertificateFinish.css";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../data/firebase";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  Spinner,
} from "react-bootstrap";

const NewCertificateFinish = ({lastStepCompleted, selectedcertificate }) => {
  const [loading, setLoading] = useState(true);
  const [printing, setPrinting] = useState(false);
  console.log('Rendering NewCertificateFinish');
  // update the user's document in Firestore
  // useEffect(() => {
  //   setLoading(true);
    
  //   const userEmail = localStorage.getItem("email");
  //   if (userEmail) {
  //     const userDoc = doc(db, "users", userEmail);
  //     getDoc(userDoc).then((docSnap) => {
  //       if (docSnap.exists()) {
  //         const certificateNames = {
  //           "student_status": "Φοιτητικής Ιδιότητας",
  //           "detailed_grades": "Αναλυτικής βαθμολογίας",
  //           "military_use_brief": "Στρατολογικής Χρήσης (Συνοπτικό)",
  //           "military_use_detailed": "Στρατολογικής Χρήσης Αναλυτικό",
  //           "tax_use": "Φορολογικής Χρήσης"
  //         };
  //         const selectedCertificateId = localStorage.getItem('selectedCertificateId');
  //         const certificateObject = {
  //           name: certificateNames[selectedCertificateId],
  //           dateRequested: new Date().toISOString(),
  //         };
  //         updateDoc(userDoc, {
  //           certificates: arrayUnion(certificateObject),
  //         }).then(() => {
  //           setLoading(false);
  //         });
  //       } else {
  //         console.log("No user data found in Firestore");
  //         setLoading(false);
  //       }
  //     });
  //   } else {
  //     console.log("No user data found in Firestore");
  //     setLoading(false);
  //     lastStepCompleted();
  //   }
  // }, []);
  useEffect(() => {
    // simulate a delay when the component is mounted for the first time
    setTimeout(() => {
      setLoading(false);
      lastStepCompleted();
    }, 1500);
    setLoading(true);

    // get the user's email
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      // get the user's document
      const userDoc = doc(db, "users", userEmail);
      // update the user's document
      getDoc(userDoc).then((docSnap) => {
        if (docSnap.exists()) {
          const certificateNames = {
            "student_status": "Φοιτητικής Ιδιότητας",
            "detailed_grades": "Αναλυτικής βαθμολογίας",
            "military_use_brief": "Στρατολογικής Χρήσης (Συνοπτικό)",
            "military_use_detailed": "Στρατολογικής Χρήσης Αναλυτικό",
            "tax_use": "Φορολογικής Χρήσης"
          };
          const selectedCertificateId = localStorage.getItem('selectedCertificateId');
          const certificateObject = {
            // id: userData.declarations ? userData.declarations.length + 1 : 0,
            name: certificateNames[selectedCertificateId],
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            // courses: selectedCourses,
            period: "2023-2024 Χειμερινό",
          };
          updateDoc(userDoc, {
            certificates: arrayUnion(certificateObject),
          });
        } else {
          console.log("No user data found in Firestore");
        }
      });
    }
  }, []);



  // simulate a delay when the "print" button is clicked
  const handlePrint = () => {
    setPrinting(true);
    setTimeout(() => {
      setPrinting(false);
    }, 1500);
  };
  return (
    <div className="newdeclaration-finish">
      <Container fluid>
        {loading ? (
          <>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <h3> Αποστολή...</h3>
          </>
        ) : (
          <Container fluid>
            <h2 className="new-declaration-finish-message">
              Η Δήλωση ολοκληρώθηκε!
            </h2>
            <ButtonGroup className="mb-2">
              <Button href="/" variant="secondary" className="float-end">
                Αρχική
              </Button>
              <Button
                href="certificate"
                variant="secondary"
                className="float-end"
              >
                Πιστοποιητικά
              </Button>
              <Button className="float-end" onClick={handlePrint}>
                {printing ? (
                  <Spinner animation="border" role="status" size="sm" />
                ) : (
                  "Εκτύπωση"
                )}
              </Button>
              <DropdownButton
                as={ButtonGroup}
                title="Λήψη"
                id="bg-nested-dropdown"
              >
                <Dropdown.Item></Dropdown.Item>
                <Dropdown.Item>.pdf</Dropdown.Item>
                <Dropdown.Item>.xls</Dropdown.Item>
              </DropdownButton>
            </ButtonGroup>
          </Container>
        )}
      </Container>
    </div>
  );
};
export default NewCertificateFinish;
