import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import image from './image.png';
import { useNavigate } from 'react-router-dom';
import Loading from './Spinner';
import Certificatefinal from "./Certificatefinal";


function MyModal({ showModal, handleCloseModal }) {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [loading, setLoading] = useState(false);
  const handleSubmission = () => {
    setLoading(true);

    // Perform any necessary actions before navigating

    // Simulate a delay for demonstration purposes
    setTimeout(() => {
      setLoading(false);

      // Close the modal
      handleCloseModal();

      // Navigate to another page
      navigate('/certificate/certificate-final');
    }, 1000); // Use navigate instead of history.push
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Η αίτηση είναι σχεδόν έτοιμη</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="row">
    <div className="col-md-4">
      <img src={image} alt="Certificate Example" style={{ width: '60%' , marginLeft : '40px' , marginBlockStart : '10px' }} />
    </div>
    <div className="col-md-8">
      <p>
        Ο συγκεκριμένος τύπος πιστοποιητικού έχει ισχύ τριών (3) μηνών. Εάν πατήσετε
        Υποβολή, δεν θα έχετε τη δυνατότητα να την ακυρώσετε. Για την επιτυχή ή μη έκδοση
        του πιστοποιητικού θα ενημερωθείτε με σχετικό email στη φοιτητική
        διεύθυνση ηλεκτρονικού ταχυδρομίου σας.
      </p>
    </div>
  </div>
    </Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseModal}>
          Ακύρωση
        </Button>
        <Button variant="primary" onClick={handleSubmission}>
          Υποβολή
        </Button>
        {loading && <Loading />}
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal;