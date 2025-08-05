import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import loginImage from '../../assets/images/loginRegister.png';
import googleIcon from '../../assets/images/google.svg';
import Input from '../../components/Input/Input';
import axios from 'axios';


const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://127.0.0.1:8000/api/v1/guest/login', formData, {
      headers: { 'Content-type': 'application/json' }
    });
    console.log();
    
    localStorage.setItem('user_id', response.data.data.user.id);
    localStorage.setItem('token', response.data.data.token);
    navigate('/');
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  return (
    <div className="login-container">
      <div className="login-image-wrapper">
        <div className="login-image-container">
          <img src={loginImage} alt="Login visual" className="login-image" />
        </div>
      </div>
      
      <div className="login-form-wrapper">
        <div className="login-form-container">
          <h1 className="login-title">Login</h1>
          
          <form onSubmit={handleSubmit} className="login-form">
            <Input
              type="text"
              id="email"
              name="email"
              label="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            
            <Input
              type="password"
              id="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            
            <div className="forgot-password-container">
              <a href="/forgot-password" className="forgot-password">forget password?</a>
            </div>
            
            <button type="submit" className="login-button">login</button>
            
            <div className="or-divider">
              <span className="or-line"></span>
              <span className="or-text">or</span>
              <span className="or-line"></span>
            </div>
            
            <button type="button" className="google-login-button" onClick={handleGoogleLogin}>
              <img src={googleIcon} alt="Google icon" className="google-icon" />
              continue with Google
            </button>
          </form>
          
          <p className="register-text">
            don't have an account? <a href="/register" className="register-link">register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;