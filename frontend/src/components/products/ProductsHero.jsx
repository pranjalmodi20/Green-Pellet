import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, sectionReveal } from '../../utils/motionVariants';

const ProductsHero = ({ config }) => {
  if (!config) return null;

  const { hero } = config;
  const { badge, title, subtitle, bgImage, button1Text, button1Link, button2Text, button2Link, glassTitle, glassText } = hero;

  return (
    <section className="max-w-container-max-width mx-auto px-grid-margin-desktop mb-section-gap-desktop overflow-hidden pt-12 md:pt-16">
      <div className="grid grid-cols-12 gap-grid-gutter items-center">
        {/* Left text column */}
        <motion.div
          className="col-span-12 md:col-span-6 lg:col-span-5"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.span
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="font-label-caps text-label-caps text-primary tracking-[0.2em] mb-4 block uppercase"
          >
            {badge}
          </motion.span>
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="font-display-xl text-display-xl-mobile md:text-5xl lg:text-[64px] mb-8 leading-tight font-black text-primary"
          >
            {title}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-lg leading-relaxed"
          >
            {subtitle}
          </motion.p>
          <motion.div variants={fadeUp} transition={{ duration: 0.8 }} className="flex flex-wrap gap-4">
            <a
              href={button1Link}
              className="bg-primary text-on-primary px-8 md:px-10 py-4 md:py-5 rounded-full font-label-caps text-label-caps hover:bg-tertiary-container hover:text-on-tertiary-container transition-all text-center"
            >
              {button1Text}
            </a>
            <a
              href={button2Link}
              className="border border-outline px-8 md:px-10 py-4 md:py-5 rounded-full font-label-caps text-label-caps hover:bg-surface-variant transition-all text-center"
            >
              {button2Text}
            </a>
          </motion.div>
        </motion.div>

        {/* Right image/badge column */}
        <motion.div
          className="col-span-12 md:col-span-6 lg:col-span-7 relative h-[450px] md:h-[600px] mt-8 md:mt-0"
          initial="hidden"
          animate="visible"
          variants={sectionReveal}
        >
          <div className="absolute inset-0 bg-primary-container rounded-[48px] overflow-hidden shadow-2xl">
            <img
              alt="Product Showcase"
              className="w-full h-full object-cover mix-blend-overlay opacity-65"
              src={bgImage}
            />
          </div>
          <div className="absolute -bottom-6 md:-bottom-8 left-4 md:-left-8 glass-card p-6 md:p-8 rounded-[32px] max-w-[90%] md:max-w-sm shadow-2xl z-10">
            <div className="flex items-center gap-4 mb-4">
              <span className="material-symbols-outlined text-primary text-4xl" data-icon="eco">
                eco
              </span>
              <div className="font-label-caps text-label-caps text-primary font-bold tracking-wider">{glassTitle}</div>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{glassText}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsHero;
