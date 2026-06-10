import React from 'react';
import { motion } from 'framer-motion';
import { sectionReveal, fadeUp, viewportOnce, staggerContainer } from '../../utils/motionVariants';

const ProductGrid = ({ products }) => {
  if (!products || products.length === 0) return null;

  // Find products by their slug to place them in the correct magazine-layout slots
  const sawdust = products.find((p) => p.slug === 'sawdust-groundnut-pellets') || products[0];
  const mustard = products.find((p) => p.slug === 'mustard-fuel-pellets') || products[1];
  const briquettes = products.find((p) => p.slug === 'biomass-fuel-briquettes') || products[2];
  const paddyHusk = products.find((p) => p.slug === 'paddy-husk-pellets') || products[3];
  const mixed = products.find((p) => p.slug === 'mixed-biomass-pellets') || products[4];

  // Helper to get technical spec value by parameter name
  const getSpec = (prod, paramName, defaultVal = '') => {
    if (!prod || !prod.specifications) return defaultVal;
    const s = prod.specifications.find((item) => item.parameter.toLowerCase().includes(paramName.toLowerCase()));
    if (!s) return defaultVal;
    return `${s.value} ${s.unit}`.trim();
  };

  const getDocUrl = (prod) => {
    if (!prod || !prod.downloads || prod.downloads.length === 0) return '#';
    return prod.downloads[0].url;
  };

  return (
    <section className="max-w-container-max-width mx-auto px-grid-margin-desktop space-y-section-gap-desktop pb-section-gap-desktop overflow-hidden">
      {/* 1. Sawdust & Groundnut (Main Feature Row) */}
      {sawdust && (
        <motion.div
          className="grid grid-cols-12 gap-grid-gutter items-stretch"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={sectionReveal}
        >
          <div className="col-span-12 lg:col-span-8 group relative overflow-hidden rounded-[48px] h-[450px] md:h-[700px] shadow-lg">
            <img
              alt={sawdust.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              src={sawdust.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
              <span className="font-technical-data text-technical-data bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full mb-4 inline-block font-semibold">
                {sawdust.featured ? 'FLAGSHIP PRODUCT' : 'PREMIUM GRADE'}
              </span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-[48px] mb-6 leading-tight">
                {sawdust.title}
              </h2>
              <div className="flex flex-wrap gap-8 md:gap-12 border-t border-white/20 pt-8">
                <div>
                  <p className="font-technical-data text-technical-data opacity-60 mb-1 uppercase tracking-wider">
                    Calorific Value
                  </p>
                  <p className="font-headline-lg text-2xl md:text-[32px]">{getSpec(sawdust, 'calorific', '4200 - 4500 Kcal/kg')}</p>
                </div>
                <div>
                  <p className="font-technical-data text-technical-data opacity-60 mb-1 uppercase tracking-wider">
                    Moisture Content
                  </p>
                  <p className="font-headline-lg text-2xl md:text-[32px]">{getSpec(sawdust, 'moisture', '< 8.0%')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 flex flex-col justify-center space-y-8 p-6 md:p-8 bg-surface-container/30 rounded-[48px]">
            {sawdust.applications && sawdust.applications.length > 0 && (
              <div>
                <h3 className="font-label-caps text-label-caps text-primary mb-4 uppercase tracking-wider">
                  PRIMARY APPLICATIONS
                </h3>
                <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant">
                  {sawdust.applications.map((app, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm align-middle" data-icon="check_circle">
                        check_circle
                      </span>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h3 className="font-label-caps text-label-caps text-primary mb-4 uppercase tracking-wider">
                CORE BENEFITS
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {sawdust.shortDescription}
              </p>
            </div>

            <a
              href={getDocUrl(sawdust)}
              download
              className="w-full py-5 rounded-full border-2 border-primary text-primary font-label-caps text-label-caps hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center gap-3 cursor-pointer text-center uppercase tracking-wider"
            >
              DOWNLOAD DATA SHEET
              <span className="material-symbols-outlined align-middle" data-icon="download">
                download
              </span>
            </a>
          </div>
        </motion.div>
      )}

      {/* 2. Mustard Fuel & Biomass Briquettes (Asymmetric Pair) */}
      <div className="grid grid-cols-12 gap-grid-gutter items-stretch">
        {mustard && (
          <motion.div
            className="col-span-12 md:col-span-5"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={sectionReveal}
          >
            <div className="bg-surface-container rounded-[48px] p-8 md:p-12 hover:bg-surface-container-high transition-colors h-full flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-container rounded-3xl mb-8 flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary-container text-3xl md:text-4xl" data-icon="fire_extinguisher">
                    fire_extinguisher
                  </span>
                </div>
                <h3 className="font-headline-lg text-2xl md:text-[36px] mb-4 text-primary leading-tight">
                  {mustard.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-8 leading-relaxed">
                  {mustard.shortDescription}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/50 p-4 rounded-2xl">
                    <span className="block font-technical-data text-technical-data opacity-60 uppercase tracking-wider">
                      ASH CONTENT
                    </span>
                    <span className="font-bold text-primary">{mustard.technicalData?.ash || '7.0 - 9.0%'}</span>
                  </div>
                  <div className="bg-white/50 p-4 rounded-2xl">
                    <span className="block font-technical-data text-technical-data opacity-60 uppercase tracking-wider">
                      DENSITY
                    </span>
                    <span className="font-bold text-primary">{mustard.technicalData?.density || '650 kg/m³'}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById('specifications-matrix');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="font-label-caps text-label-caps text-primary flex items-center gap-2 group cursor-pointer uppercase tracking-wider font-bold"
              >
                VIEW SPECIFICATIONS{' '}
                <span
                  className="material-symbols-outlined transition-transform group-hover:translate-x-2 text-sm"
                  data-icon="arrow_forward"
                >
                  arrow_forward
                </span>
              </button>
            </div>
          </motion.div>
        )}

        {briquettes && (
          <motion.div
            className="col-span-12 md:col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={sectionReveal}
          >
            <div className="relative h-full min-h-[350px] rounded-[48px] overflow-hidden group shadow-lg">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                src={briquettes.image}
                alt={briquettes.title}
              />
              <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="text-center p-8 md:p-12 text-white scale-95 group-hover:scale-100 transition-transform duration-500">
                  <h3 className="font-display-xl text-3xl md:text-headline-lg mb-4">{briquettes.title}</h3>
                  <p className="font-body-lg text-body-lg mb-8 max-w-md mx-auto opacity-90 leading-relaxed">
                    {briquettes.shortDescription}
                  </p>
                  <button
                    onClick={() => {
                      const el = document.getElementById('specifications-matrix');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-tertiary-container text-on-tertiary-container px-8 py-4 rounded-full font-label-caps text-label-caps uppercase hover:bg-tertiary-fixed transition-colors cursor-pointer"
                  >
                    Explore Briquettes Range
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* 3. Paddy Husk, Mixed, and Assorted Showcase */}
      <div className="grid grid-cols-12 gap-grid-gutter items-stretch">
        {paddyHusk && (
          <motion.div
            className="col-span-12 md:col-span-4 bg-primary text-on-primary rounded-[48px] p-8 md:p-10 flex flex-col justify-between min-h-[450px] shadow-lg"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={sectionReveal}
          >
            <div>
              <span className="font-label-caps text-label-caps text-tertiary-fixed tracking-widest mb-6 block uppercase">
                Agricultural Waste Solution
              </span>
              <h3 className="font-headline-lg text-3xl md:text-[40px] leading-tight mb-4 text-white">
                {paddyHusk.title}
              </h3>
              <p className="font-body-md text-body-md opacity-80 leading-relaxed">
                {paddyHusk.shortDescription}
              </p>
            </div>
            <div className="border-t border-white/10 pt-8 flex justify-between items-end">
              <div>
                <span className="block text-3xl md:text-4xl font-headline-lg text-tertiary-fixed font-bold">
                  {getSpec(paddyHusk, 'calorific', '3400+').replace(' Kcal/kg', '')}
                </span>
                <span className="text-xs uppercase opacity-60">Kcal/kg Energy Output</span>
              </div>
              <span className="material-symbols-outlined text-5xl opacity-20 text-tertiary-fixed" data-icon="energy_savings_leaf">
                energy_savings_leaf
              </span>
            </div>
          </motion.div>
        )}

        <div className="col-span-12 md:col-span-8 grid grid-cols-2 gap-grid-gutter">
          {mixed && (
            <motion.div
              className="col-span-2 md:col-span-1 bg-surface-container-high rounded-[48px] p-8 md:p-10 min-h-[450px] flex flex-col justify-between"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={sectionReveal}
            >
              <div className="space-y-6">
                <h3 className="font-headline-lg text-2xl md:text-[32px] mb-4 text-primary leading-tight">
                  {mixed.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {mixed.shortDescription}
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm text-primary">
                      <span className="material-symbols-outlined" data-icon="trending_up">
                        trending_up
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-primary text-sm md:text-base">Efficiency</p>
                      <p className="text-xs md:text-sm text-on-surface-variant">Uniform size for automated systems</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm text-primary">
                      <span className="material-symbols-outlined" data-icon="savings">
                        savings
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-primary text-sm md:text-base">Cost Savings</p>
                      <p className="text-xs md:text-sm text-on-surface-variant">25-40% cheaper than coal</p>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}

          <motion.div
            className="col-span-2 md:col-span-1 relative rounded-[48px] overflow-hidden min-h-[450px] shadow-lg group"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={sectionReveal}
          >
            <img
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnuh5Uz8Fz5OPbI5DFz7c7oqu0bKEXaNTZ3MYuwputhkxqgTiQTFtK6ucVjLOCYi-dEiaT-S2LyXZGfKaa3oZmo1JY2Y8z_tHvq41_ggBSiJyWEJNHIx5dgVDQiqyVMEZL-qlQP5wEJ5JC6Bb3dT0PJAccaiZqQYVwEGyKFFWJnslayVa00BzFhZq-xS0sgJz3uxrjIsa8pNZWK-YzSTiS8EBui6_y68NvsgUchNiVgksnxAXJ9JgHZ35z9MXBFEKMloLR9m_rOa8"
              alt="Assorted pellets geometric layout"
            />
            <div className="absolute inset-0 bg-black/20 p-8 flex flex-col justify-end">
              <button
                onClick={() => {
                  const el = document.getElementById('contact-cta');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white/90 backdrop-blur-md text-primary w-full py-4 rounded-2xl font-label-caps text-label-caps hover:bg-white transition-all cursor-pointer font-semibold uppercase tracking-wider"
              >
                Order Samples
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
