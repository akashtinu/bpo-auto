import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '286428664456-8qnci6bohofe5cdja5kpnc7gq3v0baj5.apps.googleusercontent.com';

const Login = () => {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  // Use a ref so Google's stored callback always calls the latest version
  const handleGoogleSuccessRef = useRef(null);

  useEffect(() => {
    if (location.state?.message) {
      showToast({ type: 'success', title: 'Registration Successful!', message: location.state.message });
      window.history.replaceState({}, document.title);
    }
  }, []);

  // Keep ref up to date on every render
  handleGoogleSuccessRef.current = async (response) => {
    setLoading(true);
    try {
      const user = await loginWithGoogle(response.credential, 'login');
      showToast({ type: 'success', title: 'Login Successful!', message: 'Welcome back! Redirecting to your dashboard...' });
      setTimeout(() => navigate(user.role === 'admin' ? '/admin' : '/dashboard'), 1000);
    } catch (err) {
      setLoading(false);
      showToast({ type: 'error', title: 'Google Login Failed', message: err.message || 'Google login failed. Please sign up first.' });
    }
  };

  // Initialize official Google Identity Services button once on mount
  useEffect(() => {
    // Stable wrapper that always calls the latest ref
    const stableCallback = (response) => {
      if (handleGoogleSuccessRef.current) {
        handleGoogleSuccessRef.current(response);
      }
    };

    const initGoogle = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: stableCallback,
          auto_select: false,
          cancel_on_tap_outside: true
        });

        const btnContainer = document.getElementById('official-google-btn');
        if (btnContainer) {
          btnContainer.innerHTML = '';
          window.google.accounts.id.renderButton(btnContainer, {
            theme: 'outline',
            size: 'large',
            type: 'standard',
            shape: 'rectangular',
            text: 'signin_with',
            logo_alignment: 'left',
            width: Math.max(200, Math.min(380, window.innerWidth - 80))
          });
        }
      }
    };

    if (window.google?.accounts?.id) {
      initGoogle();
    } else {
      const interval = setInterval(() => {
        if (window.google?.accounts?.id) {
          initGoogle();
          clearInterval(interval);
        }
      }, 250);
      return () => clearInterval(interval);
    }
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      showToast({ type: 'success', title: 'Login Successful!', message: 'Welcome back! Redirecting to your dashboard...' });
      setTimeout(() => navigate(user.role === 'admin' ? '/admin' : '/dashboard'), 1000);
    } catch (err) {
      const errMsg = err.message || '';
      if (errMsg.toLowerCase().includes('no account') || errMsg.toLowerCase().includes('not found')) {
        showToast({
          type: 'error',
          title: 'Account Not Found',
          message: 'No account registered with this email address. Please check your email or sign up.'
        });
      } else if (errMsg.toLowerCase().includes('incorrect password') || errMsg.toLowerCase().includes('password')) {
        showToast({
          type: 'error',
          title: 'Incorrect Password',
          message: 'The password you entered is incorrect. Please verify your password and try again.'
        });
      } else {
        showToast({
          type: 'error',
          title: 'Login Failed',
          message: errMsg || 'Please check your email and password.'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ minHeight: 'calc(100vh - 73px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: '440px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome Back</h2>
            <p style={{ color: 'var(--text-muted)' }}>Sign in to your BPO Auto Accept account</p>
          </div>

          <div className="glass-panel" style={{ padding: '2.5rem' }}>

            {/* Official Google Sign-In Button */}
            <div
              id="official-google-btn"
              style={{ width: '100%', display: 'flex', justifyContent: 'center', minHeight: '44px' }}
            />

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>OR CONTINUE WITH EMAIL</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="login-email">Email Address</label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="login-password">Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="login-password"
                    name="password"
                    type={showPass ? 'text' : 'password'}
                    className="form-input"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                    style={{ paddingRight: '3rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                  >
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                id="login-submit"
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ width: '100%', justifyContent: 'center', padding: '0.9rem', marginTop: '0.5rem' }}
              >
                {loading ? 'Signing in...' : <><LogIn size={18} /> Sign In</>}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '1.75rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Don't have an account?{' '}
                <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
