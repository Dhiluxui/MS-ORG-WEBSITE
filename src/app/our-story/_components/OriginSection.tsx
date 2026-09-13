import { GlitchText } from '@/components/ui/GlitchText'

export function OriginSection() {
  return (
    <section className="bg-black py-24 border-t border-[#111]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div className="w-full lg:w-[90%]">
            <div className="font-mono text-xs text-[#4A4A4A] mb-4">
              // ABOUT_ORIGIN
            </div>
            <h2 className="font-orbitron text-3xl md:text-5xl font-bold text-white leading-tight">
              "WE DIDN'T JUST<br />
              BUILD A TEAM.<br />
              WE BUILT A <GlitchText text="MOVEMENT." className="text-[#2463FF]" />"
            </h2>
          </div>

          {/* RIGHT */}
          <div>
            <div className="font-inter text-[#E8E8E8] leading-relaxed space-y-6">
              <p>
                Magadh Striker was born in Bihar — India's heartland — out of a simple
                belief: world-class esports talent exists everywhere, not just in metro
                cities. We started with one game, one squad, and zero resources.
                What we had was something bigger: the hunger to prove Indian gaming
                belongs on the world stage.
              </p>
              <p>
                Today, MS Esports is a multi-game organization competing nationally,
                hosting its own tournaments, and building a pipeline from grassroots
                players to professional athletes. This is only the beginning.
              </p>
            </div>

            <div className="mt-8 aspect-video bg-[#0A0A0A] border border-[#1C1C1C] flex items-center justify-center">
              <span className="font-mono text-xs text-[#4A4A4A]">
                &gt; TEAM_PHOTO :: UPLOAD_PENDING
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
