import React from 'react';

const IndustriesGrid = ({ industries = [] }) => {
  const defaultIndustries = [
    {
      _id: 'energy-utilities',
      title: 'Energy & Utilities',
      description: 'Replacement of coal for grid-scale energy production, achieving up to 60% carbon reduction per MWh.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxZpLBYsNqpLFC5eOEObwFa98kOvOHh_-dZxlmtVQuKNrz8Oi4s-jcTs5ZZC5bJztylVaWnI7B7RT2bbE5yEqA0BfvH5sOY0SaE8U4V_exab0RL8eN7CtF__nPymBQ89eUEVyZTO_1DEsI5lVwDmv18YaZhC6lxd6S60rmLa-pg73zwG93qmWpZFiHxu3f0TmhYZ0HIwDlNklw0qJskcls9nC7_NjlqcaQ2BQ9Bd0aENSoO5HR8DaUG65OcYwhDOiXD1I-whBdvnE',
      type: 'hero'
    },
    {
      _id: 'hospitality',
      title: 'Hospitality',
      description: 'Premium heating for luxury resorts and eco-conscious hotel chains.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASsuMYnQIHF6nhhUFOits7KrPCBgjtZlHCQOgUj6eEl8x7ptzKSmgHlHgGI5gzrzj2DUs1eNNt3RFSKNtdwqS1F54E_5OtV7_f9tSIIDR-6owB9cBio-6oNapv_AdWLlGCjQ5wmXsY3pxbkn70BIxMuaJUK8pT6um2x1L1nJnmw2xj3NN-ds9WwpgWWm9k3NDL4l3rdaaKIT-YilxmKNZgVVp86-vaUkQenOru5YhLFpiMUtVIwuixTParszb3VSSi894qlblnkH4',
      type: 'medium'
    },
    {
      _id: 'manufacturing',
      title: 'Manufacturing',
      icon: 'factory',
      type: 'small'
    },
    {
      _id: 'chemical-processing',
      title: 'Chemical Processing',
      icon: 'science',
      type: 'accent'
    }
  ];

  const displayIndustries = industries && industries.length > 0 ? industries : defaultIndustries;

  // Let's find specific tiles by type or fallback by index
  const heroTile = displayIndustries.find(item => item.type === 'hero') || displayIndustries[0] || defaultIndustries[0];
  const mediumTile = displayIndustries.find(item => item.type === 'medium') || displayIndustries[1] || defaultIndustries[1];
  const smallTile = displayIndustries.find(item => item.type === 'small') || displayIndustries[2] || defaultIndustries[2];
  const accentTile = displayIndustries.find(item => item.type === 'accent') || displayIndustries[3] || defaultIndustries[3];

  return (
    <section className="py-section-gap-desktop bg-surface">
      <div className="max-w-container-max-width mx-auto px-grid-margin-desktop">
        <div className="text-center mb-24">
          <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest mb-4 block">Market Reach</span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Powering Diverse Industries</h2>
        </div>
        <div className="grid grid-cols-12 lg:grid-rows-2 gap-grid-gutter h-auto lg:h-[800px]">
          {/* Main Bento Item */}
          <div className="col-span-12 lg:col-span-7 row-span-1 lg:row-span-2 min-h-[350px] lg:min-h-0 glass-panel rounded-[48px] overflow-hidden relative group">
            <img 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
              src={heroTile.image} 
              alt={heroTile.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent flex flex-col justify-end p-6 md:p-12">
              <h3 className="font-headline-lg text-on-primary mb-4">{heroTile.title}</h3>
              <p className="font-body-lg text-on-primary/80 max-w-md">{heroTile.description}</p>
            </div>
          </div>
          {/* Secondary Bento Item */}
          <div className="col-span-12 lg:col-span-5 row-span-1 min-h-[250px] lg:min-h-0 glass-panel rounded-[48px] overflow-hidden relative group">
            <img 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
              src={mediumTile.image} 
              alt={mediumTile.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent flex flex-col justify-end p-6 md:p-8">
              <h3 className="font-headline-lg text-2xl text-on-primary mb-2">{mediumTile.title}</h3>
              <p className="font-body-md text-on-primary/80">{mediumTile.description}</p>
            </div>
          </div>
          {/* Small Bento Item */}
          <div className="col-span-12 md:col-span-6 lg:col-span-2 row-span-1 glass-panel rounded-[48px] flex flex-col items-center justify-center p-8 text-center ambient-glow">
            <span className="material-symbols-outlined text-4xl text-primary mb-4">{smallTile.icon || 'factory'}</span>
            <h4 className="font-label-caps text-label-caps text-primary">{smallTile.title}</h4>
          </div>
          {/* Accent Bento Item */}
          <div className="col-span-12 md:col-span-6 lg:col-span-3 row-span-1 bg-tertiary-container rounded-[48px] flex flex-col items-center justify-center p-8 text-center shadow-lg group hover:bg-tertiary transition-colors">
            <span className="material-symbols-outlined text-4xl text-on-tertiary-container group-hover:text-on-tertiary mb-4">{accentTile.icon || 'science'}</span>
            <h4 className="font-label-caps text-label-caps text-on-tertiary-container group-hover:text-on-tertiary">{accentTile.title}</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesGrid;
