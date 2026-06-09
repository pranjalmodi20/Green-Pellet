import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../../utils/motionVariants';

const LeaderCard = ({ member }) => {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative aspect-[4/5] rounded-[48px] overflow-hidden ${
        member.offset ? 'md:mt-12' : ''
      }`}
    >
      <motion.img
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.7 }}
        className="w-full h-full object-cover"
        src={member.image}
        alt={member.name}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60" />
      <div className="absolute bottom-10 left-10 text-white">
        <p className="font-technical-data text-tertiary-fixed mb-2 uppercase tracking-widest">
          {member.role}
        </p>
        <h4 className="font-headline-lg text-headline-lg-mobile leading-none">{member.name}</h4>
      </div>
    </motion.div>
  );
};

export default LeaderCard;
