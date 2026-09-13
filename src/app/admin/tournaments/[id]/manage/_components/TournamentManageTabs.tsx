'use client'

import { useState } from 'react'
import { OverviewTab } from './OverviewTab'
import { RegistrationsTab } from './RegistrationsTab'
import { BracketTab } from './BracketTab'

const PHASES = ['DRAFT', 'PUBLISHED', 'REGISTERING', 'BRACKET', 'LIVE', 'COMPLETED']

export function TournamentManageTabs({ tournament, stats }: { tournament: any, stats: any }) {
  const [activeTab, setActiveTab] = useState('OVERVIEW')

  const TABS = [
    { id: 'OVERVIEW', label: 'OVERVIEW' },
    { id: 'REGISTRATIONS', label: 'REGISTRATIONS' },
    { id: 'BRACKET', label: 'BRACKET & SEEDS' },
    { id: 'SCORING', label: 'SCORING' },
    { id: 'LEADERBOARD', label: 'LEADERBOARD' },
    { id: 'RESULTS', label: 'RESULTS' },
  ]

  const currentPhaseIndex = PHASES.indexOf(tournament.status.toUpperCase())
  
  return (
    <div>
      {/* Phase Progress */}
      <div className="bg-[#070C1A] border border-[#111] p-6 mb-6">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-4 right-4 h-[1px] bg-[#1C1C1C] -z-10" />
          {PHASES.map((phase, idx) => {
            const isPast = idx < currentPhaseIndex
            const isCurrent = idx === currentPhaseIndex
            
            return (
              <div key={phase} className="flex flex-col items-center gap-2 bg-[#070C1A] px-2 z-10">
                <div className={`w-3 h-3 rounded-full border ${
                  isPast ? 'bg-[#2463FF] border-[#2463FF]' :
                  isCurrent ? 'bg-[#070C1A] border-[#2463FF] shadow-[0_0_8px_rgba(36,99,255,0.8)]' :
                  'bg-[#070C1A] border-[#1C1C1C]'
                }`} />
                <div className={`font-mono text-[9px] ${
                  isPast ? 'text-[#999]' :
                  isCurrent ? 'text-[#2463FF]' :
                  'text-[#4A4A4A]'
                }`}>
                  {phase}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tabs Navbar */}
      <div className="flex overflow-x-auto border-b border-[#111] mb-6 custom-scrollbar">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-mono text-xs whitespace-nowrap transition-colors ${
              activeTab === tab.id 
                ? 'text-white border-b-2 border-[#2463FF] bg-[#0A0A0A]' 
                : 'text-[#999] hover:text-white hover:bg-[#111]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-[#070C1A] border border-[#111] min-h-[500px]">
        {activeTab === 'OVERVIEW' && <OverviewTab tournament={tournament} stats={stats} />}
        {activeTab === 'REGISTRATIONS' && <RegistrationsTab tournament={tournament} />}
        {activeTab === 'BRACKET' && <BracketTab tournament={tournament} />}
        {activeTab === 'SCORING' && (
          <div className="p-8 text-center font-mono text-sm text-[#4A4A4A]">
            &gt; SCORING_MODULE_PENDING
          </div>
        )}
        {activeTab === 'LEADERBOARD' && (
          <div className="p-8 text-center font-mono text-sm text-[#4A4A4A]">
            &gt; LEADERBOARD_MODULE_PENDING
          </div>
        )}
        {activeTab === 'RESULTS' && (
          <div className="p-8 text-center font-mono text-sm text-[#4A4A4A]">
            &gt; RESULTS_MODULE_PENDING
          </div>
        )}
      </div>
    </div>
  )
}
