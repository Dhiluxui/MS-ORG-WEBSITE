import { createClient } from '@/lib/supabase/server'
import { RefreshCw, Download } from 'lucide-react'
import { format } from 'date-fns'

export const metadata = {
  title: 'Communications Log - Admin',
}

export default async function AdminCommunicationsLogPage() {
  const supabase = await createClient()

  // Fetch message log with team data
  const { data: logs } = await supabase
    .from('message_log')
    .select('*, teams(name)')
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-orbitron text-3xl font-bold text-white mb-2">COMMUNICATIONS LOG</h1>
          <p className="font-mono text-xs text-[#999]">History of all automated and manual messages sent.</p>
        </div>
        
        <button className="bg-[#111] hover:bg-[#1C1C1C] border border-[#1C1C1C] text-white font-mono text-xs px-4 py-2 flex items-center gap-2 transition-colors">
          <Download className="w-4 h-4" />
          <span>DOWNLOAD LOG CSV</span>
        </button>
      </div>

      <div className="bg-[#070C1A] border border-[#111]">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs text-white">
            <thead className="bg-[#0A0A0A] text-[#4A4A4A] border-b border-[#111]">
              <tr>
                <th className="px-4 py-3 font-normal">DATE / TIME</th>
                <th className="px-4 py-3 font-normal">RECIPIENT TEAM</th>
                <th className="px-4 py-3 font-normal">CHANNEL</th>
                <th className="px-4 py-3 font-normal">TRIGGER EVENT</th>
                <th className="px-4 py-3 font-normal">STATUS</th>
                <th className="px-4 py-3 font-normal text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {logs?.map(log => (
                <tr key={log.id} className="border-b border-[#111] hover:bg-[#0A0A0A] transition-colors">
                  <td className="px-4 py-3 text-[#999]">
                    {format(new Date(log.created_at), 'dd MMM yyyy, HH:mm')}
                  </td>
                  <td className="px-4 py-3 font-bold text-white">{log.teams?.name || 'Unknown'}</td>
                  <td className="px-4 py-3 text-[#999]">{log.channel}</td>
                  <td className="px-4 py-3 text-[#999]">{log.trigger_event}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 border rounded-full text-[10px] ${
                      log.status === 'sent' ? 'border-green-400 text-green-400' :
                      log.status === 'failed' ? 'border-red-400 text-red-400' :
                      'border-yellow-400 text-yellow-400'
                    }`}>
                      {log.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end">
                      {log.status === 'failed' && (
                        <button className="text-[#999] hover:text-[#2463FF] transition-colors" title="Resend Failed">
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {(!logs || logs.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-[#4A4A4A]">
                    &gt; NO_LOGS_FOUND
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
