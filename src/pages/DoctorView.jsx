// src/views/DoctorView.js
import React from 'react';
import '../css/style.css'; // Import your custom styles
import DoctorHeader from '../components/DoctorHeader';
import DoctorDashboard from '../DoctorDashboard';

const DoctorView = ({ isAuthenticated, onLogout }) => (
  <DoctorHeader isAuthenticated={isAuthenticated} onLogout={onLogout}>
    <DoctorDashboard />
  </DoctorHeader>
);

export default DoctorView;
