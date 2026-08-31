import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '286428664456-8qnci6bohofe5cdja5kpnc7gq3v0baj5.apps.googleusercontent.com';

const Register = () => {
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  // Use a ref so Google's stored callback always calls the latest version
  const handleGoogleSuccessRef = useRef(null);

  // Keep ref up to date on every render
  handleGoogleSuccessRef.current = async (response) => {
    setLoading(true);
    try {
      const user = await loginWithGoogle(response.credential, 'register');
      showToast({ type: 'success', title: 'Account Created!', message: 'Welcome! Your account has been set up successfully.' });
      setTimeout(() => navigate(user.role === 'admin' ? '/admin' : '/dashboard'), 1000);
    } catch (err) {
      setLoading(false);
      showToast({ type: 'error', title: 'Google Sign-Up Failed', message: err.message || 'Google sign-up failed. Please try again.' });
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

        const btnContainer = document.getElementById('official-google-register-btn');
        if (btnContainer) {
          btnContainer.innerHTML = '';
          window.google.accounts.id.renderButton(btnContainer, {
            theme: 'outline',
            size: 'large',
            type: 'standard',
            shape: 'rectangular',
            text: 'signup_with',
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

    if (form.password !== form.confirm) {
      showToast({ type: 'error', title: 'Passwords Do Not Match', message: 'Please make sure both passwords are identical.' });
      return;
    }
    if (form.password.length < 6) {
      showToast({ type: 'error', title: 'Password Too Short', message: 'Password must be at least 6 characters long.' });
      return;
    }

    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.phone);
      showToast({ type: 'success', title: 'Registration Successful!', message: 'Your account has been created. Please log in to continue.' });
      setTimeout(() => navigate('/login', { state: { message: 'Account created! Please sign in.' } }), 1500);
    } catch (err) {
      const errMsg = err.message || '';
      if (errMsg.toLowerCase().includes('already registered') || errMsg.toLowerCase().includes('already exists')) {
        showToast({
          type: 'error',
          title: 'Account Already Exists',
          message: 'This email is already registered. Please sign in or use a different email address.'
        });
      } else {
        showToast({
          type: 'error',
          title: 'Registration Failed',
          message: errMsg || 'Something went wrong. Please try again.'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ minHeight: 'calc(100vh - 73px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: '480px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Create Account</h2>
            <p style={{ color: 'var(--text-muted)' }}>Join BPO Auto Accept to capture more orders</p>
          </div>

          <div className="glass-panel" style={{ padding: '2.5rem' }}>

            {/* Official Google Sign-Up Button */}
            <div
              id="official-google-register-btn"
              style={{ width: '100%', display: 'flex', justifyContent: 'center', minHeight: '44px' }}
            />

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>OR SIGN UP WITH EMAIL</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="reg-name">Full Name / Business Name *</label>
                <input
                  id="reg-name"
                  name="name"
                  type="text"
                  className="form-input"
                  placeholder="John Doe Appraisals"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-email">Email Address *</label>
                  <input
                    id="reg-email"
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
                  <label className="form-label" htmlFor="reg-phone">Phone Number</label>
                  <input
                    id="reg-phone"
                    name="phone"
                    type="tel"
                    className="form-input"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="reg-password">Password *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="reg-password"
                    name="password"
                    type={showPass ? 'text' : 'password'}
                    className="form-input"
                    placeholder="Minimum 6 characters"
                    value={form.password}
                    onChange={handleChange}
                    required
                    style={{ paddingRight: '3rem' }}
                    autoComplete="new-password"
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

              <div className="form-group">
                <label className="form-label" htmlFor="reg-confirm">Confirm Password *</label>
                <input
                  id="reg-confirm"
                  name="confirm"
                  type={showPass ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Re-enter your password"
                  value={form.confirm}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
              </div>

              <div style={{ background: 'rgba(4,146,194,0.08)', borderRadius: '8px', padding: '0.85rem 1rem', marginBottom: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                By registering, you agree to our terms. A <strong style={{ color: 'var(--primary)' }}>one-time $75 activation fee</strong> applies before service begins.
              </div>

              <button
                id="register-submit"
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ width: '100%', justifyContent: 'center', padding: '0.9rem' }}
              >
                {loading ? 'Creating account...' : <><UserPlus size={18} /> Create Account</>}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '1.75rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
