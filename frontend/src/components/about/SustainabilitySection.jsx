import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOnce } from '../../utils/motionVariants';

const SustainabilitySection = ({ sustainability }) => {
  if (!sustainability) return null;

  return (
    <section className="py-section-gap-desktop bg-surface-container overflow-hidden">
      <div className="max-w-container-max-width mx-auto px-grid-margin-desktop">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8 }}
            className="md:w-1/2"
          >
            <img
              className="rounded-[48px] shadow-2xl w-full"
              src={sustainability.image}
              alt={sustainability.title}
            />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="md:w-1/2"
          >
            <motion.span variants={fadeUp} className="font-label-caps text-primary tracking-widest block mb-4 uppercase">
              {sustainability.badge}
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-8">
              {sustainability.title}
            </motion.h2>
            <motion.p variants={fadeUp} className="font-body-lg text-body-lg text-on-surface-variant mb-10 leading-relaxed">
              {sustainability.description}
            </motion.p>
            <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {sustainability.stats?.map((stat, index) => (
                <motion.div key={`${stat.label}-${index}`} variants={fadeUp}>
                  <h5 className="font-display-xl text-headline-lg-mobile md:text-headline-lg text-primary mb-1">{stat.value}</h5>
                  <p className="font-technical-data text-on-surface-variant uppercase tracking-widest">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;
