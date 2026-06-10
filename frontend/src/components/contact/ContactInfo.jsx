import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../../utils/motionVariants';

const ContactInfo = ({ contactInfo, trustedBy }) => {
  if (!contactInfo) return null;

  const { headquarters, email, phone } = contactInfo;

  return (
    <motion.div
      className="col-span-12 lg:col-span-5 flex flex-col gap-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      transition={{ duration: 0.8 }}
    >
      <div className="space-y-8">
        {/* Headquarters */}
        {headquarters && (
          <div className="flex items-start gap-6 group">
            <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0 group-hover:bg-primary-container transition-colors duration-500">
              <span className="material-symbols-outlined text-primary group-hover:text-on-primary-container">
                {headquarters.icon || 'location_on'}
              </span>
            </div>
            <div>
              <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-2">
                {headquarters.label || 'HEADQUARTERS'}
              </h3>
              <p 
                className="font-body-lg text-body-lg font-semibold whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: headquarters.address }}
              />
            </div>
          </div>
        )}

        {/* Email */}
        {email && (
          <div className="flex items-start gap-6 group">
            <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0 group-hover:bg-primary-container transition-colors duration-500">
              <span className="material-symbols-outlined text-primary group-hover:text-on-primary-container">
                {email.icon || 'mail'}
              </span>
            </div>
            <div>
              <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-2">
                {email.label || 'EMAIL'}
              </h3>
              <p className="font-body-lg text-body-lg font-semibold">{email.primary}</p>
              {email.secondary && (
                <p className="font-body-md text-body-md text-on-surface-variant">{email.secondary}</p>
              )}
            </div>
          </div>
        )}

        {/* Phone */}
        {phone && (
          <div className="flex items-start gap-6 group">
            <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0 group-hover:bg-primary-container transition-colors duration-500">
              <span className="material-symbols-outlined text-primary group-hover:text-on-primary-container">
                {phone.icon || 'call'}
              </span>
            </div>
            <div>
              <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-2">
                {phone.label || 'PHONE'}
              </h3>
              <p className="font-body-lg text-body-lg font-semibold">{phone.number}</p>
              {phone.hours && (
                <p className="font-body-md text-body-md text-on-surface-variant">{phone.hours}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {trustedBy && (
        <div className="pt-8 border-t border-outline-variant/30">
          <h4 className="font-label-caps text-label-caps text-on-surface-variant mb-6">
            {trustedBy.label || 'TRUSTED BY'}
          </h4>
          <div className="flex flex-wrap gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            {trustedBy.logos && trustedBy.logos.map((logo, index) => (
              <span key={index} className="font-headline-lg text-[24px] font-bold">
                {logo}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ContactInfo;
