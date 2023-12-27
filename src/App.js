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
import Login from "./Login";
import Register from './Register'; 
import Home from './Home';
import Sections from './Sections';
import Certificate from './Certificate';
import Certificaterequest from "./Certificaterequest";

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
