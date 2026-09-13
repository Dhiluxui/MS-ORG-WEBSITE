import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Eye, ShieldBan } from 'lucide-react'

export const metadata = {
  title: 'Teams Management - Admin',
}

export default async function AdminTeamsPage() {
  const supabase = await createClient()

  const { data: teams } = await supabase
    .from('teams')
    .select('*, tournaments(name, game)')
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-orbitron text-3xl font-bold text-white mb-2">ALL TEAMS</h1>
          <p className="font-mono text-xs text-[#999]">Manage all team registrations across all tournaments.</p>
        </div>
      </div>

      <div className="bg-[#070C1A] border border-[#111]">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs text-white">
            <thead className="bg-[#0A0A0A] text-[#4A4A4A] border-b border-[#111]">
              <tr>
                <th className="px-4 py-3 font-normal">TEAM NAME</th>
                <th className="px-4 py-3 font-normal">CAPTAIN</th>
                <th className="px-4 py-3 font-normal">TOURNAMENT</th>
                <th className="px-4 py-3 font-normal">GAME</th>
                <th className="px-4 py-3 font-normal">STATUS</th>
                <th className="px-4 py-3 font-normal text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {teams?.map(t => (
                <tr key={t.id} className="border-b border-[#111] hover:bg-[#0A0A0A] transition-colors">
                  <td className="px-4 py-3 font-bold text-white">{t.name}</td>
                  <td className="px-4 py-3 text-[#999]">{t.captain_name || 'N/A'}</td>
                  <td className="px-4 py-3 text-[#999] truncate max-w-[200px]">
                    {t.tournaments ? t.tournaments.name : 'Unknown'}
                  </td>
                  <td className="px-4 py-3 text-[#999]">
                    {t.tournaments ? t.tournaments.game : 'Unknown'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 border rounded-full text-[10px] ${
                      t.status === 'approved' ? 'border-[#2463FF] text-[#2463FF]' :
                      t.status === 'rejected' ? 'border-red-400 text-red-400' :
                      'border-yellow-400 text-yellow-400'
                    }`}>
                      {t.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/admin/tournaments/${t.tournament_id}/manage`} className="text-[#999] hover:text-[#2463FF] transition-colors" title="View in Tournament">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button className="text-[#999] hover:text-red-400 transition-colors" title="Ban Team">
                        <ShieldBan className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {(!teams || teams.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-[#4A4A4A]">
                    &gt; NO_TEAMS_FOUND
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
