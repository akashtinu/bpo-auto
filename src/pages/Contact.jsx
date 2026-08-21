import React, { useState } from 'react';
import { Mail, Phone, Send, CheckCircle, MessageCircle } from 'lucide-react';
import { api } from '../utils/api';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
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
    <div className="contact-page" style={{ paddingBottom: '5rem' ,padding:'2rem'}}>
      {/* Hero */}
      <section className="hero-section container" style={{ paddingBottom: '3rem' }}>
        <h1 className="hero-title" style={{ fontSize: '3rem' }}>Contact BPO Auto Accept</h1>
        <p className="hero-subtitle">
          Get in Touch with Our BPO Auto Acceptance Experts
        </p>
      </section>

      <section  style={{ marginBottom: '4rem' }}>
        <div className="contact-layout " style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'start'}}>
          
          {/* Contact Form */}
          <div className="contact-form-column glass-panel " style={{ padding: '2.5rem', position: 'sticky', top: '100px' }}>
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
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.75rem' }}>Enquire us</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>To get start</p>

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
                    style={{ resize: 'vertical', minHeight: '140px' }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1.1rem' }}>
                  {loading ? 'Sending...' : <><Send size={18} /> Send Message</>}
                </button>
              </form>
            )}
          </div>

          {/* Content Block */}
          <div  style={{ display: 'flex', flexDirection: 'column', gap: '2rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
            <div>
              <p style={{ marginBottom: '1rem' }}>
                Need a faster and more efficient way to capture Broker Price Opinion (BPO) and appraisal orders? Our team is here to help. Whether you have questions about our BPO Auto Accept Software, need assistance with setup, or want to learn more about our BPO Order Capture solutions, we’re ready to assist you.
              </p>
              <p>
                We are committed to providing fast, reliable, and secure BPO Auto Acceptance services that help real estate professionals, brokers, appraisers, lenders, and valuation companies improve productivity, increase order acceptance rates, and streamline order management.
              </p>
            </div>
            
            <div>
              <h2 style={{ fontSize: '1.75rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Why Contact BPO Auto Accept?</h2>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>Expert guidance on BPO Auto Acceptance Software</li>
                <li>Assistance with account setup and configuration</li>
                <li>Information about BPO Order Capture and real-time monitoring</li>
                <li>Support for customized order preferences and automation</li>
                <li>Fast, friendly, and responsive customer service</li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontSize: '1.75rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Let's Grow Your Business Together</h2>
              <p style={{ marginBottom: '1rem' }}>
                Looking for a trusted BPO Auto Acceptance solution? Our cloud-based platform automatically monitors supported vendor portals and captures eligible Broker Price Opinion (BPO) and appraisal orders based on your customized preferences—helping you secure more assignments while reducing manual effort.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                Whether you’re just getting started with BPO automation or want to optimize your existing workflow, our experienced team is ready to help you improve efficiency, maximize your earning potential, and stay competitive in the real estate valuation industry.
              </p>
              <p>
                Contact us today to discover how our intelligent BPO Auto Acceptance solutions can help you capture more orders, save valuable time, and grow your business with confidence.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div className="feature-icon-wrapper" style={{ marginBottom: 0, flexShrink: 0 }}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 style={{ marginBottom: '0.25rem' }}>Our mail:</h4>
                    <a href="mailto:info@autoacceptbpo.com" style={{ color: 'var(--primary)', fontSize: '1.1rem', fontWeight: '500' }}>
                      info@autoacceptbpo.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div className="feature-icon-wrapper" style={{ marginBottom: 0, flexShrink: 0 }}>
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h4 style={{ marginBottom: '0.25rem' }}>Whatsapp</h4>
                    <a href="https://wa.me/+917598400285" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontSize: '1.1rem', fontWeight: '500' }}>
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
