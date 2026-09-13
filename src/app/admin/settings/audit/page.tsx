import { createClient } from '@/lib/supabase/server'
import { Download, Search } from 'lucide-react'
import { format } from 'date-fns'

export const metadata = {
  title: 'Audit Log - Admin',
}

export default async function AdminAuditLogPage() {
  const supabase = await createClient()

  // Fetch message_log where channel = 'audit'
  const { data: logs } = await supabase
    .from('message_log')
    .select('*, sender:sent_by(ign)')
    .eq('channel', 'audit')
    .order('created_at', { ascending: false })
    .limit(200)

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col h-[calc(100vh-120px)]">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="font-orbitron text-3xl font-bold text-white mb-2">SYSTEM AUDIT LOG</h1>
          <p className="font-mono text-xs text-[#999]">Immutable record of all administrative actions.</p>
        </div>
        
        <div className="flex gap-4">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-[#4A4A4A] absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search logs..."
              className="w-full bg-[#0A0A0A] border border-[#1C1C1C] focus:border-[#2463FF] text-white pl-10 pr-3 py-2 font-mono text-xs outline-none"
            />
          </div>
          <button className="bg-[#111] hover:bg-[#1C1C1C] text-white font-mono text-xs px-4 py-2 flex items-center gap-2 border border-[#1C1C1C] transition-colors whitespace-nowrap">
            <Download className="w-4 h-4" /> EXPORT CSV
          </button>
        </div>
      </div>

      <div className="flex-1 bg-[#070C1A] border border-[#111] flex flex-col min-h-0">
        <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="w-full text-left font-mono text-xs text-white">
            <thead className="bg-[#0A0A0A] text-[#4A4A4A] border-b border-[#111] sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 font-normal">TIMESTAMP</th>
                <th className="px-4 py-3 font-normal">ADMIN_USER</th>
                <th className="px-4 py-3 font-normal">ACTION_TYPE</th>
                <th className="px-4 py-3 font-normal">DETAILS</th>
              </tr>
            </thead>
            <tbody>
              {logs?.map(log => (
                <tr key={log.id} className="border-b border-[#111] hover:bg-[#0A0A0A] transition-colors">
                  <td className="px-4 py-3 text-[#999] whitespace-nowrap">
                    {format(new Date(log.created_at), 'yyyy-MM-dd HH:mm:ss')}
                  </td>
                  <td className="px-4 py-3 text-[#2463FF]">
                    {/* @ts-ignore - Supabase type join issue */}
                    {log.sender?.ign || log.sent_by || 'SYSTEM'}
                  </td>
                  <td className="px-4 py-3 text-white">{log.trigger_event}</td>
                  <td className="px-4 py-3 text-[#999]">{log.message}</td>
                </tr>
              ))}
              {(!logs || logs.length === 0) && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-[#4A4A4A]">
                    &gt; NO_AUDIT_LOGS_FOUND
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
