"use client";

import React, { useEffect, useState } from 'react';

export function GlitchText({ text, className = '' }: { text: string, className?: string }) {
  const [glitchText, setGlitchText] = useState(text);
  const chars = '@#|/\\*&%';

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const triggerGlitch = () => {
      // Create glitch string
      const textArray = text.split('');
      const numGlitches = Math.floor(Math.random() * 3) + 1; // 1 to 3 characters
      
      for(let i=0; i<numGlitches; i++) {
        const randIndex = Math.floor(Math.random() * text.length);
        if (textArray[randIndex] !== ' ') {
          textArray[randIndex] = chars[Math.floor(Math.random() * chars.length)];
        }
      }
      
      setGlitchText(textArray.join(''));
      
      // Reset after 80ms
      setTimeout(() => {
        setGlitchText(text);
      }, 80);

      // Schedule next glitch
      timeout = setTimeout(triggerGlitch, 4000 + (Math.random() * 2000 - 1000));
    };

    timeout = setTimeout(triggerGlitch, Math.random() * 4000);

    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <span className={className}>
      {glitchText}
    </span>
  );
}
