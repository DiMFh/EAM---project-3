import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore'
import { courses } from './Utils/Objects/objects';
import './RegisterForm.css'
import Header from './Header';

export default function RegisterForm({db}){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [conpassword, setConPassword] = useState(''); 
  const [role, setRole] = useState('');
  const [telephone, setTelephone] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const currentPage = "register";
  // Handles the register functionality of the user
  async function handleRegister(e){
    e.preventDefault()
    

    if (!email || !password || !conpassword || !role || !telephone) {
      alert("Please fill all the required fields.");
      return; // Διακοπή της συνάρτησης εάν κάποιο απαιτούμενο πεδίο είναι κενό
    }
  
    // Έλεγχος για ταιριάζοντα κωδικούς
    if (password !== conpassword) {
      alert("Passwords do not match.");
      return;
    }
    // This object represents the user's form that it will be saved in our database.
    const docUser = {
        email: email,
        password: password,
        role: role,
        telephone: telephone,
        address: address,
        date: date,
        courses: [
          {
            name: "Επικοινωνία Ανθρώπου Μηχανής",
            grade: 10
          }
        ]
    };

    try{
       // Create a Firebase doc that 'points' to our db and creates a collection "users" with primary key the email of the user
      const ref_user = doc(db, "users", email);
      // Then we use setDoc to push the 'user object' to the referenced user
      await setDoc(ref_user, docUser);

      // At the same time we push all the courses at the db.
      // We create a 'courses' collection with primary key 'all_courses'
      const ref_courses = doc(db, "courses", "all_courses");
      await setDoc(ref_courses, courses);

      // Redirect to login route
      window.location.href = '/login';
      console.log("ALL GOOD");
      alert("Document written to Database");

    }catch(e){
      console.log(e)
    }
    
  }
    return(
      <div className='register'>
        <Header currentPage={currentPage} />
        <div className='info-div'>
          <p style={{ fontWeight: 'bold' }}>Ότι έχει * είναι υποχρεωτικό να συμπληρωθεί.</p>
          <p>Παρακαλώ συμπληρώστε τα στοιχεία σας.</p>
        </div>
        <form onSubmit={handleRegister} className='register-container'>
           
            <div className='register-row'>
                <label>Ηλεκτρονική Διεύθυνση*</label>
                &nbsp;&nbsp;&nbsp;
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='register-row'>
                <label>Κωδικός*</label>
                &nbsp;&nbsp;&nbsp;
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className='register-row'>
                <label>Επιβεβαίωση Κωδικού*</label>
                &nbsp;&nbsp;&nbsp;
                <input
                    type="password"
                    value={conpassword}
                    onChange={(e) => setConPassword(e.target.value)}
                />
            </div>
            <div className='register-row'>
                <label>Ημερομηνία Γέννησης*</label>
                &nbsp;&nbsp;&nbsp;
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setRole(e.target.value)}
                />
            </div>
            <div className='register-row'>
                <label>Ρόλος*</label>
                &nbsp;&nbsp;&nbsp;
                <input
                    type="text"
                    value={role}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div className='register-row'>
                <label>Τηλέφωνο*</label>
                &nbsp;&nbsp;&nbsp;
                <input
                    type="telephone number"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                />
            </div>
            <div className='register-row'>
                <label>Διεύθυνση</label>
                &nbsp;&nbsp;&nbsp;
                <input
                    type="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <button type='submit'>Register</button>
            <a href='/login'>Already have an Account?</a>
        </form>
      </div>
    )
}