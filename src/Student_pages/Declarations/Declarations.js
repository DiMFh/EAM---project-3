/* Declarations.js */
import { useState } from "react";
import { useNavigate } from "react-router";
import "./Declarations.css";
import { Breadcrumb, Container, Card, Accordion, Table } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap";

const Declarations = () => {
  const navigate = useNavigate();

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () => {
      navigate("../new-declaration");
    });

    return (
      <button
        type="button"
        className="new-declaration-button"
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="./">Αρχική</Breadcrumb.Item>
        <Breadcrumb.Item active>Δηλώσεις</Breadcrumb.Item>
      </Breadcrumb>
      <div className="main">
        <Container>
          <Accordion>
            <Card>
              <Card.Header>
                <CustomToggle eventKey="0" className="new-declaration-button">
                  Νέα Δήλωση
                </CustomToggle>
              </Card.Header>
            </Card>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Δηλώσεις τρέχουσας περιόδου</Accordion.Header>
              <Accordion.Body>
                <Table className="table table-hover">
                  <tbody>
                    <tr>
                      <td> Δήλωση 1</td>
                    </tr>
                    <tr>
                      <td> Δήλωση 2</td>
                    </tr>
                    <tr>
                      <td> Δήλωση 3</td>
                    </tr>
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Ιστορικό δηλώσεων</Accordion.Header>
              <Accordion.Body>
                <Table className="table table-hover">
                  <tbody>
                    <tr>
                      <td> Δήλωση 1</td>
                    </tr>
                    <tr>
                      <td> Δήλωση 2</td>
                    </tr>
                    <tr>
                      <td> Δήλωση 3</td>
                    </tr>
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </div>
    </>
  );
};

export default Declarations;
