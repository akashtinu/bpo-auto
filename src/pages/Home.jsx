import React, { useState, useEffect } from 'react';
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

/* ─── Typing Text Component ─── */
const TypingText = ({ words, typingSpeed = 100, deletingSpeed = 60, pauseMs = 1800 }) => {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];

    let timeout;
    if (!isDeleting && displayed === current) {
      // Pause at full word then start deleting
      timeout = setTimeout(() => setIsDeleting(true), pauseMs);
    } else if (isDeleting && displayed === '') {
      // Move to next word
      setIsDeleting(false);
      setWordIndex(i => (i + 1) % words.length);
    } else {
      const speed = isDeleting ? deletingSpeed : typingSpeed;
      timeout = setTimeout(() => {
        setDisplayed(isDeleting
          ? current.slice(0, displayed.length - 1)
          : current.slice(0, displayed.length + 1)
        );
      }, speed);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  return (
    <span>
      {displayed}
      <span className="typing-cursor">|</span>
    </span>
  );
};

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
    <div className="tech-dot-grid" style={{ paddingBottom: '5rem' }}>
      
      {/* ─── Hero Section with Enquiry Form ─── */}
      <section className="hero-section container reveal-fade" style={{ padding: '4rem 1.5rem 3rem' }}>
        <div className="hero-grid-two">
          
          {/* Left: Text Content */}
          <div className="reveal-left" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="badge badge-warning" style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', marginBottom: '0.5rem' ,display: 'flex',justifyContent: 'center', alignItems: 'center',borderRadius: '999px'}}>
               Plans begin at just $3 per order
              </span>
            <div className="hero-badge">
              
              <Zap size={14} style={{ marginRight: '4px' }} /> All-in-one platform for capturing BPO orders
            </div>
            <h1 className="hero-title" style={{ fontSize: '3.2rem', marginBottom: '1rem', lineHeight: 1.2 }}>
              Smart Auto{' '}
              <span style={{ color: 'var(--primary)', background: 'none', WebkitTextFillColor: 'initial', display: 'inline-block', minWidth: '2ch' }}>
                <TypingText words={['Solutions', 'AI-Powered', 'Acceptance', 'Automation']} />
              </span>
            </h1>
            <p className="hero-subtitle" style={{ fontSize: '1.2rem', margin: '0 0 2rem 0', color: 'var(--text-main)', lineHeight: 1.6 }}>
Boost efficiency with skilled Auto Acceptance BPO support. Speedy, trustworthy, and economical outsourcing crafted to fit your business.
            </p>
            
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle size={18} style={{ color: 'var(--success)' }} />
                <span><strong>80%+</strong>  BPO Order Acceptance Rate</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle size={18} style={{ color: 'var(--success)' }} />
                <span> Lightning-Fast <strong>4–12 Second</strong> Response Time</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle size={18} style={{ color: 'var(--success)' }} />
                <span><strong> Skip the Install</strong> — 100% Cloud-Powered</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#about-us" className="btn btn-primary">Who We Are</a>
              <a href="#how-it-works" className="btn btn-secondary">See How It Works</a>
            </div>
          </div>

          {/* Right: Enquiry Form */}
          <div className="glass-panel reveal-right delay-2" style={{ padding: '2rem', border: '1px solid var(--border-color-hover)', background: 'rgba(16, 29, 47, 0.65)' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-bright)' }}>Enquire Here</h3>
              
              <p style={{ fontSize: '0.9rem', color: 'gray',marginBottom:'5px' }}>
Trusted across platforms including Estreet, Homegenius, LRES, RRR, Class Valuation, Opteon, Groundworks, Asset Valuation, Consolidated, and beyond              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Request a callback
Submit your details and we'll get back to you within one business day."
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
      <section className="container reveal-scale" style={{ marginBottom: '5rem' }}>
        <div className="glass-panel info-alert-box">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <AlertCircle size={24} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ color: 'var(--text-bright)', marginBottom: '0.5rem', fontWeight: 700 }}>For Your Information</h4>
              
              <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--text-main)' }}>

Standard BPO order acceptance is billed at <span style={{fontSize:'1.1rem'}}> $3 per accepted order </span>. Conditional-based acceptance — including ZIP code match, price match, and order type match — is billed at <span style={{fontSize:'1.1rem'}}> $4 per accepted order</span>. For your first month, payments are made weekly based on accepted orders. Starting month two, invoicing switches to twice-monthly. We accept payments via PayPal or bank transfer. A non-refundable signup fee, as shown on our pricing page, is required to activate your account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BPO Auto Acceptance Intro ─── */}
      <section className="container reveal" style={{ marginBottom: '5rem' }}>
        <div className="glass-panel home-intro-panel" style={{ alignItems: 'center' }}>
          <div className="reveal-left">
            <h2 style={{ fontSize: '2rem', marginBottom: '1.25rem' }}>BPO Auto Acceptance Services</h2>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.8, marginBottom: '1.25rem', color: 'var(--text-main)' }}>
BPO Auto Accept offers rapid, reliable, hands-free order acceptance built for real estate agents, appraisers, lenders, investors, mortgage companies, and financial institutions. Our cutting-edge automation software watches vendor portals — including Estreet, LRES, and more — around the clock, instantly grabbing Broker Price Opinion (BPO) and appraisal orders so you stay ahead of the competition.
            </p>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.8, marginBottom: '1.25rem', color: 'var(--text-main)' }}>
Our system captures BPO orders automatically, in real time — constantly monitoring vendor portals and locking in new orders instantly as they're posted. By cutting out manual refreshing and slashing response times, we help you manage orders more efficiently, accept more of them, and maximize your income.
            </p>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--primary)', fontWeight: 600 }}>
Unlock faster order capture, higher acceptance rates, and real-time monitoring with automated BPO order acceptance — a seamless workflow solution built to help you win more BPO and appraisal assignments.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-card reveal-hover-card reveal-right delay-1" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div className="feature-icon-wrapper" style={{ margin: 0, flexShrink: 0 }}><Zap size={20} /></div>
              <div>
                <h4 style={{ margin: 0 }}>Estreet & LRES Coverage</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Real-time tracking across every major portal.</p>
              </div>
            </div>
            <div className="glass-card reveal-hover-card reveal-right delay-2" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div className="feature-icon-wrapper" style={{ margin: 0, flexShrink: 0 }}><Shield size={20} /></div>
              <div>
                <h4 style={{ margin: 0 }}>Encrypted Credential Vault</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Your credentials are protected with AES-256 encryption.</p>
              </div>
            </div>
            <div className="glass-card reveal-hover-card reveal-right delay-3" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div className="feature-icon-wrapper" style={{ margin: 0, flexShrink: 0 }}><Sliders size={20} /></div>
              <div>
                <h4 style={{ margin: 0 }}>Advanced Filtering Options</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Sort by ZIP code, minimum fee, and order type.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Why Choose Our Services (Grid) ─── */}
      <section className="container reveal" style={{ marginBottom: '6rem' }}>
        <div className="section-header reveal-fade">
          <h2>Why Choose Our BPO Auto Acceptance Services?</h2>
          <p>Our team delivers high-performance, secure automation solutions designed exclusively for BPO professionals.</p>
        </div>

        <div className="grid-3">
          {[
            {
              title: '80%+ Success Rate on BPO Orders',
              desc: 'Boost your chances of landing more Broker Price Opinion (BPO) and appraisal orders with our proven 80%+ acceptance rate, driven by smart automation and real-time monitoring.'
            },
            {
              title: 'Instant, Automated BPO Order Capture',
              desc: 'Our BPO Auto Acceptance software watches vendor portals in real time and captures new orders the second they are available, so you stay ahead of the competition effortlessly.'
            },
            {
              title: 'Affordable & Cost-Effective',
              desc: 'Get automated BPO order acceptance starting at just $3 per order, lowering your costs while driving higher productivity and profits.'
            },
            {
              title: 'Work Smarter, Not Harder',
              desc: 'Cut out manual refreshing and repetitive tasks with our automated BPO order management system, freeing you up to focus on inspections, valuations, and growing your business.'
            },
            {
              title: 'Trusted & Secure Automation',
              desc: 'Built for accuracy and speed, our custom BPO automation tools keep downtime to a minimum so you never let a good opportunity slip by.'
            },
            {
              title: 'Premium Automation Options',
              desc: 'For clients requiring dedicated, high performance automation, we provide exclusive tools and advanced monitoring options. Pricing may vary based on your specific requirements.'
            }
          ].map((item, idx) => (
            <div key={idx} className={`glass-card reveal-hover-card reveal-scale delay-${(idx % 3) + 1}`} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
      <section id="about-us" className="container reveal-fade" style={{ marginBottom: '6rem' }}>
        <div className="glass-panel" style={{ padding: '3.5rem', background: 'linear-gradient(135deg, rgba(6,11,19,0.95) 0%, rgba(3,76,98,0.2) 100%)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
            <span style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.85rem', fontWeight: 700 }}>who we are</span>
            <h2 style={{ fontSize: '2.5rem', margin: '0 0 1rem 0' }}>BPO Acceptor</h2>
            
            <p style={{ fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
             At BPO Auto Accept, we're a team of skilled software engineers specializing in browser automation and related technologies. With an 80%+ acceptance rate spanning multiple U.S. states, we help real estate professionals, appraisal companies, and BPO vendors capture more orders — faster and more efficiently.
</p>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
             Our capabilities are built on advanced automation software, smart monitoring systems, and tailored workflows engineered to maximize order acceptance. By pairing deep industry knowledge with cutting-edge technology, we make sure no opportunity is missed — every order is captured with speed, precision, and reliability.
 </p>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
             Our automated order capture system continuously watches your vendor portal accounts around the clock, detecting and instantly accepting new BPO and appraisal orders the moment they appear.
   </p>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
             Beyond fast, accurate order processing, we deliver detailed performance stats, acceptance reports, and workflow insights to help you fine-tune your business. Whether you're an independent appraiser, a real estate agent, or a large appraisal management company, our order management solutions are built to boost productivity, improve efficiency, and help you win more orders with confidence.
              </p>
          </div>
        </div>
      </section>

      {/* ─── How It Works Section ─── */}
      <section id="how-it-works" className="container reveal" style={{ marginBottom: '6rem' }}>
        <div className="section-header reveal-fade">
          <h2>How It Works?</h2>
          <p>Getting started with BPO Acceptor is fast and simple — no software to install. Our advanced Auto Acceptance system is up and running in just a few easy steps.
</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '850px', margin: '0 auto' }}>
          {[
            { title: 'Quick Onboarding',
               desc: 'Get set up in as little as 30 minutes. Once you sign up, our team configures your account and gets your Auto Acceptance service ready for real-time order monitoring.' },
            { title: 'Instant Activation & Live Order Capture',
               desc: 'Once you share your vendor portal credentials, we securely activate your account. Our automated system immediately starts monitoring vendor portals and accepting eligible BPO and appraisal orders.' },
            { title: 'Pay Only for Results',
               desc: 'Our per-order pricing means you only pay for orders that get accepted — no hidden monthly fees, just transparent, performance-based costs.' },
            { title: 'Focus on What Matters',
               desc: 'Let our automation handle order monitoring and acceptance around the clock — while you focus on inspections, client relationships, and growing your business.' },
            { title: 'Secure & Reliable 24/7 Monitoring',
               desc: 'Our smart order management system runs continuously, delivering fast, secure, and accurate order acceptance so you never miss an opportunity.' }
          ].map((step, idx) => (
            <div key={idx} className={`glass-card reveal-hover-card reveal-left delay-${(idx % 3) + 1}`} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
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

      {/* ─── Vendor Portals We Deal With (Infinite Marquee) ─── */}
      <section style={{ marginBottom: '6rem' }}>
        <div className="container">
          <div className="section-header reveal-fade" style={{ marginBottom: '2rem' }}>
            <h2>Vendor Portals That We Deal With!</h2>
            <p>We automate orders for all major BPO, Valuation, REO, and Appraisal platforms.</p>
          </div>
        </div>
        
        <div className="portals-slider-container">
          <div className="portals-slider-track">
            {[...portalList, ...portalList].map((portal, idx) => (
              <div key={`${portal}-${idx}`} className="portal-slide-card">
                {portalImages[portal] ? (
                  <div style={{ width: '100%', height: '100px', borderRadius: '8px', overflow: 'hidden', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                    <img 
                      src={portalImages[portal]} 
                      alt={portal} 
                      style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '0.5rem' }}
                    />
                  </div>
                ) : (
                  <div className="portal-logo-mock" style={{ fontSize: '1rem', marginBottom: '0.75rem', height: '100px', display: 'flex', alignItems: 'center' }}>{portal}</div>
                )}
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, margin: '0 0 0.25rem 0', color: 'var(--text-bright)' }}>{portal}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Auto Accept Ready</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Choose Our BPO Auto Acceptance Service (Detailed) ─── */}
      <section className="container reveal" style={{ marginBottom: '6rem' }}>
        <div className="section-header reveal-fade">
          <span style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.85rem', fontWeight: 700 }}>OUR SERVICE</span>
          <h2 style={{ marginTop: '0.5rem' }}>Why Choose Our BPO Auto Acceptance Service?</h2>
        </div>

        <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {[
            {
              title: 'BPO Auto Acceptance',
              desc: 'Automate your BPO and Property Condition Report (PCR) order acceptance with our advanced Auto Acceptance software. Our real-time monitoring instantly captures and accepts new Broker Price Opinion (BPO) orders, helping you land more assignments while cutting out manual work.',
              link: true
            },
            {
              title: 'Higher BPO Order Acceptance Rate',
              desc: 'Our smart auto-accept system continuously watches vendor portals and instantly grabs available orders, delivering an 80%+ acceptance rate. Stay a step ahead of the competition and never let a BPO or appraisal opportunity slip away.'
            },
            {
              title: 'Grow Your Revenue',
              desc: 'Take on more BPO and appraisal orders with less work. By boosting your acceptance rate and cutting down on missed opportunities, our order management solution helps you maximize productivity and increase your earnings.'
            },
            {
              title: 'Stay Ahead of the Competition',
              desc: 'In the BPO industry, speed is everything. Our real-time Auto Acceptance software reacts within seconds, giving you a major edge over manual acceptance methods and boosting your odds of winning more assignments.'
            },
            {
              title: 'Real-Time Monitoring & In-Depth Insights',
              desc: 'Monitor your BPO performance with live tracking, acceptance stats, and detailed reports. Get the insights you need to fine-tune your workflow, boost acceptance rates, and make smarter business decisions.'
            },
            {
              title: 'Automate & Save Time',
              desc: 'No more refreshing vendor portals all day. Our automated capture system runs 24/7, constantly scanning for new orders and accepting them based on your preferences — so you can focus on inspections and client relationships.'
            },
            {
              title: 'Precise, Customizable Filtering',
              desc: 'Set your Auto Acceptance preferences by location, fee, order type, distance, and more. Our smart filters make sure you only get BPO and appraisal orders that match your goals, boosting efficiency and cutting unnecessary work.'
            },
            {
              title: 'Consistent, Secure & Dependable',
              desc: 'Our trusted auto-accept software delivers fast, secure, accurate order acceptance around the clock. With reliable performance and near-zero downtime, you can count on our system to capture more orders while keeping things running smoothly.'
            }
          ].map((item, idx) => (
            <div key={idx} className={`glass-card reveal-hover-card reveal-scale delay-${(idx % 3) + 1}`} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
      <section className="container reveal-scale" style={{ marginBottom: '6rem' }}>
        <div className="glass-panel browser-compatibility-panel">
          <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>Advanced Browser Compatibility & Secure Automation</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '750px', margin: '0 auto', fontSize: '0.95rem' }}>
              Our BPO Auto Acceptance solution is built to deliver fast, reliable, and secure order acceptance automation while keeping your browsing environment stable. We rely on advanced browser technology and smart session management to create a seamless experience with minimal interruptions during real-time order acceptance.
            </p>
          </div>

          <div className="grid-3 browser-compatibility-grid" style={{ gap: '1.5rem', marginBottom: 0 }}>
            {[
              { title: 'Seamless Browser Performance', desc: 'Our automation runs within a full browser environment, supporting standard functions like graphics rendering, fonts, cookies, local storage, and cross-browser compatibility — ensuring consistent performance across every supported vendor portal.' },
              { title: 'Stable Session Management', desc: 'We maintain secure browsing sessions with proper cookie handling, local storage management, and authenticated connections, keeping your BPO order monitoring and acceptance running without interruption.' },
              { title: 'Live Order Monitoring', desc: 'Our system continuously scans vendor portals for new Broker Price Opinion (BPO) and appraisal orders, delivering instant notifications and fast order acceptance while keeping the system stable.' },
              { title: 'Peak Performance', desc: 'Advanced browser optimization ensures smooth interactions, consistent response times, and dependable workflow automation — enhancing your overall BPO order management experience.' },
              { title: 'Secure & Privacy-First', desc: 'We prioritize secure connections, encrypted communication, and responsible account data handling to keep your information protected while delivering dependable BPO automation.' },
              { title: 'Ongoing Technology Updates', desc: 'We regularly update our platform to stay compatible with supported vendor portals, ensuring stable performance and continuous improvements to your BPO Auto Acceptance experience.' }
            ].map((item, idx) => (
              <div key={idx} className={`reveal-hover-card reveal-fade delay-${(idx % 3) + 1}`} style={{ padding: '1.25rem', background: 'rgba(6,11,19,0.4)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
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

        .home-intro-panel {
          padding: 3rem;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 3rem;
        }

        .info-alert-box {
          padding: 2rem;
          border-left: 4px solid var(--primary);
          background: rgba(4, 146, 194, 0.04);
        }

        .browser-compatibility-panel {
          padding: 3.5rem;
        }

        .browser-compatibility-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        }

        @media (max-width: 991px) {
          .hero-grid-two {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .hero-section {
            padding: 2rem 1.5rem 1rem;
          }
          .home-intro-panel {
            grid-template-columns: 1fr !important;
            padding: 1.5rem !important;
            gap: 2rem !important;
          }
        }

        @media (max-width: 768px) {
          .browser-compatibility-panel {
            padding: 1.5rem !important;
          }
          .browser-compatibility-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }
      `}</style>

    </div>
  );
};

export default Home;
