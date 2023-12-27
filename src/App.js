import React from "react";
// import Header from "./Header";
import Footer from "./Footer";
import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider
} from 'react-router-dom'
import "./App.css";
import Login from "./pages/Login";
import Register from './pages/Register'; 
import Home from './pages/Home';
import Sections from './pages/Sections';
import Certificate from './Certificate_pages/Certificate';
import Certificaterequest from "./Certificate_pages/Certificaterequest";

const router = createBrowserRouter(
  createRoutesFromElements(
    
    <Route path ="/"   >
      <Route index element={<Home />} />
      <Route path="/sections" element={<Sections />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
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
    <RouterProvider router={router}/>
    </main>
    <Footer/>
    </div>
  );
}
export default App
