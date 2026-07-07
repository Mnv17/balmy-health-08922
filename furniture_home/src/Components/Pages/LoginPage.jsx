import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { Navbar } from '../navbar';
import { Footer } from '../footer';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import './AuthPages.css'; // Shared CSS for both login and signup

export function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
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
      await login(identifier, password);
      toast(
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontFamily: 'var(--font-sans)' }}>
          <span style={{ fontSize: '14px', color: '#fff' }}>
            <span style={{color: '#4ade80', marginRight: '5px', fontSize: '16px'}}>✔</span> 
            Successfully logged in! Welcome back.
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

      // Check for pending cart item
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
            {err.response?.data?.error || 'Login failed'}
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
          <h2>Welcome Back</h2>
          <p>Login to continue adding premium furniture to your cart.</p>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label>Email or Mobile Number</label>
              <input type="text" required value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="auth-submit-btn">Login</button>
          </form>
          <p className="auth-switch">Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
      </div>
      <Footer />

    </motion.div>
  );
}
