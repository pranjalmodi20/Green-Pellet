import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const IndustryGrid = ({ industries = [] }) => {
  // Find industries by slug to bind to exact layout positions
  const foodInd = industries.find(ind => ind.slug === 'food-processing-namkeen') || {};
  const packagingInd = industries.find(ind => ind.slug === 'packaging') || {};
  const pharmaInd = industries.find(ind => ind.slug === 'pharmaceutical') || {};
  const coatingInd = industries.find(ind => ind.slug === 'coating-paints') || {};
  const fmcgInd = industries.find(ind => ind.slug === 'fmcg-leaders') || {};

  // Default Fallback Images in case CMS does not provide them
  const fallbackImages = {
    food: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFO4mq4TAsLR9GoP_VBUSEEUHGJErzfTwoW5YRzn41twFHuKdJJMN9flwK4v_lSh6hn4t8Ar0OqpuF9C0GQLjoncW_UVUd1KNaJfCz3fqCi810UYw9osnI_jeUHxQ2rmHqEMPM809EPAYtwz19WHk4J_98mv_bezIrfiaF4rzW3S1kHOClBegiAJeXZyqami5nY5jf2zLlCK2cTbqF4Lta7wZoDAFNqIC-Xld2SQTbVJFCYHOldWH0fHCw351zaumwDwmkq0YwHMA',
    pharma: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUIdwfExN-1DUPaFsqLNawZKCSdBWGfycDQUxUtnYw8vHdOnAC2QLHZY06iraTJVeiUrQmOlNyS0LmwNFKo0FvMjVl_QVFdqJz98qf3RMJ8G03d_lPe7tu7sJwQPRh8j_wQQyo9dP_OWW7nlCH3eVGVrVVOd0DgZn4U6r-M5-NiVj_QQKsR9m6w-vgY2vNORTAlN8wNoRGqhxitUrN1LlX4y5nOXPGYW-A3opphOmHsV17L3N6T23OtUI_ay0KOyrDE15n1HpURnY',
    coating: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-hUWlm92Hj4jCDK47ECIQ32Oy2wCMr2Btq31cddvB1Qvn3JDNcE76R_1efzYT8SwYv9Y_fxZ4D8NA0-RXmD7VYYDfkco7F5wNBfz2HaOz10sO7-MxO60ZGx3H26kXyxngGNvlQZPAcnD-voA3AhuAHCwfay9fRNdGXlQpjgI6rypalKFPdDrhGZDx6JS20fmCq1cTmInEDe5eDJ-0OQBgoTAwOSUJthcz2u0N6G6gfG-iTDUyfIOBmAPPnuhmMqLtLmi9r9NXVBc',
    fmcg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkw4XcXaotiK7U1E5Bpjn8wrN4MRK1natGtb9rizR8GpC2uaSatn732xPd46h6aPh4xLFGeGoXKg3GZOt_XLfbeNfgtrhSe6W9lKHwE7aEkJ3UlA8vLUA3_Hdv4pG3bsrcYzGxKh7iPsSomZLa3WmdHVu0A-CZkb4JeaQq0Rp624w9L1SuQxopaa0LW7cfZQGFNx0YSs3ElYv0ADrQoC1HvWCKwnHmwgaOITsMz595zIT4gMjAns2eoTnV8rGDsdOYj4qDyzPEQz8'
  };

  const getCatName = (item, defaultVal) => {
    if (item.category) {
      return typeof item.category === 'object' ? item.category.name : item.category;
    }
    return defaultVal;
  };

  return (
    <main className="max-w-container-max-width mx-auto px-grid-margin-desktop pb-section-gap-desktop">
      <div className="grid grid-cols-12 gap-12">
        
        {/* Slot 1: Food Processing & Namkeen (Asymmetric Pair - Left, col-span-8, h-[600px]) */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="col-span-12 lg:col-span-8 group cursor-pointer relative rounded-[48px] overflow-hidden h-[600px] ambient-glow transition-all duration-500"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
            style={{ backgroundImage: `url('${foodInd.featuredImage || foodInd.image || fallbackImages.food}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/20 to-transparent"></div>
          <div className="absolute bottom-12 left-12 max-w-lg glass-panel p-10 rounded-[32px]">
            <span className="font-technical-data text-technical-data bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full mb-4 inline-block font-bold tracking-wider">
              {getCatName(foodInd, 'FOOD & BEVERAGE')}
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">
              {foodInd.title || 'Food Processing & Namkeen'}
            </h2>
            <p className="font-body-md text-on-surface-variant mb-6">
              {foodInd.shortDescription || 'Optimizing thermal efficiency for large-scale frying and extrusion processes with carbon-neutral pellets.'}
            </p>
            {foodInd.caseStudies && foodInd.caseStudies.length > 0 ? (
              <Link to={`/case-studies/${foodInd.caseStudies[0].slug || foodInd.caseStudies[0]}`} className="font-label-caps text-primary flex items-center gap-2 group/link font-bold text-sm tracking-wider">
                EXPLORE CASE STUDY 
                <span className="material-symbols-outlined transition-transform group-hover/link:translate-x-1">arrow_forward</span>
              </Link>
            ) : (
              <a className="font-label-caps text-primary flex items-center gap-2 group/link font-bold text-sm tracking-wider" href="#">
                EXPLORE CASE STUDY 
                <span className="material-symbols-outlined transition-transform group-hover/link:translate-x-1">arrow_forward</span>
              </a>
            )}
          </div>
        </motion.section>

        {/* Slot 2: Packaging (Asymmetric Pair - Right, col-span-4) */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="col-span-12 lg:col-span-4 flex flex-col gap-12"
        >
          <div className="flex-1 glass-panel p-12 rounded-[48px] flex flex-col justify-between ambient-glow transition-all">
            <div>
              <span className="material-symbols-outlined text-primary text-5xl mb-6">
                {packagingInd.icon || 'inventory_2'}
              </span>
              <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-4">
                {packagingInd.title || 'Packaging'}
              </h3>
              <p className="font-body-md text-on-surface-variant">
                {packagingInd.shortDescription || 'Revolutionizing energy-intensive paper and plastic conversion processes with high-calorific biomass fuels.'}
              </p>
            </div>
            <button className="w-full py-4 mt-6 border border-outline-variant rounded-full font-label-caps font-bold hover:bg-primary hover:text-on-primary transition-colors duration-300">
              Technical Data
            </button>
          </div>
        </motion.section>

        {/* Slot 3: Pharmaceutical (Precision Focused - Left, col-span-5) */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="col-span-12 lg:col-span-5 flex flex-col"
        >
          <div className="relative rounded-[48px] overflow-hidden flex-1 min-h-[300px] lg:min-h-[450px] group">
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src={pharmaInd.featuredImage || pharmaInd.image || fallbackImages.pharma}
              alt={pharmaInd.title || 'Pharmaceutical'}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
            <div className="absolute top-12 left-12">
              <h3 className="font-headline-lg text-white text-glow text-shadow">
                {pharmaInd.title || 'Pharmaceutical'}
              </h3>
            </div>
          </div>
        </motion.section>

        {/* Slot 4: Pharmaceutical Detail Card (Right, col-span-7) */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="col-span-12 lg:col-span-7 glass-panel p-16 rounded-[48px] flex items-center"
        >
          <div className="max-w-xl">
            <span className="font-label-caps text-primary mb-6 block font-bold tracking-widest text-xs">
              {getCatName(pharmaInd, 'PRECISION STEAM GENERATION')}
            </span>
            <h3 className="font-headline-lg text-headline-lg mb-6 text-primary">
              {pharmaInd.shortDescription || 'Consistency for Critical Environments'}
            </h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
              {pharmaInd.fullDescription || 'Pharmaceutical manufacturing requires absolute stability. Our pellets ensure constant steam pressure and temperature precision, meeting stringent global compliance standards while reducing operational carbon footprints.'}
            </p>
            <div className="grid grid-cols-2 gap-8">
              {pharmaInd.statistics && pharmaInd.statistics.length > 0 ? (
                pharmaInd.statistics.map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-primary font-headline-lg text-5xl font-bold mb-1">
                      {stat.value}{stat.unit}
                    </div>
                    <div className="font-technical-data text-on-surface-variant uppercase tracking-widest text-xs font-semibold">
                      {stat.title}
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div>
                    <div className="text-primary font-headline-lg text-5xl font-bold mb-1">99.9%</div>
                    <div className="font-technical-data text-on-surface-variant uppercase tracking-widest text-xs font-semibold">Efficiency Rate</div>
                  </div>
                  <div>
                    <div className="text-primary font-headline-lg text-5xl font-bold mb-1">-40%</div>
                    <div className="font-technical-data text-on-surface-variant uppercase tracking-widest text-xs font-semibold">CO2 Emissions</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.section>

        {/* Slot 5: Coating & Paints (Vertical - Left, col-span-4, h-[700px]) */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="col-span-12 lg:col-span-4 group relative rounded-[48px] overflow-hidden h-[700px] cursor-pointer"
        >
          <img 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            src={coatingInd.featuredImage || coatingInd.image || fallbackImages.coating}
            alt={coatingInd.title || 'Coating & Paints'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"></div>
          <div className="absolute bottom-12 left-12 right-12">
            <h3 className="font-headline-lg text-white mb-4">
              {coatingInd.title || 'Coating & Paints'}
            </h3>
            <p className="text-white/80 font-body-md mb-6">
              {coatingInd.shortDescription || 'Sustainable heat solutions for drying ovens and chemical treatment lines.'}
            </p>
            <span className="material-symbols-outlined text-white text-4xl transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
              {coatingInd.icon || 'arrow_outward'}
            </span>
          </div>
        </motion.section>

        {/* Slot 6 & 7: FMCG Leaders & Quote Block (Right, col-span-8) */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="col-span-12 lg:col-span-8 flex flex-col gap-12"
        >
          {/* FMCG Banner */}
          <div className="relative rounded-[48px] overflow-hidden flex-1 min-h-[350px] group">
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src={fmcgInd.featuredImage || fmcgInd.image || fallbackImages.fmcg}
              alt={fmcgInd.title || 'FMCG Leaders'}
            />
            <div className="absolute inset-0 bg-black/30 flex items-center px-16">
              <div className="max-w-md">
                <h3 className="font-headline-lg text-white mb-4">
                  {fmcgInd.title || 'FMCG Leaders'}
                </h3>
                <p className="text-white/90 font-body-lg">
                  {fmcgInd.shortDescription || 'Powering the brands you use every day with cleaner, more cost-effective energy cycles.'}
                </p>
              </div>
            </div>
          </div>

          {/* Sub-cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Manufacturing card */}
            <div className="glass-panel rounded-[40px] p-10 ambient-glow transition-all">
              <h4 className="font-headline-lg-mobile text-primary mb-2 text-2xl font-bold">
                {fmcgInd.benefits?.[0]?.title || 'Manufacturing'}
              </h4>
              <p className="font-body-md text-on-surface-variant">
                {fmcgInd.benefits?.[0]?.description || 'General industrial applications requiring high-density fuel.'}
              </p>
            </div>

            {/* COO Quote block */}
            <div className="bg-primary-container rounded-[40px] p-10 flex flex-col justify-between min-h-[220px]">
              <p className="text-on-primary-container font-body-md italic leading-relaxed">
                "{fmcgInd.quoteText || "The switch to Green Pellets India reduced our industrial plant's energy costs by 22% within the first fiscal year."}"
              </p>
              <div className="flex items-center gap-4 mt-6">
                {fmcgInd.quoteAvatar ? (
                  <img src={fmcgInd.quoteAvatar} className="w-10 h-10 rounded-full object-cover border border-white/20" alt="COO" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center font-bold text-primary text-xs">COO</div>
                )}
                <span className="font-technical-data text-white text-[10px] tracking-wider font-bold uppercase">
                  {fmcgInd.quoteAuthor || 'CHIEF OPERATIONS OFFICER, GLOBAL PLANTS'}
                </span>
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </main>
  );
};

export default IndustryGrid;
