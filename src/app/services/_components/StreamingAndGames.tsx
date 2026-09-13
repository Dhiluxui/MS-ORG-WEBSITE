export function StreamingAndGames() {
  const DIVISIONS = [
    { name: 'FREE FIRE MAX', active: true },
    { name: 'BGMI', active: true },
    { name: 'CODM', active: true },
    { name: 'WILD RIFT', active: false },
    { name: 'COC', active: false },
    { name: 'LEGEND RC', active: true },
  ]

  return (
    <section className="bg-black py-16 border-t border-[#111]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Active Divisions */}
          <div>
            <div className="font-mono text-xs text-[#4A4A4A] mb-6">
              &gt; ACTIVE_DIVISIONS
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {DIVISIONS.map((div) => (
                <div 
                  key={div.name}
                  className={`p-4 border flex flex-col items-center justify-center text-center ${
                    div.active 
                      ? 'border-[#22C55E]/30 bg-[#22C55E]/5' 
                      : 'border-[#1C1C1C] border-dashed bg-[#0A0A0A]'
                  }`}
                >
                  <span className="font-mono text-sm mb-2 text-white">
                    {div.name}
                  </span>
                  {div.active ? (
                    <span className="font-mono text-[10px] text-[#22C55E] bg-[#22C55E]/20 px-2 py-0.5 rounded">
                      ACTIVE
                    </span>
                  ) : (
                    <span className="font-mono text-[10px] text-[#4A4A4A] border border-[#1C1C1C] px-2 py-0.5 rounded">
                      EXPANDING
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Stream Platforms */}
          <div>
            <div className="font-mono text-xs text-[#4A4A4A] mb-6">
              &gt; STREAM_PLATFORMS
            </div>
            <div className="font-mono text-xs text-[#E8E8E8] bg-[#0A0A0A] p-6 border border-[#1C1C1C] overflow-x-auto whitespace-pre">
{`┌─────────────┬────────────┬──────────────┐
│ PLATFORM    │ REV SHARE  │ INTEGRATION  │
├─────────────┼────────────┼──────────────┤
│ YouTube     │ 70%        │ ✓ ACTIVE     │
│ Kick        │ 95%        │ ✓ ACTIVE     │
└─────────────┴────────────┴──────────────┘`}
            </div>
            <p className="font-inter text-sm text-[#999] mt-4">
              Kick integration delivers 95% revenue to creators. Streams embed directly on tournament pages.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
