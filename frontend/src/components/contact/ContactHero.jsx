import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/motionVariants';

const ContactHero = ({ hero }) => {
  if (!hero) return null;

  const { badge, title, titleHighlight, titleEnd, subtitle } = hero;

  return (
    <section className="max-w-container-max-width mx-auto px-grid-margin-desktop pb-section-gap-desktop pt-32">
      <motion.div
        className="grid grid-cols-12 gap-grid-gutter items-end"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <motion.div className="col-span-12 lg:col-span-8" variants={fadeUp} transition={{ duration: 0.8 }}>
          <span className="font-label-caps text-label-caps text-primary uppercase tracking-[0.2em] mb-4 block">
            {badge}
          </span>
          <h1 className="font-display-xl text-display-xl-mobile lg:text-display-xl leading-none">
            {title}{' '}
            {titleHighlight && (
              <span className="text-primary-container">{titleHighlight}</span>
            )}{' '}
            {titleEnd}
          </h1>
        </motion.div>
        <motion.div className="col-span-12 lg:col-span-4 pb-4" variants={fadeUp} transition={{ duration: 0.8, delay: 0.2 }}>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-sm">
            {subtitle}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactHero;
