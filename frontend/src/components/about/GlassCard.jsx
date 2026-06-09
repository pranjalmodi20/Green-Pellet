import React from 'react';
import { motion } from 'framer-motion';
import { viewportOnce } from '../../utils/motionVariants';

const GlassCard = ({ icon, title, description, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 1, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="glass-card p-10 rounded-[48px] ambient-glow transition-all duration-500"
    >
      <h3 className="font-headline-lg text-headline-lg-mobile text-primary mb-4 flex items-center">
        <span className="material-symbols-outlined mr-4 text-tertiary">{icon}</span>
        {title}
      </h3>
      <p className="font-body-md text-on-surface-variant">{description}</p>
    </motion.div>
  );
};

export default GlassCard;
