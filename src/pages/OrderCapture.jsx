import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Sliders, Layers, DollarSign, CheckCircle } from 'lucide-react';

const OrderCapture = () => {
  return (
    <div style={{ paddingBottom: '5rem' }}>
      
      {/* ─── Hero Section ─── */}
      <section className="hero-section container" style={{ paddingBottom: '2.5rem' }}>
        <div className="hero-badge">
          <Zap size={14} style={{ marginRight: '4px' }} /> BPO Order Capture
        </div>
        <h1 className="hero-title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Capture Every BPO & Appraisal Opportunity with Intelligent Automation
        </h1>
        <p className="hero-subtitle" style={{ fontSize: '1.15rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
          Missing valuable Broker Price Opinion (BPO) or appraisal orders can mean lost revenue. Our advanced BPO Order Capture solution is designed to help real estate professionals secure more assignments through real-time monitoring and intelligent BPO Auto Acceptance.
        </p>
      </section>

      {/* ─── Sub-Hero Text & Intro ─── */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div className="glass-panel" style={{ padding: '2.5rem', background: 'rgba(16, 29, 47, 0.45)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
            <p>
              Powered by our cloud-based BPO Auto Accept Software, the system continuously monitors supported vendor portals 24/7 and instantly captures eligible orders based on your customized preferences. There’s no need to manually refresh pages or constantly watch for new assignments—our automation works for you around the clock.
            </p>
            <p>
              Whether you’re managing BPOs, appraisals, foreclosures, REO properties, or short sales, our automated BPO order capture technology streamlines your workflow, improves your order acceptance rate, and helps you stay ahead of the competition.
            </p>
            <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
              "Streamlined real estate valuation capture — built for speed, accuracy, and reliability."
            </p>
          </div>
        </div>
      </section>

      {/* ─── Why Choose Our BPO Order Capture Service? ─── */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.25rem' }}>Why Choose Our BPO Order Capture Service?</h2>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--text-main)', marginBottom: '1.5rem' }}>
              In the competitive Broker Price Opinion (BPO) and appraisal industry, every second matters. New assignments can disappear within moments, and even a slight delay may result in missed opportunities. Our BPO Order Capture Service combines real-time monitoring with intelligent BPO Auto Acceptance to instantly capture eligible orders based on your customized preferences—helping you secure more assignments while eliminating manual effort.
            </p>
            <Link to="/services" className="btn btn-primary">Learn More About Services</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div className="feature-icon-wrapper" style={{ margin: 0, flexShrink: 0 }}><Zap size={20} /></div>
              <div>
                <h4 style={{ margin: 0 }}>Instant Order Capture</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Secures orders the second they appear in the portals.</p>
              </div>
            </div>
            <div className="glass-card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div className="feature-icon-wrapper" style={{ margin: 0, flexShrink: 0 }}><Shield size={20} /></div>
              <div>
                <h4 style={{ margin: 0 }}>100% Cloud-Based Security</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>No software installation or browser setups required.</p>
              </div>
            </div>
            <div className="glass-card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div className="feature-icon-wrapper" style={{ margin: 0, flexShrink: 0 }}><Sliders size={20} /></div>
              <div>
                <h4 style={{ margin: 0 }}>Custom Preference Filters</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Accept only orders matching your exact fee & ZIP rules.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── Core Features Grid ─── */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div className="grid-3">
          
          <div className="glass-card">
            <div className="feature-icon-wrapper"><Zap size={22} /></div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--text-bright)' }}>Instant Order Capture</h3>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
              Our advanced BPO Auto Accept Software continuously monitors supported vendor portals and instantly captures eligible BPO and appraisal orders as soon as they become available. By eliminating manual refreshing and reducing response times, you can improve your order acceptance rate and stay ahead of the competition.
            </p>
          </div>

          <div className="glass-card">
            <div className="feature-icon-wrapper"><Layers size={22} /></div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--text-bright)' }}>Supports Leading BPO Platforms</h3>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
              Our cloud-based BPO Order Capture solution is compatible with many of the industry's leading BPO and appraisal vendor portals. It provides secure connectivity and reliable performance, allowing you to automate order monitoring and acceptance across supported platforms from a single solution.
            </p>
          </div>

          <div className="glass-card">
            <div className="feature-icon-wrapper"><Sliders size={22} /></div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--text-bright)' }}>Intelligent Order Filters</h3>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
              Take complete control of your workflow with fully customizable order preferences. Filter assignments by vendor, ZIP code, service area, property type, fee amount, turnaround time, and order category, ensuring you only capture Broker Price Opinion (BPO) and appraisal orders that match your business goals.
            </p>
          </div>

          <div className="glass-card">
            <div className="feature-icon-wrapper"><Shield size={22} /></div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--text-bright)' }}>100% Cloud-Based Automation</h3>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
              Our BPO Auto Acceptance Software operates entirely in the cloud, so there's nothing to install or maintain. Access your account from anywhere while our secure platform provides 24/7 real-time order monitoring and automated order capture around the clock.
            </p>
          </div>

          <div className="glass-card" style={{ gridColumn: 'span 2' }}>
            <div className="feature-icon-wrapper"><DollarSign size={22} /></div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--text-bright)' }}>Performance-Based Pricing</h3>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
              Only pay for successful results. Our transparent pricing model means you're charged only when an eligible order is successfully captured on your behalf. There are no unnecessary subscriptions or hidden costs—just dependable BPO automation that delivers measurable value.
            </p>
          </div>

        </div>
      </section>

      {/* ─── Why Professionals Choose BPO Auto Accept ─── */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div className="glass-panel" style={{ padding: '3rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.75rem', marginBottom: '1.25rem', color: 'var(--text-bright)' }}>
                Why Professionals Choose BPO Auto Accept
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Real estate professionals, appraisers, and valuation brokers choose us because we combine speed, reliability, and security to increase their capture efficiency.
              </p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                '24/7 Real-Time BPO Order Monitoring',
                'Instant Broker Price Opinion (BPO) Order Capture',
                'Cloud-Based BPO Auto Acceptance Software',
                'Custom Order Filters & Intelligent Automation',
                'Secure & Reliable Order Management',
                'Higher Acceptance Rates & Increased Productivity',
                'Performance-Based Pricing',
                'Designed for Real Estate Professionals, Brokers & Appraisers'
              ].map(item => (
                <div key={item} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <CheckCircle size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.92rem', color: 'var(--text-bright)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Call to Action ─── */}
      <section className="container" style={{ textAlign: 'center' }}>
        <div className="glass-panel" style={{ padding: '3rem', background: 'linear-gradient(135deg, rgba(3,76,98,0.3) 0%, rgba(6,11,19,0.9) 100%)', borderColor: 'rgba(4,146,194,0.3)' }}>
          <h3 style={{ marginBottom: '0.75rem' }}>Ready to Secure More Assignments?</h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
            Enquire today to configure your automated BPO order capture configuration and out-compete the market.
          </p>
          <Link to="/contact" className="btn btn-primary">Send Inquiry Enquiry</Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          section .grid-3 {
            grid-template-columns: 1fr !important;
          }
          .glass-card[style*="grid-column: span 2"] {
            grid-column: span 1 !important;
          }
          section div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>

    </div>
  );
};

export default OrderCapture;
