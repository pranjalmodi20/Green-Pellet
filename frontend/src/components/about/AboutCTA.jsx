import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '../../utils/motionVariants';

const CtaButton = ({ text, link, className }) => {
  if (link?.startsWith('/')) {
    return (
      <Link to={link} className={className}>
        {text}
      </Link>
    );
  }
  return (
    <a href={link} className={className}>
      {text}
    </a>
  );
};

const AboutCTA = ({ cta }) => {
  if (!cta?.isEnabled) return null;

  const {
    title,
    subtitle,
    bgImage,
    primaryCtaText,
    primaryCtaLink,
    secondaryCtaText,
    secondaryCtaLink,
  } = cta;

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center parallax-bg"
          style={{ backgroundImage: `url('${bgImage}')` }}
        />
        <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" />
      </div>
      <div className="relative z-10 max-w-container-max-width mx-auto px-grid-margin-desktop text-center w-full">
        <motion.div
          className="max-w-4xl mx-auto space-y-12"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
        >
          <motion.h2
            variants={fadeUp}
            className="font-display-xl text-display-xl-mobile md:text-display-xl text-on-primary text-glow leading-tight"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-body-lg text-body-lg text-on-primary/80 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8"
          >
            <CtaButton
              text={primaryCtaText}
              link={primaryCtaLink}
              className="bg-tertiary-fixed text-on-tertiary-fixed px-12 py-6 rounded-full font-label-caps text-label-caps hover:bg-tertiary-fixed-dim transition-all shadow-2xl scale-110"
            />
            <CtaButton
              text={secondaryCtaText}
              link={secondaryCtaLink}
              className="glass-panel border-white/20 text-on-primary px-12 py-6 rounded-full font-label-caps text-label-caps hover:bg-white hover:text-primary transition-all"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutCTA;
