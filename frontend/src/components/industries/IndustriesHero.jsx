import React from 'react';
import { motion } from 'framer-motion';

const IndustriesHero = ({ config = {} }) => {
  const { hero = {} } = config;
  const badge = hero.badge || 'GLOBAL INDUSTRIAL IMPACT';
  const title = hero.title || "Powering the World's Leading Industries.";
  const subtitle = hero.subtitle || "From pharmaceutical precision to the scale of global FMCG manufacturing, we provide high-performance biomass solutions that define the next generation of industrial energy.";
  const bgImage = hero.bgImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFO4mq4TAsLR9GoP_VBUSEEUHGJErzfTwoW5YRzn41twFHuKdJJMN9flwK4v_lSh6hn4t8Ar0OqpuF9C0GQLjoncW_UVUd1KNaJfCz3fqCi810UYw9osnI_jeUHxQ2rmHqEMPM809EPAYtwz19WHk4J_98mv_bezIrfiaF4rzW3S1kHOClBegiAJeXZyqami5nY5jf2zLlCK2cTbqF4Lta7wZoDAFNqIC-Xld2SQTbVJFCYHOldWH0fHCw351zaumwDwmkq0YwHMA';

  // Handle title highlighting - we look for the last word to color or we can color "Industries." dynamically.
  // The Stitch title is "Powering the World's Leading Industries." where "Industries." is highlighted.
  const formatTitle = (text) => {
    if (text.includes('Industries.')) {
      const parts = text.split('Industries.');
      return (
        <>
          {parts[0]}
          <span className="text-primary-container">Industries.</span>
          {parts[1]}
        </>
      );
    }
    return text;
  };

  return (
    <header className="relative pt-40 pb-section-gap-desktop overflow-hidden">
      <div className="max-w-container-max-width mx-auto px-grid-margin-desktop">
        <div className="grid grid-cols-12 gap-grid-gutter items-end">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="col-span-12 lg:col-span-7"
          >
            <span className="font-label-caps text-label-caps text-tertiary mb-6 block tracking-widest">{badge}</span>
            <h1 className="font-display-xl text-display-xl mb-8 leading-none">
              {formatTitle(title)}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              {subtitle}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="col-span-12 lg:col-span-5 flex justify-end mt-10 lg:mt-0"
          >
            <div className="w-full aspect-square rounded-[48px] overflow-hidden bg-surface-container relative group">
              <img 
                alt="Global Industries Powered by Biomass" 
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
                src={bgImage}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default IndustriesHero;
