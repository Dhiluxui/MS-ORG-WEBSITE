'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Instagram, Youtube, Twitter, MessageSquare, ArrowDown } from 'lucide-react';
import { WebGLAscii } from '@/components/ui/WebGLAscii';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 50, damping: 20 }
  }
};

export function HeroSection() {
  return (
    <section className="relative w-full h-[90vh] min-h-[700px] flex items-center overflow-hidden bg-black">
      
      {/* BACKGROUND LAYERS as per V2 Spec */}
      <div className="absolute inset-0 z-0">
        <WebGLAscii imageSrc="/hero-bg.webp?v=2" />
      </div>

      {/* Layer 2: Halftone dot grid */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Layer 3: Scanlines */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-30"
        style={{
          backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)'
        }}
      />

      {/* Layer 4: MS Triangle Watermark */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none opacity-[0.03] scale-150">
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-[800px] h-[800px] text-white">
          <path d="M50 0 L100 100 L0 100 Z" />
        </svg>
      </div>

      {/* Gradient to protect text visibility while letting WebGL show on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 md:via-black/70 to-black/50 md:to-transparent z-10 w-full lg:w-[80%]" />

      {/* CONTENT CONTAINER */}
      <motion.div 
        className="container mx-auto px-6 relative z-20 h-full flex flex-col justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-2xl lg:max-w-3xl flex flex-col items-start text-left pt-12 md:pt-20">
          
          {/* Terminal badge */}
          <motion.div variants={itemVariants} className="font-mono text-[10px] md:text-xs text-[#2463FF] border border-white/20 px-3 py-1 mb-6 md:mb-8 bg-black/40 backdrop-blur-sm">
            &gt; MS_ESPORTS_V1 // SYSTEM_ONLINE
          </motion.div>

          {/* H1 */}
          <h1 className="font-orbitron font-black text-5xl sm:text-6xl md:text-8xl leading-[0.9] tracking-tighter mb-6 md:mb-8 uppercase flex flex-col">
            <motion.span variants={itemVariants} className="text-white hover:text-[#2463FF] transition-colors duration-500">
              DOMINATE.
            </motion.span>
            <motion.span variants={itemVariants} className="text-[#2463FF] hover:text-white transition-colors duration-500">
              COMPETE.
            </motion.span>
            <motion.span variants={itemVariants} className="text-white hover:text-[#2463FF] transition-colors duration-500">
              CONQUER.
            </motion.span>
          </h1>

          {/* Subtext */}
          <motion.div variants={itemVariants} className="font-rajdhani font-semibold text-base sm:text-lg md:text-xl text-white/60 tracking-widest uppercase mb-8 md:mb-10 border-l-2 border-[#2463FF] pl-4 md:pl-6 py-1 md:py-2">
            <p className="text-white mb-1 md:mb-2 leading-tight">INDIA'S COMPETITIVE ESPORTS ORGANIZATION</p>
            <p className="text-xs sm:text-sm md:text-base tracking-[0.15em] sm:tracking-[0.25em] text-[#2463FF]/80 leading-tight">FREE FIRE MAX · BGMI · CODM · MOBA</p>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 mb-10 md:mb-12 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto rounded-none font-orbitron font-bold tracking-widest uppercase bg-[#2463FF] text-white border border-[#2463FF] hover:bg-white hover:text-black hover:border-white px-6 md:px-8 py-5 md:py-6 text-xs md:text-sm transition-all shadow-[0_0_20px_rgba(36,99,255,0.4)]">
              ▶ WATCH ORG STORY
            </Button>
            <Button variant="outline" size="lg" href="/compete/browse" className="w-full sm:w-auto rounded-none font-orbitron font-bold tracking-widest uppercase border-white/20 text-white hover:text-[#2463FF] hover:border-[#2463FF] bg-black/50 backdrop-blur-md px-6 md:px-8 py-5 md:py-6 text-xs md:text-sm transition-all">
              VIEW TOURNAMENTS →
            </Button>
          </motion.div>

          {/* ASCII divider */}
          <motion.div variants={itemVariants} className="w-full max-w-md h-[1px] bg-gradient-to-r from-white/30 to-transparent mb-8" />

          {/* Social icons row */}
          <motion.div variants={itemVariants} className="flex gap-6 text-white/40">
            <a href="#" className="hover:text-white hover:scale-110 transition-all"><Instagram size={20} /></a>
            <a href="#" className="hover:text-white hover:scale-110 transition-all"><Youtube size={20} /></a>
            <a href="#" className="hover:text-[#2463FF] hover:scale-110 transition-all"><MessageSquare size={20} /></a>
            <a href="#" className="hover:text-white hover:scale-110 transition-all"><Twitter size={20} /></a>
          </motion.div>

        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 font-mono text-white/30 text-xs flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span>SCROLL</span>
        <ArrowDown size={16} />
      </motion.div>

    </section>
  )
}
