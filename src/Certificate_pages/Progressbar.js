// import React from 'react';
// import './Progressbar.css';

// // const ProgressBar = ({ valueNow, valueMin, valueMax }) => {
// //   return (
// //     <div className="progress">
// //       <div
// //         className="progress-bar"
// //         role="progressbar"
// //         aria-valuenow={valueNow}
// //         aria-valuemin={valueMin}
// //         aria-valuemax={valueMax}
// //         style={{ width: `${valueNow}%` }}
// //       >
// //         {valueNow}%
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProgressBar;
// function AnimatedExample() {
//   return <ProgressBar animated now={45} />;
// }

// export default AnimatedExample;
import ProgressBar from 'react-bootstrap/ProgressBar';

function CustomProgressBar() {
  const now = 60;
  return <ProgressBar now={now} label={`${now}%`} visuallyHidden />;
}

export default CustomProgressBar;