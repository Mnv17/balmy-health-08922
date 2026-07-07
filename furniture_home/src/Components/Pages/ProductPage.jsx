import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { AiFillStar, AiOutlineShoppingCart } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from '../navbar';
import { Footer } from '../footer';
import { motion } from 'framer-motion';
import '../ProductGrid.css'; // Reuse ProductGrid styles
import './ProductPage.css';

export function ProductPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = React.useContext(AuthContext);

  useEffect(() => {
    // Parse search query from URL if exists
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search');

    // Reset filter when a new search is performed
    if (searchQuery) {
      setActiveFilter('all');
    }

    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://json-work.onrender.com/furnitures");
        let fetchedProducts = response.data;
        
        if (searchQuery) {
          fetchedProducts = fetchedProducts.filter(item => 
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            item.product?.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [location.search]);

  const addToCart = (item) => {
    if (!currentUser) {
      sessionStorage.setItem('pendingCartItem', JSON.stringify({
        id: item.id, 
        name: item.name, 
        url: item.url, 
        price: item.price, 
        quantity: 1 
      }));
      navigate('/login');
      return;
    }

    const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const existingIndex = items.findIndex(i => i.id === item.id);
    
    if (existingIndex >= 0) {
      // Remove
      items.splice(existingIndex, 1);
      localStorage.setItem("cartItems", JSON.stringify(items));
      window.dispatchEvent(new Event("cartUpdated"));
      toast(
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontFamily: 'var(--font-sans)' }}>
          <img src={item.url} alt={item.name} style={{ width: 40, height: 40, borderRadius: '5px', objectFit: 'cover' }} />
          <span style={{ fontSize: '14px', color: '#fff' }}>
            <span style={{color: '#f87171', marginRight: '5px', fontSize: '16px'}}>✖</span> 
            {item.name} removed from cart.
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
      // Add
      items.push({ 
        id: item.id, 
        name: item.name, 
        url: item.url, 
        price: item.price, 
        quantity: 1 
      });
      localStorage.setItem("cartItems", JSON.stringify(items));
      window.dispatchEvent(new Event("cartUpdated"));
      
      toast(
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontFamily: 'var(--font-sans)' }}>
          <img src={item.url} alt={item.name} style={{ width: 40, height: 40, borderRadius: '5px', objectFit: 'cover' }} />
          <span style={{ fontSize: '14px', color: '#fff' }}>
            <span style={{color: '#4ade80', marginRight: '5px', fontSize: '16px'}}>✔</span> 
            {item.name} added to cart!
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

  const filters = [
    { label: "All Products", value: "all" },
    { label: "Chair", value: "chair" },
    { label: "Table", value: "table" },
    { label: "Sofa", value: "sofa" },
  ];

  const filteredProducts = products.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.product?.toLowerCase() === activeFilter;
  });

  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      
      <div className="product-page-header">
        <h1>Our Collection</h1>
        <p>Explore our wide range of premium furniture designed for comfort and style.</p>
      </div>

      <section className="product-grid-section" style={{ paddingTop: '20px' }}>
        <div className="product-filters">
          {filters.map(filter => (
            <button 
              key={filter.value} 
              className={`filter-btn ${activeFilter === filter.value ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-state">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="loading-state">No products found matching your search.</div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <Link to={`/product/${product.id}`} className="product-image-link" style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
                  <div className="product-image-container">
                    <img src={product.url} alt={product.name} />
                  </div>
                </Link>
                <button className="wishlist-btn" onClick={(e) => { e.preventDefault(); addToCart(product); }}>
                  <AiOutlineShoppingCart />
                </button>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">₹{product.price}</p>
                </div>
                <div className="product-rating">
                  <div className="stars">
                    <AiFillStar color="#ffc107" />
                    <AiFillStar color="#ffc107" />
                    <AiFillStar color="#ffc107" />
                    <AiFillStar color="#ffc107" />
                    <AiFillStar color="#ffc107" />
                  </div>
                  <span>{product.rating} / 5</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />

    </motion.div>
  );
}
