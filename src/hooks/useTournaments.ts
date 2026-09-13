'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Tournament } from '@/types/database'

type FilterState = {
  status: string
  game: string
  type: string
  search: string
}

export function useTournaments(filters: FilterState) {
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchTournaments() {
      setLoading(true)
      let query = supabase
        .from('tournaments')
        .select('*')
        .neq('status', 'draft')
        .order('created_at', { ascending: false })

      if (filters.status && filters.status !== 'all')
        query = query.eq('status', filters.status)
      if (filters.game && filters.game !== 'all')
        query = query.eq('game', filters.game)
      if (filters.type && filters.type !== 'all')
        query = query.eq('type', filters.type)
      if (filters.search)
        query = query.ilike('name', `%${filters.search}%`)

      const { data } = await query
      setTournaments(data ?? [])
      setLoading(false)
    }
    fetchTournaments()
  }, [filters.status, filters.game, filters.type, filters.search])

  // Supabase Realtime — slot count updates live
  useEffect(() => {
    const channel = supabase
      .channel('tournaments-realtime')
      .on('postgres_changes', {
        event: '*', schema: 'public', table: 'tournaments'
      }, (payload) => {
        setTournaments(prev =>
          prev.map(t => t.id === (payload.new as Tournament).id ? payload.new as Tournament : t)
        )
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [supabase])

  return { tournaments, loading }
}
