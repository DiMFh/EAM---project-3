import React from 'react';
import Header from "./Header";

const Register = () => {
  const currentPage = "register";
  return (
    <div>
      <Header currentPage={currentPage} />
      <h2>This is the register page.</h2>
    </div>
  );
};

export default Register;