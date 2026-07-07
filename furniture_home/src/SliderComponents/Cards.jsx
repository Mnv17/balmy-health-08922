import { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from '../Components/navbar';
import { Footer } from '../Components/footer';
import FilterProducts from "./filter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Cards.css";

export function FurniturePage() {
  const [data, setData] = useState([]);
  const [updatedtedData, setUpdatedtedData] = useState([]);
  const [filterTextValue, updateFilterTextValue] = useState('all');
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    loadFurnituresData();
  }, []);

  const loadFurnituresData = async () => {
    try {
      const response = await axios.get(
        "https://json-work.onrender.com/furnitures"
      );
      setData(response.data);
      console.log(data)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  useEffect(() => {
    const updatedtedData = data.map((e) => {
      return {
        id: e.id,
        name: e.name,
        url: e.url,
        price: e.price,
        rating: e.rating,
        product: e.product,
      };
    });
    setUpdatedtedData(updatedtedData);
  }, [data]);

  const filteredData = updatedtedData.filter((item) => {
    if (filterTextValue === 'all') {
      return true;
    }
    return item.product.toLowerCase() === filterTextValue.toLowerCase();
  });

  function onFilterValueSelected(value) {
    updateFilterTextValue(value);
  }

  function addToCart(item) {
    const updatedCartItems = [...cartItems];
    const index = updatedCartItems.findIndex((cartItem) => cartItem.id === item.id);

    if (index >= 0) {
      updatedCartItems[index].quantity += 1;
    } else {
      updatedCartItems.push({
        id: item.id,
        name: item.name,
        url: item.url,
        price: item.price,
        quantity: 1,
      });
    }
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    // Show toast notification on add to cart
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

  return (
    <>
      <Navbar />
      <div className="FirstDiv">
        <h2>All Furnitures</h2>
      </div>

      <FilterProducts filterValueSelected={onFilterValueSelected} />

      {/* Show loading spinner if data is being fetched */}
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full border-t-4 border-primary border-t-primary h-12 w-12"></div>
        </div>
      ) : (
        <div className="furn-div">
          {filteredData.map((item) => (
            <div key={item.id} className="item">
              <img className="image" src={item.url} alt={item.name} />
              <p className="name">{item.name}</p>
              <p className="Price">Price: ₹{item.price}</p>
              <p className="ratings">Ratings: {item.rating}</p>
              <p className="product">Type: {item.product}</p>
              <button className="cart-button" onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      <Footer />

      {/* ToastContainer to display toast notifications */}

    </>
  );
}
