import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOnce } from '../../utils/motionVariants';

const TimelineEntry = ({ entry, index }) => {
  const [hovered, setHovered] = useState(false);
  const isLeft = entry.align === 'left';

  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {isLeft ? (
        <>
          <div className="md:text-right">
            <span
              className={`font-display-xl text-headline-lg text-tertiary-fixed transition-opacity duration-300 ${
                hovered ? 'opacity-100' : 'opacity-50'
              }`}
            >
              {entry.year}
            </span>
            <h4 className="font-headline-lg text-headline-lg-mobile mb-4">{entry.title}</h4>
            <p className="text-on-primary/70 max-w-md ml-auto">{entry.description}</p>
          </div>
          <div className="hidden md:flex justify-start">
            <motion.div
              animate={{ scale: hovered ? 1.5 : 1 }}
              transition={{ duration: 0.3 }}
              className="w-4 h-4 bg-tertiary-fixed rounded-full absolute left-1/2 transform -translate-x-1/2 shadow-[0_0_15px_rgba(203,167,47,0.8)]"
            />
          </div>
        </>
      ) : (
        <>
          <div className="hidden md:flex justify-end">
            <motion.div
              animate={{ scale: hovered ? 1.5 : 1 }}
              transition={{ duration: 0.3 }}
              className="w-4 h-4 bg-tertiary-fixed rounded-full absolute left-1/2 transform -translate-x-1/2 shadow-[0_0_15px_rgba(203,167,47,0.8)]"
            />
          </div>
          <div className="md:pl-12">
            <span
              className={`font-display-xl text-headline-lg text-tertiary-fixed transition-opacity duration-300 ${
                hovered ? 'opacity-100' : 'opacity-50'
              }`}
            >
              {entry.year}
            </span>
            <h4 className="font-headline-lg text-headline-lg-mobile mb-4">{entry.title}</h4>
            <p className="text-on-primary/70 max-w-md">{entry.description}</p>
          </div>
        </>
      )}
    </motion.div>
  );
};

const JourneyTimeline = ({ timeline }) => {
  if (!timeline) return null;

  return (
    <section className="bg-primary py-section-gap-desktop text-on-primary">
      <div className="max-w-container-max-width mx-auto px-grid-margin-desktop">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="font-label-caps text-tertiary-fixed tracking-widest block mb-4">
            {timeline.badge}
          </span>
          <h2 className="font-headline-lg text-headline-lg">{timeline.title}</h2>
        </motion.div>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full timeline-line hidden md:block" />
          <motion.div
            className="space-y-24"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            {timeline.entries?.map((entry, index) => (
              <TimelineEntry key={`${entry.year}-${index}`} entry={entry} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;
