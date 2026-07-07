import React, { useState, useEffect } from 'react';
import './ProductGrid.css';
import { AiFillStar, AiOutlineShoppingCart } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const chairImg = 'https://res.cloudinary.com/pio6tqwc/image/upload/v1782908545/hero_armchair_qakhmr.jpg';
const sofaImg = 'https://res.cloudinary.com/pio6tqwc/image/upload/v1782908542/hero_sofa_1782219496590_nq8zgz.jpg';
const tableImg = 'https://res.cloudinary.com/pio6tqwc/image/upload/v1782908533/dining_room_lipdlk.jpg';
const almirahImg = 'https://res.cloudinary.com/pio6tqwc/image/upload/v1782908532/entryway_qzgdjp.jpg';
const comboImg = 'https://res.cloudinary.com/pio6tqwc/image/upload/v1782908534/living_room_urg3sb.jpg';

export function ProductGrid() {
  const [activeFilter, setActiveFilter] = useState('chair');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://json-work.onrender.com/furnitures"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (item, e) => {
    e.preventDefault();
    e.stopPropagation();

    const items = JSON.parse(localStorage.getItem("cartItems") || "[]");

    const existing = items.find(i => i.id === item.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({
        id: item.id,
        name: item.name,
        url: item.url,
        price: item.price,
        quantity: 1
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(items));
    window.dispatchEvent(new Event("cartUpdated"));

    toast(
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          fontFamily: 'var(--font-sans)'
        }}
      >
        <img
          src={item.url}
          alt={item.name}
          style={{
            width: 40,
            height: 40,
            borderRadius: '5px',
            objectFit: 'cover'
          }}
        />

        <span
          style={{
            fontSize: '14px',
            color: '#fff'
          }}
        >
          <span
            style={{
              color: '#4ade80',
              marginRight: '5px',
              fontSize: '16px'
            }}
          >
            ✔
          </span>

          {item.name} added to cart!
        </span>
      </div>,
      {
        position: "top-right",
        autoClose: 3000,
        style: {
          backgroundColor: '#111',
          color: '#fff',
          borderRadius: '25px',
          padding: '10px 20px'
        },
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        icon: false,
        closeButton: false
      }
    );
  };

  const handleMouseMove = (e) => {
    setCursorPos({
      x: e.clientX,
      y: e.clientY
    });
  };

  const filters = [
    {
      label: "Chair",
      value: "chair",
      image: chairImg
    },
    {
      label: "Sofa",
      value: "sofa",
      image: sofaImg
    },
    {
      label: "Table",
      value: "table",
      image: tableImg
    },
    {
      label: "Almirah",
      value: "wardrobe",
      image: almirahImg
    },
    {
      label: "Combos",
      value: "combo",
      image: comboImg
    }
  ];

  const filteredProducts = products.filter(item => {
    return item.product?.toLowerCase() === activeFilter;
  });

  return (
    <section className="product-grid-section">
      <div className="product-grid-header">
        <h2 className="product-grid-title">
          THE MOST SOUGHT-AFTER & HIGHLY
          <br />
          VALUED PRODUCT
        </h2>

        <p className="product-grid-subtitle">
          Discover the most trending products that our customers love to buy.
        </p>

        <div className="category-filters-grid">
          {filters.map(filter => (
            <div
              key={filter.value}
              className={`category-filter-card ${
                activeFilter === filter.value ? 'active' : ''
              }`}
              onClick={() => setActiveFilter(filter.value)}
            >
              <div className="category-image-container">
                <img
                  src={filter.image}
                  alt={filter.label}
                />
              </div>

              <div className="category-info">
                <span className="category-name">
                  {filter.label}
                </span>

                <BsArrowRight className="category-arrow" />
              </div>
            </div>
          ))}
        </div>

        <hr className="category-separator" />
      </div>

      {loading ? (
        <div className="loading-state">
          Loading products...
        </div>
      ) : (        <div className="product-grid">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="product-link"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block"
              }}
            >
              <div
                className="product-card"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                onMouseMove={handleMouseMove}
              >
                <div className="product-image-container">
                  <img
                    src={product.url}
                    alt={product.name}
                  />

                  <div className="category-overlay"></div>

                  <button
                    className="wishlist-btn"
                    onClick={(e) => addToCart(product, e)}
                  >
                    <AiOutlineShoppingCart />
                  </button>

                  {hoveredProduct === product.id && (
                    <div
                      className="custom-cursor"
                      style={{
                        left: `${cursorPos.x}px`,
                        top: `${cursorPos.y}px`
                      }}
                    >
                      VIEW
                    </div>
                  )}
                </div>

                <div className="product-info">
                  <h3 className="product-name">
                    {product.name}
                  </h3>

                  <p className="product-price">
                    ₹{product.price}
                  </p>
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
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}