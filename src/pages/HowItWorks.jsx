import React from 'react';
import { Cloud, Search, CheckCircle, CreditCard, Settings, Lock, Server } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div style={{ paddingBottom: '5rem' }}>
      {/* Hero */}
      <section className="hero-section container" style={{ paddingBottom: '3rem' }}>
        <div className="hero-badge">
          <Cloud size={14} style={{ marginRight: '4px' }} /> Cloud-Based Automation
        </div>
        <h1 className="hero-title" style={{ fontSize: '3rem' }}>How Our Automation Works</h1>
        <p className="hero-subtitle">
          A transparent look at our cloud-based infrastructure, our proprietary acceptance engine, and the security measures that protect your accounts.
        </p>
      </section>

      {/* Steps Section */}
      <section className="container" style={{ marginBottom: '6rem' }}>
        <div className="section-header">
          <h2>The 4-Step Capture Process</h2>
          <p>From order detection to acceptance — all handled automatically in seconds.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
          {[
            {
              step: '01',
              icon: <Settings size={28} />,
              title: 'You Configure Your Profile',
              desc: 'Login to your dashboard and securely enter your BPO portal credentials. Set your preferred minimum fee, target ZIP codes, and order type preferences (interior/exterior). Your credentials are AES-256 encrypted and never stored in plaintext.'
            },
            {
              step: '02',
              icon: <Search size={28} />,
              title: 'Our Servers Monitor 24/7',
              desc: 'Our cloud infrastructure runs persistent sessions on our servers using browser automation and human-like browsing behavior. We continuously poll the configured portals and watch for new order notifications matching your criteria.'
            },
            {
              step: '03',
              icon: <CheckCircle size={28} />,
              title: 'Order Detected & Accepted',
              desc: 'The moment a qualifying order is detected, our system accepts it within 4 to 12 seconds. For conditional-based orders (specific ZIPs, fee thresholds), our algorithm checks your filters before accepting. All actions are logged in real-time.'
            },
            {
              step: '04',
              icon: <CreditCard size={28} />,
              title: 'You Get Billed Weekly',
              desc: 'At the end of each week, an invoice is generated based on the number of accepted orders: $3 for standard orders and $4 for conditional-based orders. You receive your invoice via email and can pay via PayPal or bank transfer through your dashboard.'
            }
          ].map((item) => (
            <div key={item.step} className="glass-card" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', minWidth: '60px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Step</span>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-bright)', lineHeight: 1 }}>{item.step}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>
                  {item.icon}
                  <h3 style={{ color: 'var(--text-bright)', margin: 0 }}>{item.title}</h3>
                </div>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Security Section */}
      <section className="container" style={{ marginBottom: '6rem' }}>
        <div className="section-header">
          <h2>Enterprise-Level Security</h2>
          <p>We take your account security and your clients' data seriously. Here's how we protect you.</p>
        </div>
        <div className="grid-3">
          {[
            { icon: <Lock size={24} />, title: 'AES-256 Encryption', desc: 'All portal credentials are encrypted using AES-256-CBC before being stored. We never log or expose your plaintext passwords.' },
            { icon: <Server size={24} />, title: 'Dedicated Cloud Servers', desc: 'Your account runs on isolated server instances. Your session data is never mixed with another user\'s activity or browsing sessions.' },
            { icon: <Cloud size={24} />, title: 'Residential Proxy Network', desc: 'Session requests are routed through dedicated local IP addresses and residential proxies that mimic real user behavior, minimizing detection risk.' },
          ].map((item) => (
            <div key={item.title} className="glass-card">
              <div className="feature-icon-wrapper" style={{ marginBottom: '1rem' }}>{item.icon}</div>
              <h3 style={{ marginBottom: '0.75rem' }}>{item.title}</h3>
              <p style={{ fontSize: '0.95rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="container">
        <div className="glass-panel" style={{ padding: '2rem', borderColor: 'rgba(245, 158, 11, 0.3)', background: 'rgba(245, 158, 11, 0.05)' }}>
          <h4 style={{ color: 'var(--warning)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            ⚠️ Important Disclaimer
          </h4>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>
            BPO Auto Accept is an independent automation service provider. We are not affiliated with, sponsored by, or endorsed by any of the BPO or appraisal portal vendors listed on this website. Users are solely responsible for reviewing and complying with their individual portal terms of service. The use of automated tools to accept orders may violate the terms of service of some portals. BPO Auto Accept is not responsible for any account actions taken by portals.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
