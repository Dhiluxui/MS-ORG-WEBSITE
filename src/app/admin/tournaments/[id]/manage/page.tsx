import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { TournamentManageTabs } from './_components/TournamentManageTabs'

export const metadata = {
  title: 'Tournament Hub - Admin Portal',
}

export default async function TournamentManagePage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  // Fetch tournament + phase data
  const { data: tournament, error } = await supabase
    .from('tournaments')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !tournament) {
    notFound()
  }

  const { count: registeredCount } = await supabase
    .from('teams')
    .select('*', { count: 'exact', head: true })
    .eq('tournament_id', params.id)

  const { count: approvedCount } = await supabase
    .from('teams')
    .select('*', { count: 'exact', head: true })
    .eq('tournament_id', params.id)
    .eq('status', 'approved')

  const { count: pendingCount } = await supabase
    .from('teams')
    .select('*', { count: 'exact', head: true })
    .eq('tournament_id', params.id)
    .eq('status', 'pending')

  const stats = {
    registered: registeredCount || 0,
    approved: approvedCount || 0,
    pending: pendingCount || 0,
  }

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="font-mono text-xs text-[#4A4A4A] mb-1">
          &gt; TOURNAMENT_ID :: {tournament.id}
        </div>
        <h1 className="font-orbitron text-3xl font-bold text-white mb-2">
          {tournament.name}
        </h1>
        <div className="font-mono text-xs text-[#999] flex gap-4">
          <span>&gt; STATUS :: <span className={
            tournament.status === 'live' ? 'text-red-400' : 
            tournament.status === 'registering' ? 'text-green-400' : 
            'text-[#2463FF]'
          }>{tournament.status.toUpperCase()}</span></span>
          <span>| GAME :: {tournament.game}</span>
          <span>| TYPE :: {tournament.type.toUpperCase()}</span>
        </div>
      </div>

      <TournamentManageTabs tournament={tournament} stats={stats} />
    </div>
  )
}
