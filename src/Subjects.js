// Section.js
import React, { useState, useEffect } from 'react';
import { doc, getDoc, collection, getDocs, } from 'firebase/firestore';
import {  Container,  Accordion, Table } from "react-bootstrap";

const Subjects = ({db}) => {
  const [subjects, setsubjects] = useState([]);

  useEffect(() => {
    const getsubjects = async () => {
      const subjectsCol = collection(db, "courses"); //γινεται το collection να παρει και σαν ορισμα 
      const subjectsSnapshot = await getDocs(subjectsCol);
      const subjectsList = subjectsSnapshot.docs.map(doc => doc.data()); //αυτη η προταση τι κανει?
      setsubjects(subjectsList);
      console.log(subjectsList);
    }
    getsubjects();
  }, [db]);

  const getsubjectsBySemester = (semester) => {
    return subjects.filter(subjects => subjects.semester === `${semester}ο`);
  };


  return (
    <Container>
      <h1>Ενημερωθείτε για τα μαθήματα του Τμήματος Πληροφορικής και Τηλεπικοινωνιών</h1>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Εξάμηνα</Accordion.Header>
          <Accordion.Body>
          <Accordion>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Πρώτο Εξάμηνο</Accordion.Header>
                <Accordion.Body>
                {getsubjectsBySemester("1").map((subjects, index) => (
                  <Table className="table table-hover">
                    <thead>
                      <tr className="table-head">
                        <th scope="col">Όνομα</th>
                        <th scope="col">Καθηγητής</th>
                        <th scope="col">Περιγραφή</th>
                        <th scope="col">Κωδικός</th>
                        <th scope="col">Βαρύτητα</th>
                        <th scope="col">Τύπος</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{subjects.name}</td>
                        <td>{subjects.professor}</td>
                        <td>{subjects.description}</td>
                        <td>{subjects.id}</td>
                        <td>{subjects.ects}</td>
                        <td>{subjects.type}</td>
                      </tr>
                    </tbody>
                  </Table>
                ))}
                </Accordion.Body>
              </Accordion.Item>
          </Accordion>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </Container>

  );
};

export default Subjects;