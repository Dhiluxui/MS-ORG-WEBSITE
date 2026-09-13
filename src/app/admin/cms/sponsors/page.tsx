import { createClient } from '@/lib/supabase/server'
import { Edit, Trash2 } from 'lucide-react'

export const metadata = {
  title: 'Sponsors CMS - Admin',
}

export default async function AdminSponsorsCMSPage() {
  const supabase = await createClient()

  const { data: sponsors } = await supabase
    .from('sponsors')
    .select('*')
    .order('display_order', { ascending: true })

  const titleSponsors = sponsors?.filter(s => s.tier === 'title') || []
  const goldSponsors = sponsors?.filter(s => s.tier === 'gold') || []
  const bronzeSponsors = sponsors?.filter(s => s.tier === 'bronze') || []

  const renderSponsorGroup = (title: string, items: any[]) => (
    <div className="mb-8">
      <div className="font-mono text-xs text-[#4A4A4A] mb-4 border-b border-[#111] pb-2 uppercase">
        &gt; {title}_TIER ({items.length})
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map(s => {
          const isExpired = new Date(s.contract_end) < new Date()
          return (
            <div key={s.id} className="bg-[#0A0A0A] border border-[#111] p-4 relative group hover:border-[#2463FF] transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className={`font-mono text-[10px] px-2 py-0.5 border ${s.active ? 'border-green-400 text-green-400' : 'border-[#4A4A4A] text-[#999]'}`}>
                  {s.active ? 'ACTIVE' : 'INACTIVE'}
                </span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-[#999] hover:text-[#2463FF] transition-colors"><Edit className="w-4 h-4" /></button>
                  <button className="text-[#999] hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              
              <div className="aspect-video bg-[#070C1A] border border-[#111] mb-4 flex items-center justify-center relative overflow-hidden">
                {isExpired && (
                  <div className="absolute inset-0 bg-black/60 z-10 flex flex-col items-center justify-center">
                    <span className="font-mono text-[10px] text-red-500 font-bold bg-black px-2 py-1 border border-red-500 mb-1">
                      CONTRACT_EXPIRED
                    </span>
                  </div>
                )}
                {s.logo_url ? (
                  <img src={s.logo_url} alt={s.name} className={`w-full h-full object-contain p-4 ${isExpired ? 'grayscale opacity-30' : ''}`} />
                ) : (
                  <span className="font-mono text-[10px] text-[#4A4A4A]">NO_LOGO</span>
                )}
              </div>
              
              <div className="font-orbitron text-lg text-white truncate">{s.name}</div>
              <div className="font-mono text-[10px] text-[#999] truncate mb-2">{s.website_url || 'NO_URL'}</div>
              <div className="font-mono text-[9px] text-[#4A4A4A]">
                END: {new Date(s.contract_end).toLocaleDateString()}
              </div>
            </div>
          )
        })}
        {items.length === 0 && (
          <div className="col-span-full py-8 text-center font-mono text-xs text-[#4A4A4A] border border-dashed border-[#111]">
            &gt; NO_SPONSORS_IN_TIER
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-orbitron text-3xl font-bold text-white mb-2">SPONSORS & PARTNERS</h1>
          <p className="font-mono text-xs text-[#999]">Manage partner tiers and contracts.</p>
        </div>
        
        <button className="bg-[#2463FF] hover:bg-[#1C4FD6] text-white font-mono text-xs px-4 py-2 transition-colors whitespace-nowrap">
          + ADD_SPONSOR
        </button>
      </div>

      <div className="bg-[#070C1A] border border-[#111] p-6">
        {renderSponsorGroup('TITLE', titleSponsors)}
        {renderSponsorGroup('GOLD', goldSponsors)}
        {renderSponsorGroup('BRONZE', bronzeSponsors)}
      </div>
    </div>
  )
}
