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

export default function HomePage() {
  return (
    <main className="bg-black min-h-screen text-primary overflow-x-hidden">
      
      {/* SECTION 1: HERO */}
      <section className="h-screen p-4 md:p-6 w-full relative">
        <div className="w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden relative bg-black">
          {/* Background Video */}
          <video 
            autoPlay loop muted playsInline 
            className="absolute inset-0 w-full h-full object-cover"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          />
          <div className="absolute inset-0 noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

          {/* Navbar */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50">
            <nav className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14 text-[10px] sm:text-xs md:text-sm">
              {["Our story", "Collective", "Workshops", "Programs", "Inquiries"].map((item) => (
                <a key={item} href="#" style={{ color: 'rgba(225, 224, 204, 0.8)' }} className="hover:text-[#E1E0CC] transition-colors whitespace-nowrap">
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-16 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-end">
              <div className="lg:col-span-8">
                <h1 className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-medium leading-[0.85] tracking-[-0.07em]" style={{ color: '#E1E0CC' }}>
                  <WordsPullUp text="Prisma" showAsterisk={true} />
                </h1>
              </div>
              
              <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end mb-4 sm:mb-8 lg:mb-12">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-primary/70 text-xs sm:text-sm md:text-base leading-[1.2] max-w-sm mb-6 lg:text-right"
                >
                  Prisma is a worldwide network of visual artists, filmmakers and storytellers bound not by place, status or labels but by passion and hunger to unlock potential through our unique perspectives.
                </motion.p>
                <motion.button 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="group bg-primary rounded-full pl-5 pr-2 py-2 flex items-center gap-2 hover:gap-3 transition-all duration-300 text-black font-medium text-sm sm:text-base"
                >
                  Join the lab
                  <div className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT */}
      <section className="bg-black py-24 md:py-32 px-4 md:px-6 w-full flex justify-center">
        <div className="bg-[#101010] rounded-3xl p-8 md:p-16 lg:p-24 max-w-6xl w-full text-center flex flex-col items-center">
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-primary/70 mb-8 block">Visual arts</span>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl mx-auto leading-[0.95] sm:leading-[0.9] mb-12">
            <WordsPullUpMultiStyle segments={[
              { text: "I am Marcus Chen, " },
              { text: "a self-taught director. ", className: "font-serif italic" },
              { text: "I have skills in color grading, visual effects, and narrative design." }
            ]} />
          </h2>

          <div className="max-w-2xl mx-auto">
            <ScrollRevealText 
              text="Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals."
              className="text-[#DEDBC8] text-xs sm:text-sm md:text-base leading-relaxed justify-center text-center"
            />
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURES */}
      <section className="min-h-screen bg-black relative px-4 md:px-6 pb-24">
        <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto pt-20 pb-12 relative z-10 text-center md:text-left">
          <div className="mb-12 md:mb-20 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal max-w-3xl">
            <WordsPullUpMultiStyle segments={[
              { text: "Studio-grade workflows for visionary creators.", className: "block mb-2" },
              { text: "Built for pure vision. Powered by art.", className: "text-gray-500 block" }
            ]} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]">
            
            {/* Card 1 */}
            <FeatureCard delay={0}>
              <div className="relative w-full h-full min-h-[300px] rounded-xl overflow-hidden bg-[#212121]">
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p style={{ color: '#E1E0CC' }} className="text-lg font-medium">Your creative canvas.</p>
                </div>
              </div>
            </FeatureCard>

            {/* Card 2 */}
            <FeatureCard delay={0.15}>
              <div className="bg-[#212121] rounded-xl p-6 h-full flex flex-col">
                <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85" alt="Icon" className="w-10 h-10 sm:w-12 sm:h-12 rounded mb-6" />
                <h3 className="text-lg font-medium mb-6 text-[#E1E0CC]">Project Storyboard <span className="text-gray-500 text-sm font-serif italic ml-1">(01)</span></h3>
                <ul className="space-y-4 mb-auto text-sm text-gray-400">
                  <li className="flex gap-3"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Drag and drop interface</li>
                  <li className="flex gap-3"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Real-time collaboration</li>
                  <li className="flex gap-3"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Asset version control</li>
                  <li className="flex gap-3"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Client presentation links</li>
                </ul>
                <a href="#" className="flex items-center gap-2 text-primary mt-8 hover:opacity-80 transition-opacity text-sm">
                  Learn more <ArrowRight className="w-4 h-4 -rotate-45" />
                </a>
              </div>
            </FeatureCard>

            {/* Card 3 */}
            <FeatureCard delay={0.3}>
              <div className="bg-[#212121] rounded-xl p-6 h-full flex flex-col">
                <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85" alt="Icon" className="w-10 h-10 sm:w-12 sm:h-12 rounded mb-6" />
                <h3 className="text-lg font-medium mb-6 text-[#E1E0CC]">Smart Critiques <span className="text-gray-500 text-sm font-serif italic ml-1">(02)</span></h3>
                <ul className="space-y-4 mb-auto text-sm text-gray-400">
                  <li className="flex gap-3"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Frame-accurate AI analysis</li>
                  <li className="flex gap-3"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Contextual creative notes</li>
                  <li className="flex gap-3"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Direct NLE integration</li>
                </ul>
                <a href="#" className="flex items-center gap-2 text-primary mt-8 hover:opacity-80 transition-opacity text-sm">
                  Learn more <ArrowRight className="w-4 h-4 -rotate-45" />
                </a>
              </div>
            </FeatureCard>

            {/* Card 4 */}
            <FeatureCard delay={0.45}>
              <div className="bg-[#212121] rounded-xl p-6 h-full flex flex-col">
                <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85" alt="Icon" className="w-10 h-10 sm:w-12 sm:h-12 rounded mb-6" />
                <h3 className="text-lg font-medium mb-6 text-[#E1E0CC]">Immersion Capsule <span className="text-gray-500 text-sm font-serif italic ml-1">(03)</span></h3>
                <ul className="space-y-4 mb-auto text-sm text-gray-400">
                  <li className="flex gap-3"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Automatic notification silencing</li>
                  <li className="flex gap-3"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Cinematic ambient soundscapes</li>
                  <li className="flex gap-3"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Team schedule syncing</li>
                </ul>
                <a href="#" className="flex items-center gap-2 text-primary mt-8 hover:opacity-80 transition-opacity text-sm">
                  Learn more <ArrowRight className="w-4 h-4 -rotate-45" />
                </a>
              </div>
            </FeatureCard>

          </div>
        </div>
      </section>

    </main>
  );
}
