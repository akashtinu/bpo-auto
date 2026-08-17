import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Eye, EyeOff, AlertCircle, X, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  const showMsg = (type, text) => {
    setMsg({ type, text });
    setTimeout(() => setMsg({ type: '', text: '' }), 5000);
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg({ type: '', text: '' });

    if (form.password !== form.confirm) {
      showMsg('error', 'Passwords do not match.');
      return;
    }
    if (form.password.length < 6) {
      showMsg('error', 'Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.phone);
      navigate('/login', { state: { message: 'Registration Successful! Please log in.' } });
    } catch (err) {
      showMsg('error', err.message || 'Registration failed. Please try again.');
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
        <div style={{ width: '100%', maxWidth: '480px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Create Account</h2>
            <p style={{ color: 'var(--text-muted)' }}>Join BPO Auto Accept to capture more orders</p>
          </div>

          <div className="glass-panel" style={{ padding: '2.5rem' }}>
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
