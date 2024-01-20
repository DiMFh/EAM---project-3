import React, { useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { courses } from "./Utils/Objects/objects";
import { Declaration } from "./Utils/Objects/RegisterForm_declarations";
import {StudentGrades } from "./Utils/Objects/RegisterForm_StudentGrades";
import "./RegisterPage.css";

export default function RegisterForm({ db }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conpassword, setConPassword] = useState("");
  const [role, setRole] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  // Handles the register functionality of the user
  async function handleRegister(e) {
    e.preventDefault();

    if (!email || !password || !conpassword || !role || !telephone) {
      alert("Please fill all the required fields.");
      return; // Διακοπή της συνάρτησης εάν κάποιο απαιτούμενο πεδίο είναι κενό
    }

    // Έλεγχος για ταιριάζοντα κωδικούς
    if (password !== conpassword) {
      alert("Passwords do not match.");
      return;
    }
    // This object represents the user's form that it will be saved in our database.
    const docUser = {
      email: email,
      password: password,
      role: role,
      telephone: telephone,
      address: address,
      date: date,
      courses: [
        {
          id: "ΥΣ08",
          grade: 10,
        },
        {
          id: "Κ16",
          grade: 10,
        },
      ],
      declarations: [Declaration],
      studentGrades: [StudentGrades],
    };

    try {
      // Create a Firebase doc that 'points' to our db and creates a collection "users" with primary key the email of the user
      const ref_user = doc(db, "users", email);
      // Then we use setDoc to push the 'user object' to the referenced user
      await setDoc(ref_user, docUser);

      // At the same time we push all the courses at the db.
      // We create a 'courses' collection with primary key 'all_courses'
      const ref_courses = doc(db, "courses", "all_courses");

      // Έλεγχος αν το έγγραφο μαθημάτων υπάρχει
      const docSnap = await getDoc(ref_courses);

      // Αν το έγγραφο δεν υπάρχει, τότε προσθήκη του
      if (!docSnap.exists()) {
        await setDoc(ref_courses, courses);
      }

      // Redirect to login route
      window.location.href = "/login";
      console.log("ALL GOOD");
      alert("Document written to Database");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="mainpage">
      <Container>
        <Alert>
          <p style={{ fontWeight: "bold" }}>
            Ότι έχει * είναι υποχρεωτικό να συμπληρωθεί.
          </p>
          <p>Παρακαλώ συμπληρώστε τα στοιχεία σας.</p>
        </Alert>
        <Form onSubmit={handleRegister}>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Ηλεκτρονική Διεύθυνση*
            </Form.Label>
            <Col sm="3">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              Κωδικός*
            </Form.Label>
            <Col sm="3">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextConfirmPassword"
          >
            <Form.Label column sm="2">
              Επιβεβαίωση Κωδικού*
            </Form.Label>
            <Col sm="3">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={conpassword}
                onChange={(e) => setConPassword(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextDate">
            <Form.Label column sm="2">
              Ημερομηνία Γέννησης*
            </Form.Label>
            <Col sm="3">
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextRole">
            <Form.Label column sm="2">
              Ρόλος*
            </Form.Label>
            <Col sm="3">
              <Form.Control
                as="select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="professor">Professor</option>
                <option value="student">Student</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPhone">
            <Form.Label column sm="2">
              Τηλέφωνο*
            </Form.Label>
            <Col sm="3">
              <Form.Control
                type="tel"
                placeholder="Telephone Number"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextAddress"
          >
            <Form.Label column sm="2">
              Διεύθυνση
            </Form.Label>
            <Col sm="3">
              <Form.Control
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Button variant="primary" type="submit">
            Εγγραφή
          </Button>
          <a href="/login" className="mt-3 d-block">
            Έχετε Ήδη Λογαριασμό;
          </a>
        </Form>
      </Container>
    </div>
  );
}
