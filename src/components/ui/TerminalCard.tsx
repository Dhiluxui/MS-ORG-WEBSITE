import React from 'react';

type TerminalCardProps = {
  children: React.ReactNode;
  header?: string;
  className?: string;
  hoverEffect?: boolean;
  borderStyle?: 'solid' | 'dashed' | 'dotted';
};

export function TerminalCard({
  children,
  header,
  className = '',
  hoverEffect = true,
  borderStyle = 'solid'
}: TerminalCardProps) {
  const borderClasses = {
    solid: 'border-ms-elevated',
    dashed: 'border-ms-white-30 border-dashed',
    dotted: 'border-ms-blue border-dotted'
  };

  const hoverClasses = hoverEffect 
    ? 'hover:border-ms-blue hover:shadow-[0_0_16px_rgba(36,99,255,0.15)] transition-all duration-300' 
    : '';

  return (
    <div className={`bg-ms-panel-black border ${borderClasses[borderStyle]} ${hoverClasses} flex flex-col ${className}`}>
      {header && (
        <div className="border-b border-ms-elevated px-4 py-2 bg-ms-true-black">
          <p className="font-ascii text-ms-white-60 text-xs tracking-widest uppercase">
            &gt; {header}
          </p>
        </div>
      )}
      <div className="p-4 flex-grow">
        {children}
      </div>
    </div>
  );
}
