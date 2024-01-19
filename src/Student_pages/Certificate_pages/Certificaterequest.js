// import React, { useState, useEffect } from 'react';
// import { Outlet } from "react-router-dom";
// import "./Certificaterequest.css"
// import { Link } from "react-router-dom";
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import CustomProgressBar from './Progressbar';
// import Button from 'react-bootstrap/Button';
// import MyModal from './Popup'
// import Breadcrumb from 'react-bootstrap/Breadcrumb';

// export default function Certificaterequest()  {
//   const [showModal1, setShowModal1] = useState(false);
//   const [showModal2, setShowModal2] = useState(false);
//   const [showModal3, setShowModal3] = useState(false);
//   const [showModal4, setShowModal4] = useState(false);
//   const [showModal5, setShowModal5] = useState(false);

//   const handleCloseModal1 = () => setShowModal1(false);
//   const handleShowModal1 = () => setShowModal1(true);

//   const handleCloseModal2 = () => setShowModal2(false);
//   const handleShowModal2 = () => setShowModal2(true);

//   const handleCloseModal3 = () => setShowModal3(false);
//   const handleShowModal3 = () => setShowModal3(true);

//   const handleCloseModal4 = () => setShowModal4(false);
//   const handleShowModal4 = () => setShowModal4(true);

//   const handleCloseModal5 = () => setShowModal5(false);
//   const handleShowModal5 = () => setShowModal5(true);
//   useEffect(() => {
//     const dropdownButton = document.getElementById('dropdownMenuButton');

//     if (dropdownButton) {
//       const handleDropdownClick = () => {
//         const dropdownMenu = dropdownButton.nextElementSibling;
//         dropdownMenu.classList.toggle('show');
//       };

//       dropdownButton.addEventListener('click', handleDropdownClick);

//       // Cleanup event listener on component unmount
//       return () => {
//         dropdownButton.removeEventListener('click', handleDropdownClick);
//       };
//     }
//   }, []); 


  
//   return (
//     <div className="certificate-request">

//       <Breadcrumb>
//         <Breadcrumb.Item href="/student-page">Αρχική</Breadcrumb.Item>
//         <Breadcrumb.Item href="/student-page/certificate/">Πιστοποιητικά</Breadcrumb.Item>
//         <Breadcrumb.Item active>Αίτηση Παροχής Πιστοποιητικού</Breadcrumb.Item>
//       </Breadcrumb>

//       <CustomProgressBar animated now={80} />


//        <div className="box"> {/*ειναι όλο το γκρι με τα στοιχεία μέσα και το css του ειναι για να μετακινείτια πιο δεξιά αριστερά κλπ*/ }
//       <div className="rectangle" />
//       <div className="group-wrapper">
//               <div class="rectangle2">
//               {/* <button class="dropdown-btn"><Dropdown/></button>
//                 <div class="dropdown-content">
//                   <a href="#">Option 1</a>
//                   <a href="#">Option 2</a>
//                   <a href="#">Option 3</a>
//                 </div> */}
//                 <div className="overlap-group-4">
//                   <div className="text-wrapper-12">Φοιτητικής ιδιότητας</div>
//                   {/* <img className="vector-2" alt="Vector" src="vector-5-2.svg" /> */}
//                 </div>
//                 <div class="dropdown-center">
//                  <button class="btn btn-secondary dropdown-toggle color-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//                    Επιλογή 
//                  </button>
//                  <ul class="dropdown-menu">
                  
//                  <div class="info-container">
//                   <h6>Πληροφορίες :</h6>
//                   <div class="the_text ">
//                     <p>
//                       Το πιστοποιητικό αυτό επιβεβαιώνει την φοιτητική ιδιότητα ενός φοιτητή και αποδεικνύει ότι ο φοιτητής είναι εγγεγραμμένος στο τμήμα.
//                     </p>
//                   </div>
//                 </div>
//                   <div class="blue-box">
//                    <li>
//                    <Button variant="primary" onClick={handleShowModal1}>
//                     Επιλογή
//                     </Button>
//                     {/* <a class="dropdown-item" href="#">Επιλογή</a> */}
//                     </li>
//                    </div>
//                    <MyModal showModal={showModal1} handleCloseModal={handleCloseModal1} />
//                  </ul>
//               </div>

//               </div>

//               <div class="rectangle3">
//                 <div className="overlap-group-4">
//                   <div className="text-wrapper-12">Φορολογικής χρήσης</div>
//                 </div>
//                 <div class="dropdown-center">
//                  <button class="btn btn-secondary dropdown-toggle color-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//                    Επιλογή
//                  </button>
//                  <ul class="dropdown-menu">
                  
//                  <div class="info-container">
//                   <h6>Πληροφορίες :</h6>
//                   <div class="the_text ">
//                     <p>
//                       Το πιστοποιητικό αυτό επιβεβαιώνει την φοιτητική ιδιότητα ενός φοιτητή και αποδεικνύει ότι ο φοιτητής είναι εγγεγραμμένος στο τμήμα.
//                     </p>
//                   </div>
//                 </div>
//                   <div class="blue-box">
//                    <li>
//                    <Button variant="primary" onClick={handleShowModal2}>
//                     Επιλογή
//                     </Button>
//                     {/* <a class="dropdown-item" href="#">Επιλογή</a> */}
//                     </li>
//                    </div>
//                    <MyModal showModal={showModal2} handleCloseModal={handleCloseModal2} />
//                  </ul>
//               </div>
//               </div>

//               <div class="rectangle4">
//                 <div className="overlap-group-4">
//                   <div className="text-wrapper-12">Αναλυτικής Βαθμολογίας</div>
//                 </div>
//                 <div class="dropdown-center">
//                  <button class="btn btn-secondary dropdown-toggle color-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//                    Επιλογή
//                  </button>
//                  <ul class="dropdown-menu">
                  
//                  <div class="info-container">
//                   <h6>Πληροφορίες :</h6>
//                   <div class="the_text ">
//                     <p>
//                       Το πιστοποιητικό αυτό επιβεβαιώνει την φοιτητική ιδιότητα ενός φοιτητή και αποδεικνύει ότι ο φοιτητής είναι εγγεγραμμένος στο τμήμα.
//                     </p>
//                   </div>
//                 </div>
//                   <div class="blue-box">
//                    <li>
//                    <Button variant="primary" onClick={handleShowModal3}>
//                     Επιλογή
//                     </Button>
//                     {/* <a class="dropdown-item" href="#">Επιλογή</a> */}
//                     </li>
//                    </div>
//                    <MyModal showModal={showModal3} handleCloseModal={handleCloseModal3} />
//                  </ul>
//               </div>
//               </div>


//               <div class="rectangle5">
//                 <div className="overlap-group-4">
//                   <div className="text-wrapper-12">Στρατολογικής Χρήσης(Συν.)</div>
//                 </div>
//                 <div class="dropdown-center">
//                  <button class="btn btn-secondary dropdown-toggle color-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//                    Επιλογή 
//                  </button>
//                  <ul class="dropdown-menu">
                  
//                  <div class="info-container">
//                   <h6>Πληροφορίες :</h6>
//                   <div class="the_text ">
//                     <p>
//                       Το πιστοποιητικό αυτό επιβεβαιώνει την φοιτητική ιδιότητα ενός φοιτητή και αποδεικνύει ότι ο φοιτητής είναι εγγεγραμμένος στο τμήμα.
//                     </p>
//                   </div>
//                 </div>
//                   <div class="blue-box">
//                    <li>
//                    <Button variant="primary" onClick={handleShowModal4}>
//                     Επιλογή
//                     </Button>
//                     {/* <a class="dropdown-item" href="#">Επιλογή</a> */}
//                     </li>
//                    </div>
//                    <MyModal showModal={showModal4} handleCloseModal={handleCloseModal4} />
//                  </ul>
//               </div>
//               </div>

//               <div class="rectangle6">
//                 <div className="overlap-group-4">
//                   <div className="text-wrapper-12">Στρατολογικής Χρήσης(Αναλ.)</div>
//                 </div>
//                 <div class="dropdown-center">
//                  <button class="btn btn-secondary dropdown-toggle color-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//                    Επιλογή
//                  </button>
//                  <ul class="dropdown-menu">
                  
//                  <div class="info-container">
//                   <h6>Πληροφορίες :</h6>
//                   <div class="the_text ">
//                     <p>
//                       Το πιστοποιητικό αυτό επιβεβαιώνει την φοιτητική ιδιότητα ενός φοιτητή και αποδεικνύει ότι ο φοιτητής είναι εγγεγραμμένος στο τμήμα.
//                     </p>
//                   </div>
//                 </div>
//                   <div class="blue-box">
//                    <li>
//                    <Button variant="primary" onClick={handleShowModal5}>
//                     Επιλογή
//                     </Button>
//                     {/* <a class="dropdown-item" href="#">Επιλογή</a> */}
//                     </li>
//                    </div>
//                    <MyModal showModal={showModal5} handleCloseModal={handleCloseModal5} />
//                  </ul>
//               </div>
//               </div>
                
              

//        </div>

//        <Link to="/certificate" className="certificate">
//           <div class="small-box">
//             <span className="cancel"> Ακύρωση </span>
//           </div>
//          </Link>
         
//        {/* <div className="cancel">Ακύρωση</div> */}
//        { /* <div class="progress-bar">
//             <div class="step">
//               <span class="circle active">1</span>
//               <span class="labelp">Βήμα 1</span>
//             </div>
//             <div class="step">
//               <span class="circle active">2</span>
//               <span class="labelp">Βήμα 2</span>
//             </div>
//             <div class="step">
//               <span class="circle">3</span>
//               <span class="labelπ">Βήμα 3</span>
//             </div>
//           </div> */ }
//           {/* <Progressbar/> */}

//       </div> 
      
      
//       <Outlet/>

//     </div>
//   );
    

// };

/* NewDeclaration.js */
import "./Certificaterequest.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../data/firebase";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Accordion,
  Table,
  Breadcrumb,
  Button,
  Spinner,
  Alert,
  Fade,
} from "react-bootstrap";
import DeclarationsStepper from "./CertificateStepper";
import NewCertificatePreview from "./NewCertificatePreview";
import NewCertificateFinish from "./NewCertificateFinish";

const Certificaterequest = () => {
  //////////////arxikopoioyme to selectedcourses me [] kai to setselectedcourses mporei na to allazei//////////////////////////////
  const [selectedCourses, setselectedCourses] = useState([]); // To update the selected courses 
  //////////////////////////////////////////////////
  const [showPreview, setShowPreview] = useState(false); // To render the preview component
  const [showFinish, setShowFinish] = useState(false); // To render the last compoment
  const [activeStep, setActiveStep] = useState(0); // For the stepper
  const maxSelectedCourses = 7; // The maximum number of courses that can be selected
  const [certificate, setCertificate] = useState(0);
  const location = useLocation();
  
  
  const navigate = useNavigate();

  // ***stepper functionality
  const nextStep = () => {
    if (activeStep < 3) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const prevStep = () => {
    if (activeStep > 0) setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  //  ***clear the selected courses from the local storage when the component is mounted for the first time
  useEffect(() => {
    localStorage.removeItem("selectedCourses");
  }, []);

  // ****get the courses from the database
  const [coursesDB, setCoursesDB] = useState([]);
  useEffect(() => {
    async function getCourses() {
      try {
        const allCoursesDocRef = doc(db, "courses", "all_courses");
        const allCoursesDoc = await getDoc(allCoursesDocRef);

        if (allCoursesDoc.exists()) {
          // The 'all_courses' document contains all the courses
          const coursesData = allCoursesDoc.data();
          setCoursesDB(coursesData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting the course: ", error);
      }
    }
    getCourses();
  }, []);

  // ****group courses by semester after they are fetched from the database
 

  // ****handle the course selection
  function handleCourseSelection(course) {
    setselectedCourses((prevCourses) => {
      // Check if the course is already selected
      if (prevCourses.includes(course)) {
        // Remove it from the selected
        return prevCourses.filter(
          (selectedCourse) => selectedCourse.id !== course.id
        );
      } else {
        // Add it to the selected
        return [...prevCourses, course];
      }
    });
  }

  
  // ***loading button functionality (and go to preview)
  const [isLoading, setLoading] = useState(false);
  const goToPreview = () => {
    setShowPreview(true);
    nextStep();
  };
  const handleBack = () => {
    navigate("../certificate");
    setNavigatedBack(true);
  };
  const goBackToSelection = () => {
    const storedCourses = JSON.parse(localStorage.getItem("selectedCourses"));
    if (storedCourses) {
      setselectedCourses(storedCourses);
    }
    setShowPreview(false);
    prevStep();
  };
  const goToFinish = () => {
    setShowFinish(true);
    nextStep();
  };
  const lastStepCompleted = () => {
    // called by the last component, to complete the stepper
    nextStep();
  };

  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise((resolve) => setTimeout(resolve, 1000));
    }
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
        // go to preview
        console.log("The selected courses are: ", selectedCourses);
        goToPreview();
      });
    }
  }, [isLoading]);

  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [selectedCertificateId, setSelectedCertificateId] = useState(null);
  const [navigatedBack, setNavigatedBack] = useState(false);

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

  ////////////////////////////////////////////////////////////////////////////////
  const handleClick = () => {
  localStorage.setItem('selectedCertificateId', selectedCertificateId);
  setLoading(true);
};

  // 1. `localStorage.setItem("selectedCourses", JSON.stringify(selectedCourses));`: This line stores the `selectedCourses` array in the local storage of the browser. 
  // Local storage allows you to store data across browser sessions. The `setItem` method is used to store the data, and it takes two arguments: the key to store under (`"selectedCourses"`), and the value to store.
  //  Since local storage can only store strings, `JSON.stringify(selectedCourses)` is used to convert the `selectedCourses` array into a JSON string.

  // 2. `setLoading(true);`: This line is calling a function `setLoading` with the argument `true`. This is likely a state update function from the `useState` hook in React, and it's used to indicate that some kind of loading process has started. 
  // The exact effect of this line depends on how the `loading` state is used elsewhere in the component.
  /////////////////////////////////////////////////////////////////////////////////


  return (
    <>
     {/* breadcrumb */}
     <Breadcrumb>
        <Breadcrumb.Item href="/student-page">Αρχική</Breadcrumb.Item>
        <Breadcrumb.Item href="/student-page/certificate/">Πιστοποιητικά</Breadcrumb.Item>
        <Breadcrumb.Item active>Αίτηση Παροχής Πιστοποιητικού</Breadcrumb.Item>
      </Breadcrumb>
      {/* breadcrumb end */}

      {/* steper */}
      <DeclarationsStepper activeStep={activeStep} />
      {/* steper end  */}

      {!showPreview ? (
        <div className="newdeclarations">

          <Container>
            {/* Search-Επιστροφή-Επόμενο */}
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
                {/*If the selectedCourses is empty, make the button disabled */}

                <Button
                  variant="success"
                  className="float-end"
                  disabled={
                    isLoading || selectedCheckbox === null
                    // certificate !== 1
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
              
             
               {/* caution */}
              {/* Προειδοποίηση αν ξεπεράσει το όριο */}
              <Fade in={selectedCourses.length > 7}>
                <Alert show={selectedCourses.length > 7} variant="danger">
                  <Alert.Heading>
                    Έχετε επιλέξει {selectedCourses.length} μαθήματα, ενώ το
                    όριο του τρέχοντος εξαμήνου σας είναι {maxSelectedCourses}.
                  </Alert.Heading>
                  <p>
                    Επιλέξτε μέχρι και {maxSelectedCourses} μαθήματα για να
                    συνεχίσετε.
                  </p>
                </Alert>
              </Fade>
              {/* caution */}



              {/* certificate */}
              <Accordion.Item eventKey="0">
                <Accordion.Header>Φοιτητικής Ιδιότητας</Accordion.Header>
                <Accordion.Body>
                <p>Ενα δυο τρια τεσσερα</p>
                    <Accordion > 
                            <Table className="table table-hover">
                                <tbody>
                                      <td>
                                        <Form.Check
                                          aria-label="select"
                                          // set the checkbox to checked if the course is already selected (for when the user goes back to the selection)
                                          
                                          // onChange={() =>
                                          //   handleCourseSelection(course)
                                          // }
                                          certificateId = {0}
                                          onChange={handleCheckboxChange(0, "student_status")}
                                          isValid
                                          disabled={selectedCheckbox !== null && selectedCheckbox !== 0}
                                          checked={selectedCheckbox === 0}
                                        />
                                      </td>
                                </tbody>
                              </Table>
                          
                        
                      
                    </Accordion>
                  
                </Accordion.Body>
              </Accordion.Item>
               {/* certificate */}
        

              {/* certificate */}
              <Accordion.Item eventKey="1">
                <Accordion.Header>Φορολογικής χρήσης</Accordion.Header>
                <Accordion.Body>
                <Accordion > 
                  <p>Ενα δυο τρια τεσσερα</p>
                            <Table className="table table-hover">
                                <tbody>
                                      <td>
                                        <Form.Check
                                          aria-label="select"
                                          // set the checkbox to checked if the course is already selected (for when the user goes back to the selection)
                                          
                                          // onChange={() =>
                                          //   handleCourseSelection(course)
                                          // }
                                          onChange={handleCheckboxChange(1, "tax_use")}
                                          
                                          isValid
                                          disabled={selectedCheckbox !== null && selectedCheckbox !== 1}
                                          checked={selectedCheckbox === 1}
                                        />
                                      </td>
                                </tbody>
                              </Table>
                          
                        
                      
                    </Accordion>
                </Accordion.Body>
              </Accordion.Item>
              {/* certificate */}

              {/* certificate */}
              <Accordion.Item eventKey="2">
                <Accordion.Header>Αναλυτικής Βαθμολογίας</Accordion.Header>
                <Accordion.Body> <Accordion > 
                <p>Ενα δυο τρια τεσσερα</p>
                            <Table className="table table-hover">
                                <tbody>
                                      <td>
                                        <Form.Check
                                          aria-label="select"
                                          // set the checkbox to checked if the course is already selected (for when the user goes back to the selection)
                                          
                                          // onChange={() =>
                                          //   handleCourseSelection(course)
                                          // }
                                          onChange={handleCheckboxChange(2, "detailed_grades")}
                                          isValid
                                          disabled={selectedCheckbox !== null && selectedCheckbox !== 2}
                                          checked={selectedCheckbox === 2}
                                        />
                                      </td>
                                </tbody>
                              </Table>
                          
                        
                      
                    </Accordion></Accordion.Body>
                </Accordion.Item>
              {/* certificate */}

                {/* certificate */}
                <Accordion.Item eventKey="3">
                <Accordion.Header>Στρατολογικής Χρήσης (Συνοπτικό)</Accordion.Header>
                <Accordion.Body><Accordion >
                <p>Ενα δυο τρια τεσσερα</p> 
                            <Table className="table table-hover">
                                <tbody>
                                      <td>
                                        <Form.Check
                                          aria-label="select"
                                          // set the checkbox to checked if the course is already selected (for when the user goes back to the selection)
                                          
                                          // onChange={() =>
                                          //   handleCourseSelection(course)
                                          // }
                                          onChange={handleCheckboxChange(3, "military_use_brief")}
                                          isValid
                                          disabled={selectedCheckbox !== null && selectedCheckbox !== 3}
                                          checked={selectedCheckbox === 3}
                                        />
                                      </td>
                                </tbody>
                              </Table>
                          
                        
                      
                    </Accordion></Accordion.Body>
                </Accordion.Item>
                {/* certificate */}

                {/* certificate */}
                <Accordion.Item eventKey="4">
                <Accordion.Header>Στρατολογικής Χρήσης (Αναλυτικό)</Accordion.Header>
                <Accordion.Body><Accordion > 
                <p>Ενα δυο τρια τεσσερα</p>
                            <Table className="table table-hover">
                                <tbody>
                                      <td>
                                        <Form.Check
                                          aria-label="select"
                                          // set the checkbox to checked if the course is already selected (for when the user goes back to the selection)
                                          
                                          // onChange={() =>
                                          //   handleCourseSelection(course)
                                          // }
                                          onChange={handleCheckboxChange(4, "military_use_detailed")}
                                          isValid
                                          disabled={selectedCheckbox !== null && selectedCheckbox !== 4}
                                          checked={selectedCheckbox === 4}
                                        />
                                      </td>
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
          maxCourses={maxSelectedCourses}
        />
      ) : (
        <NewCertificateFinish
          selectedCourses={selectedCertificateId}
        />
      )}
    </>
  );
};

export default Certificaterequest;
