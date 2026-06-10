import React from 'react';
import { motion } from 'framer-motion';
import { sectionReveal, viewportOnce } from '../../utils/motionVariants';

const WhyBiomassCTA = ({ cta }) => {
  if (!cta || !cta.isEnabled) return null;

  const { title, subtitle, primaryCtaText, primaryCtaLink, secondaryCtaText, secondaryCtaLink } = cta;

  return (
    <section className="max-w-[1200px] mx-auto px-grid-margin-desktop pb-section-gap-desktop overflow-hidden">
      <motion.div
        className="bg-primary text-white rounded-[64px] p-12 md:p-24 text-center relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={sectionReveal}
      >
        {/* Radial Glow Overlay */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        </div>

        <div className="relative z-10">
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-8 leading-tight">
            {title}
          </h2>
          <p className="font-body-lg text-on-primary-container max-w-2xl mx-auto mb-12 text-sm md:text-lg leading-relaxed">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              className="bg-tertiary-container text-on-tertiary-container px-8 md:px-12 py-4 md:py-5 rounded-full font-label-caps hover:bg-tertiary-fixed transition-all text-base md:text-lg text-center"
              href={primaryCtaLink}
            >
              {primaryCtaText}
            </a>
            <a
              className="border border-white/30 text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-label-caps hover:bg-white/10 transition-all text-base md:text-lg text-center"
              href={secondaryCtaLink}
            >
              {secondaryCtaText}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default WhyBiomassCTA;
