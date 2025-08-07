import React from 'react';
import './Footer.css';

import logo from '../../assets/images/whitelogo.svg'; 
import facebookIcon from '../../assets/images/facebook.svg';
import instagramIcon from '../../assets/images/instagram.svg';
import emailIcon from '../../assets/images/email.svg';
import telegramIcon from '../../assets/images/telegram.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <img src={logo} alt="Logo" className="footer-logo" />
        <span className="footer-title">ByteBazaar</span>
      </div>

      <div className="footer-icons">
        <img src={facebookIcon} alt="Facebook" />
        <img src={instagramIcon} alt="Instagram" />
        <img src={emailIcon} alt="Email" />
        <img src={telegramIcon} alt="Telegram" />
      </div>

      <div className="footer-bottom">
        © 2025 ByteBazaar. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;