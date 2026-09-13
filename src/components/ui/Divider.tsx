import React from 'react';

export function Divider({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full flex items-center justify-center py-8 opacity-60 ${className}`}>
      <span className="font-ascii text-ms-white-60 tracking-widest text-sm whitespace-nowrap">
        ─────────────── ◆ ───────────────
      </span>
    </div>
  );
}

export function SectionDivider() {
  return <hr className="border-ms-border-dark my-12" />;
}
