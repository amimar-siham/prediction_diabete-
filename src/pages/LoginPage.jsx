import React from 'react';
import Header from '../components/Header';
import Login from '../Login';
import '../css/style.css'; // Import your custom styles

const LoginPage = ({ isAuthenticated, onLogout, onLogin }) => {
  return (
    <Header isAuthenticated={isAuthenticated} onLogout={onLogout}>
        <Login onLogin={onLogin} />
      </Header>
  );
};

export default LoginPage;
