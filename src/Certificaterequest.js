import React from 'react';
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Certificaterequest()  {
  const currentPage = "certificate-request";
  return (
    <div className="certificate-request">
      <Header currentPage={currentPage} />
      <h2>This is the Certificate Request page</h2>
      
      <Outlet/>

    </div>
  );
};

