import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Eye, EyeOff, AlertCircle, X, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  const showMsg = (type, text) => {
    setMsg({ type, text });
    setTimeout(() => setMsg({ type: '', text: '' }), 5000);
  };

  useEffect(() => {
    // Show success message passed from Register page via React Router state
    if (location.state?.message) {
      showMsg('success', location.state.message);
      // Clear the state so it doesn't show again on refresh
      window.history.replaceState({}, document.title);
    }
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: '', text: '' });
    try {
      const user = await login(form.email, form.password);
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      showMsg('error', err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {msg.text && (
        <div style={{
          position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 9999,
          padding: '1rem 1.5rem', borderRadius: '10px',
          background: msg.type === 'success' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
          border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}`,
          color: msg.type === 'success' ? 'var(--success)' : 'var(--danger)',
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', maxWidth: '380px'
        }}>
          {msg.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span style={{ fontSize: '0.9rem', flex: 1 }}>{msg.text}</span>
          <button onClick={() => setMsg({ type: '', text: '' })} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
            <X size={16} />
          </button>
        </div>
      )}

      <div style={{ minHeight: 'calc(100vh - 73px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: '440px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome Back</h2>
            <p style={{ color: 'var(--text-muted)' }}>Sign in to your BPO Auto Accept account</p>
          </div>

          <div className="glass-panel" style={{ padding: '2.5rem' }}>
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
                <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>Get Started</Link>
              </p>
            </div>

            <div style={{ marginTop: '1.25rem', background: 'rgba(4,146,194,0.08)', borderRadius: '8px', padding: '0.85rem 1rem', fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              <strong style={{ color: 'var(--primary)' }}>Demo credentials:</strong><br />
              Admin: admin@bpoautoaccept.com / admin123
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
