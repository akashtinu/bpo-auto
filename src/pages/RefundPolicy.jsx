import React from 'react';

const RefundPolicy = () => {
  return (
    <div style={{ paddingBottom: '5rem' }}>
      <section className="hero-section container" style={{ paddingBottom: '3rem' }}>
        <h1 className="hero-title" style={{ fontSize: '3rem' }}>Refund Policy</h1>
      </section>

      <section className="container" style={{ maxWidth: '900px' }}>
        <article className="glass-panel" style={{ padding: 'clamp(1.5rem, 4vw, 3rem)' }}>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
            At <strong style={{ color: 'var(--text-main)' }}>BPO Auto Accept</strong>, we are committed to providing reliable and professional services. Please read our refund policy carefully before making any payment.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <section>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>No Refund After Work Begins</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                Once payment has been received and our team has started working on your requested service, the payment is <strong style={{ color: 'var(--text-main)' }}>non-refundable</strong>. This is because resources, time, and effort are immediately allocated to your project.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>Service Confirmation</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                By making a payment, you confirm that you understand and agree to our service terms and refund policy. Please ensure that you have reviewed all service details before completing your purchase.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>Exceptions</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                Refunds will not be issued for completed services, partially completed work, or delays caused by missing information or lack of response from the client.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>Contact Us</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                If you have any questions regarding this Refund Policy, please contact our support team through our official communication channels. We are happy to assist you with any concerns.
              </p>
            </section>
          </div>
        </article>
      </section>
    </div>
  );
};

export default RefundPolicy;