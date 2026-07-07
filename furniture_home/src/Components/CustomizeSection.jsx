import React from 'react';
import './CustomizeSection.css';
import { Link } from 'react-router-dom';
const customizeImage = 'https://res.cloudinary.com/pio6tqwc/image/upload/v1782908541/customize_lamp_d2xuef.jpg';

export function CustomizeSection() {
  return (
    <section className="customize-section">
      <div className="customize-image-container">
        <img src={customizeImage} alt="Modern lamp and chair" className="customize-image" />
      </div>
      <div className="customize-content">
        <h2 className="customize-title">CREATE & CUSTOMIZE<br/>YOUR FURNITURE</h2>
        <p className="customize-description">
          We provide the best living experience for you. Discover our latest collection
          of modern, comfortable and durable furniture for your family.
          Customizing your furniture has never been easier.
        </p>
        <Link to="/ProductPage" className="customize-btn">Shop Now</Link>
      </div>
    </section>
  );
}
