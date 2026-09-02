import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || 'AdRd-MNWRwMbiLzo5I0jcR0u1u9RmLvW2N_Cm_8dFnRSl7WvVelPl1qqSdIL6B-3WfqfwvipM2wk6gTW';
const PAYPAL_ENABLED = Boolean(PAYPAL_CLIENT_ID);

const CheckoutForm = () => {
  const { cartItems, cartTotal, clearCart, cartCount } = useCart();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    townCity: '',
    postcode: '',
    phone: '',
    email: '',
    orderNotes: '',
    paymentMethod: 'paypal',
    termsAccepted: false,
  });
 const [paymentMessage, setPaymentMessage] = useState({ type: '', text: '' });
  const [errors, setErrors] = useState({});

  const createPayPalOrder = async () => {
    const response = await api.post('/api/paypal/orders', {
      items: cartItems.map(item => ({ id: item.id, quantity: item.quantity }))
    });
    return response.order_id;
  };

  const capturePayPalOrder = async (data) => {
    try {
      await api.post('/api/paypal/capture', {
        order_id: data.orderID,
        items: cartItems.map(item => ({ id: item.id, quantity: item.quantity })),
        billing: {
          firstName: formData.firstName,
          townCity: formData.townCity,
          postcode: formData.postcode,
          phone: formData.phone,
          email: formData.email,
          orderNotes: formData.orderNotes,
        },
        order_notes: formData.orderNotes,
      });
      clearCart();
      setPaymentMessage({ type: 'success', text: 'Payment completed successfully. Thank you for your order.' });
    } catch (error) {
      setPaymentMessage({ type: 'error', text: error.message });
      throw error;
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.townCity.trim()) newErrors.townCity = 'Town/City is required';
    if (!formData.postcode.trim()) newErrors.postcode = 'Postcode/ZIP is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must agree to the terms and conditions';
    }
    return newErrors;
  };

  const isFormReadyForPayment = Object.keys(validateForm()).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Handle form submission - e.g., send to API
    console.log('Form submitted:', formData);
    // You can add your API call here
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <form onSubmit={handleSubmit}>
        <div className="simulate-order-layout" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
        }}>
          {/* Billing Details Section */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h2 className="section-header" style={{ 
              textAlign: 'left', 
              marginBottom: '1.5rem',
              fontSize: '1.75rem',
              fontWeight: '700'
            }}>
              Billing details
            </h2>

            <div className="billing-form">
              {/* First Name */}
              <div className="form-group">
                <label className="form-label" htmlFor="firstName">
                  First name <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={`form-input ${errors.firstName ? 'error' : ''}`}
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                  style={{
                    borderColor: errors.firstName ? 'var(--danger)' : '',
                  }}
                />
                {errors.firstName && (
                  <div style={{ 
                    color: 'var(--danger)', 
                    fontSize: '0.85rem', 
                    marginTop: '0.25rem' 
                  }}>
                    {errors.firstName}
                  </div>
                )}
              </div>

              {/* Town/City */}
              <div className="form-group">
                <label className="form-label" htmlFor="townCity">
                  Town / City <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input
                  type="text"
                  id="townCity"
                  name="townCity"
                  className={`form-input ${errors.townCity ? 'error' : ''}`}
                  value={formData.townCity}
                  onChange={handleInputChange}
                  placeholder="Enter your town or city"
                  style={{
                    borderColor: errors.townCity ? 'var(--danger)' : '',
                  }}
                />
                {errors.townCity && (
                  <div style={{ 
                    color: 'var(--danger)', 
                    fontSize: '0.85rem', 
                    marginTop: '0.25rem' 
                  }}>
                    {errors.townCity}
                  </div>
                )}
              </div>

              {/* Postcode/ZIP */}
              <div className="form-group">
                <label className="form-label" htmlFor="postcode">
                  Postcode / ZIP <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input
                  type="text"
                  id="postcode"
                  name="postcode"
                  className={`form-input ${errors.postcode ? 'error' : ''}`}
                  value={formData.postcode}
                  onChange={handleInputChange}
                  placeholder="Enter your postcode or ZIP"
                  style={{
                    borderColor: errors.postcode ? 'var(--danger)' : '',
                  }}
                />
                {errors.postcode && (
                  <div style={{ 
                    color: 'var(--danger)', 
                    fontSize: '0.85rem', 
                    marginTop: '0.25rem' 
                  }}>
                    {errors.postcode}
                  </div>
                )}
              </div>

              {/* Phone */}
              <div className="form-group">
                <label className="form-label" htmlFor="phone">
                  Phone <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  style={{
                    borderColor: errors.phone ? 'var(--danger)' : '',
                  }}
                />
                {errors.phone && (
                  <div style={{ 
                    color: 'var(--danger)', 
                    fontSize: '0.85rem', 
                    marginTop: '0.25rem' 
                  }}>
                    {errors.phone}
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email address <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  style={{
                    borderColor: errors.email ? 'var(--danger)' : '',
                  }}
                />
                {errors.email && (
                  <div style={{ 
                    color: 'var(--danger)', 
                    fontSize: '0.85rem', 
                    marginTop: '0.25rem' 
                  }}>
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Additional Information */}
              <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  marginBottom: '1rem',
                  color: 'var(--text-bright)'
                }}>
                  Additional information
                </h3>

                <div className="form-group">
                  <label className="form-label" htmlFor="orderNotes">
                    Order notes <span style={{ color: 'var(--text-muted)', fontWeight: '400' }}>(optional)</span>
                  </label>
                  <textarea
                    id="orderNotes"
                    name="orderNotes"
                    className="form-input"
                    rows="4"
                    value={formData.orderNotes}
                    onChange={handleInputChange}
                    placeholder="Notes about your order, e.g. special notes for delivery."
                    style={{
                      resize: 'vertical',
                      minHeight: '80px',
                      fontFamily: 'var(--font-sans)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div>
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h2 style={{ 
                fontSize: '1.75rem', 
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: 'var(--text-bright)'
              }}>
                Your order
              </h2>

              {/* Order Table */}
              <div style={{
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: '1.5rem',
                background: 'rgba(6, 11, 19, 0.3)',
              }}>
                {/* Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1.25rem',
                  background: 'rgba(6, 11, 19, 0.5)',
                  borderBottom: '1px solid var(--border-color)',
                  fontWeight: '600',
                  color: 'var(--text-bright)',
                }}>
                  <span>Product</span>
                  <span>Subtotal</span>
                </div>

                {cartItems.length > 0 ? (
                  <>
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '0.75rem 1.25rem',
                          borderBottom: '1px solid var(--border-color)',
                        }}
                      >
                        <span style={{ color: 'var(--text-main)' }}>
                          {item.name} <span style={{ color: 'var(--text-muted)' }}>× {item.quantity}</span>
                        </span>
                        <span style={{ color: 'var(--text-bright)', fontWeight: '500' }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </>
                ) : (
                  <div style={{ padding: '0.75rem 1.25rem', color: 'var(--text-muted)' }}>
                    Your cart is empty.
                  </div>
                )}

                {/* Totals */}
                <div style={{
                  padding: '0.75rem 1.25rem',
                  background: 'rgba(6, 11, 19, 0.3)',
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.25rem 0',
                    color: 'var(--text-main)',
                  }}>
                    <span>Subtotal ({cartCount} items)</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.5rem 0 0.25rem',
                    borderTop: '1px solid var(--border-color)',
                    marginTop: '0.25rem',
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    color: 'var(--text-bright)',
                  }}>
                    <span>Total</span>
                    <span style={{ 
                      background: 'linear-gradient(135deg, var(--secondary), var(--primary))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div>
                <h3 style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: '600', 
                  marginBottom: '1rem',
                  color: 'var(--text-bright)'
                }}>
                  Payment
                </h3>

                {/* PayPal Option */}
                <div style={{
                  padding: '1rem',
                  border: `1px solid ${formData.paymentMethod === 'paypal' ? 'var(--primary)' : 'var(--border-color)'}`,
                  borderRadius: '8px',
                  marginBottom: '1.5rem',
                  background: formData.paymentMethod === 'paypal' 
                    ? 'rgba(4, 146, 194, 0.05)' 
                    : 'rgba(255, 255, 255, 0.02)',
                  transition: 'var(--transition-smooth)',
                }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    cursor: 'pointer',
                  }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleInputChange}
                      style={{
                        accentColor: 'var(--primary)',
                        width: '18px',
                        height: '18px',
                        cursor: 'pointer',
                      }}
                    />
                    <div>
                      <strong style={{ color: 'var(--text-bright)', display: 'block' }}>
                        PayPal
                      </strong>
                      <span style={{ 
                        color: 'var(--text-muted)', 
                        fontSize: '0.9rem',
                        display: 'block',
                      }}>
                        Pay via PayPal.
                      </span>
                    </div>
                  </label>
                </div>

                {/* Terms and Conditions */}
                <div className="form-group" style={{
                  marginBottom: '1.5rem',
                }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    cursor: 'pointer',
                  }}>
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleInputChange}
                      style={{
                        marginTop: '0.25rem',
                        accentColor: 'var(--primary)',
                        width: '18px',
                        height: '18px',
                        flexShrink: 0,
                        cursor: 'pointer',
                      }}
                    />
                    <span style={{ 
                      color: errors.termsAccepted ? 'var(--danger)' : 'var(--text-main)',
                    }}>
                      I have read and agree to the website terms and conditions{' '}
                      <span style={{ color: 'var(--danger)' }}>*</span>
                    </span>
                  </label>
                  {errors.termsAccepted && (
                    <div style={{ 
                      color: 'var(--danger)', 
                      fontSize: '0.85rem', 
                      marginTop: '0.5rem',
                      marginLeft: '2.25rem',
                    }}>
                      {errors.termsAccepted}
                    </div>
                  )}
                </div>

                {/* Place Order Button */}
                {/* <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    borderRadius: '8px',
                    justifyContent: 'center',
                  }}
                >
                  Place Order
                </button> */}

                {paymentMessage.text && (
                  <div
                    role="status"
                    style={{
                      color: paymentMessage.type === 'success' ? 'var(--success)' : 'var(--danger)',
                      marginTop: '1rem',
                      fontSize: '0.9rem',
                    }}
                  >
                    {paymentMessage.text}
                  </div>
                )}

                {user && PAYPAL_ENABLED ? (
                  isFormReadyForPayment ? (
                    <div style={{ marginTop: '1rem' }}>
                      <PayPalButtons
                        style={{ layout: 'vertical', shape: 'rect', label: 'paypal' }}
                        forceReRender={[cartTotal, formData.firstName, formData.townCity, formData.postcode, formData.phone, formData.email, formData.termsAccepted]}
                        createOrder={createPayPalOrder}
                        onApprove={capturePayPalOrder}
                        onError={(error) => {
                          console.error('PayPal error:', error);
                          setPaymentMessage({ type: 'error', text: 'PayPal could not complete the payment. Please try again.' });
                        }}
                      />
                    </div>
                  ) : (
                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', fontSize: '0.9rem', marginTop: '1rem' }}>
                      Please fill in all billing details and accept the terms before paying with PayPal.
                    </p>
                  )
                ) : user ? (
                  <p style={{ color: 'var(--text-muted)', textAlign: 'center', fontSize: '0.9rem', marginTop: '1rem' }}>
                    PayPal is not configured yet. Add `VITE_PAYPAL_CLIENT_ID` to the frontend environment.
                  </p>
                ) : (
                  <p style={{ color: 'var(--text-muted)', textAlign: 'center', fontSize: '0.9rem', marginTop: '1rem' }}>
                    <Link to="/login" style={{ color: 'var(--primary)' }}>Log in</Link> to pay with PayPal.
                  </p>
                )}

                <Link to="/pricing" style={{ display: 'block', textAlign: 'center', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', marginTop: '1rem' }}>
                  Continue Shopping
                </Link>
                
                 
              </div>
            </div>
          </div>
        </div>
      </form>


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

export default CheckoutForm;