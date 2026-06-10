import React, { useState } from 'react';
import { subscribeToNewsletter } from '../../services/api';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ success: false, error: '', loading: false });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus({ success: false, error: '', loading: true });
    try {
      await subscribeToNewsletter(email);
      setStatus({ success: true, error: '', loading: false });
      setEmail('');
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Subscription failed. Please try again.';
      setStatus({ success: false, error: errMsg, loading: false });
    }
  };

  return (
    <section className="max-w-container-max-width mx-auto px-grid-margin-desktop mb-section-gap-desktop">
      <div className="relative rounded-[48px] overflow-hidden py-32 bg-primary px-16 flex flex-col items-center text-center">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-container via-transparent to-transparent"></div>
        </div>
        <div className="z-10 max-w-2xl w-full">
          <span className="font-technical-data text-technical-data text-primary-fixed mb-6 block tracking-[0.2em] uppercase">
            The Green Bulletin
          </span>
          <h2 className="font-display-xl-mobile text-display-xl-mobile text-white mb-8">
            Insights delivered with industrial precision.
          </h2>
          <p className="font-body-lg text-body-lg text-white/70 mb-12">
            Join 15,000+ industry leaders receiving our monthly editorial on sustainable energy, innovation, and global policy shifts.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
            <input
              className="flex-grow bg-white/10 border border-white/20 rounded-full px-8 py-4 text-white placeholder:text-white/40 focus:ring-1 focus:ring-tertiary-fixed-dim focus:border-tertiary-fixed-dim outline-none transition-all font-body-md text-sm"
              placeholder="Business Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status.loading}
            />
            <button
              type="submit"
              disabled={status.loading}
              className="bg-tertiary-fixed text-on-tertiary-fixed font-label-caps text-label-caps px-10 py-4 rounded-full hover:bg-tertiary-fixed-dim transition-colors whitespace-nowrap cursor-pointer"
            >
              {status.loading ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
            </button>
          </form>
          {status.success && (
            <p className="text-tertiary-fixed mt-4 font-body-md text-sm font-semibold">
              Thank you for subscribing!
            </p>
          )}
          {status.error && (
            <p className="text-error-container mt-4 font-body-md text-sm font-semibold">
              {status.error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
