import React from 'react';
import { TerminalCard } from '@/components/ui/TerminalCard';

const activities = [
  { id: 1, time: '10:42 AM', user: '@RajAdmin', action: 'Approved Team Registration', target: 'Phoenix Squad' },
  { id: 2, time: '10:15 AM', user: 'SYSTEM', action: 'Automated Bracket Generated', target: 'Winter Clash 2026' },
  { id: 3, time: '09:30 AM', user: '@TourneyMgr', action: 'Updated Match Score', target: 'Match #42' },
  { id: 4, time: '08:00 AM', user: 'SYSTEM', action: 'Cron Job Triggered', target: 'Daily Backup' },
  { id: 5, time: 'YESTERDAY', user: '@AdminOrg', action: 'Published Blog Post', target: 'Roster Update' },
];

export function RecentActivity() {
  return (
    <TerminalCard className="p-6">
      <div className="font-ascii text-xs text-ms-white-60 mb-6 border-b border-ms-border-dark pb-4 flex justify-between items-center">
        <span>&gt; RECENT_ACTIVITY_LOG</span>
        <button className="text-ms-blue hover:text-ms-white">[VIEW_ALL]</button>
      </div>
      
      <div className="space-y-4">
        {activities.map(activity => (
          <div key={activity.id} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 font-ascii text-xs border-b border-ms-white-10 pb-4 last:border-0 last:pb-0">
            <div className="text-ms-white-30 w-24 flex-shrink-0">
              [{activity.time}]
            </div>
            <div className="text-ms-blue w-28 flex-shrink-0">
              {activity.user}
            </div>
            <div className="text-ms-white-90 flex-grow">
              {activity.action}
            </div>
            <div className="text-ms-white-60">
              {activity.target}
            </div>
          </div>
        ))}
      </div>
    </TerminalCard>
  );
}
