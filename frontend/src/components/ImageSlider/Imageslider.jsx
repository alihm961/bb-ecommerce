import React, { useEffect, useState } from "react";
import "./Imageslider.css";
import img1 from "../../assets/images/heroSection1.jpg";
import img2 from "../../assets/images/heroSection2.jpg";
import img3 from "../../assets/images/heroSection4.jpg";
import searchIcon from "../../assets/images/search.svg"; 

const slides = [
  {
    image: img1,
    title: "Discover the Best Deals",
    subtitle: "Shop electronics, fashion, and more with unbeatable prices on all your favorite items.",
  },
  {
    image: img2,
    title: "Fast Delivery, Every Time",
    subtitle: "Get your products delivered right to your doorstep with speed and reliability guaranteed.",
  },
  {
    image: img3,
    title: "Quality You Can Trust",
    subtitle: "Only top-rated products from trusted sellers with exceptional reviews and satisfaction.",
  },
];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="slide-text">
            <h2>{slide.title}</h2>
            <p>{slide.subtitle}</p>
            <div className="search-bar">
              <input className="s-input"
                type="text"
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <img src={searchIcon} alt="search" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
