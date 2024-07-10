import React from 'react';
import Showcase from '../components/Showcase';
import Header from '../components/Header';
import Service from '../components/Service';
import Conseil from '../components/Conseil';
import Acceuil from '../components/Acceuil';
import DiabetesSection from '../components/DiabetesSection';

const HomePage = ({ isAuthenticated, onLogout }) => (
  <>
    <Header isAuthenticated={isAuthenticated} onLogout={onLogout}>
      <Acceuil isAuthenticated={isAuthenticated} />
    </Header>
    <Service />
    <DiabetesSection />
    <Conseil />
  </>
);

export default HomePage;
