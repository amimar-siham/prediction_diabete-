// src/components/DoctorHeader.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/style.css';
import logo from '../static/images/logo1.png';
import LogoutButton from '../LogoutButton';

function DoctorHeader({ children, isAuthenticated, onLogout }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setIsScrolled(window.pageYOffset > 0);
    };

    window.addEventListener('scroll', checkScroll);

    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  return (
    <div className={`big-wrapper ${isScrolled ? 'scrolled' : 'light'}`}>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="containers">
          <div className="logo">
            <img src={logo} alt="Logo" />
            <h3>Doctor Dashboard</h3>
          </div>
          <div className="links">
            <ul>
              <li><Link to="/">Acceuil</Link></li>
              <li><Link to="/dashboard">Tableau de Bord</Link></li>
              {isAuthenticated ? (
                <li><LogoutButton onLogout={onLogout} /></li>
              ) : (
                <>
                  <li><Link to="/signup">Sign Up</Link></li>
                  <li><Link to="/login">Login</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}

export default DoctorHeader;
