import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Brush, ArrowLeft } from 'lucide-react';
import { signInWithEmail, signInWithGoogle } from '../firebase/auth';
import './Login.css'; // Import standard CSS

// Simple Input Component
const AuthInput = ({ id, label, type = 'text', placeholder, value, onChange, error, rightElement }) => (
  <div className="form-group">
    <label htmlFor={id} className="form-label">{label}</label>
    <div className="input-container">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`form-input ${error ? 'error' : ''}`}
      />
      {rightElement && (
        <div className="icon-wrapper">
          {rightElement}
        </div>
      )}
    </div>
    {error && <p className="error-text">{error}</p>}
  </div>
);

// Social Button Component
const SocialBtn = ({ onClick, disabled, children }) => (
  <button type="button" onClick={onClick} disabled={disabled} className="social-btn">
    {children}
  </button>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [id]: type === 'checkbox' ? checked : value }));
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setIsLoading(true);
    const { user, error } = await signInWithEmail(formData.email, formData.password);
    setIsLoading(false);
    
    if (error) toast.error(error);
    else if (user) { toast.success('Welcome back! 🎨'); navigate('/dashboard'); }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    const { user, error } = await signInWithGoogle();
    setGoogleLoading(false);
    if (error) toast.error(error);
    else if (user) { toast.success('Welcome back!'); navigate('/dashboard'); }
  };

  return (
    <div className="login-page">
      {/* LEFT PANEL - ARTWORK */}
      <div className="login-left-panel">
        <img
          src="https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=900&q=85"
          alt="Artists in a warm studio"
          className="login-image"
        />
        <div className="login-overlay"></div>
        <div className="login-logo">
          <div className="logo-icon">
            <Brush size={18} color="white" />
          </div>
          <span>StudioSquad</span>
        </div>
        <div className="login-quote">
          <h2>Your squad is<br />waiting for you.</h2>
          <p>Log back in and keep creating with your community.</p>
          <div className="testimonial">
            <p>"StudioSquad changed my life. I went from lurking on Instagram to running my own artist community in 3 months."</p>
            <div className="testimonial-author">
              <div className="author-avatar">AK</div>
              <div className="author-info">
                <h4>Arjun K.</h4>
                <span>Digital Artist · Mumbai</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - FORM */}
      <div className="login-right-panel">
        <Link to="/" className="back-link">
          <ArrowLeft size={15} /> Back to Home
        </Link>

        {/* Mobile Header */}
        <div className="mobile-logo">
          <div className="logo-icon w-8 h-8 rounded-lg bg-[#d35400] flex items-center justify-center">
            <Brush size={16} color="white" />
          </div>
          <span>StudioSquad</span>
        </div>

        <div className="login-form-container">
          <h1 className="login-title">
            Join StudioSquad – <span className="text-orange">Build</span> your passion community
          </h1>

          <div className="social-buttons">
            <SocialBtn onClick={handleGoogleSignIn} disabled={googleLoading}>
              <GoogleIcon />
              {googleLoading ? 'Signing in...' : 'Continue with Google'}
            </SocialBtn>
            <SocialBtn onClick={() => toast('Apple sign-in coming soon!')} disabled={false}>
              <AppleIcon />
              Continue with Apple
            </SocialBtn>
          </div>

          <div className="divider">
            <div className="divider-line"></div>
            <span>or</span>
            <div className="divider-line"></div>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <AuthInput
              id="email"
              label="Username"
              type="email"
              placeholder="Type here"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <AuthInput
              id="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Type here"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              rightElement={
                <button type="button" onClick={() => setShowPassword(v => !v)} className="icon-button">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                Remember me
              </label>
              <button type="button" onClick={() => toast('Password reset coming soon!')} className="forgot-link">
                Forgot Password?
              </button>
            </div>

            <button type="submit" disabled={isLoading} className="submit-btn">
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="divider" style={{marginTop: '2rem'}}>
            <div className="divider-line"></div>
          </div>

          <div className="signup-link-container">
            Don't have an account? <Link to="/signup">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
