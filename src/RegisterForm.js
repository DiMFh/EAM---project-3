import React, { useState } from "react";
import "./RegisterForm.css"; 
export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    // Προσθέστε εδώ άλλα στοιχεία όπως ονοματεπώνυμο, AMKA, κτλ.
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Κώδικας για την επεξεργασία των δεδομένων φόρμας
    console.log(formData);
  };

  return (
    <div className="registration-page">
      
      <form className="registration-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Όνομα χρήστη"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Κωδικός"
          required
        />
        {/* Προσθέστε εδώ περισσότερα input fields για τα στοιχεία του φοιτητή */}
        <button type="submit">Εγγραφή</button>
      </form>
      
    </div>
  );
}
