import React from 'react';
import Header from "./Header";

const Home = () => {
  const currentPage = "home";
  return (
    <div>
      <Header currentPage={currentPage} />
      <h1>Welcome to the Home Page</h1>
    </div>
  );
};

export default Home;