import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./LoginForm";
import RegisterForm from './RegisterForm'; 
import Home from './Home';
import Section from './Section';

import { firebaseConfig } from './data/firebase';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import 'firebase/database';


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const MainLayout = ({ children }) => (
  <>
    <Header />
    <div className="main-content">{children}</div>
    <Footer />
  </>
);

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Ξεχωριστή διαχείριση για το "/login" */}
          <Route path="/login" element={<LoginForm db={db} />} />

          {/* Οι υπόλοιπες διαδρομές με το MainLayout */}
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/register" element={<MainLayout><RegisterForm db={db} /></MainLayout>} />
          <Route path="/sections" element={<MainLayout><Section /></MainLayout>} />
          {/* Προσθέστε άλλες διαδρομές εδώ αν χρειάζεται */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}