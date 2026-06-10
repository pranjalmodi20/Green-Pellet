import React from 'react';
import { motion } from 'framer-motion';
import { sectionReveal, viewportOnce } from '../../utils/motionVariants';

const IndustryBenefits = ({ industries }) => {
  if (!industries) return null;

  const { badge, title, description, items } = industries;

  return (
    <section className="py-section-gap-desktop max-w-container-max-width mx-auto px-grid-margin-desktop overflow-hidden">
      {/* Section Header */}
      <motion.div
        className="mb-20 grid grid-cols-12 gap-grid-gutter"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={sectionReveal}
      >
        <div className="col-span-12 md:col-span-6">
          <span className="text-tertiary font-label-caps block mb-4 uppercase tracking-wider">{badge}</span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary leading-tight">
            {title}
          </h2>
        </div>
        <div className="col-span-12 md:col-span-6 self-end mt-4 md:mt-0">
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            {description}
          </p>
        </div>
      </motion.div>

      {/* Alternating Industry Rows */}
      <div className="space-y-32">
        {items &&
          items.map((item, index) => {
            const isImageLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                className="grid grid-cols-12 gap-grid-gutter items-center"
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={sectionReveal}
              >
                {isImageLeft ? (
                  <>
                    {/* Image Left */}
                    <div className="col-span-12 md:col-span-7">
                      <div className="rounded-[48px] overflow-hidden aspect-video shadow-xl relative group">
                        <img
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          src={item.image}
                          alt={item.imageLabel}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                        <div className="absolute bottom-10 left-10 text-white">
                          <h4 className="font-headline-lg text-xl md:text-2xl">{item.title}</h4>
                        </div>
                      </div>
                    </div>

                    {/* Text Right */}
                    <div className="col-span-12 md:col-span-4 md:col-start-9 mt-6 md:mt-0">
                      <p className="font-technical-data text-tertiary mb-2 uppercase tracking-wider">{item.badgeText}</p>
                      <h4 className="font-headline-lg text-xl md:text-2xl text-primary mb-4 leading-snug">
                        {item.subtitle}
                      </h4>
                      <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">
                        {item.description}
                      </p>
                      {item.caseStudyLink && (
                        <a
                          href={item.caseStudyLink}
                          className="inline-flex items-center gap-2 font-label-caps text-primary hover:gap-4 transition-all text-xs tracking-wider"
                        >
                          VIEW CASE STUDY{' '}
                          <span className="material-symbols-outlined text-sm align-middle">
                            arrow_forward
                          </span>
                        </a>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Text Left (Mobile order 2) */}
                    <div className="col-span-12 md:col-span-4 order-2 md:order-1 mt-6 md:mt-0">
                      <p className="font-technical-data text-tertiary mb-2 uppercase tracking-wider">{item.badgeText}</p>
                      <h4 className="font-headline-lg text-xl md:text-2xl text-primary mb-4 leading-snug">
                        {item.subtitle}
                      </h4>
                      <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">
                        {item.description}
                      </p>
                      {item.caseStudyLink && (
                        <a
                          href={item.caseStudyLink}
                          className="inline-flex items-center gap-2 font-label-caps text-primary hover:gap-4 transition-all text-xs tracking-wider"
                        >
                          VIEW CASE STUDY{' '}
                          <span className="material-symbols-outlined text-sm align-middle">
                            arrow_forward
                          </span>
                        </a>
                      )}
                    </div>

                    {/* Image Right (Mobile order 1) */}
                    <div className="col-span-12 md:col-span-7 md:col-start-6 order-1 md:order-2">
                      <div className="rounded-[48px] overflow-hidden aspect-video shadow-xl relative group">
                        <img
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          src={item.image}
                          alt={item.imageLabel}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                        <div className="absolute bottom-10 left-10 text-white">
                          <h4 className="font-headline-lg text-xl md:text-2xl">{item.title}</h4>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
      </div>
    </section>
  );
};

export default IndustryBenefits;
