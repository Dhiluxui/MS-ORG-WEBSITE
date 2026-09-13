'use client'

import { useState } from 'react'
import { FileText, Download, Calendar } from 'lucide-react'

export default function AdminReportsPage() {
  const [reportType, setReportType] = useState('tournament_summary')
  const [tournament, setTournament] = useState('all')

  const handleGenerate = (type: 'pdf' | 'csv') => {
    alert(`Generating ${type.toUpperCase()} report... (This will download a file in a real implementation)`)
  }

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="mb-8">
        <h1 className="font-orbitron text-3xl font-bold text-white mb-2">GENERATE REPORTS</h1>
        <p className="font-mono text-xs text-[#999]">Export platform data for accounting and analysis.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <div className="bg-[#070C1A] border border-[#111] p-6">
            <h3 className="font-mono text-xs text-[#4A4A4A] mb-4">&gt; REPORT_CONFIGURATION</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block font-mono text-[10px] text-[#999] mb-2">REPORT TYPE</label>
                <select 
                  value={reportType}
                  onChange={e => setReportType(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#1C1C1C] focus:border-[#2463FF] text-white p-3 font-mono text-xs outline-none"
                >
                  <option value="tournament_summary">TOURNAMENT SUMMARY (TEAMS, WINNERS, REVENUE)</option>
                  <option value="registration_export">REGISTRATION EXPORT (ALL TEAMS)</option>
                  <option value="prize_record">PRIZE DISTRIBUTION RECORD</option>
                  <option value="revenue">REVENUE & TRANSACTIONS</option>
                  <option value="season_report">FULL SEASON REPORT</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[10px] text-[#999] mb-2">FILTER BY TOURNAMENT</label>
                <select 
                  value={tournament}
                  onChange={e => setTournament(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#1C1C1C] focus:border-[#2463FF] text-white p-3 font-mono text-xs outline-none"
                >
                  <option value="all">ALL TOURNAMENTS</option>
                  <option value="ms_delhi">MS DELHI CHAMPIONSHIP</option>
                  <option value="pro_league">SUMMER PRO LEAGUE</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] text-[#999] mb-2">START DATE</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#4A4A4A] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="date" 
                      className="w-full bg-[#0A0A0A] border border-[#1C1C1C] focus:border-[#2463FF] text-white pl-10 pr-3 py-3 font-mono text-xs outline-none css-date-input"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-[#999] mb-2">END DATE</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#4A4A4A] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="date" 
                      className="w-full bg-[#0A0A0A] border border-[#1C1C1C] focus:border-[#2463FF] text-white pl-10 pr-3 py-3 font-mono text-xs outline-none css-date-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80">
          <div className="bg-[#070C1A] border border-[#111] p-6 sticky top-6">
            <h3 className="font-mono text-xs text-[#4A4A4A] mb-4">&gt; ACTIONS</h3>
            
            <div className="space-y-4">
              <button 
                onClick={() => handleGenerate('pdf')}
                className="w-full bg-[#2463FF] hover:bg-[#1C4FD6] text-white font-mono text-xs py-4 flex flex-col items-center justify-center gap-1 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>[GENERATE PDF REPORT]</span>
                </div>
                <div className="text-[9px] text-white/70">Formatted for printing</div>
              </button>

              <button 
                onClick={() => handleGenerate('csv')}
                className="w-full border border-[#111] hover:border-[#4A4A4A] text-[#999] hover:text-white font-mono text-xs py-4 flex flex-col items-center justify-center gap-1 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>[EXPORT AS CSV]</span>
                </div>
                <div className="text-[9px]">For Excel / Spreadsheet</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
