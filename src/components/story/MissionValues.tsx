import React from 'react';

export function MissionValues() {
  return (
    <section className="py-24 bg-ms-true-black border-t border-ms-border-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32 max-w-4xl mx-auto">
          
          <div className="font-ascii text-ms-white-60 text-xs tracking-widest leading-relaxed">
            ╔═════════════════════════════╗<br/>
            ║ 01. EXCELLENCE              ║<br/>
            ║ Win at every level. Always. ║<br/>
            ╚═════════════════════════════╝
          </div>

          <div className="font-ascii text-ms-white-60 text-xs tracking-widest leading-relaxed md:text-right">
            ╔═════════════════════════════╗<br/>
            ║ 02. COMMUNITY               ║<br/>
            ║ Give back to Indian gaming. ║<br/>
            ╚═════════════════════════════╝
          </div>

          <div className="font-ascii text-ms-white-60 text-xs tracking-widest leading-relaxed">
            ╔═════════════════════════════╗<br/>
            ║ 03. INTEGRITY               ║<br/>
            ║ Fair play, clean always.    ║<br/>
            ╚═════════════════════════════╝
          </div>

          <div className="font-ascii text-ms-white-60 text-xs tracking-widest leading-relaxed md:text-right">
            ╔═════════════════════════════╗<br/>
            ║ 04. GROWTH                  ║<br/>
            ║ Careers, not just players.  ║<br/>
            ╚═════════════════════════════╝
          </div>

        </div>

        {/* Manifesto */}
        <div className="text-center max-w-4xl mx-auto relative z-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-ms-blue opacity-[0.03] blur-[100px] rounded-full z-0"></div>
          
          <h2 className="relative z-10 font-orbitron font-bold text-2xl md:text-4xl text-ms-white leading-relaxed tracking-wider uppercase text-balance">
            MAGADH STRIKER REPRESENTS EVERY INDIAN GAMER WHO WAS TOLD THIS ISN'T A REAL CAREER.
            <br/><br/>
            WE ARE PROVING THEM <span className="text-ms-blue">[WRONG]</span>.
          </h2>
        </div>

      </div>
    </section>
  );
}
