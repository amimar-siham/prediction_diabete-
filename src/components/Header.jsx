import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../css/style.css';
import logo from '../static/images/logo1.png';
import LogoutButton from '../LogoutButton';

function Header({ children, isAuthenticated, onLogout }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const serviceSectionRef = useRef(null);

  useEffect(() => {
    const checkScroll = () => {
      setIsScrolled(window.pageYOffset > 0);
    };

    window.addEventListener('scroll', checkScroll);

    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  const handleScrollToService = (e) => {
    e.preventDefault();
    if (serviceSectionRef.current) {
      serviceSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`big-wrapper ${isScrolled ? 'scrolled' : 'light'}`}>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="containers">
          <div className="logo">
            <img src={logo} alt="Logo" />
            <h3>Diabète</h3>
          </div>
          <div className="links">
            <ul>
              <li><Link to="/">Acceuil</Link></li>
              <li><a href="#service" onClick={handleScrollToService}>Informations</a></li>
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
      {children}
      <div ref={serviceSectionRef}></div>
    </div>
  );
}

export default Header;
