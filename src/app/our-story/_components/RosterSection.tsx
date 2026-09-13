import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'

export async function RosterSection() {
  const supabase = await createClient()
  
  const { data: roster, error } = await supabase
    .from('roster')
    .select('*')
    .eq('status', 'active')
    .order('game_division')

  // Group by division
  const grouped = roster?.reduce((acc, player) => {
    const div = player.game_division
    if (!acc[div]) acc[div] = []
    acc[div].push(player)
    return acc
  }, {} as Record<string, typeof roster>) || {}

  if (error) {
    return null
  }

  return (
    <section className="bg-black py-24 border-t border-[#111]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="font-mono text-xs text-[#4A4A4A] mb-4">
          // MS_ROSTER
        </div>
        <h2 className="font-orbitron text-3xl md:text-5xl font-bold text-white mb-16 uppercase">
          THE SQUAD
        </h2>

        {Object.entries(grouped).map(([division, players]) => (
          <div key={division} className="mb-16 last:mb-0">
            <h3 className="font-mono text-xl text-[#2463FF] mb-8 border-b border-[#1C1C1C] pb-2 inline-block">
              [{division}]
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {players.map((player) => (
                <div key={player.id} className="group cursor-pointer">
                  <div className="bg-[#0A0A0A] border border-[#1C1C1C] aspect-[3/4] relative overflow-hidden mb-4 group-hover:border-[#2463FF] transition-colors">
                    {player.photo_url ? (
                      <Image 
                        src={player.photo_url} 
                        alt={player.ign}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-[#4A4A4A]">
                        NO_PHOTO
                      </div>
                    )}
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="font-mono text-[10px] text-[#2463FF] mb-1">
                        {player.role.toUpperCase()}
                      </div>
                      <div className="font-orbitron text-xl font-bold text-white">
                        {player.ign}
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-1">
                    <div className="font-inter text-sm text-[#E8E8E8]">
                      {player.full_name}
                    </div>
                    {player.social_links && (player.social_links as any).instagram && (
                      <a 
                        href={(player.social_links as any).instagram} 
                        target="_blank" 
                        rel="noreferrer"
                        className="font-mono text-xs text-[#999] hover:text-[#2463FF] transition-colors"
                      >
                        @insta
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
