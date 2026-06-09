import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface antialiased overflow-x-hidden">
      {/* Header Navigation */}
      <Navbar />

      {/* Main Page Area */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
