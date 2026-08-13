import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.phone);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ minHeight: 'calc(100vh - 73px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: '480px', textAlign: 'center' }}>
          <div className="glass-panel" style={{ padding: '3rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
            <h2 style={{ marginBottom: '0.75rem' }}>Registration Successful!</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              Your account has been created. Once our team reviews and activates your account after the one-time $75 signup fee, you can log in and start configuring your portals.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/login" className="btn btn-primary">Go to Login</Link>
              <Link to="/pricing" className="btn btn-secondary">View Pricing</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 73px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Create Your Account</h2>
          <p style={{ color: 'var(--text-muted)' }}>Join BPO Auto Accept and automate your order capture</p>
        </div>

        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '0.85rem 1rem', marginBottom: '1.25rem', color: 'var(--danger)', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-name">Full Name / Business Name *</label>
              <input id="reg-name" name="name" type="text" className="form-input" placeholder="John Doe Appraisals" value={form.name} onChange={handleChange} required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="reg-email">Email Address *</label>
                <input id="reg-email" name="email" type="email" className="form-input" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="reg-phone">Phone Number</label>
                <input id="reg-phone" name="phone" type="tel" className="form-input" placeholder="+1 (555) 000-0000" value={form.phone} onChange={handleChange} />
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
                />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-confirm">Confirm Password *</label>
              <input id="reg-confirm" name="confirm" type={showPass ? 'text' : 'password'} className="form-input" placeholder="Re-enter your password" value={form.confirm} onChange={handleChange} required />
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
  );
};

export default Register;
