import React from 'react';
import PredictionForm from '../PredictionForm';
import Header from '../components/Header';
const TestPage = ({ isAuthenticated, onLogout }) => {
  return (
    <Header isAuthenticated={isAuthenticated} onLogout={onLogout}>
        <PredictionForm />
      </Header>
  );
};
export default TestPage;