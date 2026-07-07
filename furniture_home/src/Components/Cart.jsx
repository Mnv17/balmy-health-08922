import { useState, useEffect } from "react";
import { Navbar } from './navbar';
import { Footer } from './footer';
import "./Cart.css";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Cart() {
	const [cartItems, setCartItems] = useState([]);

	useEffect(()=> {
		const storedCartItems = JSON.parse(localStorage.getItem("cartItems")); 
		if (storedCartItems) {
			setCartItems(storedCartItems);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
        window.dispatchEvent(new Event("cartUpdated"));
	}, [cartItems]);

	const handleRemoveFromCart = (id) => {
		const newCartItems = cartItems.filter((item) => item.id !== id);
		setCartItems(newCartItems);
	};

	const handleIncreaseQuantity = (id) => {
		const newCartItems = cartItems.map((item) => {
			if (item.id === id) {
				return { ...item, quantity: item.quantity + 1 };
			}
			return item;
		});
		setCartItems(newCartItems);
	};

	const handleDecreaseQuantity = (id) => {
		const newCartItems = cartItems.map((item) => {
			if (item.id === id) {
				return { ...item, quantity: item.quantity - 1 };
			}
			return item;
		}).filter((item) => item.quantity > 0);
		setCartItems(newCartItems);
	};

	const getTotalPrice = () => {
		return cartItems.reduce((total, item) => {
            const priceNum = typeof item.price === 'string' ? Number(item.price.replace(/,/g, "").replace(/[^0-9.-]+/g, "")) : Number(item.price);
			return total + priceNum * item.quantity;
		}, 0);
	};

	useEffect(() => {
		const totalPrice = cartItems.reduce((total, item) => {
            const priceNum = typeof item.price === 'string' ? Number(item.price.replace(/,/g, "").replace(/[^0-9.-]+/g, "")) : Number(item.price);
			return total + priceNum * item.quantity;
		}, 0);
		localStorage.setItem("cartTotal", JSON.stringify(totalPrice));
	}, [cartItems]);

	const isCartEmpty = cartItems.length === 0;

	return (
		<motion.div 
            className="page-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
			<Navbar />
			<div className="cart-page-wrapper">
                <div className="cart-header">
				    <h1>Your Shopping Cart</h1>
                </div>
				
				{isCartEmpty ? (
					<div className="empty-cart-message">
                        <p>Oops! You haven't selected anything yet.</p>
                        <Link to="/ProductPage" className="continue-shopping-btn">Continue Shopping</Link>
                    </div>
				) : (
                    <div className="cart-content-layout">
                        <div className="cart-items-list">
                            {cartItems.map((item) => (
                                <div className="sleek-cart-item" key={item.id}>
                                    <div className="item-image-wrapper">
                                        <img src={item.url} alt={item.name} />
                                    </div>
                                    <div className="item-info-wrapper">
                                        <div className="item-main-details">
                                            <h3>{item.name}</h3>
                                            <p className="item-unit-price">₹{item.price}</p>
                                        </div>
                                        <div className="item-actions">
                                            <div className="sleek-quantity-controls">
                                                <button onClick={() => handleDecreaseQuantity(item.id)} disabled={item.quantity === 1}>-</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                                            </div>
                                            <button className="sleek-remove-btn" onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary-sidebar">
                            <h2>Order Summary</h2>
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>₹{getTotalPrice().toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <hr />
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>₹{getTotalPrice().toFixed(2)}</span>
                            </div>
                            
                            <Link to="/payment" style={{textDecoration: 'none'}}>
                                <button className="sleek-checkout-btn">
                                    Proceed to Checkout
                                </button>
                            </Link>
                        </div>
                    </div>
				)}
			</div>
			<Footer />
		</motion.div>
	);
}
