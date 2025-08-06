import React, { useEffect, useState } from "react";
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './ProductDetailPage.css';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartslice";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      const response = await axios.get(`http://localhost:8000/api/v1/guest/products/${id}`);
      setProduct(response.data.data);
    };
    getProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value);
    if (val >= 1) setQuantity(val);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.name,
      price: product.price,
      quantity: quantity,
      image: `http://localhost:8000/storage/${product.image_url}`,
    }));
  };

  return (
    <div>
      <Navbar />
      <div className="product-container">
        <div className="product-content">
          <div className="product-image">
            <img src={`http://localhost:8000/storage/${product.image_url}`} alt="product" />
          </div>
          <div className="product-info">
            <label>Title</label>
            <input type="text" value={product.name || ''} readOnly />
            <label>Specification</label>
            <input type="text" value={product.category || ''} readOnly />
            <label>Price</label>
            <input type="text" value={product.price || ''} readOnly />
            <label>Stock</label>
            <input type="text" value={product.stock || ''} readOnly />
            <label>Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="quantity-input"
            />
            <button className="add-to-cart" onClick={handleAddToCart}>Add To Cart</button>
          </div>
        </div>

        <div className="product-description-wrapper">
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
