"use client";

import React, { useEffect, useRef, useState } from 'react';

const STATS = [
  { value: 500, label: 'PLAYERS SCOUTED', prefix: '', suffix: '+' },
  { value: 50, label: 'TOURNEYS PLAYED', prefix: '', suffix: '+' },
  { value: 10, label: 'PRIZE WON (LAKHS)', prefix: '₹', suffix: 'L+' },
  { value: 4, label: 'ACTIVE DIVISIONS', prefix: '', suffix: '' },
  { value: 10, label: 'EVENTS HOSTED', prefix: '', suffix: '+' },
];

export function StatsTicker() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-ms-panel-black border-y border-ms-elevated py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap md:flex-nowrap justify-between gap-4 md:gap-0">
          {STATS.map((stat, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center flex-1 min-w-[120px]">
                <div className="font-ascii text-ms-white-30 text-xs mb-2">┌─────────┐</div>
                <div className="flex flex-col items-center px-4">
                  <span className="font-mono text-ms-white text-4xl md:text-5xl font-medium tracking-tight">
                    {stat.prefix}{inView ? stat.value : 0}{stat.suffix}
                  </span>
                  <span className="font-rajdhani text-ms-white-60 text-xs md:text-sm uppercase tracking-widest mt-1 text-center">
                    {stat.label}
                  </span>
                </div>
                <div className="font-ascii text-ms-white-30 text-xs mt-2">└─────────┘</div>
              </div>
              {i < STATS.length - 1 && (
                <div className="hidden md:block w-px bg-ms-elevated"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
