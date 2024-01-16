import React from "react";
import "./Certificate.css";
import { NavLink ,  Outlet} from "react-router-dom";
import { Breadcrumb, Container, Card, Accordion, Table } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useAccordionButton } from "react-bootstrap";


export default function Certificate({ current }) {
  const navigate = useNavigate();

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
        <Breadcrumb.Item href="/student-page">Αρχική</Breadcrumb.Item>
        <Breadcrumb.Item active>Πιστοποιητικά</Breadcrumb.Item>
      </Breadcrumb>
       <div className="certificate">
       <Container>
          <Accordion>
            <Card>
              <Card.Header>
                <CustomToggle eventKey="0" className="new-certificate-button">
                  Αίτηση Παροχής Πιστοποιητικού
                </CustomToggle>
              </Card.Header>
            </Card>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Ιστορικό Πιστοπιητικών</Accordion.Header>
              <Accordion.Body>
                <Table className="table table-hover">
                  <tbody>
                    <tr>
                      <td> Πιστοποιητικό 1</td>
                    </tr>
                    <tr>
                      <td> Πιτσοποιητικό 2</td>
                    </tr>
                    <tr>
                      <td> Πιστοποιητικό 3</td>
                    </tr>
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>



      </div>
    </>
    // <div className="certificate">
    //   <Breadcrumb>
    //     <Breadcrumb.Item href="/student-page">Αρχική</Breadcrumb.Item>
    //     <Breadcrumb.Item active>Πιστοποιητικά</Breadcrumb.Item>
    //   </Breadcrumb>
      /* <div className="grey-box">
        <div className="white-box">
          <nav>
            <NavLink to="certificate-request" className="certificate-request">
              <h4>Αίτηση Παροχής Πιστοποιητικού</h4>
            </NavLink>
          </nav>
        </div>
        <div className="white-box">
          <NavLink to="certificate-state" className="certificate-state">
            <h4>Κατάσταση Παροχής Πιστοποιητικών</h4>
          </NavLink>
        </div>
        <div className="blue-text">
          <NavLink to="/student-page" className="return">
            <h4>Επιστροφή</h4>
          </NavLink>
        </div>
      </div> */
      /* <Outlet /> */
 
  );
}