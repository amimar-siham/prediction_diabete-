import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Signup from './Signup';
import Login from './Login';
import PredictionForm from './PredictionForm';
import DoctorDashboard from './DoctorDashboard';
import ProtectedRoute from './ProtectedRoute';
import DashboradPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUp';
import TestPage from './pages/TestPage';
import DoctorView from './pages/DoctorView';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={<HomePage isAuthenticated={isAuthenticated} onLogout={handleLogout} />}
          />
          <Route path="/signup" element={<SignupPage isAuthenticated={isAuthenticated} onLogout={handleLogout} />} />          
          <Route path="/dashboard" 
           element={<DashboradPage isAuthenticated={isAuthenticated} onLogout={handleLogout} />}  />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route
            path="/predict"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <TestPage isAuthenticated={isAuthenticated} onLogout={handleLogout}/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor-dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <DoctorView isAuthenticated={isAuthenticated} onLogout={handleLogout}/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
