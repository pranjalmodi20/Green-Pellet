import React from 'react';
import { motion } from 'framer-motion';
import MaterialIcon from '../../../components/common/MaterialIcon';

const BentoTile = ({ type, image, icon, title, description, className = '' }) => {
  const tileVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  if (type === 'hero' || type === 'medium') {
    const isHero = type === 'hero';
    return (
      <motion.div
        variants={tileVariants}
        className={`glass-panel rounded-[36px] md:rounded-[48px] overflow-hidden relative group border border-white/20 shadow-md ${className}`}
      >
        {image && (
          <img 
            src={image} 
            alt={title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/45 to-transparent flex flex-col justify-end p-8 md:p-12">
          <h3 className={`font-display text-white mb-3 font-semibold ${isHero ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>
            {title}
          </h3>
          <p className={`font-body text-on-primary/80 ${isHero ? 'text-body-lg max-w-md' : 'text-body-md max-w-sm'}`}>
            {description}
          </p>
        </div>
      </motion.div>
    );
  }

  // Small standard bento tile or Accent bento tile
  const isAccent = type === 'accent';
  return (
    <motion.div
      variants={tileVariants}
      className={`rounded-[36px] md:rounded-[48px] flex flex-col items-center justify-center p-8 text-center transition-all duration-300 border ${
        isAccent 
          ? 'bg-tertiary-container hover:bg-tertiary text-on-tertiary-container hover:text-white border-transparent shadow-lg group' 
          : 'glass-panel text-primary border-white/20 ambient-glow hover:shadow-xl'
      } ${className}`}
    >
      <div className={`p-4 rounded-full mb-4 ${isAccent ? 'bg-on-tertiary-container/10' : 'bg-primary/5'}`}>
        <MaterialIcon 
          icon={icon} 
          className={`text-4xl md:text-5xl ${isAccent ? 'text-on-tertiary-container group-hover:text-white transition-colors' : 'text-primary'}`} 
        />
      </div>
      <h4 className="font-label-caps text-label-caps uppercase tracking-wider font-bold">
        {title}
      </h4>
    </motion.div>
  );
};

export default BentoTile;
