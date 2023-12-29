import React from "react";
<<<<<<< HEAD
import Header from "./Header";
import Footer from "./Footer";
import headerimg from "./images/EKPA.jpg";
import InfoCardsContainer from "./InfoCardsContainer";
import "./App.css";
=======
>>>>>>> dimi-branch

import Footer from "./Footer";
import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider
} from 'react-router-dom'
import "./App.css";
import LoginForm from "./LoginForm";
import RegisterForm from './RegisterForm'; 
import Home from './Home';
import Sections from './Sections';
import Certificate from './Certificate_pages/Certificate';
import Certificaterequest from "./Certificate_pages/Certificaterequest";



import './data/firebase';
import { getFirestore } from 'firebase/firestore';


const db = getFirestore();


const router = createBrowserRouter(
  createRoutesFromElements(
    
    <Route path ="/"   >
      <Route index element={<Home />} />
      <Route path="/sections" element={<Sections />} />
      <Route path="/register" element={<RegisterForm db={db} />} />
      <Route path="/login" element={<LoginForm db={db} />} />
        <Route path="/certificate"  >  
          <Route index element={<Certificate/>} />
          <Route path = "certificate-request" element={<Certificaterequest />} />
        </Route>
    </Route >
  )
)




function App() {
 
  return (
    <div className="App">
      <main className="main-content">
<<<<<<< HEAD
        {/* Edw vazoume olous tous components */}
        <header className="header">
          <h1>
            {" "}
            Γραμματίες Εθνικού και Καποδιστριακού <br></br> Πανεπιστημίου Αθηνών
          </h1>
          <img className="homepage-img" src={headerimg} alt="headerimg" />
        </header>
        <InfoCardsContainer />
=======
        <RouterProvider router={router}/>
>>>>>>> dimi-branch
      </main>
      <Footer/>
    </div>
  );
}
export default App