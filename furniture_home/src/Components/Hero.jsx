import React from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';
const heroImage = 'https://res.cloudinary.com/pio6tqwc/image/upload/v1782908542/hero_sofa_1782219496590_nq8zgz.jpg';

export function Hero() {
  return (
    <div className="hero-section">
      <div className="hero-image-wrapper">
        <img src={heroImage} alt="Modern orange modular sofa" className="hero-image" />
        <div className="hero-content">
          <h1 className="hero-title">BEST FURNITURE<br/>FOR YOUR HOME</h1>
          <div className="hero-bottom-row">
            <p className="hero-subtitle">
              We provide the best living experience for you. Discover our latest collection<br/>
              of modern, comfortable and durable furniture for your family.
            </p>
            <Link to="/ProductPage" className="shop-now-btn">Shop Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
