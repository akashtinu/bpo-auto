import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Target, Award, Users, Cpu, FileText, CheckCircle, Zap } from 'lucide-react';
import '../index.css';
import office from '../assets/Image-7.webp';
import working from '../assets/working.jpg';
import bulding from '../assets/bulting_big.jpg';

const About = () => {
  return (
    <div className="about-page" style={{ paddingBottom: '5rem' }}>
      
      {/* ─── Hero Section ─── */}
      <section className="hero-section container" style={{ paddingBottom: '2rem' }}>
        <div className="hero-badge">
          <Shield size={14} style={{ marginRight: '4px' }} /> About Us | BPO Auto Accept Software
        </div>
        <h1 className="hero-title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Expert Broker Price Opinion (BPO) Auto Acceptance
        </h1>
        <p className="hero-subtitle">
          At BPO Auto Accept, we specialize in automated Broker Price Opinion (BPO) order acceptance for real estate professionals, appraisers, lenders, and valuation companies.
        </p>
      </section>

      {/* ─── Mission & Intro Grid ─── */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div className="about-main-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }}>
          
          {/* Left: Mission & Details */}
          <div>
            

            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-bright)' }}>About Us</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: 'var(--text-main)', lineHeight: 1.8 }}>
              <p>
                At BPO Auto Accept, we provide industry-leading BPO Auto Accept Software designed to automate Broker Price Opinion (BPO) and appraisal order acceptance with speed, accuracy, and reliability. Our advanced BPO automation system acts like a dedicated virtual assistant, continuously monitoring vendor portals and instantly capturing eligible orders based on your customized preferences.
              </p>
              <p>
                Whether an order requires secure login, authentication, or multiple acceptance steps, our intelligent BPO order management platform streamlines the entire process. Simply define your preferred location, fee range, property type, vendor, and other criteria, and our system automatically captures only the BPO and appraisal orders that match your requirements. We also support conditional order acceptance, giving you complete control over your workflow.
              </p>
              <p>
                Our cloud-based BPO Auto Acceptance Software operates entirely online, eliminating the need for software installation or dedicated hardware. Accessible from anywhere, our secure platform delivers continuous real-time BPO order monitoring, allowing you to stay connected and competitive without managing complex technical setups.
              </p>
              <p>
                Unlike manual order acceptance, our system works 24/7, continuously monitoring vendor portals to ensure you never miss valuable opportunities—even when you’re away from your computer. Our intelligent monitoring technology instantly identifies newly available orders, helping you increase your BPO order acceptance rate, improve productivity, and maximize your earning potential.
              </p>
              <p>
                To deliver fast and reliable performance, our infrastructure is hosted on secure USA-based servers, providing optimized connectivity for supported BPO and appraisal vendor portals. This strategic infrastructure helps reduce response times and ensures dependable BPO order capture for professionals across the real estate valuation industry.
              </p>
              <p>
                With BPO Auto Accept, you gain more than just automation—you gain a trusted technology partner committed to helping you secure more Broker Price Opinion (BPO) and appraisal orders, streamline your operations, and grow your business with confidence.
              </p>
            </div>
            
            <div style={{ marginTop: '2rem' }}>
              <Link to="/services" className="btn btn-primary">Learn More About Our Services</Link>
            </div>
          </div>

          {/* Right: Counter Stats & Side Details */}
         <div className="about-side-stack" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Stats Panel */}
            {/* <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
              <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Performance Metrics</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>2 +</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>Years Experience</div>
                </div>
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                  <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>15 +</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>Clients Across US</div>
                </div>
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                  <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>150 k+</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>Worth of Orders Captured ($)</div>
                </div>
              </div>
            </div> */}

<div className="glass-panel" style={{ padding: '2rem', borderLeft: '4px solid var(--primary)', background: 'rgba(4,146,194,0.04)', marginBottom: '2.5rem' }}>
              <h3 style={{ color: 'var(--text-bright)', marginBottom: '0.75rem', fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Our Mission
              </h3>
              <p style={{ fontSize: '0.98rem', lineHeight: 1.7, color: 'var(--text-main)' }}>
                Our mission is to provide industry-leading BPO Auto Accept Software that automates BPO and appraisal order acceptance with speed, accuracy, and reliability. By combining intelligent automation with real-time monitoring, we help professionals increase acceptance rates, improve productivity, and grow their business through efficient BPO order management.
              </p>
            </div>


            <img src={office} alt="" />

            {/* Quick Who-We-Are Summary Box */}
            <div className="glass-card" style={{ borderColor: 'rgba(4, 146, 194, 0.25)' }}>
              <h4 style={{ color: 'var(--primary)', marginBottom: '0.75rem' }}>Who Can Use This?</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem' }}>
                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <CheckCircle size={15} style={{ color: 'var(--success)' }} />
                  <span>Licensed Realtors / Real Estate Agents</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <CheckCircle size={15} style={{ color: 'var(--success)' }} />
                  <span>Certified & Licensed Appraisers</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <CheckCircle size={15} style={{ color: 'var(--success)' }} />
                  <span>BPO Vendors and Appraisal Companies</span>
                </li>
              </ul>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '1.25rem', lineHeight: 1.6 }}>
                <strong>One solution for BPO order capture:</strong> We accept BPO orders using our automation tool software to out-compete your competitors.
              </p>
            </div>

          </div>
        

        </div>
      </section>
        <div className="glass-panel about-metrics" style={{ padding: '2rem', textAlign: 'center',marginBottom:'40px' }}>
          <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Performance Metrics</h4>
          <div className="about-metrics-grid" style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
            <div className="about-metric" style={{ flex: '1 1 180px', minWidth: '120px', padding: '1rem 0.5rem', borderRight: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>2 +</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>Years Experience</div>
            </div>
            <div className="about-metric" style={{ flex: '1 1 180px', minWidth: '120px', padding: '1rem 0.5rem', borderRight: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>15 +</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>Clients Across US</div>
            </div>
            <div className="about-metric" style={{ flex: '1 1 180px', minWidth: '120px', padding: '1rem 0.5rem' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>150 k+</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>Worth of Orders Captured ($)</div>
            </div>
          </div>
        </div>

      {/* ─── Who We Are & What We Do ─── */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div className="about-feature-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
          
          {/* Who We Are */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-bright)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={20} style={{ color: 'var(--primary)' }} /> Who We Are
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
              With years of experience in the Broker Price Opinion (BPO) and real estate valuation industry, BPO Auto Accept is committed to helping real estate professionals, appraisers, lenders, and valuation companies secure more BPO and appraisal orders through intelligent automation. Our advanced BPO Auto Accept Software combines real-time order monitoring, automated BPO order capture, and smart order management to improve acceptance rates while eliminating the need for constant manual refreshing. Our cloud-based BPO automation platform monitors vendor portals 24/7 and instantly captures eligible orders based on your customized preferences. By streamlining BPO order management with speed, precision, and reliability, we help you save time, increase productivity, and focus on delivering exceptional service to your clients. As a trusted partner in BPO Auto Acceptance, our mission is to provide secure, reliable, and high-performance automation solutions that maximize efficiency, improve workflow, and help your business grow with confidence.
            </p>
          </div>

          {/* What We Do */}
          <div  style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
            
          <img src={bulding}  alt="" className="aboutimage" />

          </div>

        </div>
      </section>





<section className="container" style={{ marginBottom: '5rem', }}>
        <div className="about-feature-grid container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
          
          {/* Who We Are */}
          <div className='box1'  style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
            
          <img src={working}  alt="" className="aboutimage" />

          </div>

          {/* What We Do */}
          <div className="glass-card box2">
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-bright)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Cpu size={20} style={{ color: 'var(--primary)' }} /> What We Do
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
              At BPO Auto Accept, we specialize in BPO Auto Acceptance and automated BPO order management for real estate professionals, appraisers, lenders, and valuation companies. Our advanced BPO Auto Accept Software continuously monitors vendor portals and instantly captures Broker Price Opinion (BPO) and appraisal orders in real time, eliminating delays and maximizing your order acceptance rate. Simply customize your preferences—including location, order type, fee range, and vendor portals—and our intelligent BPO automation system automatically accepts only the orders that match your criteria. With 24/7 real-time monitoring, you never have to manually refresh portals or worry about missing valuable opportunities. Whether you're managing foreclosures, REO properties, short sales, loan modifications, or real estate valuations, our automated BPO order capture solution streamlines your workflow, improves efficiency, and helps you secure more assignments with speed and accuracy. Backed by years of industry expertise, we deliver secure, reliable, and cloud-based BPO automation that increases productivity, enhances order management, and gives your business a competitive advantage in the fast-paced Broker Price Opinion (BPO) industry.
            </p>
          </div>

        </div>
      </section>








      {/* ─── What is BPO Auto Acceptance? ─── */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>What is BPO Auto Acceptance?</h2>
          <p style={{ color: 'var(--text-main)', maxWidth: '800px', margin: '0 auto 1.5rem', lineHeight: 1.8, fontSize: '1.02rem' }}>
            BPO Auto Acceptance is an intelligent BPO automation solution that automatically monitors vendor portals and accepts eligible Broker Price Opinion (BPO) and appraisal orders the moment they become available. By eliminating manual refreshing and repetitive clicks, our system improves your BPO order acceptance rate, streamlines BPO order management, and helps you win more assignments through real-time order monitoring.
          </p>
        </div>
      </section>

      {/* ─── How it Works & Why Choose Us (Double Grid) ─── */}
      <section className="container" style={{ marginBottom: '4rem' }}>
        <div className="about-process-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
          
          {/* How Our Software Works */}
          <div className="glass-card" style={{ height: '100%' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', color: 'var(--text-bright)' }}>
              How Our BPO Auto Accept Software Works
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                'Continuously monitors BPO vendor portals 24/7 for new orders.',
                'Automatically captures and accepts eligible BPO and appraisal orders in real time.',
                'Applies your custom preferences, including location, vendor, order type, fee, and other criteria.',
                'Reduces manual effort, improves productivity, and helps maximize your earning potential.'
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'var(--secondary)', color: 'var(--primary)', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center',justifyContent:"center", justify: 'center', fontWeight: 'bold', fontSize: '0.85rem', flexShrink: 0 }}>
                    {idx + 1}
                  </div>
                  <p style={{ fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose BPO Auto Acceptance */}
          <div className="glass-card" style={{ height: '100%' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', color: 'var(--text-bright)' }}>
              Why Choose BPO Auto Acceptance?
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                'Capture more BPO and appraisal orders before your competitors.',
                'Increase your order acceptance rate with intelligent, real-time automation.',
                'Save time by eliminating manual refreshing and repetitive order monitoring.',
                'Customize order acceptance based on preferred vendors, locations, fees, and property types.',
                'Cloud-based platform with no software installation or maintenance required.',
                '24/7 real-time monitoring to ensure you never miss valuable opportunities.',
                'Secure USA-based infrastructure optimized for reliable performance with U.S. vendor portals.',
                'Trusted BPO automation solution designed to improve workflow, productivity, and business growth.'
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <CheckCircle size={15} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '3px' }} />
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default About;
