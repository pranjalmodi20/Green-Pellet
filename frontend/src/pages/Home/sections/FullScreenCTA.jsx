import React from 'react';

const FullScreenCTA = ({ config = {} }) => {
  const title = config.ctaTitle || 'Join the Clean Energy Revolution';
  const subtitle = config.ctaSubtitle || "Ready to transition your industry to high-performance biomass fuel? Let's engineer your carbon-neutral path today.";
  const bgImage = config.ctaBgImage || 'https://lh3.googleusercontent.com/aida/AP1WRLvGSb1VdTpxt1ylPy_XRpihKO4urH-tLZXH6EwvYPVXNyy4v7xB1mEo-Jr8EITzB8YVxLyBRag6U5HsdIztdvBtvjW6SYftpM8W4MCG3ahnFw2SJhC4xf3lZZg7TZ_MORiy5CTvH6GCiSk0M-7JVD-iswoabFaC6yzoGQv5NlPAqhlwMp_fZPph_wWN8jYNbyDq_YZGLW0UOY-BfE_XRYNtUpZXnwvhXsGSPwHAHt3Z1pz9DgKB8TrDbyI';
  const primaryCta = config.ctaPrimaryCtaText || 'Partner with Us';
  const secondaryCta = config.ctaSecondaryCtaText || 'Request a Site Visit';

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center parallax-bg" 
          style={{ backgroundImage: `url('${bgImage}')` }}
        ></div>
        <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm"></div>
      </div>
      <div className="relative z-10 max-w-container-max-width mx-auto px-grid-margin-desktop text-center w-full">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="font-display-xl text-display-xl-mobile md:text-display-xl text-on-primary text-glow leading-tight">{title}</h2>
          <p className="font-body-lg text-body-lg text-on-primary/80 max-w-2xl mx-auto">{subtitle}</p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8">
            <button className="bg-tertiary-fixed text-on-tertiary-fixed px-12 py-6 rounded-full font-label-caps text-label-caps hover:bg-tertiary-fixed-dim transition-all shadow-2xl scale-110">{primaryCta}</button>
            <button className="glass-panel border-white/20 text-on-primary px-12 py-6 rounded-full font-label-caps text-label-caps hover:bg-white hover:text-primary transition-all">{secondaryCta}</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullScreenCTA;
