import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { Navbar } from '../navbar';
import { Footer } from '../footer';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import './AuthPages.css';

export function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddToCart = (item) => {
    const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const existing = items.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity || 1;
    } else {
      items.push({ 
        id: item.id, 
        name: item.name, 
        url: item.url, 
        price: item.price, 
        quantity: item.quantity || 1 
      });
    }
    localStorage.setItem("cartItems", JSON.stringify(items));
    window.dispatchEvent(new Event("cartUpdated"));

    toast(
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontFamily: 'var(--font-sans)' }}>
        <img src={item.url} alt={item.name} style={{ width: 40, height: 40, borderRadius: '5px', objectFit: 'cover' }} />
        <span style={{ fontSize: '14px', color: '#fff' }}>
          <span style={{color: '#4ade80', marginRight: '5px', fontSize: '16px'}}>✔</span> 
          {item.name} is added to cart.
        </span>
      </div>,
      {
        position: "top-right",
        autoClose: 3000,
        style: { backgroundColor: '#111', color: '#fff', borderRadius: '25px', padding: '10px 20px' },
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        icon: false,
        closeButton: false
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(fullName, email, phone, password);
      toast(
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontFamily: 'var(--font-sans)' }}>
          <span style={{ fontSize: '14px', color: '#fff' }}>
            <span style={{color: '#4ade80', marginRight: '5px', fontSize: '16px'}}>✔</span> 
            Account created successfully!
          </span>
        </div>,
        {
          position: "top-right",
          autoClose: 3000,
          style: { backgroundColor: '#111', color: '#fff', borderRadius: '25px', padding: '10px 20px' },
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          icon: false,
          closeButton: false
        }
      );
      
      const pendingItem = sessionStorage.getItem('pendingCartItem');
      if (pendingItem) {
        const item = JSON.parse(pendingItem);
        handleAddToCart(item);
        sessionStorage.removeItem('pendingCartItem');
      }
      navigate('/');
    } catch (err) {
      toast(
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontFamily: 'var(--font-sans)' }}>
          <span style={{ fontSize: '14px', color: '#fff' }}>
            <span style={{color: '#f87171', marginRight: '5px', fontSize: '16px'}}>✖</span> 
            {err.response?.data?.error || 'Signup failed'}
          </span>
        </div>,
        {
          position: "top-right",
          autoClose: 3000,
          style: { backgroundColor: '#111', color: '#fff', borderRadius: '25px', padding: '10px 20px' },
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          icon: false,
          closeButton: false
        }
      );
    }
  };

  return (
    <motion.div className="auth-page-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Navbar />
      <div className="auth-content">
        <div className="auth-box">
          <h2>Create Account</h2>
          <p>Join us to purchase luxury furniture.</p>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Mobile Number</label>
              <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="auth-submit-btn">Sign Up</button>
          </form>
          <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
        </div>
      </div>
      <Footer />

    </motion.div>
  );
}
