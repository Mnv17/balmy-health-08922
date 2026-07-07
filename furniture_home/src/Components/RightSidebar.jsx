import React from 'react';
import './RightSidebar.css';
const productImg1 = 'https://res.cloudinary.com/pio6tqwc/image/upload/v1782908544/product_armchair_vo0wpc.jpg';
const productImg2 = 'https://res.cloudinary.com/pio6tqwc/image/upload/v1782908543/product_armchair_2_mdr1bh.jpg';

export function RightSidebar() {
  return (
    <div className="right-sidebar">
      <div className="sidebar-header">
        <h2>CREATE & CUSTOMIZE<br />FURNITURE</h2>
        <p>
          20 plus years of experience in the export market.<br />
          We decided to open an online store for Indonesian market. We are<br />
          determine to give you the best furniture and service possible.
        </p>
      </div>

      <div className="sidebar-products-container">
        <h3 className="highly-recommended-title">HIGHLY<br />RECOMMENDED</h3>
        
        <div className="sidebar-products">
          {/* First Product Card */}
          <div className="product-card">
            <div className="product-image-wrapper">
              <img src={productImg1} alt="Dark Armchair" />
              <button className="favorite-btn">♡</button>
            </div>
            <div className="product-info">
              <h3 className="product-name">MORE ARMCHAIR</h3>
              <span className="product-price">$995.99</span>
            </div>
            <div className="product-rating">
              <span style={{ color: '#d4af37' }}>★★★★</span><span style={{ color: '#ccc' }}>☆</span> 842 Review
            </div>
          </div>

          {/* Second Product Card */}
          <div className="product-card">
            <div className="product-image-wrapper" style={{ backgroundColor: '#f0f0f0' }}>
              <img src={productImg2} alt="Light Armchair" />
              <button className="favorite-btn">♡</button>
            </div>
            <div className="product-info">
              <h3 className="product-name">NORDIC LOUNGE</h3>
              <span className="product-price">$849.50</span>
            </div>
            <div className="product-rating">
              <span style={{ color: '#d4af37' }}>★★★★★</span> 1,024 Review
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
