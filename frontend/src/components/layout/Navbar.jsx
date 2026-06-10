import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const linkClass = (path) =>
    pathname === path
      ? 'font-body-md text-body-md text-primary dark:text-primary-fixed border-b-2 border-tertiary-container pb-1 hover:text-primary transition-colors duration-300'
      : 'font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary transition-colors duration-300';

  const mobileLinkClass = (path) =>
    pathname === path
      ? 'font-body-md text-lg py-2 border-b border-outline-variant/10 text-primary font-bold pl-2 border-l-2 border-tertiary-container'
      : 'font-body-md text-lg py-2 border-b border-outline-variant/10 text-on-surface-variant hover:text-primary';

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface/80 backdrop-blur-xl border-b border-white/10 shadow-sm">
        <div className="flex justify-between items-center max-w-container-max-width mx-auto px-grid-margin-desktop py-6">
          <Link to="/" className="font-headline-lg text-2xl md:text-headline-lg text-primary dark:text-primary-fixed tracking-tighter">
            Green Pellets India
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link className={linkClass('/')} to="/">Home</Link>
            <Link className={linkClass('/about')} to="/about">About Us</Link>
            <Link className={linkClass('/why-biomass')} to="/why-biomass">Why Biomass</Link>
            <Link className={linkClass('/products')} to="/products">Our Products</Link>
            <Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary transition-colors duration-300" to="/industries">Industries</Link>
            <Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary transition-colors duration-300" to="/blogs">Blogs</Link>
            <Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary transition-colors duration-300" to="/contact">Contact</Link>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-caps text-label-caps scale-95 active:opacity-80 transition-transform uppercase">Call Now</button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center p-2 text-primary focus:outline-none"
            >
              <span className="material-symbols-outlined text-3xl">{mobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[80px] bg-surface/95 backdrop-blur-xl border-b border-outline-variant/30 shadow-2xl z-40 md:hidden p-6">
          <div className="flex flex-col space-y-4">
            <Link onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass('/')} to="/">Home</Link>
            <Link onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass('/about')} to="/about">About Us</Link>
            <Link onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass('/why-biomass')} to="/why-biomass">Why Biomass</Link>
            <Link onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass('/products')} to="/products">Our Products</Link>
            <Link onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass('/industries')} to="/industries">Industries</Link>
            <Link onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass('/blogs')} to="/blogs">Blogs</Link>
            <Link onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass('/contact')} to="/contact">Contact</Link>
            <button className="w-full bg-primary text-on-primary py-4 rounded-full font-label-caps text-label-caps tracking-wider transition-all uppercase mt-4">
              Call Now
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
