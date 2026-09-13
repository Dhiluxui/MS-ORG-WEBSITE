import React from 'react';

type TypographyProps = {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'mono' | 'ascii';
  className?: string;
  as?: React.ElementType;
};

export function Typography({
  children,
  variant = 'body',
  className = '',
  as,
}: TypographyProps) {
  const Component = as || (
    variant === 'h1' ? 'h1' :
    variant === 'h2' ? 'h2' :
    variant === 'h3' ? 'h3' :
    variant === 'h4' ? 'h4' :
    variant === 'mono' ? 'span' :
    variant === 'ascii' ? 'pre' : 'p'
  );

  const baseStyles = {
    h1: 'font-orbitron font-bold uppercase tracking-wide text-5xl md:text-7xl lg:text-9xl text-balance',
    h2: 'font-orbitron font-bold uppercase tracking-wide text-4xl md:text-5xl',
    h3: 'font-rajdhani font-semibold uppercase tracking-[3px] text-2xl md:text-3xl',
    h4: 'font-rajdhani font-semibold uppercase tracking-[2px] text-xl',
    body: 'font-inter text-ms-white-90 text-base md:text-lg',
    mono: 'font-mono font-medium tabular-nums text-ms-white',
    ascii: 'font-ascii text-ms-white-60 leading-tight whitespace-pre'
  };

  return (
    <Component className={`${baseStyles[variant]} ${className}`}>
      {children}
    </Component>
  );
}
