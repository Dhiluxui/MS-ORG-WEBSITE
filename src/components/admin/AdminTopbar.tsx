'use client'

import { usePathname } from 'next/navigation'
import { Bell, Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export function AdminTopbar() {
  const pathname = usePathname()
  const [pendingCount, setPendingCount] = useState(0)
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    const fetchPending = async () => {
      const { count } = await supabase
        .from('teams')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending')
      if (count !== null) setPendingCount(count)
    }
    fetchPending()

    const channel = supabase.channel('pending-teams')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'teams' }, fetchPending)
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const breadcrumbs = pathname.replace(/\/$/, '').split('/').filter(Boolean).map(segment => 
    segment.replace(/-/g, '_').toUpperCase()
  ).join(' / ')

  return (
    <div className="h-15 fixed top-0 left-64 right-0 h-16 bg-[#03060F]/95 backdrop-blur border-b border-[#111] flex items-center justify-between px-6 z-40">
      {/* Left - Breadcrumb */}
      <div className="font-mono text-xs text-[#4A4A4A]">
        &gt; {breadcrumbs || 'ADMIN'}
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-6">
        <button className="text-[#4A4A4A] hover:text-white transition-colors">
          <Search className="w-5 h-5" />
        </button>
        
        <button className="relative text-[#4A4A4A] hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          {pendingCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center font-mono text-[9px] text-white font-bold border border-black shadow-[0_0_8px_rgba(239,68,68,0.5)]">
              {pendingCount}
            </span>
          )}
        </button>

        {user && user.user_metadata?.avatar_url && (
          <img 
            src={user.user_metadata.avatar_url} 
            alt="User" 
            className="w-8 h-8 rounded-full border border-[#1C1C1C] grayscale hover:grayscale-0 transition-all cursor-pointer"
          />
        )}
      </div>
    </div>
  )
}
