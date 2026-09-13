"use client";

import React, { useState, useEffect } from 'react';
import {
  AreaChart, Area,
  BarChart, Bar,
  PieChart, Pie, Cell,
  LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { createClient } from '@/utils/supabase/client';

const COLORS = ['#2463ff', '#00ff9d', '#ffb800', '#f44336', '#9c27b0', '#00bcd4']; 

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-ms-panel-black border border-ms-border-dark p-2 font-mono text-xs">
        <p className="text-ms-white mb-1">{`> ${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function DashboardCharts() {
  const [loading, setLoading] = useState(true);
  const [regData, setRegData] = useState<any[]>([]);
  const [revData, setRevData] = useState<any[]>([]);
  const [divData, setDivData] = useState<any[]>([]);
  const [trafficData, setTrafficData] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    fetchData();

    const channel1 = supabase
      .channel('public:TournamentsCharts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'Tournaments' }, () => fetchData())
      .subscribe();
      
    const channel2 = supabase
      .channel('public:TeamsCharts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'Teams' }, () => fetchData())
      .subscribe();

    return () => {
      supabase.removeChannel(channel1);
      supabase.removeChannel(channel2);
    };
  }, []);

  const fetchData = async () => {
    // Fetch Teams for Registration chart
    const { data: teams } = await supabase.from('Teams').select('created_at');
    
    // Fetch Tournaments for Revenue and Divisions
    const { data: tournaments } = await supabase.from('Tournaments').select('title, entry_fee, registered_teams, game_title');

    // Aggregate Registrations by Month
    if (teams) {
      const counts: Record<string, number> = {};
      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      teams.forEach(t => {
        if (t.created_at) {
          const date = new Date(t.created_at);
          const m = months[date.getMonth()];
          counts[m] = (counts[m] || 0) + 1;
        }
      });
      const newRegData = months.map(m => ({ month: m, count: counts[m] || 0 }));
      setRegData(newRegData);
    }

    // Aggregate Revenue & Divisions
    if (tournaments) {
      const revs = tournaments.map(t => {
        const fee = parseFloat(t.entry_fee) || 0;
        const count = t.registered_teams || 0;
        return {
          tourn: t.title?.substring(0, 10) || 'Unknown',
          rev: fee * count
        };
      });
      setRevData(revs.slice(0, 10)); // max 10 for bar chart readability

      const gameCounts: Record<string, number> = {};
      tournaments.forEach(t => {
        const game = t.game_title || 'Other';
        gameCounts[game] = (gameCounts[game] || 0) + 1;
      });
      
      const divs = Object.entries(gameCounts).map(([name, value]) => ({ name, value }));
      setDivData(divs.length > 0 ? divs : [{ name: 'NO DATA', value: 1 }]);
    }
    
    // Dummy Traffic Data since we can't track actual visits easily without external analytics
    setTrafficData([
      { day: 'MON', visits: 0 }, { day: 'TUE', visits: 0 }, { day: 'WED', visits: 0 },
      { day: 'THU', visits: 0 }, { day: 'FRI', visits: 0 }, { day: 'SAT', visits: 0 },
      { day: 'SUN', visits: 0 },
    ]);

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center font-mono text-[10px] text-ms-white-60 tracking-widest uppercase">
        [AGGREGATING_DATA...]
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      
      {/* 1. Area Chart: Registrations */}
      <div className="bg-ms-panel-black border border-ms-border-dark p-4">
        <div className="font-mono text-[10px] text-ms-white-60 tracking-widest mb-4">
          &gt; SYS.DATA.REGISTRATIONS_12M
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={regData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2463ff" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2463ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="month" stroke="#ffffff40" fontSize={10} fontFamily="monospace" tickMargin={5} />
              <YAxis stroke="#ffffff40" fontSize={10} fontFamily="monospace" />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="count" name="Teams" stroke="#2463ff" fillOpacity={1} fill="url(#colorCount)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Bar Chart: Revenue */}
      <div className="bg-ms-panel-black border border-ms-border-dark p-4">
        <div className="font-mono text-[10px] text-ms-white-60 tracking-widest mb-4">
          &gt; SYS.DATA.REVENUE_BY_TOURNAMENT
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revData} margin={{ top: 0, right: 0, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="tourn" stroke="#ffffff40" fontSize={10} fontFamily="monospace" tickMargin={5} />
              <YAxis stroke="#ffffff40" fontSize={10} fontFamily="monospace" tickFormatter={(value) => `₹${value > 1000 ? value/1000 + 'k' : value}`} />
              <Tooltip content={<CustomTooltip />} cursor={{fill: '#ffffff10'}} />
              <Bar dataKey="rev" name="Revenue (₹)" fill="#00ff9d" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Donut Chart: Popularity */}
      <div className="bg-ms-panel-black border border-ms-border-dark p-4">
        <div className="font-mono text-[10px] text-ms-white-60 tracking-widest mb-4">
          &gt; SYS.DATA.DIVISION_DISTRIBUTION
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={divData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {divData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="square" wrapperStyle={{ fontSize: '10px', fontFamily: 'monospace' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. Line Chart: Traffic */}
      <div className="bg-ms-panel-black border border-ms-border-dark p-4">
        <div className="font-mono text-[10px] text-ms-white-60 tracking-widest mb-4">
          &gt; SYS.DATA.DAILY_TRAFFIC (NO LIVE TRACKING)
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trafficData} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="day" stroke="#ffffff40" fontSize={10} fontFamily="monospace" tickMargin={5} />
              <YAxis stroke="#ffffff40" fontSize={10} fontFamily="monospace" tickFormatter={(value) => `${value}`} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="stepAfter" dataKey="visits" name="Visits" stroke="#ffb800" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
