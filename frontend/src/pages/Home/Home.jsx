import React, { useEffect, useState, useCallback } from 'react';
import HeroSection from './sections/HeroSection';
import CrisisSection from './sections/CrisisSection';
import ProcessTimeline from './sections/ProcessTimeline';
import ProductShowcase from './sections/ProductShowcase';
import IndustriesGrid from './sections/IndustriesGrid';
import TestimonialsCarousel from './sections/TestimonialsCarousel';
import FullScreenCTA from './sections/FullScreenCTA';
import { getHomeConfig, getMetrics, getProducts, getIndustries, getTestimonials } from '../../services/api';

const Home = () => {
  // ── State Management ─────────────────────────────────────────────────
  const [homeConfig, setHomeConfig] = useState(null);
  const [metrics, setMetrics] = useState({ tonsProcessed: '1.2M+', co2Offset: '450K' });
  const [products, setProducts] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Format raw metric numbers into display strings ────────────────────
  const formatMetrics = useCallback((data) => {
    if (!data) return { tonsProcessed: '1.2M+', co2Offset: '450K' };
    const tons = data.tonsProcessed >= 1000000
      ? `${(data.tonsProcessed / 1000000).toFixed(1)}M+`
      : data.tonsProcessed >= 1000
        ? `${(data.tonsProcessed / 1000).toFixed(0)}K`
        : String(data.tonsProcessed);
    const co2 = data.co2Offset >= 1000000
      ? `${(data.co2Offset / 1000000).toFixed(1)}M`
      : data.co2Offset >= 1000
        ? `${(data.co2Offset / 1000).toFixed(0)}K`
        : String(data.co2Offset);
    return { tonsProcessed: tons, co2Offset: co2 };
  }, []);

  // ── Parallel Data Fetching ────────────────────────────────────────────
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);

      const [configRes, metricsRes, productsRes, industriesRes, testimonialsRes] = await Promise.allSettled([
        getHomeConfig(),
        getMetrics(),
        getProducts(),
        getIndustries(),
        getTestimonials(),
      ]);

      if (configRes.status === 'fulfilled') {
        setHomeConfig(configRes.value);
      } else {
        console.error('Failed to load home config:', configRes.reason);
      }

      if (metricsRes.status === 'fulfilled') {
        setMetrics(formatMetrics(metricsRes.value));
      } else {
        console.error('Failed to load metrics:', metricsRes.reason);
      }

      if (productsRes.status === 'fulfilled') {
        setProducts(productsRes.value);
      } else {
        console.error('Failed to load products:', productsRes.reason);
      }

      if (industriesRes.status === 'fulfilled') {
        setIndustries(industriesRes.value);
      } else {
        console.error('Failed to load industries:', industriesRes.reason);
      }

      if (testimonialsRes.status === 'fulfilled') {
        setTestimonials(testimonialsRes.value);
      } else {
        console.error('Failed to load testimonials:', testimonialsRes.reason);
      }

      const allFailed = [configRes, metricsRes, productsRes, industriesRes, testimonialsRes]
        .every((r) => r.status === 'rejected');

      if (allFailed && import.meta.env.DEV) {
        setError('Unable to connect to the server. Showing default content.');
      }

      setLoading(false);
    };

    fetchAllData();
  }, [formatMetrics]);

  // ── Scroll Animation Intersection Observer ────────────────────────────
  useEffect(() => {
    if (loading) return;

    const observerOptions = { threshold: 0.1 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, [loading]);

  // ── Loading Skeleton ──────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center space-y-6">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
          <div className="space-y-2">
            <p className="font-headline-lg text-2xl text-primary">Green Pellets India</p>
            <p className="font-body-md text-on-surface-variant">Loading experience...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Error notification banner */}
      {error && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-tertiary-container text-on-tertiary-container px-8 py-4 rounded-2xl shadow-2xl font-body-md max-w-lg text-center border border-tertiary/30">
          <p className="font-semibold">{error}</p>
        </div>
      )}

      {/* 1. Hero Landing Block */}
      <HeroSection config={homeConfig || {}} metrics={metrics} />

      {/* 2. Crisis & Problem Statement */}
      <CrisisSection config={homeConfig || {}} />

      {/* 3. Refinement Timeline (static process steps) */}
      <ProcessTimeline />

      {/* 4. Dark Products Grid Showcase */}
      <ProductShowcase products={products} />

      {/* 5. Bento Industries Reach */}
      <IndustriesGrid industries={industries} />

      {/* 6. Testimonial Endorsements */}
      <TestimonialsCarousel testimonials={testimonials} />

      {/* 7. Parallax Conversion Block */}
      <FullScreenCTA config={homeConfig || {}} />
    </div>
  );
};

export default Home;