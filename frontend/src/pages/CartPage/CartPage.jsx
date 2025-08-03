import React, { useState } from 'react';
import './CartPage.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import CartItem from '../../components/CartItem/CartItem';
import camera from '../../assets/images/camera.jpg';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: camera,
      title: 'Sample Product 1',
      price: 29.99,
      quantity: 2,
    },
    {
      id: 2,
      image: camera,
      title: 'Sample Product 2',
      price: 49.99,
      quantity: 1,
    },
  ]);

  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <h1>Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => <CartItem key={item.id} item={item} onRemove={handleRemove} />)
        )}

        <div className="cart-summary">
          <div className="summary-column">
            <h3>Item numbers:</h3>
            <div className="summary-box">{totalItems} items</div>
          </div>

          <div className="summary-column">
            <h3>Total price:</h3>
            <div className="summary-box">${totalPrice}</div>
          </div>

          <div className="summary-column buttons">
            <button className="continue-btn">Continue shopping</button>
            <button className="confirm-btn">Confirm Order</button>
          </div>
        </div>

        
        <div className="suggested-section">
          <h2 className="suggested-title">Suggest for you</h2>
          <div className="suggested-box"></div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CartPage;
