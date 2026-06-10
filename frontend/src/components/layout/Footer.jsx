import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { subscribeToNewsletter } from '../../services/api';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError('');
    try {
      await subscribeToNewsletter(email);
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      setError(err.response?.data?.message || 'Subscription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="w-full pt-section-gap-desktop pb-10 bg-primary dark:bg-primary text-on-primary">
      <div className="grid grid-cols-12 gap-grid-gutter max-w-container-max-width mx-auto px-grid-margin-desktop mb-20">
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <Link to="/" className="font-headline-lg text-2xl md:text-headline-lg text-white block">
            Green Pellets India
          </Link>
          <p className="font-body-md text-on-primary/70 max-w-xs">
            India's leading biomass fuel engineers. Bridging the gap between agricultural waste and industrial energy needs.
          </p>
          <div className="flex space-x-6">
            <a className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all" href="#">
              <span className="material-symbols-outlined text-xl">share</span>
            </a>
            <a className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all" href="#">
              <span className="material-symbols-outlined text-xl">public</span>
            </a>
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2 space-y-6">
          <h4 className="font-label-caps text-label-caps text-white uppercase opacity-50">Sitemap</h4>
          <ul className="space-y-4">
            <li><Link className="font-body-md text-on-primary/70 hover:text-tertiary-fixed-dim transition-all block" to="/">Home</Link></li>
            <li><Link className="font-body-md text-on-primary/70 hover:text-tertiary-fixed-dim transition-all block" to="/about">About Us</Link></li>
            <li><Link className="font-body-md text-on-primary/70 hover:text-tertiary-fixed-dim transition-all block" to="/why-biomass">Why Biomass</Link></li>
            <li><Link className="font-body-md text-on-primary/70 hover:text-tertiary-fixed-dim transition-all block" to="/industries">Impact</Link></li>
          </ul>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2 space-y-6">
          <h4 className="font-label-caps text-label-caps text-white uppercase opacity-50">Products</h4>
          <ul className="space-y-4">
            <li><Link className="font-body-md text-on-primary/70 hover:text-tertiary-fixed-dim transition-all block" to="/products">Pine Pellets</Link></li>
            <li><Link className="font-body-md text-on-primary/70 hover:text-tertiary-fixed-dim transition-all block" to="/products">Industrial Blend</Link></li>
            <li><Link className="font-body-md text-on-primary/70 hover:text-tertiary-fixed-dim transition-all block" to="/products">Rice Briquettes</Link></li>
            <li><Link className="font-body-md text-on-primary/70 hover:text-tertiary-fixed-dim transition-all block" to="/products">Custom Mix</Link></li>
          </ul>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-4 space-y-6">
          <h4 className="font-label-caps text-label-caps text-white uppercase opacity-50">Newsletter</h4>
          <p className="font-body-md text-on-primary/70">
            Receive monthly updates on clean energy trends and India's sustainability roadmap.
          </p>
          <form onSubmit={handleSubscribe} className="relative">
            <input 
              className="w-full bg-white/5 border-none border-b border-white/20 text-white p-4 focus:ring-0 focus:border-tertiary-fixed transition-all rounded-xl placeholder-on-primary/40" 
              placeholder="Email Address" 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading || subscribed}
              required
            />
            <button 
              type="submit" 
              disabled={loading || subscribed}
              className="absolute right-2 top-2 h-10 w-10 flex items-center justify-center bg-tertiary-fixed text-on-tertiary-fixed rounded-lg"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span className="material-symbols-outlined">{subscribed ? 'check' : 'arrow_forward'}</span>
              )}
            </button>
          </form>
          {subscribed && (
            <p className="text-sm text-green-400 font-semibold mt-2">🎉 Subscribed successfully!</p>
          )}
          {error && (
            <p className="text-sm text-red-400 mt-2">{error}</p>
          )}
        </div>
      </div>
      <div className="border-t border-white/10 pt-10">
        <div className="max-w-container-max-width mx-auto px-grid-margin-desktop flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <p className="font-body-md text-on-primary/70">© 2024 Green Pellets India. All rights reserved.</p>
          <div className="flex flex-wrap justify-center space-x-8">
            <a className="font-body-md text-on-primary/70 hover:text-tertiary-fixed-dim transition-all" href="#">Sustainability Report</a>
            <a className="font-body-md text-on-primary/70 hover:text-tertiary-fixed-dim transition-all" href="#">Privacy Policy</a>
            <a className="font-body-md text-on-primary/70 hover:text-tertiary-fixed-dim transition-all" href="#">Terms of Service</a>
            <a className="font-body-md text-on-primary/70 hover:text-tertiary-fixed-dim transition-all" href="#">Investor Relations</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
