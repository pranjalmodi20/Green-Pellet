import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOnce } from '../../utils/motionVariants';

const AchievementsSection = ({ achievements }) => {
  if (!achievements) return null;

  return (
    <section className="py-section-gap-desktop max-w-container-max-width mx-auto px-grid-margin-desktop text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.7 }}
        className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-16"
      >
        {achievements.title}
      </motion.h2>
      <motion.div
        className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        {achievements.items?.map((item, index) => (
          <motion.div
            key={`${item.label}-${index}`}
            variants={fadeUp}
            whileHover={{ scale: 1.05, opacity: 1 }}
            className="flex flex-col items-center transition-all duration-500"
          >
            <span className="material-symbols-outlined text-[64px] text-primary mb-4">{item.icon}</span>
            <p className="font-label-caps">{item.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default AchievementsSection;
