import React from 'react';
import './Progressbar.css'; // Import the CSS file

function YourComponent() {
  return (
    <div className="stepper-container">
      {/* Steps */}
      <ul className="stepper" id="stepper-form-example" data-mdb-stepper-linear="true">
        <form className="needs-validation stepper-form">
          {/* First step */}
          <li className="stepper-step stepper-active">
            <div className="stepper-head">
              <span className="stepper-head-icon">1</span>
              <span className="stepper-head-text">step1</span>
            </div>
            <div className="stepper-content py-3">
              {/* Your form inputs for step 1 */}
            </div>
          </li>
          {/* First step */}

          {/* Second step */}
          <li className="stepper-step">
            <div className="stepper-head">
              <span className="stepper-head-icon">2</span>
              <span className="stepper-head-text">step2</span>
            </div>
            <div className="stepper-content py-3">
              {/* Your form inputs for step 2 */}
            </div>
          </li>
          {/* Second step */}

          {/* Third step */}
          <li className="stepper-step">
            <div className="stepper-head">
              <span className="stepper-head-icon">3</span>
              <span className="stepper-head-text">step3</span>
            </div>
            <div className="stepper-content py-3">
              {/* Your form inputs for step 3 */}
            </div>
          </li>
          {/* Third step */}
        </form>
      </ul>
      {/* Steps */}

      {/* Buttons */}
      <div className="d-flex justify-content-center px-3">
        <button id="form-example-prev-step" className="btn btn-primary w-100 me-2">
          Previous step
        </button>
        <button id="form-example-next-step" className="btn btn-primary w-100">
          Next step
        </button>
      </div>
      {/* Buttons */}
    </div>
  );
}

export default YourComponent;