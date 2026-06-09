import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

const AnimatedCounter = ({ value, duration = 2, suffix = '', decimals = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => {
    return latest.toFixed(decimals);
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration: duration,
        ease: 'easeOut',
      });
      return controls.stop;
    }
  }, [motionValue, value, duration, isInView]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

// Formats numeric string like "1200000" into "1.2M+" or similar. But since we might get formatted labels or just raw numbers, let's make it flexible.
export const FormatCount = ({ target, text, duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  // Custom simple parser/formatter
  // We can just animate a dummy counter and output the final text or split the number portion.
  // For "1.2M+" we can animate a count to 1.2 and keep M+ static.
  // For "450K" we can animate to 450 and keep K static.
  // For "90%" we animate to 90 and keep % static.
  // For "15k+" we animate to 15 and keep k+ static.
  const regex = /^([\d.]+)([a-zA-Z+%]+)?$/;
  const match = String(text).replace(/\s/g, '').match(regex);
  
  if (match) {
    const numPart = parseFloat(match[1]);
    const suffixPart = match[2] || '';
    const hasDecimal = match[1].includes('.');
    const decimals = hasDecimal ? match[1].split('.')[1].length : 0;
    
    return (
      <span ref={ref}>
        <AnimatedCounter value={numPart} duration={duration} decimals={decimals} />
        {suffixPart}
      </span>
    );
  }

  return <span ref={ref}>{text}</span>;
};

export default AnimatedCounter;
