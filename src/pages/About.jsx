import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Target, Award, Users, Cpu, FileText, CheckCircle, Zap } from 'lucide-react';
import '../index.css';
import office from '../assets/Image-7.webp';
import working from '../assets/working.jpg';
import bulding from '../assets/bulting_big.jpg';

// Animated Counter Component that counts up from 0 to target when scrolled into view
const AnimatedCounter = ({ target, suffix = '', prefix = '', duration = 1800 }) => {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef(null);
  const started = React.useRef(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            let startTimestamp = null;
            const step = (timestamp) => {
              if (!startTimestamp) startTimestamp = timestamp;
              const progress = Math.min((timestamp - startTimestamp) / duration, 1);
              const easeOut = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(easeOut * target));
              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                setCount(target);
              }
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
};

const About = () => {
  return (
    <div className="about-page" style={{ paddingBottom: '5rem' }}>
      
      {/* ─── Hero Section ─── */}
      <section className="hero-section container reveal-fade" style={{ paddingBottom: '2rem' }}>
        <div className="hero-badge reveal-scale">
          <Shield size={14} style={{ marginRight: '4px' }} /> About Us | BPO Auto Accept Software
        </div>
        <h1 className="hero-title reveal-fade delay-1" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Expert Broker Price Opinion (BPO) Auto Acceptance
        </h1>
        <p className="hero-subtitle reveal-fade delay-2">
         We're a dedicated automation provider, helping appraisers, lenders, real estate agents, and valuation firms capture Broker Price Opinion (BPO) orders without lifting a finger.
          </p>
      </section>

      {/* ─── Mission & Intro Grid ─── */}
      <section className="container reveal" style={{ marginBottom: '5rem' }}>
        <div className="about-main-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }}>
          
          {/* Left: Mission & Details */}
          <div className="reveal-left">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-bright)' }}>About Us</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: 'var(--text-main)', lineHeight: 1.8 }}>
              <p>
                At BPO Auto Accept, we offer powerful BPO Auto Accept Software built to automate Broker Price Opinion (BPO) and appraisal order acceptance with speed, precision, and dependability. Acting like a dedicated virtual assistant, our automation engine constantly watches vendor portals and instantly grabs eligible orders based on the preferences you set.
              </p>
              <p>
                Whether an order involves secure login, authentication, or several acceptance steps, our smart order management platform handles it all seamlessly. Just set your preferred location, fee range, property type, vendor, and other criteria, and our system will only capture the BPO and appraisal orders that fit your needs. Conditional order acceptance is also supported, giving you full control over how your workflow runs.
              </p>
              <p>
                Our cloud-based software runs entirely online — no installation, no dedicated hardware required. Access it from anywhere, with continuous real-time order monitoring that keeps you competitive without any complicated technical setup.
              </p>
              <p>
                Unlike manual acceptance, our system runs 24/7, constantly checking vendor portals so you never miss an opportunity, even when you're away from your desk. Our monitoring technology spots new orders the instant they appear, helping you raise your acceptance rate, boost productivity, and increase your earnings.
              </p>
              <p>
                For speed and reliability, our infrastructure runs on secure USA-based servers, giving us optimized connectivity to supported BPO and appraisal vendor portals. This setup helps minimize response times and ensures consistent order capture for professionals across the real estate valuation space.
              </p>
              <p>
                With BPO Auto Accept, you're not just getting automation — you're gaining a technology partner focused on helping you win more Broker Price Opinion (BPO) and appraisal orders, simplify your operations, and grow your business with confidence.
              </p>
            </div>
            
            <div style={{ marginTop: '2rem' }}>
              <Link to="/services" className="btn btn-primary">Learn More About Our Services</Link>
            </div>
          </div>

          {/* Right: Counter Stats & Side Details */}
          <div className="about-side-stack reveal-right delay-2" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="glass-panel" style={{ padding: '2rem', borderLeft: '4px solid var(--primary)', background: 'rgba(4,146,194,0.04)', marginBottom: '2.5rem' }}>
              <h3 style={{ color: 'var(--text-bright)', marginBottom: '0.75rem', fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Our Mission
              </h3>
              <p style={{ fontSize: '0.98rem', lineHeight: 1.7, color: 'var(--text-main)' }}>
               Our mission is to deliver best-in-class BPO Auto Accept Software that automates BPO and appraisal order acceptance with speed, precision, and reliability. By pairing smart automation with real-time monitoring, we help professionals boost acceptance rates, drive productivity, and grow their business through efficient BPO order management.
                 </p>
            </div>

            <img src={office} alt="BPO office" width="600" height="400" className="reveal-img-grow" style={{ borderRadius: '12px', width: '100%', height: 'auto' }} />

            {/* Quick Who-We-Are Summary Box */}
            <div className="glass-card reveal-hover-card" style={{ borderColor: 'rgba(4, 146, 194, 0.25)' }}>
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
                <strong> Your All-in-One BPO Capture Tool:</strong>    We use advanced automation software to secure your BPO orders and keep you ahead of the competition.
              </p>
            </div>

          </div>
        
        </div>
      </section>

      {/* ─── Performance Metrics (Animated Counter) ─── */}
      <div className="glass-panel about-metrics reveal-scale" style={{ padding: '2rem', textAlign: 'center', marginBottom: '40px' }}>
        <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Performance Metrics</h4>
        <div className="about-metrics-grid" style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
          <div className="about-metric" style={{ flex: '1 1 180px', minWidth: '120px', padding: '1rem 0.5rem', borderRight: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>
              <AnimatedCounter target={2} suffix=" +" />
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>Years Experience</div>
          </div>
          <div className="about-metric" style={{ flex: '1 1 180px', minWidth: '120px', padding: '1rem 0.5rem', borderRight: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>
              <AnimatedCounter target={15} suffix=" +" />
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>Clients Across US</div>
          </div>
          <div className="about-metric" style={{ flex: '1 1 180px', minWidth: '120px', padding: '1rem 0.5rem' }}>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>
              <AnimatedCounter target={150} suffix=" k+" />
            </div>
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
             Backed by years of experience in the Broker Price Opinion (BPO) and real estate valuation space, BPO Auto Accept is dedicated to helping real estate professionals, appraisers, lenders, and valuation companies win more BPO and appraisal orders through intelligent automation. Our advanced software combines real-time order monitoring, automated capture, and smart order management to boost acceptance rates and eliminate the need for constant manual refreshing.

Our cloud-based platform runs 24/7, monitoring vendor portals and instantly grabbing eligible orders based on the preferences you set. By making BPO order management faster, more precise, and more reliable, we help you save time, work more productively, and focus on delivering great service to your clients.

As a trusted name in BPO Auto Acceptance, our mission is simple: deliver secure, dependable, high-performance automation that maximizes efficiency, streamlines your workflow, and helps your business grow with confidence.
              </p>
          </div>

          {/* What We Do */}
          <div  style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
            
          <img src={bulding} alt="BPO building" width="600" height="400" className="aboutimage reveal-img-grow" style={{ width: '100%', height: 'auto' }} />

          </div>

        </div>
      </section>





<section className="container" style={{ marginBottom: '5rem', }}>
        <div className="about-feature-grid container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
          
          {/* Who We Are */}
          <div className='box1'  style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
            
          <img src={working} alt="BPO team working" width="600" height="400" className="aboutimage reveal-img-grow" style={{ width: '100%', height: 'auto' }} />

          </div>

          {/* What We Do */}
          <div className="glass-card box2">
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-bright)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Cpu size={20} style={{ color: 'var(--primary)' }} /> What We Do
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
             BPO Auto Accept focuses on automated order acceptance and management for real estate professionals, appraisers, lenders, and valuation companies. Our software continuously scans vendor portals and instantly captures Broker Price Opinion (BPO) and appraisal orders in real time, cutting out delays and pushing your acceptance rate as high as possible.

Just set your preferences — location, order type, fee range, and vendor portals — and our automation will only accept the orders that match your criteria. With round-the-clock monitoring, you'll never need to manually refresh a portal or risk missing a good opportunity.

Whether you handle foreclosures, REO properties, short sales, loan modifications, or valuations, our automated capture solution simplifies your workflow, boosts efficiency, and helps you land more assignments quickly and accurately.

Built on years of industry know-how, we deliver secure, dependable, cloud-based automation that increases productivity, strengthens order management, and gives your business an edge in the fast-moving BPO space.
 </p>
          </div>

        </div>
      </section>








      {/* ─── What is BPO Auto Acceptance? ─── */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>What is BPO Auto Acceptance?</h2>
          <p style={{ color: 'var(--text-main)', maxWidth: '800px', margin: '0 auto 1.5rem', lineHeight: 1.8, fontSize: '1.02rem' }}>
            BPO Auto Acceptance is a smart automation solution that watches vendor portals around the clock and instantly accepts eligible Broker Price Opinion (BPO) and appraisal orders as soon as they're posted. By taking manual refreshing and repetitive clicking out of the equation, our system boosts your acceptance rate, simplifies order management, and helps you land more assignments through real-time monitoring.
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
                'Monitors BPO vendor portals around the clock for new orders.',
                'Instantly captures and accepts eligible BPO and appraisal orders as they come in.',
                'Applies your custom criteria — location, vendor, order type, fee, and more.',
                'Cuts down manual work, boosts productivity, and helps you earn more.'
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
                'Win more BPO and appraisal orders ahead of the competition.',
                'Boost your acceptance rate with smart, real-time automation.',
                'Skip the manual refreshing — save time with automated monitoring.',
                'Tailor order acceptance by vendor, location, fee, and property type.',
                'Fully cloud-based — nothing to install or maintain.',
                'Round-the-clock monitoring so you never miss a valuable opportunity.',
                'Secure, USA-based infrastructure built for reliable performance with U.S. vendor portals.',
                'A trusted automation partner focused on better workflow, productivity, and growth.'
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
