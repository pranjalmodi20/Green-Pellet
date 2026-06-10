import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../../utils/motionVariants';

const MapSection = ({ mapConfig }) => {
  if (!mapConfig) return null;

  const { image, title, description, linkText, embedUrl, lat, lng } = mapConfig;

  // Build a default google maps query URL based on coords if no embedUrl or link is given,
  // or a default location.
  const mapLink = embedUrl || `https://www.google.com/maps/search/?api=1&query=${lat || '28.6139'},${lng || '77.2090'}`;

  return (
    <motion.section
      className="max-w-container-max-width mx-auto px-grid-margin-desktop pb-section-gap-desktop"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      transition={{ duration: 1 }}
    >
      <div className="relative w-full h-[600px] rounded-[64px] overflow-hidden group">
        <div className="absolute inset-0 bg-primary/20 z-10 pointer-events-none group-hover:bg-transparent transition-all duration-700"></div>
        
        {embedUrl ? (
          <iframe
            src={embedUrl}
            className="w-full h-full border-0 grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location"
          ></iframe>
        ) : (
          <img
            className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 scale-105 group-hover:scale-100"
            alt={title || 'Location Map'}
            src={image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT6dXQGykvWPYtgA2cLDByeVK1Oao7jD2G9pc8k_sIrGwhEzxcPxP_cSIJWgMmxx5bArLBnMi15YSuICGVY5cnP3KlXwFDPSVGl55He7X20qbbx0P5-AHHj2AVsK2vDf6VQRHjJwIy116OQSxkhVpfMIuN5ejWSgfkHXeOKpHJHiW0kVbJh3k2UKq7OU7pfgz-TsrFymaxB-2fd7bDAtRuU913GJbh53xSi7PhFuJuHUIEYXyPUITGUMo4x8MBrZ76yIW225zjxM4'}
          />
        )}

        <div className="absolute bottom-12 left-12 z-20 glass-panel p-8 rounded-[32px] max-w-xs shadow-xl">
          <h3 className="font-headline-lg text-[24px] mb-2 text-primary">
            {title || 'Regional Presence'}
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant mb-4">
            {description || 'Strategically located to manage our nationwide production facilities.'}
          </p>
          <a
            className="flex items-center gap-2 text-primary font-label-caps text-label-caps hover:gap-4 transition-all"
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkText || 'VIEW ALL LOCATIONS'}{' '}
            <span className="material-symbols-outlined">east</span>
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default MapSection;
