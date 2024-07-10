import React from 'react';
import './css/style.css'
const LogoutButton = ({ onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <button className="btn_two" style={{ marginLeft: '40px'}} onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
