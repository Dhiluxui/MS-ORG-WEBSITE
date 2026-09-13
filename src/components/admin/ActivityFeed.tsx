'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { formatDistanceToNow } from 'date-fns'

interface LogEntry {
  id: string
  created_at: string
  message: string
  channel: string
  trigger_event: string
}

export function ActivityFeed() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const supabase = createClient()

  useEffect(() => {
    // Initial fetch
    const fetchLogs = async () => {
      const { data } = await supabase
        .from('message_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)
      if (data) setLogs(data)
    }
    fetchLogs()

    // Realtime subscription
    const channel = supabase.channel('activity-feed')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'message_log' }, (payload) => {
        setLogs(prev => [payload.new as LogEntry, ...prev].slice(0, 50))
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const getColor = (trigger: string) => {
    if (trigger.includes('approve') || trigger.includes('live')) return 'text-[#2463FF]'
    if (trigger.includes('reject') || trigger.includes('cancel')) return 'text-red-400'
    if (trigger.includes('register') || trigger.includes('success')) return 'text-green-400'
    return 'text-[#999]'
  }

  return (
    <div className="bg-[#070C1A] border border-[#111] p-4 flex flex-col h-[500px]">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#111]">
        <div className="font-mono text-xs text-[#4A4A4A]">&gt; SYSTEM_ACTIVITY_LOG</div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-green-400">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          REALTIME_CONNECTED
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
        {logs.map((log) => (
          <div key={log.id} className="flex gap-3 text-xs font-mono border-l-2 border-[#1C1C1C] pl-3 py-1 hover:border-[#2463FF] transition-colors">
            <div className="text-[#4A4A4A] whitespace-nowrap">
              [{formatDistanceToNow(new Date(log.created_at), { addSuffix: true })}]
            </div>
            <div className={getColor(log.trigger_event)}>
              {log.message}
            </div>
          </div>
        ))}
        {logs.length === 0 && (
          <div className="text-center font-mono text-xs text-[#4A4A4A] py-8">
            WAITING_FOR_DATA...
          </div>
        )}
      </div>
    </div>
  )
}
