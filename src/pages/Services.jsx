import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap, Filter, Shield, Award, CheckCircle, ArrowRight,
  TrendingUp, Clock, BookOpen, Layers, CheckSquare
} from 'lucide-react';
import sign from '../assets/house_sign.jpg';
import handshack from '../assets/businessmen-shake-hands.jpg';
import monitoring from '../assets/monitering-systom.jpg';
import autoaccept from '../assets/auto-accept.jpg';


const Services = () => {
  return (
    <div className="services-page" style={{ paddingBottom: '5rem' }}>
      
      {/* ─── Hero Section ─── */}
      <section className="hero-section container reveal-fade" style={{ paddingBottom: '2.5rem' }}>
        <div className="hero-badge reveal-scale">
          <Zap size={14} style={{ marginRight: '4px' }} /> Our BPO Auto Acceptance Solutions
        </div>
        <h1 className="hero-title reveal-fade delay-1" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Smarter BPO Automation for Faster Order Capture
        </h1>
        <p className="hero-subtitle reveal-fade delay-2" style={{ fontSize: '1.15rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
        Ready for a better way to handle Broker Price Opinion (BPO) and appraisal orders? Our BPO Auto Acceptance Solutions are built for real estate professionals, appraisers, brokers, lenders, and valuation companies looking to work smarter, land more assignments, and boost revenue.
          </p>

      </section>

      {/* ─── Service Overview Grid ─── */}
      <section className="container reveal" style={{ marginBottom: '5rem' }}>
        <div className="services-overview" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div className="reveal-left" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
            <p>
             Driven by our advanced Auto Acceptance Software, the system watches vendor portals in real time and automatically grabs eligible BPO and appraisal orders based on the preferences you've set. By cutting out manual refreshing and shortening response times, our automation keeps you ahead of the competition and lifts your acceptance rate.
              </p>
            <p>
             Whether you're handling a handful of assignments or hundreds each month, our cloud-based order management platform gives your business reliable, secure, and efficient automation to grow on.
              </p>
            <div style={{ marginTop: '1rem' }}>
              <Link to="/register" className="btn btn-primary">Start Automating Now</Link>
            </div>
          </div>
          <div className="glass-panel reveal-right delay-2" style={{ padding: '2.5rem', background: 'rgba(16, 29, 47, 0.45)' }}>
            <h4 style={{ color: 'var(--primary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem', fontWeight: 700 }}>Our Service</h4>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-bright)' }}>BPO Order Acceptance</h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.25rem', color: 'var(--text-main)' }}>
             Our BPO Order Acceptance service handles the entire process of capturing Broker Price Opinion (BPO) and appraisal assignments from supported vendor portals for you. Instead of manually refreshing pages and racing for new orders, our automation constantly watches the portals and instantly accepts assignments that fit your predefined criteria.
               </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-main)' }}>
            With customizable filters for location, vendor, order type, fee range, and property type, you stay in full control of which orders come your way — while boosting your chances of landing more profitable assignments.
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
                'Live monitoring for BPO and appraisal orders',
                'Automated order capture with custom filters',
                'Higher acceptance rates through smart automation',
                '24/7 cloud-based monitoring, no installation needed',
                'Secure, dependable order management',
                'Built to boost productivity and increase your earnings'
              ].map(item => (
                <li key={item} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <CheckCircle size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-bright)' }}>{item}</span>
                </li>
              ))}
            </ul>
            <p style={{ marginTop: '2rem', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
             Scale your real estate business with a dependable BPO Auto Acceptance Solution built for faster order capture, smoother workflow, and reliable Broker Price Opinion (BPO) automation.
              </p>
          </div>

          {/* Price opinion card */}
          <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(3,76,98,0.2) 0%, rgba(6,11,19,0.9) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
            <p style={{ fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--text-bright)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
             "Looking for a dependable price opinion? Our experienced team delivers accurate market value assessments. Order your price opinion report today."

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
           Boost your BPO order acceptance rate with our smart Auto Acceptance Software. Our cloud-based automation constantly watches vendor portals, instantly grabs eligible Broker Price Opinion (BPO) and appraisal orders, and helps real estate professionals win more assignments with speed, precision, and reliability.
             </p>

          <div className="services-feature-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', textAlign: 'left' }}>
            {[
              { num: '01', title: 'Smart Order Filtering', desc: 'Only accept BPO and appraisal orders that fit your preferred vendors, locations, fees, and property types.' },
              { num: '02', title: 'Lightning-Fast Capture', desc: 'Real-time monitoring and automated acceptance help you land more assignments ahead of the competition.' },
              { num: '03', title: 'Secure Cloud Platform', desc: 'Hosted in the USA and running 24/7 with nothing to install, our cloud platform delivers dependable order management.' }
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
                Simply put, a BPO Appraisal (Broker Price Opinion) is an estimate of a property's market value, prepared by a licensed real estate agent or broker rather than a certified appraiser. Lenders, mortgage companies, financial institutions, and investors use these reports to support decisions around real estate transactions and lending.
              </p>
              <p>
                Our BPO Auto Acceptance Software gives real estate professionals a way to capture these valuable BPO appraisal assignments the moment they're posted, using real-time monitoring and automated order acceptance. Orders are accepted based on the criteria you set, boosting your acceptance rate and freeing you from having to check portals manually.
              </p>
              <p>
                Running 24/7 in the cloud, our platform helps you pick up more Broker Price Opinion (BPO) and appraisal work, get more done, and grow your income — all while keeping your property valuations accurate and reliable.
              </p>
            </div>
          </div>

          {/* Right: Common Uses */}
          <div className="glass-card" style={{ borderColor: 'rgba(4, 146, 194, 0.25)' }}>
            <h4 style={{ color: 'var(--primary)', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem', fontWeight: 700 }}>
              Where BPO Appraisals Are Typically Used
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                'Mortgage refinancing and loan modification decisions.',
                'Valuing properties in foreclosure or short sale situations.',
                'Managing REO (Real Estate Owned) assets.',
                'Analyzing real estate investments and acquisitions.',
                'Valuing property portfolios for banks, lenders, and financial institutions.',
                'Assessing market value to support buying and selling decisions.'
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
          <h2>BPO Order Acceptance Best Practices</h2>
<p>Taking the right approach to Broker Price Opinion (BPO) order acceptance can boost your efficiency, keep quality consistent, and improve your overall success rate.</p>        </div>

        <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {[
            { title: 'Check Assignment Details Carefully', desc: 'Look over vendor requirements, scope of work, deadlines, and pay before accepting to make sure the assignment lines up with your business goals.' },
            { title: 'Set Your Order Preferences', desc: 'Configure filters for preferred vendors, service areas, property types, fee ranges, and order types so you only get assignments that suit your expertise.' },
            { title: 'Keep Up with Local Market Trends', desc: 'Stay informed on your local real estate market to produce accurate Broker Price Opinion (BPO) reports and build lasting client relationships.' },
            { title: 'Automate Your Workflow', desc: 'Leverage BPO Auto Acceptance and real-time monitoring to skip manual refreshing, cut response times, and grab more valuable BPO and appraisal assignments.' },
            { title: 'Grow Your Business Confidently', desc: 'Our secure, cloud-based platform runs 24/7, helping you raise acceptance rates, work more productively, earn more, and stay competitive in the fast-moving BPO and appraisal space.' },
            { title: 'Track Performance & Adjust Strategy', desc: 'Regularly review your acceptance reports and performance data to identify trends, refine your filters, and continuously improve your order acceptance rate.' }
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
<p>Configure your preferences one time, then let automation take care of everything else.</p>
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
              description: 'Create your account and set your preferences for order type, location, and fee range. From there, our automation software captures only the orders that match your criteria.'
            },
            {
              number: '02',
              image:handshack,
             title: 'Link Your BPO Portals',
              description: 'Connect your account to BPO platforms for real-time monitoring, automated workflows, and quicker order acceptance.'
             },
            {
              number: '03',
              image:monitoring,
             title: 'Continuous Order Monitoring',
              description: 'Our system keeps a constant watch on connected portals, spotting new BPO orders the moment they appear based on your selected requirements.'
             },
            {
              number: '04',
              image:autoaccept,
             title: 'Auto Acceptance Software',
              description: 'Orders that match your criteria are accepted automatically within seconds, so you can secure opportunities faster without any manual monitoring.'
             }
          ].map(step => (
            <article key={step.number} className="glass-card" style={{ overflow: 'hidden', padding: 0 }}>
              <img
                src={step.image}
                alt={step.title}
                width="400"
                height="170"
                className="reveal-img-grow"
                loading="lazy"
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
           Have questions about how standard BPO auto acceptance workflows work? Check out our FAQs below, or reach out to our support team for help.
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
