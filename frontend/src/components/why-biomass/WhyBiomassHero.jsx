import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/motionVariants';

const WhyBiomassHero = ({ hero }) => {
  if (!hero) return null;

  const { badge, title, subtitle, bgImage, primaryCtaText, primaryCtaLink, secondaryCtaText, secondaryCtaLink } = hero;

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 96,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative h-[921px] flex items-center overflow-hidden bg-primary">
      <div className="absolute inset-0 opacity-40 z-0">
        <img
          className="w-full h-full object-cover"
          src={bgImage}
          alt="Why Biomass pellets falling background"
        />
      </div>
      <div className="max-w-container-max-width mx-auto px-grid-margin-desktop relative z-10 grid grid-cols-12 gap-grid-gutter w-full">
        <motion.div
          className="col-span-12 md:col-span-8 lg:col-span-7"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.span
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="text-tertiary-fixed font-label-caps tracking-widest block mb-6 uppercase"
          >
            {badge}
          </motion.span>
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="font-display-xl text-display-xl-mobile md:text-display-xl text-white mb-8 leading-none"
          >
            {title}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="font-body-lg text-body-lg text-white/80 max-w-xl mb-10"
          >
            {subtitle}
          </motion.p>
          <motion.div variants={fadeUp} transition={{ duration: 0.8 }} className="flex flex-wrap gap-4">
            <button
              onClick={scrollToContent}
              className="bg-tertiary-container text-on-tertiary-container px-10 py-4 rounded-full font-label-caps hover:bg-tertiary-fixed transition-all cursor-pointer"
            >
              {primaryCtaText}
            </button>
            {secondaryCtaLink && secondaryCtaLink !== '#' ? (
              <a
                href={secondaryCtaLink}
                download
                className="glass-panel text-white px-10 py-4 rounded-full font-label-caps border border-white/20 hover:bg-white/10 transition-all text-center flex items-center justify-center"
              >
                {secondaryCtaText}
              </a>
            ) : (
              <button
                className="glass-panel text-white px-10 py-4 rounded-full font-label-caps border border-white/20 hover:bg-white/10 transition-all cursor-pointer"
              >
                {secondaryCtaText}
              </button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyBiomassHero;
