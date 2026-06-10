import React from 'react';
import { motion } from 'framer-motion';
import { sectionReveal, fadeUp, viewportOnce } from '../../utils/motionVariants';

const BiomassDefinition = ({ definition }) => {
  if (!definition) return null;

  const { badge, title, description, quote, image, densityValue, densityLabel, items } = definition;

  return (
    <section className="py-section-gap-desktop max-w-container-max-width mx-auto px-grid-margin-desktop overflow-hidden">
      <motion.div
        className="grid grid-cols-12 gap-grid-gutter items-center"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={sectionReveal}
      >
        {/* Left Side: Image & Glass Card */}
        <div className="col-span-12 md:col-span-5 order-2 md:order-1 mt-8 md:mt-0">
          <div className="relative rounded-[48px] overflow-hidden aspect-[4/5] shadow-2xl group">
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={image}
              alt="Organic moss growth representing renewable energy cycle"
            />
            <div className="absolute bottom-8 left-8 right-8 glass-panel p-8 rounded-[32px]">
              <p className="font-technical-data text-primary text-xs mb-2 uppercase tracking-wider">{densityLabel}</p>
              <p className="font-headline-lg text-3xl md:text-headline-lg text-primary leading-tight">{densityValue}</p>
            </div>
          </div>
        </div>

        {/* Right Side: Text & Items */}
        <div className="col-span-12 md:col-span-6 md:col-start-7 order-1 md:order-2 mb-6 md:mb-0">
          <span className="text-tertiary font-label-caps mb-4 block uppercase tracking-wider">{badge}</span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-8 text-primary leading-tight">
            {title}
          </h2>
          <div className="space-y-6">
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              {description}
            </p>
            {quote && (
              <div className="p-8 border-l-4 border-tertiary-container bg-surface-container-low rounded-r-3xl">
                <p className="italic text-on-surface font-body-lg leading-relaxed">
                  "{quote}"
                </p>
              </div>
            )}
            {items && items.length > 0 && (
              <ul className="space-y-4 pt-6">
                {items.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-tertiary mt-1" data-icon="check_circle">
                      check_circle
                    </span>
                    <span className="font-body-md text-on-surface-variant">
                      <strong className="text-on-surface font-semibold">{item.title}:</strong> {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default BiomassDefinition;
