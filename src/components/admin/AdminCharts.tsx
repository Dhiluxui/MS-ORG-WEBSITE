'use client'

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface ChartsProps {
  registrationData: any[]
  revenueData: any[]
  divisionData: any[]
}

const COLORS = ['#2463FF', '#4A4A4A', '#E8E8E8', '#1C1C1C', '#999999']

export function AdminCharts({ registrationData, revenueData, divisionData }: ChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      
      {/* Registrations Chart */}
      <div className="bg-[#070C1A] border border-[#111] p-4">
        <div className="font-mono text-xs text-[#4A4A4A] mb-4">&gt; REGISTRATIONS_BY_MONTH</div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={registrationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1C1C1C" vertical={false} />
              <XAxis dataKey="month" stroke="#4A4A4A" tick={{ fill: '#4A4A4A', fontSize: 10, fontFamily: 'monospace' }} />
              <YAxis stroke="#4A4A4A" tick={{ fill: '#4A4A4A', fontSize: 10, fontFamily: 'monospace' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0A0A0A', borderColor: '#2463FF', borderRadius: 0 }}
                itemStyle={{ color: '#2463FF', fontFamily: 'monospace', fontSize: 12 }}
                labelStyle={{ color: '#999', fontFamily: 'monospace', fontSize: 10 }}
              />
              <Line type="monotone" dataKey="count" stroke="#2463FF" strokeWidth={2} dot={{ fill: '#000', stroke: '#2463FF', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-[#070C1A] border border-[#111] p-4">
        <div className="font-mono text-xs text-[#4A4A4A] mb-4">&gt; EST_REVENUE_BY_TOURNAMENT</div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1C1C1C" vertical={false} />
              <XAxis dataKey="name" stroke="#4A4A4A" tick={{ fill: '#4A4A4A', fontSize: 10, fontFamily: 'monospace' }} tickFormatter={(val) => val.substring(0,8)+'...'} />
              <YAxis stroke="#4A4A4A" tick={{ fill: '#4A4A4A', fontSize: 10, fontFamily: 'monospace' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0A0A0A', borderColor: '#2463FF', borderRadius: 0 }}
                itemStyle={{ color: '#2463FF', fontFamily: 'monospace', fontSize: 12 }}
                labelStyle={{ color: '#999', fontFamily: 'monospace', fontSize: 10 }}
              />
              <Bar dataKey="revenue" fill="#2463FF" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Division Chart */}
      <div className="bg-[#070C1A] border border-[#111] p-4">
        <div className="font-mono text-xs text-[#4A4A4A] mb-4">&gt; REGISTRATIONS_BY_DIVISION</div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={divisionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="count"
                nameKey="game"
              >
                {divisionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#0A0A0A', borderColor: '#1C1C1C', borderRadius: 0 }}
                itemStyle={{ color: '#fff', fontFamily: 'monospace', fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Custom Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          {divisionData.map((entry, index) => (
            <div key={entry.game} className="flex items-center gap-2 font-mono text-[10px] text-[#999]">
              <div className="w-2 h-2" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              {entry.game} ({entry.count})
            </div>
          ))}
        </div>
      </div>

      {/* Placeholder Chart */}
      <div className="bg-[#070C1A] border border-[#111] p-4 flex items-center justify-center flex-col text-center">
        <div className="font-mono text-xs text-[#4A4A4A] mb-4 w-full text-left">&gt; SERVER_LOAD_METRICS</div>
        <div className="flex-1 flex items-center justify-center font-mono text-sm text-[#4A4A4A]">
          DATA_STREAM_UNAVAILABLE
        </div>
      </div>

    </div>
  )
}
