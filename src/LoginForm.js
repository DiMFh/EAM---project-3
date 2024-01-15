import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from 'firebase/firestore';
import { useUserRole } from './UserRoleContext';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

import './LoginForm.css';

const LoginForm = ({ db }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailStyle, setEmailStyle] = useState({});
  const navigate = useNavigate();
  const { setUserRole } = useUserRole(); // Retrieve setUserRole from context

  async function handleLogin(e) {
    e.preventDefault();
  
    try {
      const ref = doc(db, "users", email);
      const res = await getDoc(ref);
  
      if (!res.exists()) {
        console.log("No such document in the database");
      } else {
        console.log('Email from database:', res.data().email);
        console.log('Password from database:', res.data().password);
  
        if (res.data().email === email && res.data().password === password) {
          const userRole = res.data().role;
          localStorage.setItem('role', userRole);
          localStorage.setItem('email', res.data().email);
          setUserRole(userRole); // Update the userRole in the context
  
          // Redirect user based on their role
          if (userRole === 'student') {
            navigate('/student-page');
          } else if (userRole === 'professor') {
            navigate('/professor-page');
          } else {
            navigate('/'); // Default redirect if role is not recognized
          }
  
          console.log("Found User:", res.data());
        } else {
          setEmailStyle({ borderColor: 'red' });
          setPassword('');
          console.log("Incorrect email or password");
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }



  return (
    <div className='mainpage'>
      <Container>
        <h2>Εθνικόν και Καποδιστριακόν Πανεπιστήμιον Αθηνών</h2>
        <p>Γραμματεία Πληροφορικής και Τηλεπικοινωνιών</p>
        
        <Form onSubmit={handleLogin} className='login-container'>
          <h2>Σύνδεση</h2>

          <Form.Group as={Row} className='mb-3'>
            
            <Col sm={12} className="input-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 14C14.7614 14 17 11.3137 17 8C17 4.68629 14.7614 2 12 2C9.23858 2 7 4.68629 7 8C7 11.3137 9.23858 14 12 14Z" fill="#3F3F3F"/>
                <path d="M21.8 19.1C20.9 17.3 19.2 15.8 17 14.9C16.4 14.7 15.7 14.7 15.2 15C14.2 15.6 13.2 15.9 12 15.9C10.8 15.9 9.8 15.6 8.8 15C8.3 14.8 7.6 14.7 7 15C4.8 15.9 3.1 17.4 2.2 19.2C1.5 20.5 2.6 22 4.1 22H19.9C21.4 22 22.5 20.5 21.8 19.1Z" fill="#3F3F3F"/>
             </svg>
              <Form.Control 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className='mb-3'>
            <Col sm={12} className="input-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M15.9231 9.69231V6.10256C15.9231 5.0145 15.4044 3.97099 14.4811 3.20161C13.5579 2.43223 12.3057 2 11 2C9.69432 2 8.44211 2.43223 7.51886 3.20161C6.5956 3.97099 6.07692 5.0145 6.07692 6.10256V9.69231C5.26087 9.69231 4.47825 9.96245 3.90121 10.4433C3.32417 10.9242 3 11.5764 3 12.2564V19.4359C3 20.1159 3.32417 20.7681 3.90121 21.249C4.47825 21.7299 5.26087 22 6.07692 22H15.9231C16.7391 22 17.5218 21.7299 18.0988 21.249C18.6758 20.7681 19 20.1159 19 19.4359V12.2564C19 11.5764 18.6758 10.9242 18.0988 10.4433C17.5218 9.96245 16.7391 9.69231 15.9231 9.69231ZM12.2308 17.0974V17.3846C12.2308 17.6566 12.1011 17.9175 11.8703 18.1099C11.6395 18.3022 11.3264 18.4103 11 18.4103C10.6736 18.4103 10.3605 18.3022 10.1297 18.1099C9.8989 17.9175 9.76923 17.6566 9.76923 17.3846V17.0974C9.3972 16.9185 9.08785 16.6614 8.87194 16.352C8.65602 16.0425 8.54105 15.6913 8.53846 15.3333C8.53846 14.7893 8.7978 14.2675 9.25943 13.8829C9.72106 13.4982 10.3472 13.2821 11 13.2821C11.6528 13.2821 12.2789 13.4982 12.7406 13.8829C13.2022 14.2675 13.4615 14.7893 13.4615 15.3333C13.4589 15.6913 13.344 16.0425 13.1281 16.352C12.9121 16.6614 12.6028 16.9185 12.2308 17.0974ZM13.4615 9.69231H8.53846V6.10256C8.53846 5.55853 8.7978 5.03678 9.25943 4.65209C9.72106 4.2674 10.3472 4.05128 11 4.05128C11.6528 4.05128 12.2789 4.2674 12.7406 4.65209C13.2022 5.03678 13.4615 5.55853 13.4615 6.10256V9.69231Z" fill="#464646"/>
              </svg>
              <Form.Control 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Button variant="primary" type="submit">Είσοδος</Button>
          <div className='mt-3'>
            <a href='/register'>Δημιουργία νέου χρήστη</a>
          </div>
        </Form>
      </Container>
    </div>
  );
  
}


export default LoginForm;