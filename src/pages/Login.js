import React from 'react';
import Header from "../Header";


const Login = () => {
  const currentPage = "login";
  return (
    <div className="main-content">
      <Header currentPage={currentPage} />
      <h2>This is the Login page</h2>
    </div>
  );
};

export default Login;