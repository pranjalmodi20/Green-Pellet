import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../../utils/motionVariants';

const ExpertServices = ({ expertServices }) => {
  if (!expertServices) return null;

  const { badge, title, cards } = expertServices;

  return (
    <section className="bg-primary py-section-gap-desktop overflow-hidden">
      <div className="max-w-container-max-width mx-auto px-grid-margin-desktop">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="space-y-4">
            <span className="text-tertiary-fixed font-technical-data text-technical-data tracking-widest uppercase block">
              {badge}
            </span>
            <h2 className="text-white font-headline-lg text-headline-lg-mobile lg:text-headline-lg leading-tight">
              {title}
            </h2>
          </div>

          {/* Cards List */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {cards && cards.map((card, index) => (
              <motion.div
                key={index}
                className="p-8 border border-white/10 rounded-[32px] hover:bg-white/5 transition-all ambient-glow group"
                variants={fadeUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span className="material-symbols-outlined text-tertiary-fixed mb-4">
                  {card.icon}
                </span>
                <h4 className="text-white font-body-lg font-bold mb-2">
                  {card.title}
                </h4>
                <p className="text-on-primary/70 font-body-md">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExpertServices;
