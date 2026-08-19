import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Send } from 'lucide-react';
import { api } from '../utils/api';

const Footer = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFooterLinkClick = () => {
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/api/contact', form);
      setSuccess(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footer" style={{ borderTop: '1px solid var(--border-color)', background: '#03070b', padding: '4rem 0 2rem' }}>
      <div className="container">
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          
          {/* Column 1: Brand & Contact */}
          <div className="footer-column">
            <h4 style={{ color: 'var(--text-bright)', marginBottom: '1.25rem', fontSize: '1.1rem', fontWeight: 700 }}>
              One Solution for BPO Order Capture
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
              Automating Broker Price Opinion (BPO) and appraisal order acceptance for high-performing real estate professionals.
            </p>
            <h5 style={{ color: 'var(--text-bright)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>Contact Us</h5>
            <ul className="footer-links">
              <li>
                <a href="https://bpoautoaccept.com/" target="_blank" rel="noopener noreferrer">Website : www.bpoautoaccept.com</a>
              </li>
              <li>
                <a href="mailto:info@bpoautoaccept.com">Email : info@bpoautoaccept.com</a>
              </li>
              <li>
                <Link to="/faq">Terms and conditions</Link>
              </li>
            </ul>
          </div>
          
          {/* Column 2: Quick Links */}
          <div className="footer-column">
            <h4 style={{ color: 'var(--text-bright)', marginBottom: '1.25rem', fontSize: '1.1rem', fontWeight: 700 }}>
              Quick Links
            </h4>
            <ul className="footer-links" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <li><Link to="/" onClick={handleFooterLinkClick}>Home</Link></li>
              <li><Link to="/about" onClick={handleFooterLinkClick}>About</Link></li>
              <li><Link to="/services" onClick={handleFooterLinkClick}>Services</Link></li>
              <li><Link to="/order-capture" onClick={handleFooterLinkClick}>Order Capture</Link></li>
              <li><Link to="/pricing" onClick={handleFooterLinkClick}>Pricing</Link></li>
              <li><Link to="/faq" onClick={handleFooterLinkClick}>FAQ</Link></li>
              <li><Link to="/contact" onClick={handleFooterLinkClick}>Contacts</Link></li>
              <li><Link to="/privacy-policy" onClick={handleFooterLinkClick}>Privacy Policy</Link></li>
              <li><Link to="/refund-policy" onClick={handleFooterLinkClick}>Refund Policy</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Enquiry & Terms */}
          <div className="footer-column">
            {/* <h4 style={{ color: 'var(--text-bright)', marginBottom: '1.25rem', fontSize: '1.1rem', fontWeight: 700 }}>
              Enquiry
            </h4> */}







<div className="contact-form-column glass-panel" style={{ padding: '2.5rem', position: 'sticky', top: '100px' }}>
            {success ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <CheckCircle size={56} style={{ color: 'var(--success)', marginBottom: '1.25rem', margin: '0 auto' }} />
                <h3 style={{ marginBottom: '0.75rem' }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Thank you for reaching out. We'll respond to your inquiry within one business day.
                </p>
                <button className="btn btn-secondary" onClick={() => setSuccess(false)}>Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* <h3 style={{ marginBottom: '0.5rem', fontSize: '1.75rem' }}>Enquire us</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>To get start</p> */}

                {error && (
                  <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '0.85rem 1rem', marginBottom: '1.25rem', color: 'var(--danger)', fontSize: '0.9rem' }}>
                    {error}
                  </div>
                )}

                <div className="form-group">
                  <input id="contact-name" name="name" className="form-input" type="text" placeholder="Enter your name" value={form.name} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                  <input id="contact-email" name="email" className="form-input" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <textarea
                    id="contact-message"
                    name="message"
                    className="form-input"
                    placeholder="Your Message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    style={{ resize: 'vertical', minHeight: '',maxHeight:'5rem' }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1.1rem' }}>
                  {loading ? 'Sending...' : <><Send size={18} />Enquiry</>}
                </button>
              </form>
            )}
          </div>





            {/* <ul className="footer-links">
              <li><Link to="/contact">Send Inquiry Form</Link></li>
              <li><Link to="/faq">Terms and conditions</Link></li>
            </ul> */}
          </div>

        </div>
        
        {/* Footer Bottom */}
        <div className="footer-bottom" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Copyright © 2025 <a href="https://bpoautoaccept.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: 600 }}>BPO Auto Accept</a> All Rights Reserved.
          </p>
          <p style={{ fontSize: '0.75rem', marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '800px', margin: '0.75rem auto 0' }}>
            Disclaimer: BPO Auto Accept is an independent BPO automation service. We are not sponsored by, associated with, or endorsed by Estreet, LRES, Homegenius, RRR, Clear Capital, Xome, or any other vendor platforms listed.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
