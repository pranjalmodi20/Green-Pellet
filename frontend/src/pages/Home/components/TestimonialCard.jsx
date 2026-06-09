import React from 'react';
import { motion } from 'framer-motion';
import MaterialIcon from '../../../components/common/MaterialIcon';

const TestimonialCard = ({ quote, name, role, company, avatar }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  // Default avatar image placeholder if empty
  const defaultAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZbqeaTqHVyAIltYNEx9CXLmV0_Q9R-XMNTovo0_FtTEgynM_cw59STfKqTEgkf17uGyEfGDrhKUv_K9ENQKIMSncGcniFOZvuQ68W5vxsJ1benA2cwgESPxcSVFwV3vG8rftHeUM-JivpbpsbVfKCvB8zx24G8NZHnzAFzrEdMLhRIpHLlTvje2RiGJh6YyuTBBwymgqeZsSnTxz8jC338hku_qei3x4XB0QgwEwiCsARTVAa_qG9csf_C04lEwAlmdUCfFhugBI';

  return (
    <motion.div 
      variants={cardVariants}
      className="glass-panel p-10 md:p-12 rounded-[36px] md:rounded-[48px] ambient-glow flex flex-col justify-between min-h-[380px] md:min-h-[400px] border border-white/40 shadow-sm"
    >
      <MaterialIcon 
        icon="format_quote" 
        className="text-5xl md:text-6xl text-primary/10 select-none block" 
        fill={true}
      />
      <p className="font-body text-on-surface text-lg md:text-xl leading-relaxed mb-8 italic flex-grow">
        "{quote}"
      </p>
      <div className="flex items-center space-x-4 pt-4 border-t border-outline-variant/10">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 overflow-hidden border border-primary/20 flex-shrink-0">
          <img 
            className="w-full h-full object-cover" 
            src={avatar || defaultAvatar} 
            alt={name} 
          />
        </div>
        <div>
          <span className="block font-label-caps text-label-caps text-primary uppercase tracking-wider font-bold">
            {name}
          </span>
          <span className="block font-technical-data text-technical-data text-on-surface-variant font-medium">
            {role}{company ? `, ${company}` : ''}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
