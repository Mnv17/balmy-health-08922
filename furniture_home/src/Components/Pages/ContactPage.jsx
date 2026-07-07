import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../navbar';
import { Footer } from '../footer';
import './ContactPage.css';

const fadeLeftVariant = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const fadeRightVariant = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } }
};

export function ContactPage() {
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Thank you! We have received your inquiry.');
    e.target.reset();
    setTimeout(() => setStatus(''), 5000);
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
      
      <div className="contact-split-wrapper">
        
        {/* Left Side */}
        <motion.div 
          className="contact-left"
          initial="hidden"
          animate="visible"
          variants={fadeLeftVariant}
        >
          <h1 className="contact-title-large">Let's get<br/>in touch</h1>
          
          <div className="contact-subtitle-arrow">
            <div className="arrow-line"></div>
            <p>Great! We're excited to hear from you and let's start something special together. Call us for any inquiry.</p>
          </div>

          <div className="contact-info-block">
            <h4>Don't be afraid to<br/>say hello with us!</h4>
          </div>

          <div className="contact-details">
            <div className="detail-item">
              <h5>Phone</h5>
              <p>+(2) 578-365-379</p>
            </div>
            <div className="detail-item">
              <h5>Email</h5>
              <p>hello@furniturehome.com</p>
            </div>
            <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
              <h5>Office</h5>
              <p>Maanav Verma<br/>Indore, India</p>
              <br/>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer">See on Google Map ↗</a>
            </div>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div 
          className="contact-right"
          initial="hidden"
          animate="visible"
          variants={fadeRightVariant}
        >
          <h3>Contact</h3>
          <form className="dark-contact-form" onSubmit={handleSubmit}>
            
            <div className="form-row-split">
              <div className="dark-input-wrapper">
                <label>Name</label>
                <input type="text" required />
              </div>
              <div className="dark-input-wrapper">
                <label>Email</label>
                <input type="email" required />
              </div>
            </div>

            <div className="form-row-split">
              <div className="dark-input-wrapper">
                <label>Phone</label>
                <input type="text" />
              </div>
              <div className="dark-input-wrapper">
                <label>Subject</label>
                <input type="text" required />
              </div>
            </div>

            <div className="dark-input-wrapper">
              <label>Tell us about what you're interested in</label>
              <textarea required></textarea>
            </div>

            <button type="submit" className="neon-submit-btn">Send to us</button>
            {status && <p style={{ color: '#d4e09b', marginTop: '10px', textAlign: 'center' }}>{status}</p>}
          </form>
        </motion.div>

      </div>
      
      <Footer />
    </motion.div>
  );
}
