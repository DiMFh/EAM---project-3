import React from 'react';
import Header from "../Header";

const Sections = () => {
  const currentPage = "sections";
  return (
    <div>
      <Header currentPage={currentPage} />
      <h2>This is the sections page </h2>
    </div>
  );
};

export default Sections;