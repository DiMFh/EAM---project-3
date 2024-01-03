import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Home from "./Home";
import Sections from "./Sections";
import Certificate from "./Certificate_pages/Certificate";
import Certificaterequest from "./Certificate_pages/Certificaterequest";
import Certificatestate from "./Certificate_pages/Certificatestate";
import Studentpage from "./Studentpage";
import Professorpage from "./Professorpage";
import ProfilePage from "./Profile";

import "./data/firebase";
import { getFirestore } from "firebase/firestore";
import { UserRoleProvider } from "./UserRoleContext";
import { Outlet } from "react-router-dom";

const db = getFirestore();

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/sections" element={<Sections />} />
        <Route path="/register" element={<RegisterForm db={db} />} />
        <Route path="/login" element={<LoginForm db={db} />}/>
        <Route path="/student-page" element={<Studentpage />} />
        <Route path="/professor-page" element={<Professorpage />} />
        <Route path="/profile" element={<ProfilePage db={db} />} />
        <Route path="/certificate">
          <Route index element={<Certificate />} />
          <Route path="certificate-request" element={<Certificaterequest />} />
          <Route path="certificate-state" element={<Certificatestate />} />
        </Route>
      </Route>
    )
  );
    

function Layout() { 
  /* Το Layout είναι ένα wrapper που δείχνει το κεντρικό layout τις εφαρμογής, και παίρνει ως παιδιά (Outlet) όλα τα routes */
  return (
    <>
      <div className="App">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
    </>
  )
}

  return (
    <UserRoleProvider>
      <RouterProvider router={router} />
    </UserRoleProvider>
  );
}

export default App;
