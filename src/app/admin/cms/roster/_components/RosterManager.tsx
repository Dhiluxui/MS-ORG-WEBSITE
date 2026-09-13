'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Edit, Trash2 } from 'lucide-react'

export function RosterManager({ initialRoster }: { initialRoster: any[] }) {
  const [roster, setRoster] = useState(initialRoster)
  const [filter, setFilter] = useState('ALL')
  const supabase = createClient()

  const filtered = roster.filter(r => {
    if (filter === 'ALL') return true
    if (filter === 'MANAGEMENT') return r.type === 'management'
    if (filter === 'CONTENT') return r.type === 'content'
    return r.game?.toUpperCase() === filter
  })

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this roster member?')) {
      await supabase.from('roster').delete().eq('id', id)
      setRoster(roster.filter(r => r.id !== id))
    }
  }

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['ALL', 'FREE FIRE MAX', 'BGMI', 'CODM', 'MANAGEMENT', 'CONTENT'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`font-mono text-xs px-4 py-2 border transition-colors ${
              filter === f 
                ? 'border-[#2463FF] text-[#2463FF] bg-[#2463FF]/10' 
                : 'border-[#1C1C1C] text-[#999] hover:border-[#4A4A4A]'
            }`}
          >
            {f}
          </button>
        ))}
        <button className="ml-auto bg-[#2463FF] hover:bg-[#1C4FD6] text-white font-mono text-xs px-4 py-2 transition-colors">
          + ADD_MEMBER
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map(member => (
          <div key={member.id} className="bg-[#0A0A0A] border border-[#111] hover:border-[#2463FF] transition-all group">
            <div className="aspect-square bg-[#111] relative border-b border-[#111]">
              {member.image ? (
                <img src={member.image} alt={member.ign} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-[#4A4A4A]">NO_IMAGE</div>
              )}
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-black/80 p-2 hover:text-[#2463FF] transition-colors"><Edit className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(member.id)} className="bg-black/80 p-2 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-orbitron text-lg text-white">{member.ign}</div>
                  <div className="font-mono text-[10px] text-[#999]">{member.real_name}</div>
                </div>
                <div className={`font-mono text-[9px] px-2 py-0.5 border ${member.status === 'active' ? 'border-green-400 text-green-400' : 'border-[#4A4A4A] text-[#4A4A4A]'}`}>
                  {member.status?.toUpperCase() || 'UNKNOWN'}
                </div>
              </div>
              
              <div className="font-mono text-[10px] text-[#4A4A4A] mb-1">
                &gt; ROLE :: {member.role?.toUpperCase()}
              </div>
              <div className="font-mono text-[10px] text-[#4A4A4A]">
                &gt; GAME :: {member.game?.toUpperCase() || 'N/A'}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-12 text-center font-mono text-xs text-[#4A4A4A]">
            &gt; NO_MEMBERS_IN_CATEGORY
          </div>
        )}
      </div>
    </div>
  )
}
