import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../navbar';
import { Footer } from '../footer';
import './DistributorPage.css';

const bento1 = 'https://res.cloudinary.com/pio6tqwc/image/upload/v1782908529/distributor_bento_1_1782248829160_cq4wi6.jpg';
const bento2 = 'https://res.cloudinary.com/pio6tqwc/image/upload/v1782908529/distributor_bento_2_1782248843824_mdyvgz.jpg';
const bento3 = 'https://res.cloudinary.com/pio6tqwc/image/upload/v1782908529/distributor_bento_3_1782248855822_v6ygbg.jpg';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export function DistributorPage() {
  const [email, setEmail] = useState('');
  const [applied, setApplied] = useState(false);

  const handleApply = (e) => {
    e.preventDefault();
    if(email) {
      setApplied(true);
      setEmail('');
      setTimeout(() => setApplied(false), 5000);
    }
  }

  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      
      <div className="distributor-page-wrapper">
        <motion.div 
          className="distributor-bento-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUpVariant}
        >
          {/* Left Side: Copy and Form */}
          <div className="distributor-left">
            <div className="distributor-header">
              GLOBAL PARTNERS
            </div>
            
            <h1 className="distributor-title">Become The Face<br/>Of Tomorrow.</h1>
            <p className="distributor-subtitle">
              Discover, develop, and thrive in the world of luxury furniture retail with our expert wholesale team by your side.
            </p>

            <div className="apply-section">
              <h4>START YOUR PARTNERSHIP JOURNEY WITH US</h4>
              <form className="apply-form" onSubmit={handleApply}>
                <input 
                  type="email" 
                  placeholder="PUT YOUR EMAIL HERE" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <button type="submit">APPLY</button>
              </form>
              {applied && <p style={{color: '#16a34a', fontSize: '12px', marginTop: '-10px', marginBottom: '20px'}}>Application received! We'll be in touch.</p>}
            </div>

            <div className="trusted-badge">
              <div className="trusted-avatars">
                <div className="avatar-circle"></div>
                <div className="avatar-circle"></div>
                <div className="avatar-circle"></div>
                <div className="avatar-circle"></div>
              </div>
              <div className="trusted-text">
                Trusted by <strong>200+ partners</strong><br/>all over the world
              </div>
            </div>

            <div className="testimonials-row">
              <div className="testimonial-card">
                "Partnering with Furniture Home elevated our showroom. Their pieces bring a modern elegance that our clients are constantly asking for. It's about growing together."
                <div className="testimonial-author">
                  <div className="author-img"></div>
                  <div className="author-info">
                    <h5>Sarah Higgs</h5>
                    <p>Boutique Owner</p>
                  </div>
                </div>
              </div>
              
              <div className="testimonial-card">
                "The opportunities they bring are unmatched. We've been stocking their core line and the response is incredible. I'm excited for what's next!"
                <div className="testimonial-author">
                  <div className="author-img"></div>
                  <div className="author-info">
                    <h5>Massimo Vignoni</h5>
                    <p>Retail Director</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Bento Grid */}
          <div className="bento-grid">
            
            {/* Image Box */}
            <div className="bento-box box-tall">
              <img src={bento1} alt="Bento 1" className="bento-img" />
            </div>

            {/* Stats Box */}
            <div className="bento-box box-square bento-content light-bg">
              <h2 className="bento-number">50+</h2>
              <p className="bento-text">
                showrooms exclusively featuring our <strong>global collections</strong> last year.
              </p>
            </div>

            {/* Stats Box 2 */}
            <div className="bento-box box-square bento-content" style={{ backgroundColor: '#f0f0f0' }}>
              <h2 className="bento-number">85%</h2>
              <p className="bento-text">
                of our new wholesale partners see increased floor traffic within their <strong>first 3 months</strong>.
              </p>
            </div>

            {/* Image Box 2 */}
            <div className="bento-box box-tall">
              <img src={bento2} alt="Bento 2" className="bento-img" />
            </div>

            {/* Image Box 3 (Wide) */}
            <div className="bento-box box-square">
               <img src={bento3} alt="Bento 3" className="bento-img" />
            </div>

            {/* Stats Box 3 */}
            <div className="bento-box box-square bento-content light-bg">
              <p className="bento-text" style={{marginBottom: '10px'}}>Partnership with</p>
              <h2 className="bento-number">200+</h2>
              <p className="bento-text" style={{ color: '#999' }}>
                retailers across the global luxury market.
              </p>
            </div>

          </div>
        </motion.div>
      </div>
      
      <Footer />
    </motion.div>
  );
}
