import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, CheckCircle, Trash2, Plus, Minus, AlertCircle } from 'lucide-react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || 'AdRd-MNWRwMbiLzo5I0jcR0u1u9RmLvW2N_Cm_8dFnRSl7WvVelPl1qqSdIL6B-3WfqfwvipM2wk6gTW';
const PAYPAL_ENABLED = Boolean(PAYPAL_CLIENT_ID);


const Cart = () => {
  // Get cart data from context
  const { cartItems, cartCount, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const [paymentMessage, setPaymentMessage] = useState({ type: '', text: '' });

  const createPayPalOrder = async () => {
    const response = await api.post('/api/paypal/orders', {
      items: cartItems.map(item => ({ id: item.id, quantity: item.quantity }))
    });
    return response.order_id;
  };

  const capturePayPalOrder = async (data) => {
    try {
      await api.post('/api/paypal/capture', { order_id: data.orderID });
      clearCart();
      setPaymentMessage({ type: 'success', text: 'Payment completed successfully. Thank you for your order.' });
    } catch (error) {
      setPaymentMessage({ type: 'error', text: error.message });
      throw error;
    }
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ paddingBottom: '5rem', minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
        <section className="hero-section container" style={{ paddingBottom: '2rem' }}>
          <h1 className="hero-title" style={{ fontSize: '3rem' }}>Your Cart</h1>
        </section>
        <section className="container" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: '600px', width: '100%' }}>
            <ShoppingCart size={64} style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', opacity: 0.5 }} />
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Your cart is empty</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Looks like you haven't added any portal integrations to your cart yet.
            </p>
            <Link to="/pricing" className="btn btn-primary">
              Browse Portals
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="cart-page" style={{ paddingBottom: '5rem', minHeight: '80vh' }}>
      <section className="hero-section container" style={{ paddingBottom: '2rem' }}>
        <h1 className="hero-title" style={{ fontSize: '3rem' }}>Your Cart</h1>
        <p className="hero-subtitle">{cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart</p>
      </section>

      <section className="container">
        <div className="cart-layout" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem', alignItems: 'start' }}>
          
          {/* Cart Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {cartItems.map((item) => (
              <div key={item.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)', flexShrink: 0 }}>
                  <img src={item.image} alt={item.name} width="100" height="100" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                
                <div style={{ flexGrow: 1 }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{item.name}</h3>
                  <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '1rem' }}>
                    ${item.price.toFixed(2)}
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', padding: '0.5rem', cursor: 'pointer' }}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span style={{ padding: '0 1rem', fontWeight: '500' }}>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', padding: '0.5rem', cursor: 'pointer' }}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', fontSize: '0.9rem' }}
                    >
                       <Trash2 size={16} />  
                    </button>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="glass-panel" style={{ padding: '2rem', position: 'sticky', top: '100px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Order Summary</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Subtotal ({cartCount} items)</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: '500' }}>Total</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>${cartTotal.toFixed(2)}</span>
            </div>
            
            <Link to="/checkout" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1.1rem', marginBottom: '1rem' }}>
              Proceed to Checkout
            </Link>

            {paymentMessage.text && (
              <div role="status" style={{ color: paymentMessage.type === 'success' ? 'var(--success)' : 'var(--danger)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                {paymentMessage.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />} {paymentMessage.text}
              </div>
            )}

            {user && PAYPAL_ENABLED ? (
              <PayPalButtons
                style={{ layout: 'vertical', shape: 'rect', label: 'paypal' }}
                forceReRender={[cartTotal]}
                createOrder={createPayPalOrder}
                onApprove={capturePayPalOrder}
                onError={(error) => {
                  console.error('PayPal error:', error);
                  setPaymentMessage({ type: 'error', text: 'PayPal could not complete the payment. Please try again.' });
                }}
              />
            ) : user ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', fontSize: '0.9rem' }}>
                PayPal is not configured yet. Add `VITE_PAYPAL_CLIENT_ID` to the frontend environment.
              </p>
            ) : (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', fontSize: '0.9rem' }}>
                <Link to="/login" style={{ color: 'var(--primary)' }}>Log in</Link> to pay with PayPal.
              </p>
            )}
            
            <Link to="/pricing" style={{ display: 'block', textAlign: 'center', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
              Continue Shopping
            </Link>
          </div>
          
        </div>
      </section>
      
      <style>{`
        @media (max-width: 992px) {
          section .container > div[style*="grid-template-columns: 1.5fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          section .container > div > div:last-child {
            position: static !important;
          }
        }
      `}</style>
    </div>
  );
};


export default Cart;
