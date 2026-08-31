import React, { useState } from 'react';
import { X, UserCheck, ArrowRight } from 'lucide-react';

export const GoogleLogo = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

export const GoogleAuthModal = ({ isOpen, onClose, onSelectAccount, loading }) => {
  const [customMode, setCustomMode] = useState(false);
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');

  if (!isOpen) return null;

  const defaultAccount = {
    name: 'Yakash Tinu',
    email: 'yakashtinu@gmail.com',
    initial: 'Y'
  };

  const handleChooseDefault = () => {
    onSelectAccount(defaultAccount.email, defaultAccount.name);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customEmail) {
      onSelectAccount(customEmail, customName || customEmail.split('@')[0]);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '1rem'
    }}>
      <div style={{
        background: '#ffffff',
        color: '#202124',
        borderRadius: '16px',
        maxWidth: '440px',
        width: '100%',
        boxShadow: '0 24px 64px rgba(0, 0, 0, 0.4)',
        overflow: 'hidden',
        animation: 'fadeIn 0.2s ease-out'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '1.5rem 1.5rem 1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #e8eaed'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <GoogleLogo size={24} />
            <span style={{ fontWeight: 600, fontSize: '1.1rem', color: '#3c4043' }}>Sign in with Google</span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#5f6368',
              padding: '4px',
              borderRadius: '50%',
              display: 'flex'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '1.5rem' }}>
          <p style={{ color: '#5f6368', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.4' }}>
            Choose an account to continue to <strong style={{ color: '#202124' }}>BPO Auto Accept</strong>
          </p>

          {!customMode ? (
            <>
              {/* Quick Select Account Row */}
              <div
                onClick={handleChooseDefault}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid #dadce0',
                  cursor: 'pointer',
                  background: '#f8f9fa',
                  transition: 'background 0.2s, border-color 0.2s',
                  marginBottom: '1rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#e8f0fe';
                  e.currentTarget.style.borderColor = '#4285F4';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f8f9fa';
                  e.currentTarget.style.borderColor = '#dadce0';
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#1a73e8',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  flexShrink: 0
                }}>
                  {defaultAccount.initial}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, color: '#202124', fontSize: '0.95rem' }}>{defaultAccount.name}</div>
                  <div style={{ color: '#5f6368', fontSize: '0.82rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {defaultAccount.email}
                  </div>
                </div>
                <UserCheck size={18} color="#1a73e8" />
              </div>

              {/* Use Another Account Button */}
              <button
                onClick={() => setCustomMode(true)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: '#ffffff',
                  border: '1px solid #dadce0',
                  borderRadius: '10px',
                  color: '#1a73e8',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                Use another Google account <ArrowRight size={16} />
              </button>
            </>
          ) : (
            <form onSubmit={handleCustomSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#3c4043', marginBottom: '0.4rem' }}>
                  Google Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@gmail.com"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #dadce0',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    color: '#202124',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  autoFocus
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#3c4043', marginBottom: '0.4rem' }}>
                  Full Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #dadce0',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    color: '#202124',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setCustomMode(false)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: '#f1f3f4',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#3c4043',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    flex: 2,
                    padding: '0.75rem',
                    background: '#1a73e8',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {loading ? 'Signing in...' : 'Continue'}
                </button>
              </div>
            </form>
          )}

          <div style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: '#70757a', textAlign: 'center', lineHeight: '1.4' }}>
            To continue, Google will share your name and email with BPO Auto Accept.
          </div>
        </div>
      </div>
    </div>
  );
};
