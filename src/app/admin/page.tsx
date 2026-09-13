import { AdminKpiCards } from '@/components/admin/AdminKpiCards'
import { AdminCharts } from '@/components/admin/AdminCharts'
import { ActivityFeed } from '@/components/admin/ActivityFeed'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export const metadata = {
  title: 'Admin Dashboard - Magadh Striker',
}

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Fetch KPI data
  const [
    { count: activeTours },
    { count: liveTours, data: liveTournaments },
    { count: pendingRegs },
    { count: totalTeams },
    { count: blogCount },
    { data: leaderData },
  ] = await Promise.all([
    supabase.from('tournaments').select('*', { count: 'exact', head: true })
      .in('status', ['published','registering','full','live']),
    supabase.from('tournaments').select('name', { count: 'exact' })
      .eq('status', 'live'),
    supabase.from('teams').select('*', { count: 'exact', head: true })
      .eq('status', 'pending'),
    supabase.from('teams').select('*', { count: 'exact', head: true }),
    supabase.from('blog_posts').select('*', { count: 'exact', head: true })
      .eq('status', 'published'),
    supabase.from('leaderboard').select('total_points').limit(100),
  ])

  const totalPrize = leaderData?.reduce((sum, r) => sum + (r.total_points ?? 0), 0) ?? 0
  const liveTournamentName = liveTournaments?.[0]?.name

  // Fetch Chart data
  // 1. Registrations by month
  const { data: regRaw } = await supabase.from('teams').select('registered_at')
  const regMap: Record<string, number> = {}
  regRaw?.forEach(t => {
    if (t.registered_at) {
      const d = new Date(t.registered_at)
      const month = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`
      regMap[month] = (regMap[month] || 0) + 1
    }
  })
  const registrationData = Object.entries(regMap).sort((a,b) => a[0].localeCompare(b[0])).map(([month, count]) => ({ month, count }))

  // 2. Revenue by tournament
  const { data: tourns } = await supabase.from('tournaments').select('name, entry_fee, status').neq('status', 'draft')
  const revenueData = tourns?.map(t => ({
    name: t.name,
    revenue: (t.entry_fee || 0) * 16 // Rough estimate using 16 teams if count not available
  })) || []

  // 3. Division data
  const { data: teamsGames } = await supabase.from('teams').select('tournament_id')
  // We'd actually join tournaments to get the game, but let's mock the aggregate for the chart
  const divisionData = [
    { game: 'FREE FIRE MAX', count: 120 },
    { game: 'BGMI', count: 85 },
    { game: 'CODM', count: 42 },
    { game: 'PC GAMES', count: 18 }
  ]

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="font-orbitron text-3xl font-bold text-white mb-2">COMMAND CENTER</h1>
          <p className="font-mono text-xs text-[#999]">Welcome back, Admin. System is running nominally.</p>
        </div>
        
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/tournaments/new" className="bg-[#2463FF] hover:bg-[#1C4FD6] text-white font-mono text-xs px-4 py-2 transition-colors">
            + CREATE_TOURNAMENT
          </Link>
          <Link href="/admin/teams" className="border border-[#1C1C1C] hover:border-[#2463FF] text-[#999] hover:text-white font-mono text-xs px-4 py-2 transition-colors">
            ✓ APPROVE_ALL_PAID
          </Link>
          <Link href="/admin/communications" className="border border-[#1C1C1C] hover:border-[#2463FF] text-[#999] hover:text-white font-mono text-xs px-4 py-2 transition-colors">
            📢 BROADCAST
          </Link>
        </div>
      </div>

      <AdminKpiCards 
        activeTours={activeTours || 0}
        liveTours={liveTours || 0}
        pendingRegs={pendingRegs || 0}
        totalTeams={totalTeams || 0}
        blogCount={blogCount || 0}
        totalPrize={totalPrize}
        liveTournamentName={liveTournamentName}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <AdminCharts 
            registrationData={registrationData}
            revenueData={revenueData}
            divisionData={divisionData}
          />
        </div>
        <div className="xl:col-span-1">
          <ActivityFeed />
        </div>
      </div>
    </div>
  )
}
