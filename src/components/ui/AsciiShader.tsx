'use client';

import React, { useEffect, useRef } from 'react';

interface AsciiShaderProps {
  imageSrc: string;
  className?: string;
  charSize?: number;
}

export function AsciiShader({ imageSrc, className = '', charSize = 12 }: AsciiShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const img = new Image();
    img.src = imageSrc;
    img.crossOrigin = 'anonymous';

    let animationFrameId: number;

    img.onload = () => {
      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return;

      // Density string matching the user's reference image style (math/tech symbols)
      const density = '    .:/=+*2e#%';
      let lastTime = 0;
      
      const render = (time: number) => {
        // Throttle to approx 24fps for a cinematic, retro hardware feel
        if (time - lastTime < 41) {
          animationFrameId = requestAnimationFrame(render);
          return;
        }
        lastTime = time;

        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        if (width === 0 || height === 0) {
          animationFrameId = requestAnimationFrame(render);
          return;
        }

        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }

        const cols = Math.floor(width / charSize);
        const rows = Math.floor(height / charSize);

        if (cols === 0 || rows === 0) {
          animationFrameId = requestAnimationFrame(render);
          return;
        }

        offscreen.width = cols;
        offscreen.height = rows;

        // Draw image scaled down for pixel sampling
        offCtx.drawImage(img, 0, 0, cols, rows);
        const imgData = offCtx.getImageData(0, 0, cols, rows);
        const pixels = imgData.data;

        // Clear main canvas for transparency, allowing bg image to show underneath
        ctx.clearRect(0, 0, width, height);
        
        ctx.font = `bold ${charSize}px monospace`;
        ctx.textBaseline = 'top';

        const t = time * 0.002;

        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const i = (y * cols + x) * 4;
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            
            // Calculate luminance
            let brightness = (r * 0.299 + g * 0.587 + b * 0.114);
            
            // Only render ASCII on mid-to-bright parts of the image (the 5 characters)
            if (brightness > 40) {
              // Add dynamic noise based on coordinates and time to animate the characters
              const noise = Math.sin(x * 0.2 + t) * Math.cos(y * 0.2 + t) * 50;
              const animatedBrightness = Math.max(0, Math.min(255, brightness + noise));
              
              const charIndex = Math.floor((animatedBrightness / 255) * (density.length - 1));
              const char = density[charIndex];

              if (char !== ' ') {
                // Colorize the ASCII characters with the underlying pixel color, boosted slightly
                ctx.fillStyle = `rgba(${Math.min(255, r + 50)}, ${Math.min(255, g + 50)}, ${Math.min(255, b + 50)}, ${animatedBrightness / 255})`;
                ctx.fillText(char, x * charSize, y * charSize);
              }
            }
          }
        }
        
        animationFrameId = requestAnimationFrame(render);
      };
      
      animationFrameId = requestAnimationFrame(render);
    };

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [imageSrc, charSize]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`w-full h-full block pointer-events-none select-none ${className}`} 
    />
  );
}
