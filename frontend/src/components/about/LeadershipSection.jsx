import React from 'react';
import { motion } from 'framer-motion';
import LeaderCard from './LeaderCard';
import { fadeUp, staggerContainer, viewportOnce } from '../../utils/motionVariants';

const LeadershipSection = ({ leadership }) => {
  if (!leadership) return null;

  return (
    <section className="py-section-gap-desktop max-w-container-max-width mx-auto px-grid-margin-desktop">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.7 }}
        className="mb-16"
      >
        <span className="font-label-caps text-primary tracking-widest block mb-4 uppercase">
          {leadership.badge}
        </span>
        <h2 className="font-headline-lg text-headline-lg">{leadership.title}</h2>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        {leadership.members?.map((member, index) => (
          <LeaderCard key={`${member.name}-${index}`} member={member} />
        ))}
      </motion.div>
    </section>
  );
};

export default LeadershipSection;
