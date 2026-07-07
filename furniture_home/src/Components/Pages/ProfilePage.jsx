import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../navbar';
import { Footer } from '../footer';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Pages.css';

export function ProfilePage() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <div className="static-page-container">
        <h1 className="static-page-title">Your Profile</h1>
        
        {currentUser ? (
          <div className="profile-card">
            <h2 className="profile-name">{currentUser.fullName}</h2>
            <p className="profile-email">{currentUser.email}</p>
            {currentUser.phone && <p className="profile-phone">{currentUser.phone}</p>}
            
            <button 
              className="logout-btn" 
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <p>You are not logged in. Please log in to view your profile.</p>
            <button className="logout-btn" style={{ marginTop: '20px' }} onClick={() => navigate('/login')}>
              Go to Login
            </button>
          </div>
        )}
      </div>
      <Footer />
    </motion.div>
  );
}
