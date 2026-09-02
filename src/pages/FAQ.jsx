import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQS = [
  {
    q: 'How does your BPO Auto Acceptance Software work?',
    a: <>Our <Link to="/services" style={{ color: 'var(--primary)' }}>BPO Auto Acceptance</Link> Software continuously monitors supported vendor portals through secure automation. When an eligible Broker Price Opinion (BPO) or appraisal order matching your preferences becomes available, the system instantly captures it, helping you improve your order acceptance rate while reducing manual effort.</>
  },
  {
    q: 'Why use email automation instead of logging in directly to the portal?',
    a: <>Our platform uses a secure, cloud-based automation process designed to provide reliable order monitoring and efficient <Link to="/order-capture" style={{ color: 'var(--primary)' }}>BPO order capture</Link> while maintaining compatibility with supported vendor portals. Email automation is a safer approach—it imitates real user behavior, keeps your accounts protected, and helps maintain high acceptance rates without triggering detection.</>
  },
  {
    q: 'How do I get started with BPO automation?',
    a: 'Once you sign up, we’ll give you a dedicated email address. You can either: Forward your BPO portal emails to that address. or Use our email address directly on your portals. From there, our BPO auto accept system takes care of the automation for you.'
  },
  {
    q: 'How quickly are orders accepted?',
    a: 'Most orders are accepted within 3–8 seconds. Actual timing can vary depending on the portal’s response time and email delivery speed.'
  },
  {
    q: 'What’s the cost per accepted order?',
    a: '$4 per BPO order\n$3 per INPS order'
  },
  {
    q: 'Do you charge an annual maintenance fee?',
    a: 'Yes. We have a $50 yearly maintenance fee. As part of our launch offer, this also includes unlimited portal automation.'
  },
  {
    q: 'Do you offer a free trial?',
    a: 'No, we currently do not offer a free trial. However, we’re happy to discuss your business requirements and demonstrate how our BPO Auto Acceptance service works before you subscribe.'
  },
  {
    q: 'How fast do you process accepted orders?',
    a: 'All accepted orders are fully processed and available to you within one business day.'
  },
  {
    q: 'Which portals do you support?',
    a: 'We support most major BPO and INPS portals. If you’re unsure about yours, just share the name with us and we’ll confirm compatibility.'
  },
  {
    q: 'Is my data secure?',
    a: 'Absolutely. We never store your portal credentials. All emails are processed through encrypted channels, and your information stays private.'
  },
  {
    q: 'Can I pause or cancel my automation?',
    a: 'Yes. You can pause or cancel your automation anytime through your dashboard, with no hidden fees.'
  },
  {
    q: 'Do you provide reports or logs of accepted orders?',
    a: 'Yes. You’ll get a clear report of every order our system accepts on your behalf, so you always know what’s happening.'
  },
  {
    q: 'Can I customize the rules for which orders get accepted?',
    a: 'Definitely. You can set your own filters and conditions so the automation only picks up the orders that meet your criteria.'
  },
  {
    q: 'Do you offer support if something goes wrong?',
    a: 'Yes. We provide dedicated email support (and optional chat support for premium users) to help you quickly resolve any issues.'
  },
  {
    q: 'Do I need to sign up on vendor portals myself, or will you handle it for me?',
    a: 'You’ll still need to create and manage your own accounts on each vendor or BPO portal. Our system doesn’t create accounts for you; it simply automates the order acceptance process once your portal is connected to our email system.'
  },
  {
    q: 'Can I choose which BPO orders are accepted?',
    a: 'Yes. You can customize your preferences by vendor, ZIP code, service area, order type, property type, fee amount, and other criteria. Our system only captures orders matching your settings.'
  },
  {
    q: 'Do I need to install any software?',
    a: 'No. Our platform is 100% cloud-based, so there’s nothing to install. Simply configure your account and our automation handles the rest.'
  },
  {
    q: 'Which BPO vendor portals do you support?',
    a: <>Our platform supports many leading BPO and appraisal vendor portals. <Link to="/contact" style={{ color: 'var(--primary)' }}>Contact us</Link> to confirm compatibility with your preferred platform.</>
  },
  {
    q: 'Is my account information secure?',
    a: 'Yes. We use encrypted communication and secure authentication practices to protect your account information and ensure reliable BPO order management.'
  },
  {
    q: 'Can I change my order preferences later?',
    a: 'Absolutely. You can update your order filters and preferences at any time to match your business requirements.'
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div style={{ paddingBottom: '5rem' }}>
      {/* Hero */}
      <section className="hero-section container reveal-fade" style={{ paddingBottom: '3rem' }}>
        <h1 className="hero-title reveal-fade delay-1" style={{ fontSize: '3rem' }}>Frequently asked Questions(FAQ)</h1>
        <p className="hero-subtitle reveal-fade delay-2">
Get answers to the most common questions about our BPO Auto Acceptance Software — including how our Order Capture system works, pricing, supported vendor portals, the setup process, security, and how automation helps you land more Broker Price Opinion (BPO) and appraisal orders.
        </p>
      </section>

      {/* FAQ Accordion */}
      <section className="container reveal" style={{ marginBottom: '5rem', maxWidth: '800px' }}>
        <div className="faq-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {FAQS.map((item, i) => (
            <div key={i} className={`faq-item reveal-hover-card reveal-left delay-${(i % 3) + 1}`} style={{ 
              background: 'rgba(255,255,255,0.02)', 
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '0.5rem',
              overflow: 'hidden'
            }}>
              <button
                id={`faq-btn-${i}`}
                className="faq-question"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
                style={{
                  width: '100%',
                  padding: '1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-main)',
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                <span>{item.q}</span>
                {openIndex === i
                  ? <ChevronUp size={20} style={{ color: 'var(--primary)', flexShrink: 0, marginLeft: '1rem' }} />
                  : <ChevronDown size={20} style={{ color: 'var(--text-muted)', flexShrink: 0, marginLeft: '1rem' }} />
                }
              </button>
              {openIndex === i && (
                <div className="faq-answer" style={{ padding: '0 1.25rem 1.25rem', color: 'var(--text-muted)' }}>
                  <p style={{ lineHeight: 1.8, whiteSpace: 'pre-line', margin: 0 }}>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Summary Section */}
      <section className="container" style={{ marginBottom: '5rem', maxWidth: '1000px' }}>
        <div className="glass-panel" style={{ padding: '3rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Summary</h2>
          <div style={{ color: 'var(--text-muted)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p>Our BPO automation system makes accepting and processing orders effortless. The moment a portal sends out an order notification, our system picks it up from your inbox and runs it through smart rules and filters — so only the orders you actually want get accepted.</p>
            <p>Unlike bots that interact directly with portals (which can trigger account flags or bans), our email-based method mimics natural user behavior, keeping your accounts safe while still delivering strong acceptance rates. Setup is easy: you'll get a dedicated email address to use on your portals or to forward portal emails to. From there, everything runs automatically.</p>
            <p>Most orders are accepted within 3–8 seconds, and every accepted order is fully processed within one business day. Our system works with most major BPO and INPS portals — just share your portal details and we'll confirm compatibility.</p>
            <p>Pricing is $4 per BPO order and $2 per PCR order, plus a $50 annual maintenance fee covering unlimited portal automation. We don't currently offer a free trial, but our straightforward pricing and consistent performance make it a strong value.</p>
            <p>Your data stays protected — we never store portal credentials, and all emails are processed through encrypted channels. Pause or cancel your automation anytime from your dashboard, with no hidden fees. You'll get detailed reports on every order accepted on your behalf, and filters can be customized so only the right orders get captured. Support is available via dedicated email (and optional chat for premium users) whenever you need help.</p>
            <p>Keep in mind, you're responsible for creating and managing your own accounts on each vendor or BPO portal. Our system doesn't set up accounts for you — it automates order acceptance once your portal is linked to our email system.</p>
          </div>
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className="container" style={{ textAlign: 'center' }}>
        <div className="glass-panel" style={{ padding: '4rem 2rem', background: 'linear-gradient(135deg, rgba(3,76,98,0.3) 0%, rgba(6,11,19,0.9) 100%)', borderColor: 'rgba(4,146,194,0.3)' }}>
          <h2 style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>Ready to Land More BPO Orders?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
            Get started with our BPO Auto Acceptance Software today, and let our smart automation monitor vendor portals, capture eligible Broker Price Opinion (BPO) and appraisal orders, and help you grow your business with far less manual work.
                      </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}>Contact Us</Link>
          </div>
          
          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-main)' }}>Got more questions?</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Reach out to us at:</p>
            <a href="mailto:info@bpoautoaccept.com" style={{ color: 'var(--primary)', fontSize: '1.2rem', textDecoration: 'none', fontWeight: '500' }}>info@bpoautoaccept.com</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
