export function ValuesSection() {
  const VALUES = [
    {
      title: 'MERIT OVER METRICS',
      desc: 'We don\'t care how many followers you have. If you can frag, you belong here.'
    },
    {
      title: 'DISCIPLINE IS DOMINANCE',
      desc: 'Talent wins games. Teamwork, schedules, and unyielding discipline win championships.'
    },
    {
      title: 'GRASSROOTS FIRST',
      desc: 'We build from the ground up. We host local LANs before fighting in global arenas.'
    }
  ]

  return (
    <section className="bg-black py-24 border-t border-[#111]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-16">
          {/* Left - Heading */}
          <div className="w-full md:w-1/3">
            <div className="font-mono text-xs text-[#4A4A4A] mb-4">
              // CORE_VALUES
            </div>
            <h2 className="font-orbitron text-3xl md:text-5xl font-bold text-white uppercase">
              THE<br />
              MAGADH<br />
              CODE
            </h2>
          </div>

          {/* Right - Values */}
          <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {VALUES.map((val, idx) => (
              <div key={idx} className="bg-[#050505] border border-[#1C1C1C] p-8">
                <div className="font-mono text-4xl font-bold text-[#1C1C1C] mb-4">
                  0{idx + 1}
                </div>
                <h3 className="font-rajdhani text-xl font-bold text-white mb-3 tracking-wide uppercase">
                  {val.title}
                </h3>
                <p className="font-inter text-sm text-[#999] leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
