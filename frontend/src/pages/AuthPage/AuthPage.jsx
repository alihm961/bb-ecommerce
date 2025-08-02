
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, clearError } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import styles from './AuthPage.module.css';
import Input from '../../components/Input/Input';
import authImage from '../../assets/images/loginRegister.png';
import googleIcon from '../../assets/images/google.svg';

export default function AuthPage() {
const [isLogin, setIsLogin] = useState(true);
const [form, setForm] = useState({ username: '', email: '', password: '' });
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
      dispatch(registerUser({ username: form.username, email: form.email, password: form.password }));
    }
  };

const handleGoogleLogin = () => {
    console.log('Google login clicked');
};

return (
    <div className={styles.authContainer}>
      <div className={styles.imageWrapper}>
        <div className={styles.imageContainer}>
          <img src={authImage} alt="Auth visual" className={styles.authImage} />
        </div>
      </div>

      <div className={styles.formWrapper}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>{isLogin ? 'Login' : 'Create Account'}</h1>

          <form onSubmit={handleSubmit} className={styles.form}>
            {!isLogin && (
              <Input
                type="text"
                id="username"
                name="username"
                label="Username"
                placeholder="Enter your username"
                value={form.username}
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
              <div className={styles.forgotPasswordContainer}>
                <a href="/forgot-password" className={styles.forgotPassword}>Forgot password?</a>
            </div>
            )}

            <button type="submit" className={styles.authButton} disabled={loading}>
            {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
            </button>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.orDivider}>
            <span className={styles.orLine}></span>
            <span className={styles.orText}>or</span>
            <span className={styles.orLine}></span>
            </div>

            <button type="button" className={styles.googleButton} onClick={handleGoogleLogin}>
            <img src={googleIcon} alt="Google icon" className={styles.googleIcon} />
            Continue with Google
            </button>
        </form>

        <p className={styles.toggleText}>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <span onClick={toggleMode} className={styles.toggleLink}>
            {isLogin ? ' Register' : ' Login'}
            </span>
        </p>
        </div>
    </div>
    </div>
);
}
