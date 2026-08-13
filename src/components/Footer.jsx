import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
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
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/order-capture">Order Capture</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contacts</Link></li>
              <li><Link to="/faq">Privacy Policy</Link></li>
              <li><Link to="/faq">Refund Policy</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Enquiry & Terms */}
          <div className="footer-column">
            <h4 style={{ color: 'var(--text-bright)', marginBottom: '1.25rem', fontSize: '1.1rem', fontWeight: 700 }}>
              Enquiry
            </h4>
            <ul className="footer-links">
              <li><Link to="/contact">Send Inquiry Form</Link></li>
              <li><Link to="/faq">Terms and conditions</Link></li>
            </ul>
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
