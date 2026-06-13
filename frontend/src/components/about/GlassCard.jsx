import React from 'react';
import { motion } from 'framer-motion';
import { viewportOnce } from '../../utils/motionVariants';

const GlassCard = ({ icon, title, description, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
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
