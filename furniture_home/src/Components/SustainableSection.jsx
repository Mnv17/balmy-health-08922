import React from 'react';
import './SustainableSection.css';
const sustainableImage = 'https://res.cloudinary.com/pio6tqwc/image/upload/v1782908536/sustainable_sofa_pcmozo.jpg';

export function SustainableSection() {
  return (
    <section className="sustainable-section">
      <div className="sustainable-content">
        <h2 className="sustainable-title">SOURCED FROM<br/>SUSTAINABLE<br/>FORESTS.</h2>
        <p className="sustainable-description">
          We use wood from certified forests and recycle materials in our
          production process to minimize the impact on the environment.
          Sustainable sourcing ensures our beautiful furniture will be enjoyed
          by future generations.
        </p>
        <button className="sustainable-btn">Learn More</button>
      </div>
      <div className="sustainable-image-container">
        <img src={sustainableImage} alt="Sustainable modular white sofa" className="sustainable-image" />
      </div>
    </section>
  );
}
