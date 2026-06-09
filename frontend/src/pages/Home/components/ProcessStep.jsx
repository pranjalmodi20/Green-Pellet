import React from 'react';
import { motion } from 'framer-motion';
import MaterialIcon from '../../../components/common/MaterialIcon';

const ProcessStep = ({ stepNumber, icon, title, description, isPrimary = false }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <motion.div 
      variants={itemVariants}
      className="relative z-10 w-full lg:w-1/4 flex flex-col items-center group"
    >
      <div 
        className={`w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center mb-6 md:mb-8 ambient-glow transition-transform duration-500 group-hover:scale-110 border ${
          isPrimary 
            ? 'bg-primary border-primary shadow-2xl' 
            : 'glass-panel border-white/50'
        }`}
      >
        <MaterialIcon 
          icon={icon} 
          fill={true} 
          className={`text-3xl md:text-4xl ${
            isPrimary ? 'text-on-primary' : 'text-primary'
          }`} 
        />
      </div>
      <h3 className="font-label-caps text-label-caps text-primary mb-2 text-center uppercase tracking-wider">
        {stepNumber}. {title}
      </h3>
      <p className="font-body text-body-md text-on-surface-variant text-center px-4 md:px-6">
        {description}
      </p>
    </motion.div>
  );
};

export default ProcessStep;
