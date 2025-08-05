import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import registerImage from '../../assets/images/loginRegister.png';
import Input from '../../components/Input/Input';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
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
    const response = await axios.post('http://127.0.0.1:8000/api/v1/guest/register', formData, {
      headers: { 'Content-type': 'application/json' }
    });
    localStorage.setItem('user_id', response.data.user.id);
    localStorage.setItem('token', response.data.token);
    navigate('/');
  };

  return (
    <div className="register-container">
      <div className="register-image-wrapper">
        <div className="register-image-container">
          <img src={registerImage} alt="Register visual" className="register-image" />
        </div>
      </div>
      
      <div className="register-form-wrapper">
        <div className="register-form-container">
          <h1 className="register-title">Create Account</h1>
          
          <form onSubmit={handleSubmit} className="register-form">
            <Input
              type="text"
              id="name"
              name="name"
              label="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
            
            <Input
              type="email"
              id="email"
              name="email"
              label="email"
              placeholder="username@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            
            <Input
              type="password"
              id="password"
              name="password"
              label="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
            />
            
            {/* <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              label="confirm password"
              placeholder="********"
              value={formData.confirmPassword}
              onChange={handleChange}
            /> */}
            
            <button type="submit" className="register-button">register</button>
            
            <p className="login-text">
              already have an account? <a href="/login" className="login-link">login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;