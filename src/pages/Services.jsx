import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap, Filter, Shield, Award, CheckCircle, ArrowRight,
  TrendingUp, Clock, BookOpen, Layers, CheckSquare
} from 'lucide-react';
import sign from '../assets/house_sign.jpg';
import handshack from '../assets/businessmen-shake-hands.jpg';
import monitoring from '../assets/monitering-systom.jpg';
import autoaccept from '../assets/auto-accept.png';


const Services = () => {
  return (
    <div className="services-page" style={{ paddingBottom: '5rem' }}>
      
      {/* ─── Hero Section ─── */}
      <section className="hero-section container" style={{ paddingBottom: '2.5rem' }}>
        <div className="hero-badge">
          <Zap size={14} style={{ marginRight: '4px' }} /> Our BPO Auto Acceptance Solutions
        </div>
        <h1 className="hero-title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Innovative BPO Automation for Faster Order Capture
        </h1>
        <p className="hero-subtitle" style={{ fontSize: '1.15rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
          Looking for a smarter way to manage Broker Price Opinion (BPO) and appraisal orders? Our BPO Auto Acceptance Solutions are designed for real estate professionals, appraisers, brokers, lenders, and valuation companies who want to increase efficiency, secure more assignments, and maximize revenue.
        </p>

         {/* <p  className="hero-subtitle" style={{ fontSize: '1.15rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
              Powered by our advanced BPO Auto Acceptance Software, the system continuously monitors vendor portals in real time and automatically captures eligible BPO and appraisal orders based on your customized preferences. By eliminating manual refreshing and reducing response times, our intelligent BPO automation solution helps you stay ahead of the competition while improving your BPO order acceptance rate.
            </p>
            <p  className="hero-subtitle" style={{ fontSize: '1.15rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
              Whether you manage a few assignments or hundreds each month, our cloud-based BPO order management platform delivers reliable, secure, and efficient automation to help your business grow.
            </p>   */}

      </section>

      {/* ─── Service Overview Grid ─── */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div className="services-overview" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
            <p>
              Powered by our advanced BPO Auto Acceptance Software, the system continuously monitors vendor portals in real time and automatically captures eligible BPO and appraisal orders based on your customized preferences. By eliminating manual refreshing and reducing response times, our intelligent BPO automation solution helps you stay ahead of the competition while improving your BPO order acceptance rate.
            </p>
            <p>
              Whether you manage a few assignments or hundreds each month, our cloud-based BPO order management platform delivers reliable, secure, and efficient automation to help your business grow.
            </p>
            <div style={{ marginTop: '1rem' }}>
              <Link to="/register" className="btn btn-primary">Start Automating Now</Link>
            </div>
          </div>
          <div className="glass-panel" style={{ padding: '2.5rem', background: 'rgba(16, 29, 47, 0.45)' }}>
            <h4 style={{ color: 'var(--primary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem', fontWeight: 700 }}>Our Service</h4>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-bright)' }}>BPO Order Acceptance</h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.25rem', color: 'var(--text-main)' }}>
              Our BPO Order Acceptance service automates the process of capturing Broker Price Opinion (BPO) and appraisal assignments from supported vendor portals. Instead of manually refreshing pages and competing for new orders, our intelligent automation continuously monitors portals and instantly accepts assignments that match your predefined criteria.
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-main)' }}>
              With customizable filters for location, vendor, order type, fee range, and property type, you maintain complete control over the orders you receive while increasing your chances of securing more profitable assignments.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Why Choose Our BPO Order Acceptance Service? ─── */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div className="services-why" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
          
          {/* List of points */}
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-bright)' }}>
              Why Choose Our BPO Order Acceptance Service?
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                'Real-time BPO and appraisal order monitoring',
                'Automated BPO order capture with customizable filters',
                'Higher order acceptance rates through intelligent automation',
                '24/7 cloud-based monitoring with no software installation',
                'Secure and reliable BPO order management',
                'Designed to improve productivity and maximize earning potential'
              ].map(item => (
                <li key={item} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <CheckCircle size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-bright)' }}>{item}</span>
                </li>
              ))}
            </ul>
            <p style={{ marginTop: '2rem', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Grow your real estate business with a trusted BPO Auto Acceptance Solution that delivers faster order capture, improved workflow efficiency, and reliable Broker Price Opinion (BPO) automation.
            </p>
          </div>

          {/* Price opinion card */}
          <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(3,76,98,0.2) 0%, rgba(6,11,19,0.9) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
            <p style={{ fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--text-bright)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              "Need a reliable price opinion? Our expert service provides accurate market value assessments. Get your price opinion report today."
            </p>
            <div>
              <Link to="/contact" className="btn btn-secondary">Get Price Opinion Report</Link>
            </div>
          </div>

        </div>
      </section>

      {/* ─── Banner Section: Automated BPO Order Acceptance ─── */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div className="glass-panel" style={{ padding: '3.5rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(6,11,19,0.95) 0%, rgba(4,146,194,0.1) 100%)' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.25rem', color: 'var(--text-bright)' }}>
            Automated BPO Order Acceptance | Secure More Broker Price Opinion Orders
          </h2>
          <p style={{ color: 'var(--text-main)', maxWidth: '850px', margin: '0 auto 2.5rem', lineHeight: 1.7, fontSize: '0.98rem' }}>
            Maximize your BPO order acceptance rate with our intelligent BPO Auto Acceptance Software. Our cloud-based automation continuously monitors vendor portals, instantly captures eligible Broker Price Opinion (BPO) and appraisal orders, and helps real estate professionals secure more assignments with speed, accuracy, and reliability.
          </p>

          <div className="services-feature-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', textAlign: 'left' }}>
            {[
              { num: '01', title: 'Intelligent Order Filtering', desc: 'Accept only the BPO and appraisal orders that match your preferred vendors, locations, fees, and property types.' },
              { num: '02', title: 'Instant Order Capture', desc: 'Real-time monitoring and automated acceptance help you secure more assignments before the competition.' },
              { num: '03', title: 'Secure Cloud Automation', desc: 'Our USA-hosted, cloud-based platform operates 24/7 with no software installation required, ensuring reliable BPO order management.' }
            ].map(item => (
              <div key={item.num} className="glass-card">
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary)', opacity: 0.8, marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                  {item.num}
                </div>
                <h4 style={{ color: 'var(--text-bright)', marginBottom: '0.5rem' }}>{item.title}</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BPO Appraisal Deep Dive ─── */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div className="services-deep-dive" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'start' }}>
          
          {/* Left: Explanation */}
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.25rem' }}>BPO Appraisal</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: 'var(--text-main)', lineHeight: 1.8, fontSize: '0.98rem' }}>
              <p>
                A BPO Appraisal (Broker Price Opinion) is a professional property valuation performed by a licensed real estate broker or agent to estimate a property’s current market value. Financial institutions, lenders, mortgage companies, and investors rely on BPO appraisals to make informed real estate and lending decisions.
              </p>
              <p>
                Our BPO Auto Acceptance Software helps real estate professionals instantly capture valuable BPO appraisal orders through real-time order monitoring and intelligent BPO automation. By automatically accepting eligible assignments based on your customized criteria, our system increases your order acceptance rate and eliminates the need for constant manual monitoring.
              </p>
              <p>
                With 24/7 automated BPO order capture, our cloud-based platform helps you secure more Broker Price Opinion (BPO) and appraisal assignments, improve productivity, and maximize your earning potential while delivering accurate property valuation services.
              </p>
            </div>
          </div>

          {/* Right: Common Uses */}
          <div className="glass-card" style={{ borderColor: 'rgba(4, 146, 194, 0.25)' }}>
            <h4 style={{ color: 'var(--primary)', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem', fontWeight: 700 }}>
              Common Uses of BPO Appraisals
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                'Mortgage refinancing and loan modifications.',
                'Foreclosure and short sale property valuations.',
                'REO (Real Estate Owned) asset management.',
                'Real estate investment analysis and acquisitions.',
                'Portfolio valuation for banks, lenders, and financial institutions.',
                'Property market value assessments for buying and selling decisions.'
              ].map(item => (
                <div key={item} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <CheckCircle size={15} style={{ color: 'var(--success)', marginTop: '3px', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ─── Best Practices for BPO Order Acceptance ─── */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div className="section-header">
          <h2>Best Practices for BPO Order Acceptance</h2>
          <p>Following the right approach to Broker Price Opinion (BPO) order acceptance helps improve efficiency, maintain quality, and increase your success rate.</p>
        </div>

        <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {[
            { title: 'Verify Assignment Details', desc: 'Review vendor requirements, order scope, deadlines, and compensation to ensure the assignment meets your business goals before acceptance.' },
            { title: 'Customize Your Order Preferences', desc: 'Set filters for preferred vendors, service areas, property types, fee ranges, and order types so you only receive assignments that match your expertise.' },
            { title: 'Stay Updated on Local Market Trends', desc: 'Maintain current knowledge of local real estate markets to deliver accurate Broker Price Opinion (BPO) reports and build long-term relationships with clients.' },
            { title: 'Optimize Your Workflow with Automation', desc: 'Use intelligent BPO Auto Acceptance and real-time order monitoring to eliminate manual refreshing, reduce response times, and capture more valuable BPO and appraisal assignments.' },
            { title: 'Grow Your Business with Confidence', desc: 'Our secure, cloud-based BPO automation platform works 24/7 to help you increase order acceptance rates, improve productivity, maximize earnings, and stay competitive in the fast-paced BPO and appraisal industry.' }
          ].map((item, idx) => (
            <div key={item.title} className="glass-card" style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
              <div style={{ background: 'rgba(4,146,194,0.1)', color: 'var(--primary)', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center',justifyContent:"center", justify: 'center', fontWeight: 'bold', fontSize: '0.9rem', flexShrink: 0 }}>
                {idx + 1}
              </div>
              <div>
                <h4 style={{ color: 'var(--text-bright)', marginBottom: '0.5rem', fontSize: '1.05rem' }}>{item.title}</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── How BPO Appraisal Works / FAQ Link ─── */}
     

      {/* ─── BPO Order Acceptance Workflow ─── */}
      <section className="container" style={{ marginTop: '5rem' }}>
        <div className="section-header">
          <h2>How BPO Order Acceptance Works</h2>
          <p>Set your preferences once and let our automation handle the rest.</p>
        </div>

        <div
          className="services-process-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {[
            {
              number: '01',
              image:sign,
              title: 'Set Your BPO Order Preferences',
              description: 'Sign up and configure your preferences for order types, locations, and fees. Our BPO automation software captures only matching orders based on your criteria.'
            },
            {
              number: '02',
              image:handshack,
              title: 'Connect BPO Order Portals',
              description: 'Seamlessly connect your account with BPO platforms for real-time order monitoring, automated workflows, and faster order acceptance.'
            },
            {
              number: '03',
              image:monitoring,
              title: 'Automated Order Monitoring',
              description: 'Our system continuously monitors connected portals and detects new BPO orders instantly based on your selected requirements.'
            },
            {
              number: '04',
              image:autoaccept,
              title: 'Auto Acceptance Software',
              description: 'Matching BPO orders are automatically accepted within seconds, helping you secure opportunities faster without manual monitoring.'
            }
          ].map(step => (
            <article key={step.number} className="glass-card" style={{ overflow: 'hidden', padding: 0 }}>
              <img
                src={step.image}
                alt={step.title}
                style={{ width: '100%', height: '170px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '1.5rem' }}>
                <div style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.75rem' }}>
                  {step.number}
                </div>
                <h4 style={{ color: 'var(--text-bright)', marginBottom: '0.6rem' }}>{step.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>{step.description}</p>
              </div>
            </article>
          ))}



        </div>



      </section>

      <section className="container" style={{ textAlign: 'center' ,marginTop:'1rem'}}>
        <div className="glass-panel" style={{ padding: '3rem', background: 'linear-gradient(135deg, rgba(3,76,98,0.3) 0%, rgba(6,11,19,0.9) 100%)', borderColor: 'rgba(4,146,194,0.3)' }}>
        
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 1.5rem', fontSize: '0.95rem' }}>
            Have questions about standard BPO auto acceptance workflows? Read our frequently asked questions below or contact our support team.
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <Link to="/faq" className="btn btn-primary">Read FAQs</Link>
            <Link to="/contact" className="btn btn-secondary">Ask a Question</Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;
