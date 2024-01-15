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
//student pages
import Studentpage from "./Student_pages/Studentpage";
import Declarations from "./Student_pages/Declarations/Declarations";
import NewDeclaration from "./Student_pages/Declarations/NewDeclaration";
import Certificate from "./Student_pages/Certificate_pages/Certificate";
import Certificaterequest from "./Student_pages/Certificate_pages/Certificaterequest";
import Certificatestate from "./Student_pages/Certificate_pages/Certificatestate";
import Certificatefinal from "./Student_pages/Certificate_pages/Certificatefinal";
import ProfilePage from "./Student_pages/Profile";
import GradesPage from "./Student_pages/Grades";
//professor pages
import Professorpage from "./Proffesor_pages/Professorpage";
import ProfilePage1 from "./Proffesor_pages/Profile";
//firebase
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
        <Route path="/login" element={<LoginForm db={db} />} />
        {/* <Route path="/student-page" element={<Studentpage />} /> */}

        {/* <Route path="/profile" element={<ProfilePage db={db} />} /> */}
        {/* <Route path="grades" element={<GradesPage db={db} />} /> */}
        {/* <Route path="/certificate">
          <Route index element={<Certificate />} />
          <Route path="certificate-request" element={<Certificaterequest />} />
          <Route path="certificate-state" element={<Certificatestate />} />
        </Route> */}

        <Route path="/student-page">
          <Route index element={<Studentpage />} />
          <Route path="declarations" element={<Declarations />} />
          <Route path="new-declaration" element={<NewDeclaration />} />
          <Route path="certificate">
            <Route index element={<Certificate />} />

            <Route
              path="certificate-request"
              element={<Certificaterequest />}
            />
            <Route
              path="/student-page/certificate/certificate-request/certificate-final"
              element={<Certificatefinal />}
            />
            <Route path="certificate-state" element={<Certificatestate />} />
          </Route>
          <Route path="profile" element={<ProfilePage db={db} />} />
          <Route path="grades" element={<GradesPage db={db} />} />
        </Route>

        {/* <Route path="/professor-page" element={<Professorpage />} /> */}
        <Route path="/professor-page">
          <Route index element={<Professorpage />} />
          <Route path="profile" element={<ProfilePage1 db={db} />} />
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
    );
  }

  return (
    <UserRoleProvider>
      <RouterProvider router={router} />
    </UserRoleProvider>
  );
}

export default App;
