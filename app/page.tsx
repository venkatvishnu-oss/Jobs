"use client";

import { ArrowRight, Check } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { WordsPullUp, WordsPullUpMultiStyle, ScrollRevealText } from '@/components/Animations';

function FeatureCard({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl overflow-hidden h-full flex flex-col"
    >
      {children}
    </motion.div>
  );
}

// ... (Paste the rest of the App component code exactly as you had it below this) ...
