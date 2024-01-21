//import React, { useState } from 'react';
//npm install yup 
//npm install formik
//npm install date-fns
//gia na doulepsei kante auta ta 3np installs

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { doc, setDoc,  } from "firebase/firestore";
import { differenceInYears } from 'date-fns';



export default function RegisterForm({ db }) {

  const { Formik } = formik;
  const phoneRegExp = /^\d{10}$/;

  const schema = yup.object().shape({
    firstname: yup.string()
      .required('Το όνομα είναι υποχρεωτικό'),

    lastname: yup.string()
      .required('Το επώνυμο είναι υποχρεωτικό'),

    email: yup.string()
      .email('Πρέπει να είναι έγκυρη διεύθυνση email')
      .required('Το email είναι υποχρεωτικό'),
    password: yup.string()
      .required('Απαιτείται κωδικός πρόσβασης')
      .min(3, 'Ο κωδικός πρόσβασης πρέπει να έχει τουλάχιστον 3 χαρακτήρες'),
    confirmPassword: yup.string()
      .required('Απαιτείται επιβεβαίωση κωδικού πρόσβασης')
      .oneOf([yup.ref('password'), null], 'Οι κωδικοί πρόσβασης πρέπει να ταιριάζουν'),
    birthdate: yup.date()
      .required('Απαιτείται η ημερομηνία γέννησης')
      .test(
        'age-check',
        'Πρέπει να είστε άνω των 17 ετών',
          value => differenceInYears(new Date(), new Date(value)) >= 17
    ),
    role: yup.string()
      .required('Η επιλογή ρόλου είναι υποχρεωτική')
      .oneOf(['professor', 'student'], 'Επιλέξτε έγκυρο ρόλο: Καθηγητής ή Φοιτητής'),
    Codephone: yup.string(),
    phone: yup.string()
      .matches(phoneRegExp, 'Μη έγκυρος Ελληνικός αριθμός τηλεφώνου'),
    address: yup.string(),
    city: yup.string(),
    zip: yup.string(),
    courses: yup.array().of(
      yup.object().shape({
        id: yup.string(),
        grade: yup.string(),
      })
    ),
    declarations: yup.array().of(
      yup.object().shape({
        courses: yup.array().of(
          yup.object().shape({
            description: yup.string(),
            ects: yup.string(),
            id: yup.string(),
            name: yup.string(),
            professor: yup.string(),
            semester: yup.string(),
            type: yup.string(),
          })
        ),
        date: yup.string(),
        id: yup.number(),
        period: yup.string(),
        time: yup.string(),
      })
    ),
  
    certificates: yup.array().of(
      yup.object().shape({
        dateRequest: yup.date().nullable().default(null),
        name: yup.string(),
      })
    ),
    // }).test('test-name', 'test message', values => {
    //   console.log('Validation values:', values);
    
  });

  
  const saveToDatabase = async (values) => {
    console.log("Values to save:", values); // Εκτύπωση των τιμών που θα αποθηκευτούν
    try {
      const ref_user = doc(db, "users", values.email);
      console.log("Reference to user document:", ref_user); // Εκτύπωση της αναφοράς στο έγγραφο του χρήστη
      await setDoc(ref_user, values); 

      console.log("Data saved successfully"); // Εκτύπωση μηνύματος επιτυχίας

      window.location.href = '/login';
      alert("Document written to Database");
    } catch (error) {
      console.error('Error saving data', error);
    }
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values, actions) => {
        console.log("Form submitted"); // Προσθήκη αυτής της γραμμής
        console.log("Submitting values:", values);
        saveToDatabase(values);
        actions.setSubmitting(false);
      }}
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
        firstname: '',
        lastname: '',
        birthdate: '',
        role: '',
        phone: '',
        Codephone: '',
        city: '',
        address: '',
        zip: '',
        courses: [{ id: 'ΥΣ08', grade: '10'}, { id: 'Κ16', grade: '10'}],
        declarations: [
          {
            courses: [
              {
                description: "Το καλύτερο μάθημα του κόσμου...",
                ects: "6",
                id: "ΥΣ08",
                name: "Επικοιωνία Ανθρώπου Μηχανής",
                professor: "Μαρία Ρούσσου",
                semester: "1ο",
                type: "Υποχρεωτικό (ΥΜ)"
              },
              {
                description: "Να πάρετε το μεταπτυχιακό του τμήματος να μάθετε περισσότερα",
                ects: "6",
                id: "ΥΣ09",
                name: "Διαδραστικά Συστήματα",
                professor: "Μαρία Ρούσσου",
                semester: "1ο",
                type: "Υποχρεωτικό (ΥΜ)"
              },
              {
                description: "Εισαγωγή στις έννοιες του Προγραματισμού και την γλώσσα C",
                ects: "7",
                id: "Κ08",
                name: "Εισαγωγή στον Προγραμματισμό",
                professor: "Γεώργιος Σταματόπουλος",
                semester: "1ο",
                type: "Υποχρεωτικό (ΥΜ)"
              }
            ],
            date: "5/1/2023",
            id: 0,
            period: "2022-2023 Χειμερινό",
            time: "7:53:37 μ.μ."
          }
        ],
      ceritificates: [{dateRequest: '2024-01-19T11:23:26.263Z',name:'Αναλυτικής βαθμολογίας' }],
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <div style={{ marginTop: '20px', marginRight: '30px', marginLeft: '30px' }}> 
          <h1>Συμπληρώστε την Αίτηση Εγγραφής</h1>
          <div style={{
              display: 'flex', // Ενεργοποίηση flexbox
              justifyContent: 'center', // Κεντράρισμα στον οριζόντιο άξονα
              alignItems: 'center', // Κεντράρισμα στον κάθετο άξονα, αν χρειάζεται
              marginTop: '20px',
              marginRight: '30px',
              marginLeft: '100px'
            }}>       
           <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
            <Form.Group as={Col} md="3" controlId="validationFormik01">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="mail@mail.com"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationFormik02">
                <Form.Label>Κωδικός</Form.Label>
                <Form.Control
                  type="password"
                  // placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationFormik03">
                <Form.Label>Επιβεβαίωση Κωδ.</Form.Label>
                <Form.Control
                  type="password"
                  //placeholder="Confirm Password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              </Row>
              <Row className="mb-3">
              <Form.Group as={Col} md="3" controlId="validationFormik04">
                <Form.Label>Όνομα</Form.Label>
                <Form.Control
                  type="text"
                  name="firstname"
                  // placeholder="Firstname"
                  value={values.firstname}
                  onChange={handleChange}
                  isValid={touched.firstname && !errors.firstname}
                  isInvalid={!!errors.firstname}
                />
                <Form.Control.Feedback type="invalid">{errors.firstname}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationFormik05">
                <Form.Label>Επίθετο</Form.Label>
                <Form.Control
                  type="text"
                  name="lastname"
                  // placeholder="Lastname"
                  value={values.lastname}
                  onChange={handleChange}
                  isValid={touched.lastname && !errors.lastname}
                  isInvalid={!!errors.lastname}
                />
                <Form.Control.Feedback type="invalid">{errors.lastname}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationFormik06">
                <Form.Label>Ημερομηνία Γέννησης</Form.Label>
                <Form.Control
                  type="date"
                  name="birthdate"
                  placeholder="Birthdate"
                  value={values.birthdate}
                  onChange={handleChange}
                  isValid={touched.birthdate && !errors.birthdate}
                  isInvalid={!!errors.birthdate}
                />
                <Form.Control.Feedback type="invalid">{errors.birthdate}</Form.Control.Feedback>
              </Form.Group>
              </Row>
              <Row className="mb-3">
                  <Form.Group as={Col} md="5" controlId="validationFormik07">
                    <Form.Label>Ρόλος</Form.Label>
                    <Form.Control
                      as="select"
                      name="role"
                      value={values.role}
                      onChange={handleChange}
                      isValid={touched.role && !errors.role}
                      isInvalid={!!errors.role}
                    >
                      <option value="">Επιλέξτε...</option>
                      <option value="professor">Καθηγητής</option>
                      <option value="student">Φοιτητής</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.role}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="7" controlId="validationFormik08">
                    <Form.Label>Αριθμός Τηλεφώνου</Form.Label>
                      <Row>
                        <Col md="5">
                          <Form.Control
                            as="select"
                            name="Codephone"
                            onChange={handleChange}
                            value={values.Codephone}
                          >
                            <option value="">Επιλέξτε...</option>
                            <option value="+30">Ελλάδα(+30)</option>
                            <option value="+1">ΗΠΑ (+1)</option>
                            {/* Προσθέστε εδώ άλλους κωδικούς χώρας */}
                          </Form.Control>
                        </Col>
                        <Col md="7">
                          <Form.Control
                            type="text"
                            name="phone"
                            placeholder="Τηλέφωνο"
                            value={values.phone}
                            onChange={handleChange}
                            // isValid={touched.phone && !errors.phone}
                            isInvalid={!!errors.phone}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.phone}
                          </Form.Control.Feedback>
                        </Col>
                      </Row>
                    </Form.Group>


                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="4" controlId="validationFormik07">
                    <Form.Label>Πόλη</Form.Label>
                    <Form.Control
                      type="text"
                      // placeholder="City"
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                      isInvalid={!!errors.city}
                    />

                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationFormik08">
                <Form.Label>Διεύθυνση</Form.Label>
                <Form.Control
                  type="text"
                  // placeholder="State"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  isInvalid={!!errors.address}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationFormik09">
                <Form.Label>Ταχυδρομικός Κώδικας</Form.Label>
                <Form.Control
                  type="text"
                  // placeholder="Zip"
                  name="zip"
                  value={values.zip}
                  onChange={handleChange}
                  isInvalid={!!errors.zip}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.zip}
                </Form.Control.Feedback>
              </Form.Group>
              
            </Row>
            <Row className="mb-3">

            </Row>
            <Button type="submit">Υποβολή Εγγραφής</Button>
          </Form>
          </div>
        </div>
        )}
    </Formik>
  );
}