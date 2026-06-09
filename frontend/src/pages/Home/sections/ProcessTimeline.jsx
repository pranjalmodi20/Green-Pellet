import React from 'react';

const ProcessTimeline = () => {
  return (
    <section className="py-section-gap-desktop bg-surface relative overflow-hidden">
      <div className="max-w-container-max-width mx-auto px-grid-margin-desktop text-center mb-24">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-6">The Cycle of Modern Energy</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          A multi-stage engineering process that refines raw biomass into industrial-grade power units.
        </p>
      </div>
      <div className="max-w-container-max-width mx-auto px-grid-margin-desktop">
        <div className="relative flex flex-col lg:flex-row items-center justify-between space-y-12 lg:space-y-0">
          {/* Connectors for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2"></div>
          
          {/* Step 1 */}
          <div className="relative z-10 w-full lg:w-1/4 flex flex-col items-center group">
            <div className="w-32 h-32 glass-panel rounded-full flex items-center justify-center mb-8 ambient-glow group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>agriculture</span>
            </div>
            <h3 className="font-label-caps text-label-caps text-primary mb-2">01. Procurement</h3>
            <p className="font-body-md text-on-surface-variant text-center px-6">Direct collection from over 5,000 verified farm networks across India.</p>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 w-full lg:w-1/4 flex flex-col items-center group">
            <div className="w-32 h-32 glass-panel rounded-full flex items-center justify-center mb-8 ambient-glow group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>precision_manufacturing</span>
            </div>
            <h3 className="font-label-caps text-label-caps text-primary mb-2">02. Refinement</h3>
            <p className="font-body-md text-on-surface-variant text-center px-6">Shredding and moisture control at sub-5% precision levels.</p>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 w-full lg:w-1/4 flex flex-col items-center group">
            <div className="w-32 h-32 glass-panel rounded-full flex items-center justify-center mb-8 ambient-glow group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>settings_input_component</span>
            </div>
            <h3 className="font-label-caps text-label-caps text-primary mb-2">03. Compression</h3>
            <p className="font-body-md text-on-surface-variant text-center px-6">High-pressure extrusions creating 6mm and 8mm premium pellets.</p>
          </div>

          {/* Step 4 */}
          <div className="relative z-10 w-full lg:w-1/4 flex flex-col items-center group">
            <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-4xl text-on-primary" style={{ fontVariationSettings: "'FILL' 0" }}>bolt</span>
            </div>
            <h3 className="font-label-caps text-label-caps text-primary mb-2">04. Dispatch</h3>
            <p className="font-body-md text-on-surface-variant text-center px-6">Standardized logistics ensuring 24/7 supply chain integrity.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
