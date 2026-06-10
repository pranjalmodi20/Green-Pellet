import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOnce } from '../../utils/motionVariants';

const ComparisonSection = ({ comparison, costComparison, carbonNeutral, fuelQuality, reliability }) => {
  if (!comparison) return null;

  const { badge, title } = comparison;

  return (
    <section className="bg-surface-container py-section-gap-desktop overflow-hidden">
      <div className="max-w-container-max-width mx-auto px-grid-margin-desktop">
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ duration: 0.8 }}
        >
          <span className="text-tertiary font-label-caps block mb-4 uppercase tracking-wider">{badge}</span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary leading-tight">
            {title}
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {/* Cost Savings Card */}
          {costComparison && (
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.8 }}
              className="md:col-span-2 glass-panel p-8 md:p-12 rounded-[48px] ambient-glow transition-all"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                <div>
                  <h3 className="font-headline-lg text-2xl md:text-3xl text-primary mb-2">{costComparison.title}</h3>
                  <p className="text-on-surface-variant font-body-md text-sm md:text-base">{costComparison.subtitle}</p>
                </div>
                <span className="font-technical-data bg-primary-fixed text-on-primary-fixed px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap">
                  {costComparison.badgeText}
                </span>
              </div>
              <div className="space-y-8">
                {costComparison.items &&
                  costComparison.items.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between font-label-caps text-xs">
                        <span className="font-bold text-on-surface">{item.name}</span>
                        <span className="text-on-surface-variant font-semibold">{item.cost}</span>
                      </div>
                      <div className="w-full bg-surface-variant h-4 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.percentage}%` }}
                          viewport={viewportOnce}
                          transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
                          className={`h-full ${item.colorClass || 'bg-primary'} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}

          {/* Carbon Reduction Card */}
          {carbonNeutral && (
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.8 }}
              className="bg-primary-container p-8 md:p-12 rounded-[48px] text-white flex flex-col justify-between"
            >
              <span className="material-symbols-outlined text-5xl text-tertiary-fixed mb-6" data-icon="eco">
                eco
              </span>
              <div>
                <h3 className="font-headline-lg text-2xl md:text-3xl mb-4">{carbonNeutral.title}</h3>
                <p className="text-on-primary-container font-body-md text-sm md:text-base mb-8 leading-relaxed">
                  {carbonNeutral.description}
                </p>
                <div className="flex items-baseline flex-wrap gap-2">
                  <span className="text-4xl md:text-5xl font-bold text-tertiary-fixed">{carbonNeutral.value}</span>
                  <span className="font-technical-data text-xs uppercase tracking-wider">{carbonNeutral.label}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Consistency Card (Fuel Quality) */}
          {fuelQuality && (
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.8 }}
              className="glass-panel p-8 md:p-10 rounded-[48px] ambient-glow transition-all flex flex-col justify-center"
            >
              <h3 className="font-label-caps text-primary mb-6 uppercase tracking-wider">{fuelQuality.badgeText}</h3>
              <div className="space-y-6">
                {fuelQuality.items &&
                  fuelQuality.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary flex-shrink-0">
                        <span className="material-symbols-outlined" data-icon={item.icon}>
                          {item.icon}
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-primary font-body-md">{item.title}</p>
                        <p className="text-xs text-on-surface-variant leading-tight">{item.text}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}

          {/* Reliability Card */}
          {reliability && (
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.8 }}
              className="md:col-span-2 bg-white p-8 md:p-12 rounded-[48px] relative overflow-hidden group min-h-[280px]"
            >
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 z-0">
                <img
                  className="w-full h-full object-cover"
                  src={reliability.bgImage}
                  alt="Proprietary control room and supply chain monitors background"
                />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 h-full justify-between">
                <div className="md:w-1/2">
                  <h3 className="font-headline-lg text-2xl md:text-3xl text-primary mb-4">{reliability.title}</h3>
                  <p className="text-on-surface-variant font-body-md text-sm md:text-base leading-relaxed">
                    {reliability.description}
                  </p>
                </div>
                <div className="md:w-1/2 flex justify-center">
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-8 border-primary/5 flex flex-col items-center justify-center text-center bg-white/50 backdrop-blur-sm shadow-inner">
                    <span className="text-3xl md:text-4xl font-bold text-primary leading-none">{reliability.circleValue}</span>
                    <span className="font-technical-data text-on-surface-variant mt-2 text-xs uppercase tracking-wider">
                      {reliability.circleLabel}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;
