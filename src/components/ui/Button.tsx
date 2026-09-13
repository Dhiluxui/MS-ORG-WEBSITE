import React from 'react';
import Link from 'next/link';

type BaseProps = {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
};

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-orbitron font-bold uppercase tracking-wider transition-all duration-200 focus:outline-none';
  
  const variants = {
    primary: 'bg-ms-blue text-ms-white hover:bg-opacity-90 hover:shadow-[0_0_16px_rgba(36,99,255,0.4)]',
    secondary: 'bg-ms-white text-ms-true-black hover:bg-ms-white-90',
    outline: 'border border-ms-white text-ms-white hover:border-ms-blue hover:text-ms-blue hover:shadow-[0_0_16px_rgba(36,99,255,0.2)]',
    ghost: 'text-ms-white-60 hover:text-ms-white bg-transparent hover:bg-ms-white-10'
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`;

  if ('href' in props && props.href) {
    const { href, ...linkProps } = props;
    return (
      <Link
        href={href}
        className={combinedClassName}
        {...(linkProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={combinedClassName}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
