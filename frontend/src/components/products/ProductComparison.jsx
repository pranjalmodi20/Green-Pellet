import React from 'react';
import { motion } from 'framer-motion';
import { sectionReveal, viewportOnce } from '../../utils/motionVariants';

const ProductComparison = ({ products }) => {
  if (!products || products.length === 0) return null;

  // Filter out products we want to showcase in the matrix
  const rowProducts = products.filter(p => 
    ['sawdust-groundnut-pellets', 'mustard-fuel-pellets', 'biomass-fuel-briquettes', 'paddy-husk-pellets'].includes(p.slug)
  );

  // If none matches the specific list, just use all products
  const displayRows = rowProducts.length > 0 ? rowProducts : products;

  const getSpecValue = (prod, name) => {
    if (!prod) return '-';
    // Check specifications array first
    if (prod.specifications) {
      const match = prod.specifications.find(s => s.parameter.toLowerCase().includes(name.toLowerCase()));
      if (match) {
        return `${match.value} ${match.unit}`.trim();
      }
    }
    // Check technicalData object next
    if (prod.technicalData && prod.technicalData[name.toLowerCase()]) {
      return prod.technicalData[name.toLowerCase()];
    }
    return '-';
  };

  return (
    <section id="specifications-matrix" className="bg-surface-container-low py-section-gap-desktop overflow-hidden">
      <motion.div
        className="max-w-container-max-width mx-auto px-grid-margin-desktop"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={sectionReveal}
      >
        <div className="text-center mb-16">
          <span className="font-label-caps text-label-caps text-primary mb-4 block uppercase tracking-wider">
            ANALYTICAL DATA
          </span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
            Performance Matrix
          </h2>
        </div>
        <div className="overflow-x-auto rounded-3xl border border-outline-variant/30 bg-white/40 shadow-sm">
          <table className="w-full border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b-2 border-primary text-primary bg-primary/5">
                <th className="py-6 px-6 text-left font-label-caps text-label-caps tracking-wider font-bold">Pellet Type</th>
                <th className="py-6 px-4 text-left font-label-caps text-label-caps tracking-wider font-bold">Calorific Value</th>
                <th className="py-6 px-4 text-left font-label-caps text-label-caps tracking-wider font-bold">Moisture (%)</th>
                <th className="py-6 px-4 text-left font-label-caps text-label-caps tracking-wider font-bold">Ash Content</th>
                <th className="py-6 px-4 text-left font-label-caps text-label-caps tracking-wider font-bold">Diameter (mm)</th>
              </tr>
            </thead>
            <tbody className="font-body-md text-body-md text-on-surface-variant divide-y divide-outline-variant/30">
              {displayRows.map((prod, index) => (
                <tr key={index} className="hover:bg-white/70 transition-colors">
                  <td className="py-6 px-6 font-bold text-primary font-body-lg">{prod.title}</td>
                  <td className="py-6 px-4">{getSpecValue(prod, 'Calorific')}</td>
                  <td className="py-6 px-4">{getSpecValue(prod, 'Moisture')}</td>
                  <td className="py-6 px-4">{prod.technicalData?.ash || getSpecValue(prod, 'Ash')}</td>
                  <td className="py-6 px-4">{prod.technicalData?.diameter || getSpecValue(prod, 'Diameter')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
};

export default ProductComparison;
