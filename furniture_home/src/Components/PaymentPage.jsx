import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import "./PaymentPage.css";
import { motion } from 'framer-motion';

const formatCardNumber = (value) => {
    return value
        .replace(/\s?/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
};

const isCardExpired = (expiry) => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear() % 100;

    if (expiry.length !== 5 || expiry.indexOf('/') !== 2) {
        return false;
    }

    const [monthStr, yearStr] = expiry.split('/');
    const expMonth = parseInt(monthStr, 10);
    const expYear = parseInt(yearStr, 10);

    if (isNaN(expMonth) || isNaN(expYear) || expMonth < 1 || expMonth > 12) {
        return false;
    }

    if (expYear < currentYear) {
        return true;
    }

    if (expYear === currentYear && expMonth < currentMonth) {
        return true;
    }

    return false;
};


export function PaymentPage() {
    const [cartTotal, setCartTotal] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("card"); 
    
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const cardExpired = isCardExpired(expiry);

    const [upiId, setUpiId] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const total = JSON.parse(localStorage.getItem("cartTotal"));
        if (total) {
            setCartTotal(total);
        }
    }, []);
    
    const handleExpiryChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        
        if (value.length <= 5) {
            setExpiry(value);
        }
    };


    const handlePayment = async (e) => {
        e.preventDefault();
        setPaymentStatus(null);
        
        if (paymentMethod === 'card') {
            if (!cardNumber || !expiry || !cvv) {
                setPaymentStatus("Please fill in all card details.");
                return;
            }
            if (cardExpired) {
                setPaymentStatus("Error: Your card is expired. Please use a valid card.");
                return;
            }
            if (cardNumber.replace(/\s/g, '').length < 16) {
                 setPaymentStatus("Error: Card number is incomplete.");
                return;
            }
        } else if (paymentMethod === 'upi') {
            if (!upiId || !upiId.includes('@')) {
                setPaymentStatus("Please enter a valid UPI ID (VPA).");
                return;
            }
        }

        setIsLoading(true);
        setPaymentStatus(`Processing payment via ${paymentMethod.toUpperCase()}...`);

        await new Promise((resolve) => setTimeout(resolve, 2000));
        
        const isSuccess = Math.random() > 0.3;

        setIsLoading(false);

        if (isSuccess) {
            setPaymentStatus("Payment successful! Redirecting to home page...");
            localStorage.removeItem("cartItems"); 
            localStorage.removeItem("cartTotal"); 
            window.dispatchEvent(new Event("cartUpdated"));
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } else {
            setPaymentStatus(`Payment failed. Please check your ${paymentMethod.toUpperCase()} details and try again.`);
        }
    };

    return (
        <motion.div 
            className="page-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Navbar />
            <div className="payment-page-wrapper">
                <div className="payment-form-container">
                    <div className="payment-card-ui">
                        <h2>Secure Checkout</h2>
                        <p className="payment-subtitle">Complete your purchase securely</p>
                        
                        <div className="payment-order-summary">
                            <span>Amount to pay</span>
                            <h3>₹ {cartTotal.toFixed(2)}</h3>
                        </div>

                        <div className="payment-method-tabs">
                            <button 
                                type="button" 
                                className={`sleek-tab ${paymentMethod === 'card' ? 'active' : ''}`}
                                onClick={() => setPaymentMethod('card')}
                            >
                                Credit / Debit Card
                            </button>
                            <button 
                                type="button" 
                                className={`sleek-tab ${paymentMethod === 'upi' ? 'active' : ''}`}
                                onClick={() => setPaymentMethod('upi')}
                            >
                                UPI Payment
                            </button>
                        </div>
                        
                        <form onSubmit={handlePayment} className="sleek-payment-form">
                            {paymentMethod === 'card' && (
                                <div className="card-input-group">
                                    <div className="sleek-input-wrapper">
                                        <label>Card Number</label>
                                        <input
                                            type="text"
                                            value={formatCardNumber(cardNumber)}
                                            onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, ""))}
                                            placeholder="0000 0000 0000 0000"
                                            maxLength="19"
                                            required
                                            inputMode="numeric"
                                        />
                                    </div>
                                    <div className="sleek-input-row">
                                        <div className="sleek-input-wrapper">
                                            <label>Expiry Date</label>
                                            <input
                                                type="text"
                                                value={expiry}
                                                onChange={handleExpiryChange}
                                                placeholder="MM/YY"
                                                maxLength="5"
                                                required
                                                inputMode="numeric"
                                            />
                                            {cardExpired && <span className="error-text">Card expired</span>}
                                        </div>
                                        <div className="sleek-input-wrapper">
                                            <label>CVV</label>
                                            <input
                                                type="text"
                                                value={cvv}
                                                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                                                placeholder="123"
                                                maxLength="3"
                                                required
                                                inputMode="numeric"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {paymentMethod === 'upi' && (
                                <div className="sleek-input-wrapper">
                                    <label>UPI ID</label>
                                    <input
                                        type="text"
                                        value={upiId}
                                        onChange={(e) => setUpiId(e.target.value)}
                                        placeholder="username@bank"
                                        required
                                    />
                                </div>
                            )}

                            <button type="submit" className="sleek-pay-btn" disabled={isLoading}>
                                {isLoading ? "Processing..." : `Pay ₹ ${cartTotal.toFixed(2)}`}
                            </button>
                        </form>
                        {paymentStatus && (
                            <div className={`status-message ${paymentStatus.includes('failed') || paymentStatus.includes('Error') || paymentStatus.includes('Please') ? 'error' : 'success'}`}>
                                {paymentStatus}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </motion.div>
    );
}