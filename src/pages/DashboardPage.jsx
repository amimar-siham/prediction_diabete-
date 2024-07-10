import React from 'react';
import Header from '../components/Header';
import Analyse from '../components/Analyse';

const DashboardPage = ({ isAuthenticated, onLogout }) => (
  <>
    <Header isAuthenticated={isAuthenticated} onLogout={onLogout}>
      <Analyse />
    </Header>
  </>
);

export default DashboardPage;
