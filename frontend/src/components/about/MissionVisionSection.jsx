import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';
import { fadeUp, viewportOnce } from '../../utils/motionVariants';

const MissionVisionSection = ({ purpose, vision, mission }) => {
  if (!purpose || !vision || !mission) return null;

  return (
    <section className="py-section-gap-desktop max-w-container-max-width mx-auto px-grid-margin-desktop">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-grid-gutter items-center">
        <div className="md:col-span-5 mb-12 md:mb-0">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
            className="font-label-caps text-primary mb-4 block"
          >
            {purpose.badge}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-headline-lg text-headline-lg mb-8 leading-tight"
          >
            {purpose.title}
          </motion.h2>
          <div className="space-y-12">
            <GlassCard
              icon={vision.icon}
              title={vision.title}
              description={vision.description}
              index={0}
            />
            <GlassCard
              icon={mission.icon}
              title={mission.title}
              description={mission.description}
              index={1}
            />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:col-span-7 h-[600px] rounded-[48px] overflow-hidden"
        >
          <img
            className="w-full h-full object-cover"
            src={purpose.sideImage}
            alt={purpose.title}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
