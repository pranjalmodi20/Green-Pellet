import React from 'react';
import { motion } from 'framer-motion';
import { FormatCount } from '../../../components/common/AnimatedCounter';
import MaterialIcon from '../../../components/common/MaterialIcon';

const MetricsCard = ({ tonsProcessed = '1.2M+', co2Offset = '450K' }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
      className="glass-panel p-8 md:p-10 rounded-[32px] md:rounded-[48px] ambient-glow space-y-6 md:space-y-8 w-full max-w-sm"
    >
      <div className="space-y-2">
        <span className="font-technical-data text-technical-data text-primary/60 uppercase tracking-widest block">
          Real-time Impact
        </span>
        <div className="h-[1px] w-full bg-primary/10"></div>
      </div>
      
      <div className="space-y-1">
        <span className="block font-display text-4xl md:text-5xl text-primary font-black tracking-tighter">
          <FormatCount text={tonsProcessed} />
        </span>
        <span className="font-body text-body-md text-on-surface-variant">
          Tons of Waste Processed
        </span>
      </div>
      
      <div className="space-y-1">
        <span className="block font-display text-4xl md:text-5xl text-tertiary font-black tracking-tighter">
          <FormatCount text={co2Offset} />
        </span>
        <span className="font-body text-body-md text-on-surface-variant">
          CO2 Emission Reduced
        </span>
      </div>
      
      <div className="pt-4 flex items-center text-primary space-x-2 group cursor-pointer w-fit">
        <span className="font-label-caps text-label-caps uppercase tracking-wider group-hover:underline">
          View Full Audit
        </span>
        <MaterialIcon 
          icon="arrow_forward" 
          className="text-sm group-hover:translate-x-1 transition-transform duration-300" 
        />
      </div>
    </motion.div>
  );
};

export default MetricsCard;
