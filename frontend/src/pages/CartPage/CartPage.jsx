import React, { useState } from 'react';
import './CartPage.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import CartItem from '../../components/CartItem/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart, changeQuantity } from '../../store/cartslice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(changeQuantity({ id, quantity }));
  };

  const handleConfirmOrder = async () => {
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
    if (!token || !user_id) {
      setMessage('You must be logged in to confirm order');
      setMessageType('error');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/user/orders',
        {
          user_id,
          products: cartItems,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setMessage('Order confirmed successfully!');
      setMessageType('success');
      dispatch(clearCart());
    } catch (err) {
      console.error(err);
      setMessage('Order failed.');
      setMessageType('error');
    }
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <h1>Your Shopping Cart</h1>

        {message && (
          <div className={`cart-message ${messageType}`}>
            {message}
          </div>
        )}

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={() => dispatch(removeFromCart(item.id))}
              onQuantityChange={(newQty) => handleQuantityChange(item.id, newQty)}
            />
          ))
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
            <button className="continue-btn" onClick={handleContinueShopping}>
              Continue shopping
            </button>
            <button className="confirm-btn" onClick={handleConfirmOrder}>
              Confirm Order
            </button>
          </div>
        </div>

        <div className="suggested-section">
          <h2 className="suggested-title">Suggest for you</h2>
          <div className="suggested-box"></div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
