import React from 'react';
import background2 from "./images/background2.png";

const Firstbackground = ({ text }) => {
  return <img src={background2} alt={text}  style={{ width: '50%', height: '50%', opacity: '0.5' }} />;
};

export default Firstbackground;