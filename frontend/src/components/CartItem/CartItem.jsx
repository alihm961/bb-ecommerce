import React, { useState, useEffect } from 'react';
import './CartItem.css';
import deleteIcon from '../../assets/images/delete.svg';

const CartItem = ({ item, onRemove, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(item?.quantity || 1);

  useEffect(() => {
    if (item && quantity !== item.quantity) {
      onQuantityChange?.(item.id, quantity);
    }
  }, [quantity, item, onQuantityChange]);

  if (!item) return null;

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const totalPrice = (item.price * quantity).toFixed(2);

  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={item.image} alt={item.title} />
      </div>

      <div className="item-details">
        <div className="input-group">
          <label>Title</label>
          <input type="text" value={item.title} readOnly className="item-input" />
        </div>

        <div className="input-group">
          <label>Price</label>
          <input type="text" value={`$${item.price}`} readOnly className="item-input" />
        </div>

        <div className="input-group">
          <label>Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="item-input"
          />
        </div>
      </div>

      <div className="total-price-section">
        <div className="total-price-label">Total</div>
        <div className="total-price-value">${totalPrice}</div>
      </div>

      <button className="delete-btn" onClick={() => onRemove(item.id)}>
        <img src={deleteIcon} alt="Delete" className="delete-icon" />
      </button>
    </div>
  );
};

export default CartItem;
