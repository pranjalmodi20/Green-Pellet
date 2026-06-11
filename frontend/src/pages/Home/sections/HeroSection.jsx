import React, { useState, useEffect } from 'react';
import heroBg from '../../../assets/images/home/hero-background.png';

// Exact hero image URL from stitch_green_pellets_next_gen_experience/home_green_pellets_india/code.html (line 149)
const STITCH_HERO_IMAGE =
  'https://lh3.googleusercontent.com/aida/AP1WRLsHrZQ_ikFwFOhAscpiZ1QAQ7UNIYgO1INVdpCok2efFvh9FUb7iIoTd5jtDfOFX5cP18aQl9tnIGG0Iv-uzJK4KmSQsXVLWFtHoCm3VJ38sR6VkI3ovUw5ljaW4rBkMZncZyhU_iWVJGQ37EtpkTVVXRl7sxIEdTRLnljsh7gZFe3BqsTPyz7xttkWoMTuogAdcq6ebq0JCTsli7AzuV7F7beGA0AqPy8FSZXq6Ycepa82VXQ8JZLYdl8';

const HeroSection = ({ config = {}, metrics = {} }) => {
  const badge = config.heroBadge || 'Carbon Neutral Future';
  const title = config.heroTitle || 'Powering the Planet,<br/><span class="text-tertiary">Sustainably.</span>';
  const subtitle = config.heroSubtitle || "Converting India's agricultural footprint into high-density biomass fuel. Precision engineered energy solutions for global industry leaders.";
  const bgImage = config.heroBgImage || STITCH_HERO_IMAGE;
  const primaryCta = config.heroPrimaryCtaText || 'Explore Solutions';
  const secondaryCta = config.heroSecondaryCtaText || 'Download Roadmap';

  const tonsProcessed = metrics.tonsProcessed || '1.2M+';
  const co2Offset = metrics.co2Offset || '450K';

  // Fallback state for the background image URL
  const [bgUrl, setBgUrl] = useState(heroBg);

  useEffect(() => {
    if (bgImage) {
      // Test if the image is loadable (not returning 403 or offline)
      const img = new Image();
      img.src = bgImage;
      img.onload = () => {
        setBgUrl(bgImage);
      };
      img.onerror = () => {
        console.warn(`Hero image failed to load: ${bgImage}. Falling back to local hero-background.`);
        setBgUrl(heroBg);
      };
    } else {
      setBgUrl(heroBg);
    }
  }, [bgImage]);

  // Format title: if it already contains HTML tags, use as-is.
  // Otherwise, convert \n to <br/> and wrap "Sustainably." in tertiary color span.
  const formattedTitle = title.includes('<')
    ? title
    : title
        .replace(/\n/g, '<br/>')
        .replace(/(Sustainably\.?)/, '<span class="text-tertiary">$1</span>');

  return (
    <header className="relative min-h-screen flex items-center pt-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center" 
          style={{ backgroundImage: `url('${bgUrl}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/40 to-transparent"></div>
      </div>
      <div className="relative z-10 max-w-container-max-width mx-auto px-grid-margin-desktop grid grid-cols-12 gap-grid-gutter w-full">
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-center space-y-8">
          <div className="inline-flex items-center space-x-2 px-4 py-1 glass-panel rounded-full w-fit">
            <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
            <span className="font-technical-data text-technical-data uppercase tracking-widest text-primary">{badge}</span>
          </div>
          <h1 
            className="font-display-xl text-display-xl-mobile md:text-display-xl text-primary leading-none"
            dangerouslySetInnerHTML={{ __html: formattedTitle }}
          />
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">{subtitle}</p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 pt-4">
            <button className="bg-primary text-on-primary px-10 py-5 rounded-full font-label-caps text-label-caps hover:bg-tertiary transition-all duration-500 shadow-xl">{primaryCta}</button>
            <button className="glass-panel px-10 py-5 rounded-full font-label-caps text-label-caps text-primary border border-primary/20 hover:bg-white transition-all">{secondaryCta}</button>
          </div>
        </div>
        {/* Real-time Metrics Card */}
        <div className="col-span-12 lg:col-span-5 flex items-center justify-center lg:justify-end mt-12 lg:mt-0">
          <div className="glass-panel p-10 rounded-[48px] ambient-glow space-y-8 w-full max-w-sm transform translate-y-0 lg:translate-y-12">
            <div className="space-y-2">
              <span className="font-technical-data text-technical-data text-primary/60 uppercase">Real-time Impact</span>
              <div className="h-px w-full bg-primary/10"></div>
            </div>
            <div>
              <span className="block font-headline-lg text-headline-lg text-primary tracking-tighter">{tonsProcessed}</span>
              <span className="font-body-md text-on-surface-variant">Tons of Waste Processed</span>
            </div>
            <div>
              <span className="block font-headline-lg text-headline-lg text-tertiary tracking-tighter">{co2Offset}</span>
              <span className="font-body-md text-on-surface-variant">CO2 Emission Reduced</span>
            </div>
            <div className="pt-4 flex items-center text-primary space-x-2">
              <span className="font-label-caps text-label-caps">View Full Audit</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
