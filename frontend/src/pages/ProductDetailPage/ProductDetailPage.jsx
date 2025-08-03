import React, { useState } from "react";
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Input from '../../components/Input/Input';
import camera from '../../assets/images/camera.jpg';
import './ProductDetailPage.css';

const ProductDetails = () => {
  const [product, setProduct] = useState({
    title: "Canon EOS R50 V",
    specification: "Gaming",
    price: "$849",
    stock: "available",
    quantity: 1,
    image: camera, 
    description:
      "The Canon EOS R50 is a compact and beginner-friendly mirrorless camera designed for content creators and aspiring photographers. It features a 24.2MP APS-C CMOS sensor that delivers sharp, detailed images with vibrant colors. The camera supports 4K video recording at 30 frames per second, making it ideal for high-quality vlogging and video content. One of its standout features is Dual Pixel CMOS AF II, which provides fast and accurate autofocus, especially useful for tracking moving subjects during both photography and video. With its lightweight design and user-friendly interface, the EOS R50 is a great choice for those who want to create professional-looking content without a steep learning curve."
  });

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
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product-info">
            <label>Title</label>
            <input type="text" value={product.title} readOnly />

            <label>Specification</label>
            <input type="text" value={product.specification} readOnly />

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