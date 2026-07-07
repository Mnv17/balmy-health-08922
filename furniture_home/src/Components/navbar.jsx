import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import "./navbar.css";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import logoImg from "./images/Logo.png";

export function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 50) {
        setIsHidden(false);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const updateCartCount = () => {
      const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
      setCartCount(items.reduce((total, item) => total + (item.quantity || 1), 0));
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    // Custom event for same-window updates
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, [lastScrollY]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/ProductPage?search=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  const renderNavLink = (to, text) => (
    <li>
      <Link to={to} className="nav-cuboid">
        <span className="cuboid-text-hidden">{text}</span>
        <div className="cuboid-inner">
          <span className="cuboid-face front">{text}</span>
          <span className="cuboid-face back">{text}</span>
          <span className="cuboid-face top">{text}</span>
          <span className="cuboid-face bottom">{text}</span>
        </div>
      </Link>
    </li>
  );

  return (
    <div className={`navbar-container ${isHidden ? 'hidden' : ''}`}>
      <div className="navbar-pill-group">
        
        <div className="pill-logo">
          <Link to="/">
            <div className="logo-circle">
              <img src={logoImg} alt="Logo" />
            </div>
          </Link>
        </div>
        
        <div className="pill-links">
          <ul className="navbar-links">
            {renderNavLink("/", "Home")}
            {renderNavLink("/ProductPage", "Shop")}
            {renderNavLink("/about", "About Us")}
            {renderNavLink("/contact", "Contact")}
            {renderNavLink("/distributors", "Distributors")}
          </ul>
        </div>
        
        <div className="pill-icons">
          <div className="neumorphic-search-container">
            {!showSearch ? (
              <button className="neumorphic-search-btn" onClick={() => setShowSearch(true)}>
                Search <AiOutlineSearch className="neu-icon" /> in files
              </button>
            ) : (
              <form className="neumorphic-search-form" onSubmit={handleSearchSubmit}>
                <AiOutlineSearch className="neu-icon-left" />
                <input 
                  type="text" 
                  className="neumorphic-search-input" 
                  placeholder="Search" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button type="button" className="neu-close-btn" onClick={() => { setShowSearch(false); setSearchQuery(""); }}>
                  &times;
                </button>
              </form>
            )}
          </div>
          
          <Link to="/CartPage" className="icon-btn cart-icon-wrapper">
            <AiOutlineShoppingCart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          {currentUser ? (
            <button className="icon-btn" onClick={() => navigate('/profile')}>
              <AiOutlineUser />
            </button>
          ) : (
            <button className="icon-btn" onClick={() => navigate('/login')}>
              <AiOutlineUser />
            </button>
          )}
        </div>
        
      </div>
    </div>
  );
}