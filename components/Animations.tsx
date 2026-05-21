"use client";

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

export const WordsPullUp = ({ text, showAsterisk = false }: { text: string, showAsterisk?: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const words = text.split(' ');

  return (
    <div ref={ref} className="flex flex-wrap relative inline-flex">
      {words.map((word, i) => {
        const isLastWord = i === words.length - 1;
        return (
          <motion.div
            key={i}
            initial={{ y: "40%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: "40%", opacity: 0 }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mr-[0.2em] relative"
          >
            {word}
            {isLastWord && showAsterisk && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export const WordsPullUpMultiStyle = ({ segments }: { segments: { text: string, className?: string }[] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  
  let globalWordIndex = 0;

  return (
    <div ref={ref} className="inline-flex flex-wrap justify-center">
      {segments.map((seg, segIdx) => {
        const words = seg.text.split(' ');
        return (
          <span key={segIdx} className={seg.className}>
            {words.map((word, wIdx) => {
              const delay = globalWordIndex * 0.08;
              globalWordIndex++;
              return (
                <motion.span
                  key={wIdx}
                  initial={{ y: "40%", opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: "40%", opacity: 0 }}
                  transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block mr-[0.2em]"
                >
                  {word}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </div>
  );
};

export const ScrollRevealText = ({ text, className }: { text: string, className?: string }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2']
  });

  const chars = text.split('');

  return (
    <p ref={containerRef} className={`flex flex-wrap ${className}`}>
      {chars.map((char, i) => {
        const charProgress = i / chars.length;
        const opacity = useTransform(
          scrollYProgress,
          [charProgress - 0.1, charProgress + 0.05],
          [0.2, 1]
        );
        return (
          <motion.span key={i} style={{ opacity }}>
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        );
      })}
    </p>
  );
};
