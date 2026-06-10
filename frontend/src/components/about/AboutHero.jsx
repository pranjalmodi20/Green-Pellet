import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../../utils/motionVariants';

const AboutHero = ({ hero, companyStory }) => {
  if (!hero || !companyStory) return null;

  const { badge, title, titleHighlight, titleSuffix, bgImage, imageAlt } = hero;
  const { text } = companyStory;

  return (
    <section className="relative min-h-screen pt-32 pb-16 flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover grayscale-[20%] brightness-75"
          src={bgImage}
          alt={imageAlt}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent" />
      </div>
      <div className="relative z-10 max-w-container-max-width mx-auto px-grid-margin-desktop w-full">
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.span
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="font-label-caps text-tertiary-fixed tracking-[0.3em] uppercase mb-6 block"
          >
            {badge}
          </motion.span>
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="font-display-xl text-display-xl-mobile md:text-display-xl text-white mb-8"
          >
            {title} <br />
            <span className="italic font-light">{titleHighlight}</span> {titleSuffix}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="font-body-lg text-body-lg text-white/90 leading-relaxed max-w-xl"
          >
            {text}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
