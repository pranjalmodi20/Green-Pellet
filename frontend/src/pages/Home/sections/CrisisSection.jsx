import React from 'react';

const CrisisSection = ({ config = {} }) => {
  const badge = config.crisisBadge || 'The Problem';
  const title = config.crisisTitle || 'From Crisis to Catalyst';
  const description = config.crisisDescription || "Every year, millions of tons of agricultural residue are burned in open fields, creating a massive environmental hazard. We don't just see waste; we see the most potent source of renewable energy for a growing nation.";
  const image = config.crisisImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjIwxJeGYXYWf72P4unr1zQBvnIwnSZsXt1z7CPYouifd-dBnneMiiOpKBitgtcZHVgdnQD7ULwSak3yE3Cs0CT5lMGC3CMMED3Q_rwgRBqfPPxSHjtftbFfPJp2vYMA_X2OYZITW1EjILGk5YNZPv-HussHCbPK6_HVb57vqPIpR9SEA8zDJLuycZV803doPsy78EMt-WgTD_UIjXwVIdkOkasyuZKK7KRZp13WtxB9fbT4lvEveC3Si4XamldwNBm_Hcd2POnew';
  const quote = config.crisisQuote || 'The annual crop residue burning in India contributes to 25% of the smog in major cities.';
  const stat1Value = config.crisisStat1Value || '90%';
  const stat1Label = config.crisisStat1Label || 'Reduction in localized air pollutants through collection.';
  const stat2Value = config.crisisStat2Value || '15k+';
  const stat2Label = config.crisisStat2Label || 'Farmers empowered through waste-to-wealth programs.';

  return (
    <section className="py-section-gap-desktop bg-surface-container">
      <div className="max-w-container-max-width mx-auto px-grid-margin-desktop">
        <div className="grid grid-cols-12 gap-grid-gutter items-center">
          <div className="col-span-12 lg:col-span-5 order-2 lg:order-1">
            <div className="rounded-[48px] overflow-hidden aspect-[4/5] relative">
              <img 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
                src={image} 
                alt="Crisis illustration"
              />
              <div className="absolute bottom-8 left-8 right-8 glass-panel p-6 rounded-3xl">
                <p className="font-body-md italic text-primary">"{quote}"</p>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:offset-1 order-1 lg:order-2 space-y-8">
            <span className="font-label-caps text-label-caps text-tertiary uppercase tracking-widest">{badge}</span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">{title}</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">{description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-outline-variant/30">
              <div>
                <span className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">{stat1Value}</span>
                <p className="font-technical-data text-technical-data text-on-surface-variant">{stat1Label}</p>
              </div>
              <div>
                <span className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">{stat2Value}</span>
                <p className="font-technical-data text-technical-data text-on-surface-variant">{stat2Label}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CrisisSection;
