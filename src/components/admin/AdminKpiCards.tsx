import Link from 'next/link'

interface KpiProps {
  activeTours: number
  liveTours: number
  pendingRegs: number
  totalTeams: number
  blogCount: number
  totalPrize: number
  liveTournamentName?: string
}

export function AdminKpiCards({ activeTours, liveTours, pendingRegs, totalTeams, blogCount, totalPrize, liveTournamentName }: KpiProps) {
  return (
    <div className="space-y-6 mb-8">
      {/* Live Banner */}
      {liveTours > 0 && (
        <div className="w-full bg-[#070C1A] border-l-4 border-[#2463FF] p-3 font-mono text-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-white">
            &gt; [<span className="text-red-500 animate-pulse">🔴</span>] LIVE_NOW :: {liveTournamentName || 'TOURNAMENT_IN_PROGRESS'} | MATCHES UNDERWAY
          </div>
          <div className="flex gap-4">
            <Link href="/admin/tournaments" className="text-[#2463FF] hover:text-white transition-colors">
              [VIEW_DASHBOARD &gt;]
            </Link>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-[#070C1A] border border-[#111] p-5">
          <div className="font-mono text-xs text-[#4A4A4A] mb-1">&gt; ACTIVE_TOURS</div>
          <div className="font-mono text-3xl text-white">{activeTours}</div>
          <div className="font-mono text-[10px] mt-2 text-[#999]">→ currently open</div>
        </div>
        
        <div className="bg-[#070C1A] border border-[#111] p-5">
          <div className="font-mono text-xs text-[#4A4A4A] mb-1">&gt; LIVE_NOW</div>
          <div className="font-mono text-3xl text-white">{liveTours} {liveTours > 0 && <span className="text-red-500 text-lg animate-pulse">🔴</span>}</div>
          <div className="font-mono text-[10px] mt-2 text-[#999]">→ running currently</div>
        </div>

        <div className={`bg-[#070C1A] border border-[#111] p-5 ${pendingRegs > 0 ? 'border-t-2 border-t-yellow-500' : ''}`}>
          <div className="font-mono text-xs text-[#4A4A4A] mb-1">&gt; PENDING_REGS</div>
          <div className={`font-mono text-3xl ${pendingRegs > 0 ? 'text-yellow-400' : 'text-white'}`}>{pendingRegs}</div>
          <div className="font-mono text-[10px] mt-2 text-[#999]">→ needs action</div>
        </div>

        <div className="bg-[#070C1A] border border-[#111] p-5">
          <div className="font-mono text-xs text-[#4A4A4A] mb-1">&gt; TOTAL_TEAMS</div>
          <div className="font-mono text-3xl text-white">{totalTeams}</div>
          <div className="font-mono text-[10px] mt-2 text-[#999]">→ all time</div>
        </div>

        <div className="bg-[#070C1A] border border-[#111] p-5">
          <div className="font-mono text-xs text-[#4A4A4A] mb-1">&gt; BLOG_POSTS</div>
          <div className="font-mono text-3xl text-white">{blogCount}</div>
          <div className="font-mono text-[10px] mt-2 text-[#999]">→ published</div>
        </div>

        <div className="bg-[#070C1A] border border-[#111] p-5">
          <div className="font-mono text-xs text-[#4A4A4A] mb-1">&gt; PRIZE_GIVEN</div>
          <div className="font-mono text-3xl text-white">₹{(totalPrize / 100000).toFixed(1)}L</div>
          <div className="font-mono text-[10px] mt-2 text-[#999]">→ this year (est)</div>
        </div>

        <div className="bg-[#070C1A] border border-[#111] p-5">
          <div className="font-mono text-xs text-[#4A4A4A] mb-1">&gt; SITE_VISITS</div>
          <div className="font-mono text-3xl text-white">12.4K</div>
          <div className="font-mono text-[10px] mt-2 text-[#999]">→ /month (mock)</div>
        </div>

        <div className="bg-[#070C1A] border border-[#111] p-5">
          <div className="font-mono text-xs text-[#4A4A4A] mb-1">&gt; MERCH_ORDERS</div>
          <div className="font-mono text-3xl text-white">7</div>
          <div className="font-mono text-[10px] mt-2 text-[#999]">→ pending ship (mock)</div>
        </div>

      </div>
    </div>
  )
}
