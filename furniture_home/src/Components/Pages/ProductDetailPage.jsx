import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Navbar } from '../navbar';
import { Footer } from '../footer';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductDetailPage.css';

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [inCart, setInCart] = useState(false);
  const { currentUser } = React.useContext(AuthContext);

  // Accordion states
  const [openSection, setOpenSection] = useState('description');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("https://json-work.onrender.com/furnitures");
        const found = response.data.find(item => item.id === id);
        if (found) {
          setProduct(found);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();

    const checkCart = () => {
      const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
      setInCart(items.some(i => i.id === id));
    };
    checkCart();
    window.addEventListener("cartUpdated", checkCart);
    return () => window.removeEventListener("cartUpdated", checkCart);
  }, [id]);

  const handleCartAction = () => {
    if (!product) return;
    
    if (!currentUser) {
      sessionStorage.setItem('pendingCartItem', JSON.stringify({
        id: product.id, 
        name: product.name, 
        url: product.url, 
        price: product.price, 
        quantity: quantity 
      }));
      navigate('/login');
      return;
    }

    const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const existingIndex = items.findIndex(i => i.id === product.id);

    if (existingIndex >= 0) {
      // Remove from cart
      items.splice(existingIndex, 1);
      localStorage.setItem("cartItems", JSON.stringify(items));
      window.dispatchEvent(new Event("cartUpdated"));
      toast(
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontFamily: 'var(--font-sans)' }}>
          <img src={product.url} alt={product.name} style={{ width: 40, height: 40, borderRadius: '5px', objectFit: 'cover' }} />
          <span style={{ fontSize: '14px', color: '#fff' }}>
            <span style={{color: '#f87171', marginRight: '5px', fontSize: '16px'}}>✖</span> 
            {product.name} removed from cart.
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
    } else {
      // Add to cart
      items.push({ 
        id: product.id, 
        name: product.name, 
        url: product.url, 
        price: product.price, 
        quantity: quantity 
      });
      localStorage.setItem("cartItems", JSON.stringify(items));
      window.dispatchEvent(new Event("cartUpdated"));

      toast(
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontFamily: 'var(--font-sans)' }}>
          <img src={product.url} alt={product.name} style={{ width: 40, height: 40, borderRadius: '5px', objectFit: 'cover' }} />
          <span style={{ fontSize: '14px', color: '#fff' }}>
            <span style={{color: '#4ade80', marginRight: '5px', fontSize: '16px'}}>✔</span> 
            {product.name} added to cart!
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

  const handleBuyNow = () => {
    if (!inCart) handleCartAction();
    if (currentUser) navigate('/CartPage');
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  if (loading) return <div className="pdp-loading">Loading...</div>;
  if (!product) return <div className="pdp-loading">Product not found.</div>;

  return (
    <motion.div 
      className="pdp-page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      
      <div className="pdp-layout">
        
        {/* Left Side: Images */}
        <div className="pdp-image-section">
          <div className="pdp-main-image">
            <img src={product.url} alt={product.name} />
          </div>
          <div className="pdp-thumbnails">
            <div className="pdp-thumbnail">
              <img src={product.url} alt="thumbnail 1" />
            </div>
            <div className="pdp-thumbnail">
              <img src={product.url} alt="thumbnail 2" />
            </div>
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="pdp-details-section">
          <div className="pdp-category-tag">
            {product.product ? `${product.product.toUpperCase()} COLLECTION` : 'FURNITURE COLLECTION'}
          </div>
          
          <h1 className="pdp-title">{product.name}</h1>
          
          <div className="pdp-delivery-info">
            <span className="pdp-delivery-icon">🚚</span>
            <span>Delivery from 3 weeks</span>
          </div>

          {/* Accordions */}
          <div className="pdp-accordions">
            <div className="pdp-accordion-item">
              <button className="pdp-accordion-header" onClick={() => toggleSection('description')}>
                DESCRIPTION {openSection === 'description' ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {openSection === 'description' && (
                <div className="pdp-accordion-content">
                  <p>Taking cues from mid-century designs at Soho House 40 Greek Street, our {product.name} remains a House favourite. Handcrafted with a tapered, solid birch frame allows for a comfortable deep sit with down and feather-wrapped cushions, while brass detail arms add a vintage touch. Place in any corner of the home alongside the footstool to recreate our cosy reading nook seen around the Houses.</p>
                </div>
              )}
            </div>
            
            <div className="pdp-price-section">
              <div className="pdp-price-block">
                <span className="pdp-price-label">Regular price</span>
                <span className="pdp-price-value">₹{product.price}</span>
              </div>
              <div className="pdp-price-block">
                <span className="pdp-price-label">Member (Save 15%)</span>
                <span className="pdp-price-value-member">₹{Math.floor(parseInt(product.price.replace(/,/g, '')) * 0.85).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pdp-actions-row">
              <div className="pdp-quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button className="pdp-wishlist-btn" onClick={() => setWishlist(!wishlist)}>
                {wishlist ? <AiFillHeart color="black" /> : <AiOutlineHeart />}
              </button>
            </div>

            <div className="pdp-buttons-row">
              <button className="pdp-add-to-cart" onClick={handleCartAction}>
                {inCart ? 'Remove from cart' : 'Add to cart'}
              </button>
              <button className="pdp-buy-now" onClick={handleBuyNow}>Buy Now</button>
            </div>

            <div className="pdp-accordion-item">
              <button className="pdp-accordion-header" onClick={() => toggleSection('dimensions')}>
                DIMENSIONS {openSection === 'dimensions' ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {openSection === 'dimensions' && (
                <div className="pdp-accordion-content pdp-specs-grid">
                  <span>Product dimensions:</span>
                  <span>H84.5 x W64 x D75cm</span>
                  <span>Product weight:</span>
                  <span>15.6kg / 34.4lbs</span>
                  <span>Packaged weight:</span>
                  <span>23.6kg / 52lbs</span>
                </div>
              )}
            </div>

            <div className="pdp-accordion-item">
              <button className="pdp-accordion-header" onClick={() => toggleSection('fabric')}>
                FABRIC DETAILS {openSection === 'fabric' ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {openSection === 'fabric' && (
                <div className="pdp-accordion-content">
                  <p>Premium velvet blend with high durability score. Professional cleaning recommended.</p>
                </div>
              )}
            </div>

            <div className="pdp-accordion-item">
              <button className="pdp-accordion-header" onClick={() => toggleSection('delivery')}>
                LARGE ITEM DELIVERY & RETURNS {openSection === 'delivery' ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {openSection === 'delivery' && (
                <div className="pdp-accordion-content">
                  <p>White glove delivery service included. Free returns within 30 days of delivery.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
      
      <Footer />

    </motion.div>
  );
}
