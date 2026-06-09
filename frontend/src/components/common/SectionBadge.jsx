import React from 'react';
import { motion } from 'framer-motion';

const SectionBadge = ({ icon, text, className = '' }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`inline-flex items-center space-x-2 px-4 py-1 glass-panel rounded-full w-fit ${className}`}
    >
      {icon && (
        <span 
          className="material-symbols-outlined text-primary text-sm font-semibold"
          style={{ fontVariationSettings: "'FILL' 1, 'wght' 600, 'GRAD' 0, 'opsz' 24" }}
        >
          {icon}
        </span>
      )}
      <span className="font-technical-data text-technical-data uppercase tracking-widest text-primary">
        {text}
      </span>
    </motion.div>
  );
};

export default SectionBadge;
