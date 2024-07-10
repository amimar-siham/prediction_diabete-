// Logout.js
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/style.css'

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/logout');
      // Optionally clear local storage or other client-side session storage
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="cta">
    <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
