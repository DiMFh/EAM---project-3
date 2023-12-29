import React from 'react';
import './InputBox.css'; // Αυτό θα είναι το CSS αρχείο που θα πρέπει να δημιουργήσετε

const InputBox = ({ children }) => {
    return (
        <div className="input-box">
            {children}
        </div>
    );
}

export default InputBox;
