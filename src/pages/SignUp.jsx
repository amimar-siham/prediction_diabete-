import React from 'react';
import Header from '../components/Header';
import Signup from '../Signup';
import '../css/style.css'; // Import your custom styles

const SignupPage = ({ isAuthenticated, onLogout }) => {
  return (
    <Header isAuthenticated={isAuthenticated} onLogout={onLogout}>
        <Signup />
      </Header>
  );
};

export default SignupPage;
