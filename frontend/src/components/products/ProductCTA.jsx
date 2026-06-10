import React from 'react';
import { motion } from 'framer-motion';
import { sectionReveal, viewportOnce } from '../../utils/motionVariants';

const ProductCTA = ({ config }) => {
  if (!config) return null;

  const { cta } = config;
  const { title, subtitle, button1Text, button1Link, button2Text, button2Link } = cta;

  return (
    <section id="contact-cta" className="max-w-container-max-width mx-auto px-grid-margin-desktop py-section-gap-desktop overflow-hidden">
      <motion.div
        className="bg-primary rounded-[64px] p-12 md:p-24 text-center text-on-primary relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={sectionReveal}
      >
        {/* Animated wave grid paths */}
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M0 100 C 20 0 50 0 100 100" fill="none" stroke="white" strokeWidth="0.1" />
            <path d="M0 80 C 30 20 60 20 100 80" fill="none" stroke="white" strokeWidth="0.1" />
          </svg>
        </div>

        <div className="relative z-10">
          <h2 className="font-display-xl text-display-xl-mobile md:text-display-xl mb-8 leading-tight">
            {title}
          </h2>
          <p className="font-body-lg text-body-lg max-w-2xl mx-auto mb-12 opacity-80 leading-relaxed text-sm md:text-lg">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href={button1Link}
              className="bg-tertiary-container text-on-tertiary-container px-10 md:px-12 py-5 rounded-full font-label-caps text-label-caps hover:scale-105 transition-transform text-center"
            >
              {button1Text}
            </a>
            <a
              href={button2Link}
              className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 md:px-12 py-5 rounded-full font-label-caps text-label-caps hover:bg-white/20 transition-all text-center"
            >
              {button2Text}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ProductCTA;
