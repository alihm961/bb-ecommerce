import React from 'react';
import './Input.css';

const Input = ({ type, id, name, label, placeholder, value, onChange }) => (
  <div className="form-group">
    <label htmlFor={id} className="input-label">{label}</label>
    <input
      type={type}
      id={id}
      name={name}
      className="form-input"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default Input;