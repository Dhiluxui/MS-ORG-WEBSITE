'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function StoryHero() {
  const [typedText, setTypedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  
  const sequence = [
    { text: '> INITIATING_SEQUENCE...', pause: 800 },
    { text: '\n> LOADING_MS_STORY...', pause: 1200 },
    { text: '\n> ONLINE.', pause: 500 }
  ]

  useEffect(() => {
    let currentText = ''
    let isMounted = true
    
    const typeSequence = async () => {
      for (const step of sequence) {
        if (!isMounted) return
        for (const char of step.text) {
          if (!isMounted) return
          currentText += char
          setTypedText(currentText)
          await new Promise(r => setTimeout(r, 40)) // 40ms per char
        }
        await new Promise(r => setTimeout(r, step.pause))
      }
      setIsTypingComplete(true)
    }
    
    typeSequence()
    return () => { isMounted = false }
  }, [])

  return (
    <section className="relative flex flex-col justify-center min-h-[70vh] bg-black overflow-hidden pt-32 pb-16">
      {/* Background Layers */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
      <div 
        className="absolute inset-0 z-0 opacity-60 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(to bottom, transparent 0, transparent 2px, rgba(0,0,0,1) 2px, rgba(0,0,0,1) 4px)'
        }}
      />
      
      {/* Watermark SVG representation */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03]">
        <svg viewBox="0 0 100 100" className="w-[60vh] h-[60vh] fill-white">
          <polygon points="50,10 90,90 10,90" />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <pre className="font-mono text-xs text-[#4A4A4A] mb-8 min-h-[4.5rem]">
          {typedText}
          {!isTypingComplete && <span className="animate-pulse">_</span>}
        </pre>
        
        {isTypingComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-orbitron text-4xl md:text-6xl font-bold text-white mb-4">
              THE MAGADH STRIKER STORY
            </h1>
            <p className="font-rajdhani text-xl text-[#999] max-w-2xl tracking-wide">
              "Born from passion. Built for greatness. Fighting for Indian esports."
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
