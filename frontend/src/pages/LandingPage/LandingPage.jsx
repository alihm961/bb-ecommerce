import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ImageSlider from "../../components/ImageSlider/Imageslider";
import "./LandingPage.css";

import feature1 from "../../assets/images/fast.png";
import feature2 from "../../assets/images/sPayment.png";
import feature3 from "../../assets/images/bestPrice.png";
import feature4 from "../../assets/images/24.jpeg";
import feature5 from "../../assets/images/wideRange.jpg";

import gaming from "../../assets/images/Gaming.jpg";
import laptop from "../../assets/images/laptop.jpeg";
import mobile from "../../assets/images/phone.jpg";
import home from "../../assets/images/homeAppliance.jpg";

import user1 from "../../assets/images/woman.jpg";
import user2 from "../../assets/images/man.jpg";
import user3 from "../../assets/images/boy.jpg";

const features = [
  { image: feature1, title: " Fast & Reliable Delivery" },
  { image: feature2, title: "Secure Payments" },
  { image: feature3, title: "Best Price Guarantee" },
  { image: feature4, title: "24/7 Customer Support" },
  { image: feature5, title: "Wide Range of Electronics" },
];

const categories = [
  { image: gaming, title: "Gaming" },
  { image: laptop, title: "Laptop" },
  { image: mobile, title: "Mobile Phone" },
  { image: home, title: "Home Appliance" },
];

const feedbacks = [
  {
    image: user1,
    name: "Anna Zaki",
    age: "29 years",
    text:
      "I had a smooth shopping experience, great quality products, secure checkout, and timely delivery. Highly recommend this store for all your electronics needs!",
    color: "#6496CA",
  },
  {
    image: user2,
    name: "John Malik",
    age: "24 years",
    text:
      "Fantastic service! The delivery was quick and everything arrived safely. Definitely buying from here again.",
    color: "#17385A",
  },
  {
    image: user3,
    name: "Jad Ahmed",
    age: "24 years",
    text:
      "Very professional team and high-quality products. I'm impressed with the support I received!",
    color: "#5E7FA2",
  },
];

const LandingPage = () => {
  const [currentFeedback, setCurrentFeedback] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeedback((prev) => (prev + 1) % feedbacks.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar />
      <ImageSlider />

      <section className="features-section">
        <h2 className="section-title">Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-item" key={index}>
              <img src={feature.image} alt={feature.title} />
              <h3>{feature.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Categories</h2>
        <div className="features-grid">
          {categories.map((category, index) => (
            <div className="category-item" key={index}>
              <img src={category.image} alt={category.title} />
              <h3>{category.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="spacer-box"></section>

      <section className="feedback-section">
        <div
          className="feedback-card"
          style={{ backgroundColor: feedbacks[currentFeedback].color }}
        >
          <img
            src={feedbacks[currentFeedback].image}
            alt={feedbacks[currentFeedback].name}
            className="feedback-user-img"
          />
          <div className="feedback-content">
            <h3>{feedbacks[currentFeedback].name}</h3>
            <p className="feedback-age">{feedbacks[currentFeedback].age}</p>
            <p className="feedback-text">{feedbacks[currentFeedback].text}</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
    
  );
};

export default LandingPage;
