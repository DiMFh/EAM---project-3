/* NewDeclaration.js */
import "./Certificaterequest.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Accordion,
  Table,
  Breadcrumb,
  Button,
  Spinner,
} from "react-bootstrap";
import DeclarationsStepper from "./CertificateStepper";
import NewCertificatePreview from "./NewCertificatePreview";
import NewCertificateFinish from "./NewCertificateFinish";

const Certificaterequest = () => {
  const [showPreview, setShowPreview] = useState(false); 
  const [showFinish, setShowFinish] = useState(false); 
  const [activeStep, setActiveStep] = useState(0); 
  const location = useLocation();
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [selectedCertificateId, setSelectedCertificateId] = useState(null);
  // const [navigatedBack, setNavigatedBack] = useState(false);

  const navigate = useNavigate();

  // ***stepper functionality
  const nextStep = () => {
    if (activeStep < 3) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const prevStep = () => {
    if (activeStep > 0) setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // ***loading button functionality (and go to preview)
  const [isLoading, setLoading] = useState(false);
  const goToPreview = () => {
    setShowPreview(true);
    nextStep();
  };
  const handleBack = () => {
    navigate("../certificate");
    // setNavigatedBack(true);
  };
  const goBackToSelection = () => {
    setShowPreview(false);
    prevStep();
  };
  const goToFinish = () => {
    setShowFinish(true);
    nextStep();
  };
  const lastStepCompleted = () => {
    nextStep();
  };

  useEffect(() => {
    // const goToPreview = () => {
    //   setShowPreview(true);
    //   nextStep();
    // };

    function simulateNetworkRequest() {
      return new Promise((resolve) => setTimeout(resolve, 1000));
    }
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
        // go to preview
        goToPreview();
      });
    }
  }, [nextStep,isLoading,setShowPreview,goToPreview]);

  

  const handleCheckboxChange = (index, id) => () => {
    if (selectedCheckbox === index) {
      setSelectedCheckbox(null);
      setSelectedCertificateId(null);
      console.log("Selected certificate ID: null");
      localStorage.removeItem('selectedCheckbox');
      navigate(location.pathname, { state: { selectedCheckbox: null, selectedCertificateId: null }, replace: true });
    } else {
      setSelectedCheckbox(index);
      setSelectedCertificateId(id);
      console.log("Selected certificate ID: " + id);
      localStorage.setItem('selectedCheckbox', index);
      navigate(location.pathname, { state: { selectedCheckbox: index, selectedCertificateId: id }, replace: true });
    }
  };

  const handleClick = () => {
  localStorage.setItem('selectedCertificateId', selectedCertificateId);
  setLoading(true);
};

  

  return (
    <>
     <Breadcrumb>
        <Breadcrumb.Item href="/">Αρχική</Breadcrumb.Item>
        <Breadcrumb.Item href="/certificate/">Πιστοποιητικά</Breadcrumb.Item>
        <Breadcrumb.Item active>Αίτηση Παροχής Πιστοποιητικού</Breadcrumb.Item>
      </Breadcrumb>

      <DeclarationsStepper activeStep={activeStep} />

      {!showPreview ? (
        <div className="newdeclarations">

          <Container style={{ borderRadius: '15px', padding: '20px' }}>
            <Row className="mb-2 justify-content-between" >

            <Col md={2}></Col>

            <Col md={8}>
                <p className="text-center fs-5 fw-bold">Πιστοποιητικά</p>
              </Col>
             
              <Col md={1}>
                <Button
                  variant="outline-dark"
                  className="float-end"
                  onClick={handleBack}
                >
                  Πίσω
                </Button>
              </Col>
              
              <Col md={1}>

                <Button
                  variant="success"
                  className="float-end"
                  disabled={
                    isLoading || selectedCheckbox === null
                    
                  } // if it is loading or there are no selected courses, disable the button
                  onClick={!isLoading ? handleClick : null}
                >
                  {/* if it is loading, return a spinner */}
                  {isLoading && (
                    <Spinner as="span" animation="border" size="sm" />
                  )}
                  {/* if it is not loading, return the text */}
                  {!isLoading && "Επόμενο"}
                </Button>
              </Col>
            </Row>

            {/* Table part */}
            <Accordion defaultActiveKey="none">
              {/* certificate */}
              <Accordion.Item eventKey="0">
              <Accordion.Header>
              <Form.Check
              aria-label="select"
              certificateId={0}
              onClick={(event) => {
                event.stopPropagation(); // Stop event propagation
              }}
              onChange={handleCheckboxChange(0, "student_status")}
              isValid
              disabled={selectedCheckbox !== null && selectedCheckbox !== 0}
              checked={selectedCheckbox === 0}
              className="me-2" // Add margin to the right
            />
            Φοιτητικής Ιδιότητας
          </Accordion.Header>
                <Accordion.Body>
                <p> Το πιστοποιητικό αυτό επιβεβαιώνει την φοίτηση του φοιτητή στην σχολή.</p>
                {/* <p><strong>Περιγραφή:</strong> Το πιστοποιητικό αυτό επιβεβαιώνει την φοίτηση του φοιτητή στην σχολή.</p> */}
                    <Accordion > 
                            <Table className="table table-hover">
                                <tbody>
                                     
                                      
                                      {/* <td style={{display: "flex", justifyContent: "center", alignItems: "center"}}> */}
                                           {/* <strong style={{marginRight: "10px"}}>Επιλογή:</strong> */}
                                       
                                        
                                      {/* </td> */}
                                </tbody>
                              </Table>
                          
                        
                      
                    </Accordion>
                  
                </Accordion.Body>
              </Accordion.Item>
               {/* certificate */}
        

              {/* certificate */}
              <Accordion.Item eventKey="1">
                <Accordion.Header><Form.Check
  aria-label="select"
  onChange={handleCheckboxChange(1, "tax_use")}
  onClick={(event) => {
    event.stopPropagation();
  }}
  isValid
  disabled={selectedCheckbox !== null && selectedCheckbox !== 1}
  checked={selectedCheckbox === 1}
  className="me-2"
/>Φορολογικής χρήσης</Accordion.Header>
                <Accordion.Body>
                <Accordion > 
                  <p> To πιστοποιητικό αυτό λειτουργεί ως βεβαίωση για φορολογική χρήση.</p>
                            <Table className="table table-hover">
                                <tbody>
                               
                                </tbody>
                              </Table>
                          
                        
                      
                    </Accordion>
                </Accordion.Body>
              </Accordion.Item>
              {/* certificate */}

              {/* certificate */}
              <Accordion.Item eventKey="2">
                <Accordion.Header><Form.Check
  aria-label="select"
  onChange={handleCheckboxChange(2, "detailed_grades")}
  onClick={(event) => {
    event.stopPropagation();
  }}
  isValid
  disabled={selectedCheckbox !== null && selectedCheckbox !== 2}
  checked={selectedCheckbox === 2}
  className="me-2"
/>Αναλυτικής Βαθμολογίας</Accordion.Header>
                <Accordion.Body> <Accordion > 
                <p> Το πιστοποιητικό αυτό διαθέτει τους βαθμούς όλων των περασμένων μαθημάτων του φοιτητή. </p>
                            <Table className="table table-hover">
                                <tbody>
                                
                                </tbody>
                              </Table>
                    </Accordion></Accordion.Body>
                </Accordion.Item>
              {/* certificate */}

                {/* certificate */}
                <Accordion.Item eventKey="3">
                <Accordion.Header><Form.Check
  aria-label="select"
  onChange={handleCheckboxChange(3, "military_use_brief")}
  onClick={(event) => {
    event.stopPropagation();
  }}
  isValid
  disabled={selectedCheckbox !== null && selectedCheckbox !== 3}
  checked={selectedCheckbox === 3}
  className="me-2"
/>Στρατολογικής Χρήσης (Συνοπτικό)</Accordion.Header>
                <Accordion.Body><Accordion >
                <p> Το πιστοποιητικό αυτό διατίθεται ως βεβαίωση φοίτησης για στρατολογική χρήση (συνοπτικό).</p> 
                            <Table className="table table-hover">
                                <tbody>
                                
                                </tbody>
                              </Table>
                          
                        
                      
                    </Accordion></Accordion.Body>
                </Accordion.Item>
                {/* certificate */}

                {/* certificate */}
                <Accordion.Item eventKey="4">
                <Accordion.Header><Form.Check
  aria-label="select"
  onChange={handleCheckboxChange(4, "military_use_detailed")}
  onClick={(event) => {
    event.stopPropagation();
  }}
  isValid
  disabled={selectedCheckbox !== null && selectedCheckbox !== 4}
  checked={selectedCheckbox === 4}
  className="me-2"
/>Στρατολογικής Χρήσης (Αναλυτικό)</Accordion.Header>
                <Accordion.Body><Accordion > 
                <p> Το πιστοποιητικό αυτό διατίθεται ως βεβαίωση φοίτησης για στρατολογική χρήση (αναλυτικό).</p>
                            <Table className="table table-hover">
                                <tbody>
                                
                                </tbody>
                              </Table>
                          
                        
                      
                    </Accordion></Accordion.Body>
                </Accordion.Item>
                {/* certificate */}

            </Accordion>



          </Container>
        </div>
      ) : !showFinish ? (
        <NewCertificatePreview
          selectedCourses={selectedCertificateId}
          goBackToSelection={goBackToSelection}
          goToFinish={goToFinish}
        />
      ) : (
        <NewCertificateFinish
          lastStepCompleted={lastStepCompleted}
          selectedCourses={selectedCertificateId}
        />
      )}
    </>
  );
};

export default Certificaterequest;
