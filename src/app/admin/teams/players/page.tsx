import { createClient } from '@/lib/supabase/server'
import { Search, ShieldBan } from 'lucide-react'

export const metadata = {
  title: 'Player Registry - Admin',
}

export default async function AdminPlayersPage() {
  const supabase = await createClient()

  // For players, we'd normally fetch all players joined through the teams.
  // Since players are stored in 'players' table linked to 'teams' table,
  const { data: players } = await supabase
    .from('players')
    .select('*, teams(name, tournament_id)')
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="mb-8">
        <h1 className="font-orbitron text-3xl font-bold text-white mb-2">PLAYER REGISTRY</h1>
        <p className="font-mono text-xs text-[#999]">Search and manage individual player registrations across all teams.</p>
      </div>

      <div className="bg-[#070C1A] border border-[#111]">
        <div className="p-4 border-b border-[#111] flex gap-4">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-[#4A4A4A] absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search by IGN, Real Name, or Phone..."
              className="w-full bg-[#0A0A0A] border border-[#1C1C1C] focus:border-[#2463FF] text-white pl-10 pr-3 py-2 font-mono text-xs outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs text-white">
            <thead className="bg-[#0A0A0A] text-[#4A4A4A] border-b border-[#111]">
              <tr>
                <th className="px-4 py-3 font-normal">IGN</th>
                <th className="px-4 py-3 font-normal">REAL NAME</th>
                <th className="px-4 py-3 font-normal">TEAM</th>
                <th className="px-4 py-3 font-normal">ROLE</th>
                <th className="px-4 py-3 font-normal">ID IMAGE</th>
                <th className="px-4 py-3 font-normal text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {players?.map(p => (
                <tr key={p.id} className="border-b border-[#111] hover:bg-[#0A0A0A] transition-colors">
                  <td className="px-4 py-3 font-bold text-[#2463FF]">{p.ign}</td>
                  <td className="px-4 py-3 text-[#999]">{p.real_name || 'N/A'}</td>
                  <td className="px-4 py-3 text-white">{p.teams?.name || 'Unknown'}</td>
                  <td className="px-4 py-3 text-[#999]">{p.role?.toUpperCase() || 'PLAYER'}</td>
                  <td className="px-4 py-3">
                    {p.id_image_url ? (
                      <a href={p.id_image_url} target="_blank" rel="noreferrer" className="text-[#2463FF] hover:underline">
                        [VIEW]
                      </a>
                    ) : (
                      <span className="text-[#4A4A4A]">NONE</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-[#999] hover:text-red-400 transition-colors" title="Ban Player">
                        <ShieldBan className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {(!players || players.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-[#4A4A4A]">
                    &gt; NO_PLAYERS_FOUND
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
