import React from 'react';
import './Input.css';

const Input = ({
type = 'text',
id,
name,
label,
placeholder,
value,
onChange,
required = false
}) => {
return (
    <div className="form-group">
    {label && (
        <label htmlFor={id} className="input-label">
        {label}
        </label>
    )}
    <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="form-input"
        required={required}
    />
    </div>
);
};

export default Input;