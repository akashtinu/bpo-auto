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
        Never Miss a BPO or Appraisal Opportunity — Powered by Smart Automation
        </h1>
        <p className="hero-subtitle" style={{ fontSize: '1.15rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
        Missing out on valuable Broker Price Opinion (BPO) or appraisal orders can cost you real revenue. Our advanced BPO Order Capture solution helps real estate professionals win more assignments through real-time monitoring and smart Auto Acceptance technology.
        </p>
      </section>

      {/* ─── Sub-Hero Text & Intro ─── */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div className="glass-panel" style={{ padding: '2.5rem', background: 'rgba(16, 29, 47, 0.45)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
            <p>
Powered by our cloud-based BPO Auto Accept Software, the system watches supported vendor portals 24/7 and instantly grabs eligible orders based on your custom preferences. No need to manually refresh pages or keep an eye out for new assignments — our automation handles it around the clock.
            </p>
            <p>
Whether you're handling BPOs, appraisals, foreclosures, REO properties, or short sales, our automated order capture technology simplifies your workflow, boosts your acceptance rate, and keeps you ahead of the competition.
            </p>
            <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
"Fast, accurate, and reliable — real estate valuation capture made simple."
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
In the competitive world of Broker Price Opinion (BPO) and appraisal work, every second counts. New assignments can vanish in moments, and even a small delay can cost you the opportunity. Our BPO Order Capture Service pairs real-time monitoring with smart Auto Acceptance to instantly grab eligible orders based on your custom preferences — helping you win more assignments with zero manual effort.
            </p>
            <Link to="/services" className="btn btn-primary">Learn More About Services</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div className="feature-icon-wrapper" style={{ margin: 0, flexShrink: 0 }}><Zap size={20} /></div>
              <div>
                <h4 style={{ margin: 0 }}>Instant Order Capture</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Grabs orders the moment they show up in the portals.</p>
              </div>
            </div>
            <div className="glass-card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div className="feature-icon-wrapper" style={{ margin: 0, flexShrink: 0 }}><Shield size={20} /></div>
              <div>
                <h4 style={{ margin: 0 }}>Fully Cloud-Based & Secure</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Nothing to install — no software or browser setup needed.</p>
              </div>
            </div>
            <div className="glass-card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div className="feature-icon-wrapper" style={{ margin: 0, flexShrink: 0 }}><Sliders size={20} /></div>
             <div>
                <h4 style={{ margin: 0 }}>Custom Preference Filters</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Only accept orders that match your fee and ZIP code rules.</p>
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
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--text-bright)' }}>Real-Time Order Capture</h3>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
Our advanced BPO Auto Accept Software keeps a constant watch on supported vendor portals and instantly grabs eligible BPO and appraisal orders the moment they're posted. By cutting out manual refreshing and speeding up response times, you can boost your acceptance rate and stay a step ahead of the competition.
            </p>
          </div>

          <div className="glass-card">
            <div className="feature-icon-wrapper"><Layers size={22} /></div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--text-bright)' }}>Compatible with Top BPO Platforms</h3>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
Our cloud-based BPO Order Capture solution works seamlessly with many of the industry's top BPO and appraisal vendor portals. With secure connectivity and dependable performance, you can automate order monitoring and acceptance across all supported platforms from one central solution.
            </p>
          </div>

          <div className="glass-card">
            <div className="feature-icon-wrapper"><Sliders size={22} /></div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--text-bright)' }}>Smart Order Filters</h3>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
Take full control of your workflow with fully customizable order preferences. Filter assignments by vendor, ZIP code, service area, property type, fee amount, turnaround time, and order category — so you only capture Broker Price Opinion (BPO) and appraisal orders that fit your business goals.
            </p>
          </div>

          <div className="glass-card">
            <div className="feature-icon-wrapper"><Shield size={22} /></div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--text-bright)' }}>Fully Cloud-Based Automation</h3>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
Our BPO Auto Acceptance Software runs entirely in the cloud, so there's nothing to install or maintain. Log in from anywhere, and our secure platform will handle real-time order monitoring and automated capture around the clock.
            </p>
          </div>

          <div className="glass-card" style={{ gridColumn: 'span 2' }}>
            <div className="feature-icon-wrapper"><DollarSign size={22} /></div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--text-bright)' }}>Pay-for-Performance Pricing</h3>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
Pay only for real results. With our transparent pricing model, you're charged only when an eligible order is successfully captured on your behalf. No unnecessary subscriptions, no hidden costs — just dependable BPO automation that delivers measurable value.
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
                Why Professionals Trust BPO Auto Accept
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
Real estate professionals, appraisers, and valuation brokers choose us for one reason: we combine speed, reliability, and security to help them capture orders more efficiently.
              </p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                '24/7 Real-Time Monitoring for BPO Orders',
                'Instant Capture of Broker Price Opinion (BPO) Orders',
                'Cloud-Based BPO Auto Acceptance Software',
                'Smart Filters & Custom Automation',
                'Secure, Reliable Order Management',
                'Boosted Acceptance Rates & Productivity',
                'Pay-for-Performance Pricing',
                'Built for Real Estate Professionals, Brokers & Appraisers'
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
          <h3 style={{ marginBottom: '0.75rem' }}>Ready to Win More Assignments?</h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
Enquire today to set up your automated BPO order capture and get ahead of the competition.
          </p>
          <Link to="/contact" className="btn btn-primary">Send  Inquiry</Link>
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
