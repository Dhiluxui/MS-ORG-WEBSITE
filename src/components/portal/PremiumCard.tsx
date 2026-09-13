import React from 'react';

interface PremiumCardProps {
  children: React.ReactNode;
  header?: string;
  className?: string;
  glowColor?: 'blue' | 'green' | 'yellow' | 'red';
  noPadding?: boolean;
}

export function PremiumCard({
  children,
  header,
  className = '',
  glowColor,
  noPadding = false
}: PremiumCardProps) {
  
  const glowClasses = {
    blue: 'shadow-[0_0_30px_rgba(36,99,255,0.05)] border-ms-blue/30',
    green: 'shadow-[0_0_30px_rgba(36,99,255,0.05)] border-ms-blue/30',
    yellow: 'shadow-[0_0_30px_rgba(255,255,255,0.05)] border-ms-white-30',
    red: 'shadow-[0_0_30px_rgba(36,99,255,0.05)] border-ms-blue/30',
  };

  return (
    <div className={`
      relative glass-panel overflow-hidden
      ${glowColor ? glowClasses[glowColor] : ''}
      ${className}
    `}>
      {/* Subtle Top Inner Gradient for 3D effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      {header && (
        <div className="px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <h3 className="font-orbitron font-bold text-ms-white tracking-widest text-sm uppercase">
            {header}
          </h3>
        </div>
      )}
      
      <div className={`${noPadding ? '' : 'p-6'} relative z-10`}>
        {children}
      </div>
    </div>
  );
}
