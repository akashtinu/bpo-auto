import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div style={{ paddingBottom: '5rem' }}>
      <section className="hero-section container" style={{ paddingBottom: '3rem' }}>
        <h1 className="hero-title" style={{ fontSize: '3rem' }}>PrivacyPolicy</h1>
      </section>

      <section className="container" style={{ maxWidth: '900px' }}>
        <article className="glass-panel" style={{ padding: 'clamp(1.5rem, 4vw, 3rem)' }}>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
            At <strong style={{ color: 'var(--text-main)' }}>BPO Auto Accept</strong>, At BPO Auto Accept, we value your privacy and are committed to protecting your personal information. Your trust is important to us, and we take every reasonable step to ensure your data remains safe and secure.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <section>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>Information Security</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
Your data and account credentials are handled with the highest level of security. We implement appropriate security measures to protect your information from unauthorized access, disclosure, alteration, or misuse.              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>Confidentiality</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
We do not share, sell, or disclose your login credentials or personal information to any third party. Your credentials remain private, secure, and are never intentionally leaked or exposed.              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>Data Protection</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
All information provided by our clients is stored securely and is used solely for the purpose of delivering our BPO Auto Accept services. We continuously monitor and maintain our systems to provide a safe and secure environment.              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>Your Privacy</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
We respect your privacy and are committed to maintaining the confidentiality of your information. Any data you provide is handled responsibly and protected using industry-standard security practices.              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>Contact Us</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
If you have any questions or concerns regarding this Privacy Policy, please contact us through our official support channels. We will be happy to assist you.  </p>
            </section>
          </div>
        </article>
      </section>
    </div>
  );
};

export default PrivacyPolicy;