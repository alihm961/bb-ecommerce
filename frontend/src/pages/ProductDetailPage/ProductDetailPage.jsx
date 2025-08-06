import React, { useEffect, useState } from "react";
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Input from '../../components/Input/Input';
import camera from '../../assets/images/camera.jpg';
import './ProductDetailPage.css';
import { useParams } from "react-router-dom";
import axios from 'axios';

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  console.log(id);
  

  const getProduct = async() => {
    const response = await axios.get(`http://localhost:8000/api/v1/guest/products/${id}`);
    console.log(response.data.data);
    setProduct(response.data.data);
  }

  useEffect(() => {
    getProduct();
  }, [])

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity >= 1) {
      setProduct({...product, quantity: newQuantity});
    }
  };

  return (
    <div>
      <Navbar />
      <div className="product-container">
        <div className="product-content">
          <div className="product-image">
            <img src={`http://localhost:8000/storage/${product.image_url}`} alt="product-image" />
          </div>
          <div className="product-info">
            <label>Title</label>
            <input type="text" value={product.name} readOnly />

            <label>Specification</label>
            <input type="text" value={product.category} readOnly />

            <label>Price</label>
            <input type="text" value={product.price} readOnly />

            <label>Stock</label>
            <input type="text" value={product.stock} readOnly />

            <label>Quantity</label>
            <input
              type="number"
              min="1"
              value={product.quantity}
              onChange={handleQuantityChange}
              className="quantity-input"
            />

            <button className="add-to-cart">Add To Cart</button>
          </div>
        </div>

        <div className="product-description-wrapper">
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;