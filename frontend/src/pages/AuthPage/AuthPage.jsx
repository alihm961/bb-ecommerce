
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, clearError } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

import Input from '../../components/Input/Input';
import authImage from '../../assets/images/loginRegister.png';
import googleIcon from '../../assets/images/google.svg';

export default function AuthPage() {
const [isLogin, setIsLogin] = useState(true);
const [form, setForm] = useState({ name: '', email: '', password: '' });
const dispatch = useDispatch();
const navigate = useNavigate();
const { user, loading, error } = useSelector((state) => state.auth);

//redirect after successful login 
useEffect(() => {
    if (user) navigate('/');
}, [user, navigate]);

  // Clear errors when switching forms
const toggleMode = () => {
    setIsLogin(!isLogin);
    dispatch(clearError());
};

const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(loginUser({ email: form.email, password: form.password }));
    } else {
      if (form.password !== form.confirmPassword) return alert('Passwords do not match');
      dispatch(registerUser({ name: form.name, email: form.email, password: form.password,password_confirmation: form.confirmPassword }));
      
    }
  };

const handleGoogleLogin = () => {
    console.log('Google login clicked');
};

return (
    <div className="auth-container">
      <div className="auth-image-wrapper">
        <img src={authImage} alt="Authentication visual" className="auth-image" />
      </div>
      <div className="auth-form-wrapper">
        <div className="auth-form-container">
          <h1 className="auth-title">{isLogin ? 'Login' : 'Create Account'}</h1>

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <Input
                type="text"
                id="name"
                name="name"
                label="Name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                required
              />
              
            )}

            <Input
              type="email"
              id="email"
              name="email"
              label="Email"
              placeholder="username@example.com"
              value={form.email}
              onChange={handleChange}
              required
              />
              {error?.email && <p className="form-error">{error.email[0]}</p>}

            <Input
              type="password"
              id="password"
              name="password"
              label="Password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              required
            />
            {error?.password && <p className="form-error">{error.password[0]}</p>}

            {!isLogin && (
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                placeholder="********"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              
            )}

            {isLogin && (
              <div style={{ textAlign: 'right' }}>
                <a href="/forgot-password" className="forgot-password">Forgot password?</a>
              </div>
            )}

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
            </button>

            {error && (
          <div className="form-error">
          {error.message && <p>{error.message}</p>}
          {error.errors && Object.keys(error.errors).map((field) => (
          <p key={field}>{error.errors[field][0]}</p>
          ))}
        </div>
        )}


            <div className="auth-divider">
              <span></span>
              <p>or</p>
              <span></span>
            </div>

            <button type="button" className="btn btn-google" onClick={handleGoogleLogin}>
              <img src={googleIcon} alt="Google icon" />
              Continue with Google
            </button>
          </form>

          {/* Switch between login/register */}
          <p className="auth-toggle-text">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <span onClick={toggleMode}>
              {isLogin ? ' Register' : ' Login'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}