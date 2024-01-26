// Section.js
import React, { useState, useEffect } from 'react';
import {  collection, getDocs, } from 'firebase/firestore';
import {  Container,  Accordion, Table } from "react-bootstrap";

const Subjects = ({db}) => {
  const [subjects, setsubjects] = useState([]);

  useEffect(() => {
    const getsubjects = async () => {
      const subjectsCol = collection(db, "courses");
      const subjectsSnapshot = await getDocs(subjectsCol);
      const subjectsList = subjectsSnapshot.docs.map(doc => {
        const data = doc.data();
        return Object.keys(data).map(key => data[key]);
      }).flat(); // Χρησιμοποιείτε flat για να απλοποιήσετε τον πίνακα
      setsubjects(subjectsList);
      console.log(subjectsList);
    };
    getsubjects();
  }, [db]);

  const getsubjectsBySemester = (semester) => {
    return subjects.filter(subjects => subjects.semester === `${semester}ο`);
  };


  const getSubjectsByType = (type) => {
    return subjects.filter(subject => subject.type === type);
  };

  return (
    <Container >
      <h1>Ενημερωθείτε για τα μαθήματα του Τμήματος Πληροφορικής και Τηλεπικοινωνιών</h1>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Μαθήματα τμήματος ανά εξάμηνο:</Accordion.Header>
          <Accordion.Body>
          <Accordion>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Πρώτο Εξάμηνο</Accordion.Header>
              <Accordion.Body>
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
                    {getsubjectsBySemester("1").map((subject, index) => (
                      <tr key={index}>
                        <td>{subject.name}</td>
                        <td>{subject.professor}</td>
                        <td>{subject.description}</td>
                        <td>{subject.id}</td>
                        <td>{subject.ects}</td>
                        <td>{subject.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Accordion>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Δεύτερο Εξάμηνο</Accordion.Header>
              <Accordion.Body>
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
                    {getsubjectsBySemester("2").map((subject, index) => (
                      <tr key={index}>
                        <td>{subject.name}</td>
                        <td>{subject.professor}</td>
                        <td>{subject.description}</td>
                        <td>{subject.id}</td>
                        <td>{subject.ects}</td>
                        <td>{subject.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Accordion>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Τρίτο Εξάμηνο</Accordion.Header>
              <Accordion.Body>
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
                    {getsubjectsBySemester("3").map((subject, index) => (
                      <tr key={index}>
                        <td>{subject.name}</td>
                        <td>{subject.professor}</td>
                        <td>{subject.description}</td>
                        <td>{subject.id}</td>
                        <td>{subject.ects}</td>
                        <td>{subject.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Accordion>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Τέταρτο Εξάμηνο</Accordion.Header>
                      <Accordion.Body>
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
                            {getsubjectsBySemester("4").map((subject, index) => (
                              <tr key={index}>
                                <td>{subject.name}</td>
                                <td>{subject.professor}</td>
                                <td>{subject.description}</td>
                                <td>{subject.id}</td>
                                <td>{subject.ects}</td>
                                <td>{subject.type}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    <div style={{ marginBottom: '20px' }}>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Ελεύθερα Μαθήματα</Accordion.Header>
          <Accordion.Body>
            
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
                    {getSubjectsByType("ΕΛΕΥΘΕΡΟ(Ε)").map((subject, index) => (
                      <tr key={index}>
                        <td>{subject.name}</td>
                        <td>{subject.professor}</td>
                        <td>{subject.description}</td>
                        <td>{subject.id}</td>
                        <td>{subject.ects}</td>
                        <td>{subject.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
    </Container >

  );
};

export default Subjects;