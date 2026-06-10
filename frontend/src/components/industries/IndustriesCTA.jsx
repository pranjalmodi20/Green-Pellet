import React from 'react';
import { motion } from 'framer-motion';

const IndustriesCTA = ({ config = {} }) => {
  const { cta = {} } = config;
  const title = cta.title || 'Transition Your Enterprise Today';
  const subtitle = cta.subtitle || 'Join a global network of industrial leaders who have optimized their energy strategy with Green Pellets India.';
  const button1Text = cta.button1Text || 'Request a Consultation';
  const button1Link = cta.button1Link || '#';
  const button2Text = cta.button2Text || 'Download Brochure';
  const button2Link = cta.button2Link || '#';

  return (
    <section className="py-section-gap-desktop bg-primary relative overflow-hidden">
      {/* Glow shapes */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-tertiary-container blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-container blur-[100px] rounded-full"></div>
      </div>

      <div className="max-w-container-max-width mx-auto px-grid-margin-desktop relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display-xl text-white mb-10 leading-none"
        >
          {title}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-white/70 font-body-lg max-w-2xl mx-auto mb-12 text-lg leading-relaxed"
        >
          {subtitle}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <a 
            href={button1Link}
            className="bg-tertiary-container text-on-tertiary-fixed px-12 py-5 rounded-full font-label-caps text-lg transition-all duration-300 hover:scale-105 active:scale-95 text-center font-bold tracking-wider"
          >
            {button1Text}
          </a>
          <a 
            href={button2Link}
            className="border border-white/20 text-white px-12 py-5 rounded-full font-label-caps text-lg backdrop-blur-md hover:bg-white/10 transition-colors duration-300 text-center font-bold tracking-wider"
          >
            {button2Text}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesCTA;
