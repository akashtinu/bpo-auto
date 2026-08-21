import React from 'react';

const TermsConditions = () => {
  return (
    <div style={{ paddingBottom: '5rem' }}>
      <section className="hero-section container" style={{ paddingBottom: '3rem' }}>
        <h1 className="hero-title" style={{ fontSize: '3rem' }}>Terms & Conditions</h1>
        <h3 className='hero-title'  style={{fontSize:'2rem' , color: 'linear-gradient(135deg, #ffffff 30%, var(--primary) 100%)'}}>Welcome to our BPO order acceptance service. By using our platform, you agree to the following terms and conditions:</h3>
      </section>

      <section className="container" style={{ maxWidth: '900px' }}>
        <article className="glass-panel" style={{ padding: 'clamp(1.5rem, 4vw, 3rem)' }}>
          

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <section>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>1. Service Overview</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
We provide an automated software service that accepts broker price opinion (BPO) orders on your behalf. The service helps streamline order acquisition for agents and companies.              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>2. Payment Terms</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                The fee for each accepted order is 3 USD.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
               Clients are required to make payments weekly based on the number of orders accepted.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                Payments can be made via PayPal or bank transfer.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                A USD 50 one-time refundable security deposit is required to activate your account.
              </p>
              
            </section>

            <section>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>3. Refund & Cancellation</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
              The USD 50 deposit is refundable upon service termination, provided there are no outstanding dues.


              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
              Service can be paused or canceled with prior written notice.


              </p>
            </section>
            <section>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>4. Account Responsibilities</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
              Clients must ensure timely weekly payments.


              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
              Delayed payments may result in temporary suspension of the service.


              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
              You are responsible for keeping your account and login credentials secure.


              </p>
            </section>
            <section>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>5. Limitation of Liability</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
              We are not liable for any losses resulting from order rejections, platform outages, or third-party software issues beyond our control.
              </p>
            </section>
            <section>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>6. Changes to Terms</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
              We reserve the right to update these terms at any time. Clients will be notified of significant changes via email or dashboard notification.
              </p>
            </section>
            <section>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>Contact Us</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
              For billing, technical support, or account issues, reach us at: <a href="mailto:info@autoacceptbpo.com" style={{ color: 'var(--primary)', fontSize: '1.1rem', fontWeight: '500' }}>
                      info@autoacceptbpo.com
                    </a>
              </p>
            </section>

            
            

          </div>
        </article>
      </section>
    </div>
  );
};

export default TermsConditions;