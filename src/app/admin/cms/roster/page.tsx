import { createClient } from '@/lib/supabase/server'
import { RosterManager } from './_components/RosterManager'

export const metadata = {
  title: 'Roster CMS - Admin',
}

export default async function AdminRosterCMSPage() {
  const supabase = await createClient()

  const { data: roster } = await supabase
    .from('roster')
    .select('*')
    .order('display_order', { ascending: true })

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="mb-8">
        <h1 className="font-orbitron text-3xl font-bold text-white mb-2">ROSTER MANAGER</h1>
        <p className="font-mono text-xs text-[#999]">Manage players, content creators, and management staff.</p>
      </div>

      <RosterManager initialRoster={roster || []} />
    </div>
  )
}
