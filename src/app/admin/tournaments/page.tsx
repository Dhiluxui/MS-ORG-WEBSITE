import { createClient } from '@/lib/supabase/server'
import { TournamentsTable } from './_components/TournamentsTable'
import Link from 'next/link'

export const metadata = {
  title: 'Manage Tournaments - Admin Portal',
}

export default async function AdminTournamentsPage() {
  const supabase = await createClient()

  const { data: tournaments } = await supabase
    .from('tournaments')
    .select('*, teams(count)')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="font-orbitron text-3xl font-bold text-white mb-2">TOURNAMENTS</h1>
          <p className="font-mono text-xs text-[#999]">Manage all platform events and custom qualifiers.</p>
        </div>
        
        <Link href="/admin/tournaments/new" className="bg-[#2463FF] hover:bg-[#1C4FD6] text-white font-mono text-xs px-4 py-2 transition-colors inline-block text-center whitespace-nowrap">
          + CREATE_TOURNAMENT
        </Link>
      </div>

      <TournamentsTable initialTournaments={tournaments || []} />
    </div>
  )
}
