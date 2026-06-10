import React from 'react';
import { motion } from 'framer-motion';

const DetailedSectors = ({ config = {} }) => {
  const { detailedSectors = {} } = config;
  const title = detailedSectors.title || 'Tailored for your scale.';
  const description = detailedSectors.description || 'Our engineering team works with your plant managers to retrofit or design boilers that maximize the output of our premium biomass pellets.';
  const sectors = detailedSectors.sectors || [
    {
      title: 'CHEMICAL PLANTS',
      description: 'High-temp stability for synthetic processes and thermal cracking units.',
      features: ['Temperature Control', 'Low Ash Residue', '24/7 Bulk Supply']
    },
    {
      title: 'TEXTILE UNITS',
      description: 'Consistent steam for dyeing, printing, and fabric finishing lines.',
      features: ['Moisture Stability', 'High Calorific Value', 'Eco-Label Compliance']
    },
    {
      title: 'DAIRY INDUSTRY',
      description: 'Hygienic energy production for pasteurization and spray drying.',
      features: ['Pure Combustion', 'No Contaminants', 'Rapid Response Time']
    },
    {
      title: 'INDUSTRIAL PLANTS',
      description: 'General heavy utility requirements for decentralized power.',
      features: ['Scaleable Logistics', 'Custom Pellet Sizes', 'On-site Support']
    }
  ];

  return (
    <section className="bg-surface-container py-section-gap-desktop">
      <div className="max-w-container-max-width mx-auto px-grid-margin-desktop">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start mb-24"
        >
          <h2 className="font-display-xl-mobile text-display-xl-mobile md:text-display-xl text-primary max-w-2xl leading-none">
            {title}
          </h2>
          <div className="mt-8 md:mt-0 max-w-sm">
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              {description}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 border-t border-outline-variant pt-16">
          {sectors.map((sector, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
            >
              <h4 className="font-label-caps text-primary mb-6 tracking-widest font-bold text-sm">
                {sector.title}
              </h4>
              <p className="text-on-surface-variant mb-6 font-body-md text-sm leading-relaxed">
                {sector.description}
              </p>
              <ul className="space-y-3 font-body-md text-primary/70 text-sm">
                {sector.features && sector.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2">
                    <span className="text-xs text-primary">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DetailedSectors;
