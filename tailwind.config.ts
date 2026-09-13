import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'ms-true-black': '#09090b', // zinc-950
        'ms-deep-black': '#050505',
        'ms-panel-black': '#18181b', // zinc-900
        'ms-border-dark': '#27272a', // zinc-800
        'ms-surface': '#27272a',     
        'ms-elevated': '#3f3f46',    // zinc-700
        'ms-white': '#FFFFFF',
        'ms-white-90': '#f4f4f5',    // zinc-100
        'ms-white-60': '#a1a1aa',    // zinc-400
        'ms-white-30': '#52525b',    // zinc-600
        'ms-white-10': '#3f3f46',    // zinc-700
        'ms-blue': '#3b82f6',        // softer blue
        'ms-blue-glow': 'rgba(59, 130, 246, 0.2)',
        'ms-blue-dim': 'rgba(59, 130, 246, 0.08)',
        'st-green': '#3b82f6',       // remapped to blue
        'st-yellow': '#FFFFFF',      // remapped to white
        'st-red': '#3b82f6',         // remapped to blue
        'st-orange': '#3b82f6',      // remapped to blue
        'st-gold': '#FFFFFF',        // remapped to white
      },
      fontFamily: {
        orbitron: ['var(--font-orbitron)', 'sans-serif'],
        rajdhani: ['var(--font-rajdhani)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
        ascii: ['Courier New', 'monospace'],
      }
    },
  },
  plugins: [],
};
export default config;
