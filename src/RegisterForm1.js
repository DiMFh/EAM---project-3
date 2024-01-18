import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { doc, setDoc,  } from "firebase/firestore";



export default function RegisterForm({ db }) {

    const { Formik } = formik;

  const schema = yup.object().shape({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    username: yup.string().required(),
    city: yup.string().required(),
    password: yup.string().required(),
    zip: yup.string().required(),
    email: yup.string().email().required(),
  });

  
  const saveToDatabase = async (values) => {
    try {
      const ref_user = doc(db, "users", values.email);
      await setDoc(ref_user, values); // Αντικαταστήστε το 'values' με τα πραγματικά δεδομένα που θέλετε να αποθηκεύσετε

      // Προσθήκη courses κ.λπ. ανάλογα με τις ανάγκες σας

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
        saveToDatabase(values);
        actions.setSubmitting(false);
    }}
      initialValues={{
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        username: '',
        city: '',
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
            date: "16/1/2024",
            id: 0,
            period: "2022-2023 Χειμερινό",
            time: "7:53:37 μ.μ."
          }
          // Περαιτέρω δηλώσεις μπορούν να προστεθούν εδώ...
        ]
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <div style={{ marginTop: '20px', marginRight: '30px', marginLeft: '30px' }}> 
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
            <Form.Group as={Col} md="3" controlId="validationFormik06">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationFormik04">
                <Form.Label>Κωδικός</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              </Row>
              <Row className="mb-3">
              <Form.Group as={Col} md="3" controlId="validationFormik01">
                <Form.Label>Όνομα</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="Firstname"
                  value={values.firstName}
                  onChange={handleChange}
                  isValid={touched.firstname && !errors.firstname}
                  isInvalid={!!errors.firstname}
                />
                <Form.Control.Feedback type="invalid">{errors.firstname}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationFormik02">
                <Form.Label>Επίθετο</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="Lastname"
                  value={values.lastname}
                  onChange={handleChange}
                  isValid={touched.lastname && !errors.lastName}
                  isInvalid={!!errors.lastname}
                />

                <Form.Control.Feedback type="invalid">{errors.lastname}</Form.Control.Feedback>
              </Form.Group>
              </Row>
              <Form.Group as={Col} md="4" controlId="validationFormikUsername">
                <Form.Label>Username</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    aria-describedby="inputGroupPrepend"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationFormik03">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  isInvalid={!!errors.city}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationFormik04">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="State"
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                  isInvalid={!!errors.state}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.state}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationFormik05">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Zip"
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
            <Button type="submit">Submit form</Button>
          </Form>
        </div>
        )}
    </Formik>
  );
}
