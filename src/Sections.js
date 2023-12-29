// Section.js
import React from 'react';
import Header
 from './Header';
const Sections = () => {
  const currentPage = "sections";
  return (
    <div>
      <Header currentPage={currentPage} />
      <h1>Welcome to the Section Page</h1>
      <p>This is the section page of the application.</p>
    </div>
  );
};

export default Sections;