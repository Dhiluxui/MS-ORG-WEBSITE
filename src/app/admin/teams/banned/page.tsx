import { createClient } from '@/lib/supabase/server'
import { ShieldCheck } from 'lucide-react'

export const metadata = {
  title: 'Banned Players - Admin',
}

export default async function AdminBannedPlayersPage() {
  const supabase = await createClient()

  // For banned players, we look for players with banned_ign = true
  const { data: bannedPlayers } = await supabase
    .from('players')
    .select('*')
    .eq('banned_ign', true)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="mb-8">
        <h1 className="font-orbitron text-3xl font-bold text-red-500 mb-2">BANNED REGISTRY</h1>
        <p className="font-mono text-xs text-[#999]">Players and IGNs permanently restricted from registering in MS tournaments.</p>
      </div>

      <div className="bg-[#070C1A] border border-[#111]">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs text-white">
            <thead className="bg-[#0A0A0A] text-[#4A4A4A] border-b border-[#111]">
              <tr>
                <th className="px-4 py-3 font-normal">BANNED IGN</th>
                <th className="px-4 py-3 font-normal">REAL NAME</th>
                <th className="px-4 py-3 font-normal">TEAM AT TIME OF BAN</th>
                <th className="px-4 py-3 font-normal text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {bannedPlayers?.map(p => (
                <tr key={p.id} className="border-b border-[#111] hover:bg-[#0A0A0A] transition-colors">
                  <td className="px-4 py-3 font-bold text-red-500">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                      {p.ign}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#999]">{p.real_name || 'N/A'}</td>
                  <td className="px-4 py-3 text-[#4A4A4A]">UNKNOWN</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end">
                      <button className="text-[#999] hover:text-green-400 transition-colors" title="Revoke Ban">
                        <ShieldCheck className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {(!bannedPlayers || bannedPlayers.length === 0) && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-[#4A4A4A]">
                    &gt; NO_BANNED_PLAYERS_FOUND
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
