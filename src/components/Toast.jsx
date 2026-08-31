import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

/**
 * Single Toast notification card.
 */
const ToastItem = ({ id, type = 'success', title, message, onClose, duration = 5000 }) => {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(handleClose, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setLeaving(true);
    setTimeout(onClose, 350);
  };

  const isSuccess = type === 'success';

  const theme = isSuccess
    ? {
        border: 'rgba(16, 185, 129, 0.7)',
        glow: 'rgba(16, 185, 129, 0.25)',
        bg: '#0c1a1a',
        iconBg: 'rgba(16, 185, 129, 0.2)',
        iconColor: '#10b981',
        titleColor: '#34d399',
        progressColor: '#10b981',
      }
    : {
        border: 'rgba(239, 68, 68, 0.7)',
        glow: 'rgba(239, 68, 68, 0.25)',
        bg: '#1c0d11',
        iconBg: 'rgba(239, 68, 68, 0.2)',
        iconColor: '#ef4444',
        titleColor: '#f87171',
        progressColor: '#ef4444',
      };

  return (
    <>
      <style>{`
        @keyframes toastSlideIn {
          0%   { opacity: 0; transform: translateY(-20px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes toastSlideOut {
          0%   { opacity: 1; transform: translateX(0) scale(1); }
          100% { opacity: 0; transform: translateX(120%) scale(0.9); }
        }
        @keyframes toastProgress {
          from { width: 100%; }
          to   { width: 0%; }
        }
        .toast-card {
          animation: toastSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .toast-card.leaving {
          animation: toastSlideOut 0.35s ease-in forwards;
        }
        .toast-close-icon:hover {
          background: rgba(255, 255, 255, 0.15) !important;
          color: #ffffff !important;
        }
      `}</style>

      <div
        className={`toast-card${leaving ? ' leaving' : ''}`}
        style={{
          position: 'relative',
          width: '380px',
          maxWidth: 'calc(100vw - 2rem)',
          backgroundColor: theme.bg,
          border: `1.5px solid ${theme.border}`,
          borderRadius: '12px',
          boxShadow: `0 12px 32px rgba(0, 0, 0, 0.7), 0 0 20px ${theme.glow}`,
          overflow: 'hidden',
          pointerEvents: 'auto',
          color: '#ffffff',
          fontFamily: 'var(--font-sans, system-ui, sans-serif)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', padding: '1rem 1.1rem' }}>
          {/* Icon */}
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: theme.iconBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: '0.05rem',
            }}
          >
            {isSuccess ? (
              <CheckCircle size={22} color={theme.iconColor} strokeWidth={2.5} />
            ) : (
              <XCircle size={22} color={theme.iconColor} strokeWidth={2.5} />
            )}
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h4 style={{ margin: 0, fontWeight: 700, fontSize: '0.95rem', color: theme.titleColor, lineHeight: 1.3 }}>
              {title}
            </h4>
            {message && (
              <p style={{ margin: '0.35rem 0 0', fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.45, wordBreak: 'break-word' }}>
                {message}
              </p>
            )}
          </div>

          {/* Close button */}
          <button
            className="toast-close-icon"
            onClick={handleClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#94a3b8',
              padding: '0.25rem',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              flexShrink: 0,
            }}
            title="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Bottom progress bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '3px',
            backgroundColor: theme.progressColor,
            borderRadius: '0 0 12px 12px',
            animation: `toastProgress ${duration}ms linear forwards`,
          }}
        />
      </div>
    </>
  );
};

/**
 * ToastContainer renders fixed at top right corner
 */
export const ToastContainer = ({ toasts, remove }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '1.5rem',
        right: '1.5rem',
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        pointerEvents: 'none',
      }}
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} {...t} onClose={() => remove(t.id)} />
      ))}
    </div>
  );
};

/**
 * ToastProvider context wrapper
 */
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback(({ type = 'success', title = '', message = '', duration = 5000 }) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} remove={removeToast} />
    </ToastContext.Provider>
  );
};

/**
 * Hook to trigger toast notifications anywhere in the app
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    // Return fallback for safety if context is missing
    return {
      showToast: ({ title, message, type }) => {
        console.warn('useToast called outside ToastProvider:', { title, message, type });
        alert(`${type === 'error' ? '❌' : '✅'} ${title}\n${message}`);
      },
      removeToast: () => {},
    };
  }
  return context;
};

export default ToastProvider;

