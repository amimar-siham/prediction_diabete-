import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav>
      <Link to="/">Home</Link>
      {!isAuthenticated && <Link to="/signup">Signup</Link>}
      {!isAuthenticated && <Link to="/login">Login</Link>}
      {isAuthenticated && <LogoutButton onLogout={onLogout} />}
    </nav>
  );
};

export default Navbar;
