import React from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ image, title, description, spec }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  return (
    <motion.div 
      variants={cardVariants}
      className="group cursor-pointer flex flex-col h-full"
    >
      <div className="rounded-[36px] md:rounded-[48px] overflow-hidden aspect-[4/5] relative mb-6 md:mb-8 border border-white/10">
        <motion.img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-[1500ms]"
          whileHover={{ scale: 1.08 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent"></div>
      </div>
      <h3 className="font-display text-2xl md:text-3xl text-white mb-3 font-semibold group-hover:text-tertiary-fixed-dim transition-colors duration-300">
        {title}
      </h3>
      <p className="font-body text-body-md text-on-primary/70 mb-5 flex-grow">
        {description}
      </p>
      <span className="font-technical-data text-technical-data text-tertiary-fixed uppercase tracking-wider font-bold">
        {spec}
      </span>
    </motion.div>
  );
};

export default ProductCard;
