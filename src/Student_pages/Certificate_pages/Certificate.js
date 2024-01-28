import "./Certificate.css";
import { Breadcrumb, Container, Card, Accordion, Table } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useAccordionButton } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../data/firebase";
import print from "../../images/print.png";
import download from "../../images/download.png";
import preview from "../../images/preview.png";

export default function Certificate({ current }) {
  const navigate = useNavigate();

  const [savedCertificates, setSavedCertificates] = useState([]);

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      const userDoc = doc(db, "users", userEmail);
      getDoc(userDoc).then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setSavedCertificates(userData.certificates || []);
        } else {
          console.log("No user data found in Firestore");
        }
      });
    }
  }, []);

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () => {
      navigate("../certificate-request");
    });

    return (
      <button
        type="button"
        className="new-certificate-button"
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Αρχική</Breadcrumb.Item>
        <Breadcrumb.Item active>Πιστοποιητικά</Breadcrumb.Item>
      </Breadcrumb>
      <div className="certificate">
        <Container style={{ borderRadius: "15px", padding: "20px" }}>
          <Accordion>
            <Card>
              <Card.Header>
                <CustomToggle eventKey="0" className="new-certificate-button">
                  Αίτηση Παροχής Πιστοποιητικού
                </CustomToggle>
              </Card.Header>
            </Card>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Ιστορικό Πιστοποιητικών</Accordion.Header>
              <Accordion.Body>
                <Table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Πιστοποιητικά</th>
                      <th>Ημερομηνία Έκδοσης</th>
                      <th>Ώρα Έκδοσης</th>
                      <th>Ενέργειες</th>
                    </tr>
                  </thead>
                  <tbody>
                    {savedCertificates.map((certificate, index) => (
                      <tr key={index}>
                        <td>{certificate.name}</td>
                        <td>{certificate.date}</td>
                        <td>{certificate.time}</td>
                        <td>
                          <img
                            src={preview}
                            alt="Preview"
                            style={{ cursor: "pointer", marginRight: "10px" }}
                          />
                          <img
                            src={download}
                            alt="Download"
                            style={{ cursor: "pointer", marginRight: "10px" }}
                          />
                          <img
                            src={print}
                            alt="Print"
                            style={{ cursor: "pointer" }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </div>
    </>
  );
}
