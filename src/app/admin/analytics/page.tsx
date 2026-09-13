'use client'

import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Download } from 'lucide-react'

// Mock Data
const regsByMonth = [
  { month: 'Jan', count: 45 }, { month: 'Feb', count: 52 }, { month: 'Mar', count: 38 },
  { month: 'Apr', count: 65 }, { month: 'May', count: 89 }, { month: 'Jun', count: 120 },
  { month: 'Jul', count: 145 }
]

const divisionData = [
  { game: 'FF MAX', count: 120 }, { game: 'BGMI', count: 85 }, 
  { game: 'CODM', count: 40 }, { game: 'Valorant', count: 25 }
]

const revenueData = [
  { name: 'Spring Major', revenue: 50000 },
  { name: 'Summer Cup', revenue: 75000 },
  { name: 'Pro League', revenue: 120000 },
  { name: 'Fall Open', revenue: 45000 }
]

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('6m')

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-orbitron text-3xl font-bold text-white mb-2">PLATFORM ANALYTICS</h1>
          <p className="font-mono text-xs text-[#999]">Overview of registrations, revenue, and game popularity.</p>
        </div>
        
        <div className="flex gap-2">
          {['1m', '3m', '6m', '1y'].map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`font-mono text-[10px] px-3 py-1 border transition-colors ${
                timeRange === range 
                  ? 'border-[#2463FF] text-[#2463FF] bg-[#2463FF]/10' 
                  : 'border-[#1C1C1C] text-[#999] hover:border-[#4A4A4A]'
              }`}
            >
              {range.toUpperCase()}
            </button>
          ))}
          <button className="font-mono text-[10px] border border-[#111] text-[#999] hover:text-white px-3 py-1 flex items-center gap-1 transition-colors ml-4">
            <Download className="w-3 h-3" /> EXPORT PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registrations Chart */}
        <div className="bg-[#070C1A] border border-[#111] p-6">
          <div className="font-mono text-xs text-[#4A4A4A] mb-6 border-b border-[#111] pb-2 uppercase">
            &gt; REGISTRATIONS_OVER_TIME
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={regsByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#111" />
                <XAxis dataKey="month" stroke="#4A4A4A" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#4A4A4A" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A0A0A', borderColor: '#1C1C1C', borderRadius: 0 }}
                  itemStyle={{ color: '#2463FF', fontSize: '12px', fontFamily: 'monospace' }}
                  labelStyle={{ color: '#999', fontSize: '10px', fontFamily: 'monospace' }}
                />
                <Line type="monotone" dataKey="count" stroke="#2463FF" strokeWidth={2} dot={{ fill: '#070C1A', stroke: '#2463FF', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Division Breakdown */}
        <div className="bg-[#070C1A] border border-[#111] p-6">
          <div className="font-mono text-xs text-[#4A4A4A] mb-6 border-b border-[#111] pb-2 uppercase">
            &gt; TEAMS_BY_DIVISION
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={divisionData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#111" horizontal={false} />
                <XAxis type="number" stroke="#4A4A4A" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="game" stroke="#999" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A0A0A', borderColor: '#1C1C1C', borderRadius: 0 }}
                  itemStyle={{ color: '#2463FF', fontSize: '12px', fontFamily: 'monospace' }}
                  labelStyle={{ color: '#999', fontSize: '10px', fontFamily: 'monospace' }}
                  cursor={{ fill: '#111' }}
                />
                <Bar dataKey="count" fill="#2463FF" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-[#070C1A] border border-[#111] p-6 lg:col-span-2">
          <div className="font-mono text-xs text-[#4A4A4A] mb-6 border-b border-[#111] pb-2 uppercase">
            &gt; REVENUE_BY_TOURNAMENT
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#111" vertical={false} />
                <XAxis dataKey="name" stroke="#4A4A4A" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#4A4A4A" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A0A0A', borderColor: '#1C1C1C', borderRadius: 0 }}
                  itemStyle={{ color: '#2463FF', fontSize: '12px', fontFamily: 'monospace' }}
                  labelStyle={{ color: '#999', fontSize: '10px', fontFamily: 'monospace' }}
                  formatter={(val: number) => `₹${val.toLocaleString()}`}
                  cursor={{ fill: '#111' }}
                />
                <Bar dataKey="revenue" fill="#2463FF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
