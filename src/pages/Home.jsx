import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, Zap, Sliders, Layers, Bell, CheckCircle,
  HelpCircle, Star, Sparkles, Send, Lock, Eye, AlertCircle, PlayCircle
} from 'lucide-react';
import { api } from '../utils/api';
import bpoLogo from "../assets/cropped-BPO-logo-e1750057560274 (1).webp";
import rrrImage from '../assets/RRR-300x300-1.webp';
import classValuationImage from '../assets/Class-Valuation-300x300-1.webp';
import clearCapitalImage from '../assets/clear-captial-300x300-1.webp';
import estreetImage from '../assets/estreet-300x300-1.webp';
import proteckImage from '../assets/proteck-300x300-ezgif.com-png-to-webp-converter.webp';
import singleSourceImage from '../assets/single-source.webp';
import xomeImage from '../assets/xome-300x300-1.webp';

const Home = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > 2000) return;
    setForm({ ...form, [name]: name === 'phone' ? value.replace(/[^0-9+\-\s()]/g, '') : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/api/contact', form);
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError(err.message || 'Failed to send enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const portalList = [
    'Clear Capital', 'Estreet', 'Proteck', 'Xome', 'RRR',
    
    'Single Source', 'Class Valuation'
  ];

  const portalImages = {
    'Estreet': estreetImage,
    'RRR': rrrImage,
    'Class Valuation': classValuationImage,
    'Clear Capital': clearCapitalImage,
    'Proteck': proteckImage,
    'Xome': xomeImage,
    'Single Source': singleSourceImage
  };

  return (
    <div style={{ paddingBottom: '5rem' }}>
      
      {/* ─── Hero Section with Enquiry Form ─── */}
      <section className="hero-section container" style={{ padding: '4rem 1.5rem 3rem' }}>
        <div className="hero-grid-two">
          
          {/* Left: Text Content */}
          
          <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="badge badge-warning" style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', marginBottom: '0.5rem' ,display: 'flex',justifyContent: 'center', alignItems: 'center',borderRadius: '999px'}}>
                Starting at $3 per order
              </span>
            <div className="hero-badge">
              
              <Zap size={14} style={{ marginRight: '4px' }} /> One solution for BPO order capture
            </div>
            <h1 className="hero-title" style={{ fontSize: '3.2rem', marginBottom: '1rem', lineHeight: 1.1 }}>
              BPO | Auto Acceptance <span style={{ color: 'var(--primary)', background: 'none', WebkitTextFillColor: 'initial' }}>BPO Services</span>
            </h1>
            <p className="hero-subtitle" style={{ fontSize: '1.2rem', margin: '0 0 2rem 0', color: 'var(--text-main)', lineHeight: 1.6 }}>
              Streamline your business with expert Auto Acceptance BPO services. Fast, reliable, and cost-effective outsourcing solutions tailored for you.
            </p>
            
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle size={18} style={{ color: 'var(--success)' }} />
                <span><strong>80%+</strong> BPO Order Acceptance Rate</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle size={18} style={{ color: 'var(--success)' }} />
                <span><strong>4 to 12 Seconds</strong> Response Capture Time</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle size={18} style={{ color: 'var(--success)' }} />
                <span><strong>No Installation Required</strong> — 100% Cloud-Based</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#about-us" className="btn btn-primary">Who We Are</a>
              <a href="#how-it-works" className="btn btn-secondary">See How It Works</a>
            </div>
          </div>

          {/* Right: Enquiry Form */}
          <div className="glass-panel" style={{ padding: '2rem', border: '1px solid var(--border-color-hover)', background: 'rgba(16, 29, 47, 0.65)' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              {/* <span className="badge badge-warning" style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', marginBottom: '0.5rem' }}>
                Starting at $3 per order
              </span> */}
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-bright)' }}>Enquire Here</h3>
              
              <p style={{ fontSize: '0.9rem', color: 'gray',marginBottom:'5px' }}>
              To start with Estreet, Homegenius, LRES, RRR, Class Valuation, Opteon, Groundworks, Asset Valuation, Consolidated and more — Enquire here with your details
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Fill in your details and our team will reach out within 24 hours.
              </p>
            </div>

            {success ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <CheckCircle size={48} style={{ color: 'var(--success)', marginBottom: '1rem' }} />
                <h4 style={{ color: 'var(--text-bright)', marginBottom: '0.5rem' }}>Thank You!</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>We have received your enquiry and will contact you shortly.</p>
                <button className="btn btn-secondary" onClick={() => setSuccess(false)} style={{ marginTop: '1rem', padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && (
                  <div style={{ padding: '0.75rem', background: 'rgba(239,68,68,0.1)', border: '1px solid var(--danger)', borderRadius: '6px', color: 'var(--danger)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                    {error}
                  </div>
                )}
                
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Full Name *"
                    value={form.name}
                    onChange={handleChange}
                    required
                    style={{ padding: '0.65rem 0.85rem', fontSize: '0.9rem' }}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Email Address *"
                    value={form.email}
                    onChange={handleChange}
                    required
                    style={{ padding: '0.65rem 0.85rem', fontSize: '0.9rem' }}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    placeholder="Phone Number *"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    style={{ padding: '0.65rem 0.85rem', fontSize: '0.9rem' }}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                  <textarea
                    name="message"
                    className="form-input"
                    placeholder="Your Message *"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    style={{ padding: '0.65rem 0.85rem', fontSize: '0.9rem', resize: 'none' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    <span>Your information is kept private.</span>
                    <span>{form.message.length}/2000</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                  style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem', justifyContent: 'center' }}
                >
                  {loading ? 'Sending...' : <><Send size={15} /> Enquiry</>}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* ─── For Your Information Block ─── */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div className="glass-panel info-alert-box">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <AlertCircle size={24} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ color: 'var(--text-bright)', marginBottom: '0.5rem', fontWeight: 700 }}>For Your Information</h4>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--text-main)' }}>
                The fee for standard BPO order acceptance is **$3 per accepted order**. The fee for conditional-based order acceptance (like ZIP code match, price match, and type of order match) is charged at **$4 per accepted order**. Weekly payments must be made based on accepted orders for the first month. From the second month onwards, invoicing is processed twice monthly. Payments are accepted via PayPal or bank transfer. A non-refundable signup fee, as listed on the pricing page, is required to activate the account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BPO Auto Acceptance Intro ─── */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div className="glass-panel" style={{ padding: '3rem', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.25rem' }}>BPO Auto Acceptance Services</h2>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.8, marginBottom: '1.25rem', color: 'var(--text-main)' }}>
              Our BPO Auto Accept company provides fast, reliable, and automated BPO order acceptance for real estate agents, appraisers, lenders, investors, mortgage companies, and financial institutions. Using advanced BPO automation software, we instantly monitor vendor portals like Estreet, LRES, and others to accept Broker Price Opinion (BPO) and appraisal orders, helping you secure more orders to process in the middle of fierce competition.
            </p>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.8, marginBottom: '1.25rem', color: 'var(--text-main)' }}>
              Our automated BPO order capture system works in real time, continuously monitoring vendor portals and automatically accepting new orders the moment they become available. By eliminating manual refreshing and reducing response times, our solution improves BPO order management, boosts acceptance rates, and maximizes your earning potential.
            </p>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--primary)', fontWeight: 600 }}>
              Experience the power of automated BPO order acceptance—faster order capture, higher acceptance rates, real-time monitoring, and seamless workflow automation that helps you win more BPO and appraisal assignments.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div className="feature-icon-wrapper" style={{ margin: 0, flexShrink: 0 }}><Zap size={20} /></div>
              <div>
                <h4 style={{ margin: 0 }}>Estreet & LRES Monitored</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Instant tracking across all main portals.</p>
              </div>
            </div>
            <div className="glass-card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div className="feature-icon-wrapper" style={{ margin: 0, flexShrink: 0 }}><Shield size={20} /></div>
              <div>
                <h4 style={{ margin: 0 }}>Secure Vault Protection</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>AES-256 encrypted credential storage.</p>
              </div>
            </div>
            <div className="glass-card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div className="feature-icon-wrapper" style={{ margin: 0, flexShrink: 0 }}><Sliders size={20} /></div>
              <div>
                <h4 style={{ margin: 0 }}>Precision Custom Filters</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Filter by ZIP codes, minimum fees, and types.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Why Choose Our Services (Grid) ─── */}
      <section className="container" style={{ marginBottom: '6rem' }}>
        <div className="section-header">
          <h2>Why Choose Our BPO Auto Acceptance Services?</h2>
          <p>We build top-tier, fast, and secure automation solutions specifically optimized for BPO professionals.</p>
        </div>

        <div className="grid-3">
          {[
            {
              title: '80%+ BPO Order Acceptance Rate',
              desc: 'Increase your chances of securing more Broker Price Opinion (BPO) and appraisal orders with our proven 80%+ acceptance rate, powered by intelligent BPO automation and real-time monitoring.'
            },
            {
              title: 'Real-Time Automated BPO Order Capture',
              desc: 'Our BPO Auto Acceptance software continuously monitors vendor portals and instantly accepts newly available orders, helping you stay ahead of the competition without manual effort.'
            },
            {
              title: 'Affordable & Cost-Effective',
              desc: 'Automate your BPO order acceptance for as little as $3 per order, reducing operational costs while increasing productivity and profitability.'
            },
            {
              title: 'Save Time & Improve Efficiency',
              desc: 'Eliminate manual refreshing and repetitive tasks with our automated BPO order management system, allowing you to focus on inspections, valuations, and growing your business.'
            },
            {
              title: 'Reliable & Secure Automation',
              desc: 'Our customized BPO automation tools deliver fast, accurate, and reliable order processing with minimal downtime, ensuring you never miss valuable opportunities.'
            },
            {
              title: 'Exclusive Automation Tools Available',
              desc: 'For clients requiring dedicated, high-performance BPO order automation, we offer exclusive automation tools and advanced monitoring solutions. Additional charges may apply depending on requirements.'
            }
          ].map((item, idx) => (
            <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="feature-icon-wrapper" style={{ marginBottom: '1.25rem' }}>
                  <Star size={22} />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--text-bright)' }}>{item.title}</h3>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Who We Are Section ─── */}
      <section id="about-us" className="container" style={{ marginBottom: '6rem' }}>
        <div className="glass-panel" style={{ padding: '3.5rem', background: 'linear-gradient(135deg, rgba(6,11,19,0.95) 0%, rgba(3,76,98,0.2) 100%)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
            <span style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.85rem', fontWeight: 700 }}>who we are</span>
            <h2 style={{ fontSize: '2.5rem', margin: '0 0 1rem 0' }}>BPO Acceptor</h2>
            
            <p style={{ fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
              At BPO auto accept company, we are a team of experienced software professionals specializing in Browser automation and other types of automation. With an 80%+ acceptance rate across multiple states of USA, we help real estate professionals, appraisal companies, and BPO vendors secure more accepted orders quickly and efficiently.
            </p>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
              Our expertise is backed by advanced BPO automation software, intelligent monitoring systems, and customized workflows designed to maximize order acceptance. By combining industry knowledge with cutting-edge technology, we ensure every opportunity is captured with speed, accuracy, and reliability.
            </p>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
              Our automated BPO order capture system continuously monitors your vendor portal accounts in real time, instantly detecting and accepting newly available BPO and appraisal orders.
            </p>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
              In addition to fast and accurate BPO order processing, we provide detailed performance statistics, acceptance reports, and workflow insights to help optimize your business. Whether you’re an independent appraiser, real estate agent, or a large appraisal management company, our BPO order management solutions are designed to increase productivity, improve efficiency, and help you secure more orders with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* ─── How It Works Section ─── */}
      <section id="how-it-works" className="container" style={{ marginBottom: '6rem' }}>
        <div className="section-header">
          <h2>How It Works?</h2>
          <p>Getting started with BPO Acceptor is quick and hassle-free—no software installation required. Our advanced BPO Auto Acceptance system is ready in just a few simple steps.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '850px', margin: '0 auto' }}>
          {[
            { title: 'Fast Onboarding', desc: 'Get started in as little as 30 minutes. Once you sign up, our team configures your account and prepares your BPO Auto Acceptance service for real-time order monitoring.' },
            { title: 'Instant Activation & Real-Time Order Capture', desc: 'After you provide your vendor portal credentials, we securely activate your account. Our automated BPO order capture system immediately begins monitoring vendor portals and automatically accepts eligible BPO and appraisal orders.' },
            { title: 'Performance-Based Pricing', desc: 'Pay only for the BPO orders successfully accepted. Our transparent, per-order pricing ensures you receive maximum value with no unnecessary monthly fees.' },
            { title: 'Focus on Growing Your Business', desc: 'Let our BPO automation software handle continuous order monitoring and acceptance while you focus on property inspections, client relationships, and expanding your real estate business.' },
            { title: 'Reliable, Secure & 24/7 Monitoring', desc: 'Our intelligent BPO order management system operates around the clock, providing fast, secure, and accurate order acceptance so you never miss valuable opportunities.' }
          ].map((step, idx) => (
            <div key={idx} className="glass-card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--primary)', minWidth: '40px', textAlign: 'center' }}>
                {idx + 1}
              </div>
              <div>
                <h4 style={{ color: 'var(--text-bright)', marginBottom: '0.35rem' }}>{step.title}</h4>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-main)' }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Vendor Portals We Deal With ─── */}
      <section className="container" style={{ marginBottom: '6rem' }}>
        <div className="section-header">
          <h2>Vendor Portals That We Deal With!</h2>
          <p>We automate orders for all major BPO, Valuation, REO, and Appraisal platforms.</p>
        </div>
        <div className="portals-grid">
          {portalList.map(portal => (
            <div key={portal} className="portal-item">
              {portalImages[portal] ? (
                <div style={{ width: '100%', height: '200px', borderRadius: '8px', overflow: 'hidden', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                  <img 
                    src={portalImages[portal]} 
                    alt={portal} 
                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '1rem' }}
                  />
                </div>
              ) : (
                <div className="portal-logo-mock" style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>{portal}</div>
              )}
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0 0 0.35rem 0', color: 'var(--text-bright)' }}>{portal}</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Auto Accept Ready</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Why Choose Our BPO Auto Acceptance Service (Detailed) ─── */}
      <section className="container" style={{ marginBottom: '6rem' }}>
        <div className="section-header">
          <span style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.85rem', fontWeight: 700 }}>OUR SERVICE</span>
          <h2 style={{ marginTop: '0.5rem' }}>Why Choose Our BPO Auto Acceptance Service?</h2>
        </div>

        <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {[
            {
              title: 'BPO Auto Acceptance',
              desc: 'Automate your BPO and Property condition report(PCR) order acceptance with our advanced BPO Auto Acceptance software. Our real-time monitoring system instantly captures and accepts new Broker Price Opinion (BPO) orders, helping you secure more assignments while eliminating manual effort.',
              link: true
            },
            {
              title: 'Higher BPO Order Acceptance Rate',
              desc: 'Our intelligent BPO auto accept system continuously monitors vendor portals and instantly accepts available orders, helping you achieve an 80%+ acceptance rate. Stay ahead of competitors and never miss valuable BPO or appraisal opportunities.'
            },
            {
              title: 'Increase Your Revenue',
              desc: 'Accept more BPO and appraisal orders with less effort. By improving your order acceptance rate and reducing missed opportunities, our BPO order management solution helps you maximize productivity and grow your income.'
            },
            {
              title: 'Gain a Competitive Advantage',
              desc: 'In the Broker Price Opinion (BPO) industry, speed determines success. Our real-time BPO Auto Acceptance software responds within seconds, giving you a significant advantage over manual order acceptance and increasing your chances of winning more assignments.'
            },
            {
              title: 'Real-Time Monitoring & Detailed Insights',
              desc: 'Track your BPO order performance with real-time monitoring, acceptance statistics, and performance reports. Gain valuable insights that help optimize your workflow, improve acceptance rates, and make data-driven business decisions.'
            },
            {
              title: 'Save Time with Intelligent Automation',
              desc: 'Stop wasting time refreshing vendor portals. Our automated BPO order capture system works 24/7, continuously monitoring for new orders and automatically accepting them based on your preferences, so you can focus on inspections and client relationships.'
            },
            {
              title: 'Smart Order Filtering & Precision',
              desc: 'Customize your BPO Auto Acceptance settings by location, fee, order type, distance, and other criteria. Our intelligent filtering ensures you only receive the BPO and appraisal orders that match your business goals, improving efficiency and reducing unnecessary workload.'
            },
            {
              title: 'Reliable, Secure & Consistent Performance',
              desc: 'Our trusted BPO auto-accept software delivers fast, secure, and accurate order acceptance around the clock. With consistent performance and minimal downtime, you can rely on our system to capture more orders while maintaining maximum efficiency.'
            }
          ].map((item, idx) => (
            <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--text-bright)' }}>{item.title}</h3>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-main)' }}>{item.desc}</p>
              </div>
              {item.link && (
                <div style={{ marginTop: '1.25rem' }}>
                  <Link to="/services" style={{ color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem' }}>
                    Learn More →
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── Advanced Browser Compatibility & Secure Automation ─── */}
      <section className="container" style={{ marginBottom: '6rem' }}>
        <div className="glass-panel" style={{ padding: '3.5rem' }}>
          <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>Advanced Browser Compatibility & Secure Automation</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '750px', margin: '0 auto', fontSize: '0.95rem' }}>
              Our BPO Auto Acceptance solution is designed to provide fast, reliable, and secure BPO order acceptance automation while maintaining a stable browsing environment. We use advanced browser technologies and intelligent session management to deliver a seamless experience that minimizes interruptions during real-time BPO order acceptance.
            </p>
          </div>

          <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: 0 }}>
            {[
              { title: 'Human-Like Browser Performance', desc: 'Our automation operates within a complete browser environment, supporting normal browser functions such as graphics rendering, fonts, cookies, local storage, and browser compatibility to ensure consistent performance across supported vendor portals.' },
              { title: 'Reliable Session Management', desc: 'We maintain secure browsing sessions with proper cookie handling, local storage management, and authenticated connections, allowing uninterrupted BPO order monitoring and acceptance.' },
              { title: 'Real-Time Monitoring', desc: 'Our system continuously monitors vendor portals for new Broker Price Opinion (BPO) and appraisal orders, enabling immediate notifications and rapid order acceptance while maintaining system stability.' },
              { title: 'Optimized Performance', desc: 'Advanced browser optimization helps deliver smooth interactions, consistent response times, and reliable workflow automation, improving your overall BPO order management experience.' },
              { title: 'Secure & Privacy-Focused', desc: 'We prioritize secure connections, encrypted communication, and responsible handling of account information to protect your data while providing dependable BPO automation services.' },
              { title: 'Continuous Technology Updates', desc: 'Our platform is regularly updated to remain compatible with supported vendor portals, ensuring reliable performance, enhanced stability, and continuous improvements to your BPO Auto Acceptance workflow.' }
            ].map((item, idx) => (
              <div key={idx} style={{ padding: '1.25rem', background: 'rgba(6,11,19,0.4)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.05rem' }}>{item.title}</h4>
                <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Related Tags ─── */}
      <section className="container" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>Related Tags:</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Automated BPO Order Acceptance', path: '/services' },
            { label: 'Real-Time BPO Order Capture', path: '/how-it-works' },
            { label: 'Broker Price Opinion (BPO) Automation', path: '/about' },
            { label: 'Appraisal Order Management', path: '/contact' }
          ].map(tag => (
            <Link
              key={tag.label}
              to={tag.path}
              className="badge badge-secondary"
              style={{
                fontSize: '0.8rem',
                padding: '0.4rem 0.85rem',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-muted)',
                borderRadius: '6px',
                textDecoration: 'none',
                transition: 'var(--transition-smooth)'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = 'var(--primary)';
                e.target.style.borderColor = 'var(--primary)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'var(--text-muted)';
                e.target.style.borderColor = 'var(--border-color)';
              }}
            >
              {tag.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Additional inline styles for grid responsive alignment */}
      <style>{`
        .hero-grid-two {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 4rem;
        }

        .info-alert-box {
          padding: 2rem;
          border-left: 4px solid var(--primary);
          background: rgba(4, 146, 194, 0.04);
        }

        @media (max-width: 991px) {
          .hero-grid-two {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .hero-section {
            padding: 2rem 1.5rem 1rem;
          }
          section .glass-panel[style*="grid-template-columns: 1.2fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>

    </div>
  );
};

export default Home;
