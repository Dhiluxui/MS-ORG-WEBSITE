import { createClient } from '../supabase/client';

const supabase = createClient();

export interface DashboardKPIs {
  activeTours: string;
  liveNow: string;
  pendingRegs: string;
  totalTeams: string;
  prizeTotal: string;
  blogPosts: string;
  merchListings: string;
  siteVisits: string;
}

export async function fetchDashboardKPIs(): Promise<DashboardKPIs> {
  const [
    { count: activeToursCount },
    { count: liveNowCount },
    { count: pendingRegsCount },
    { count: totalTeamsCount },
    { data: prizeData },
    { count: blogCount },
    { count: productCount }
  ] = await Promise.all([
    supabase.from('tournaments').select('*', { count: 'exact', head: true }).in('status', ['published', 'registering', 'full']),
    supabase.from('tournaments').select('*', { count: 'exact', head: true }).eq('status', 'live'),
    supabase.from('teams').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('teams').select('*', { count: 'exact', head: true }),
    supabase.from('tournaments').select('prize_pool'),
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
    supabase.from('products').select('*', { count: 'exact', head: true })
  ]);

  const totalPrize = prizeData?.reduce((acc, tour) => acc + (tour.prize_pool || 0), 0) || 0;
  
  let formattedPrize = `₹${totalPrize}`;
  if (totalPrize >= 100000) {
    formattedPrize = `₹${(totalPrize / 100000).toFixed(1)}L`;
  } else if (totalPrize >= 1000) {
    formattedPrize = `₹${(totalPrize / 1000).toFixed(1)}K`;
  }

  return {
    activeTours: (activeToursCount || 0).toString(),
    liveNow: (liveNowCount || 0).toString(),
    pendingRegs: (pendingRegsCount || 0).toString(),
    totalTeams: (totalTeamsCount || 0).toString(),
    prizeTotal: formattedPrize,
    blogPosts: (blogCount || 0).toString(),
    merchListings: (productCount || 0).toString(),
    siteVisits: '12.4K', 
  };
}

export async function fetchRecentActivity() {
  const [
    { data: recentTeams },
    { data: recentBlogs },
    { data: recentMsgs }
  ] = await Promise.all([
    supabase.from('teams').select('team_name, status, registered_at').order('registered_at', { ascending: false }).limit(5),
    supabase.from('blog_posts').select('title, status, created_at').order('created_at', { ascending: false }).limit(3),
    supabase.from('message_log').select('trigger_event, status, sent_at').order('sent_at', { ascending: false }).limit(5)
  ]);

  const activities: any[] = [];

  recentTeams?.forEach(t => {
    activities.push({
      time: new Date(t.registered_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: new Date(t.registered_at).getTime(),
      type: t.status === 'approved' ? 'APP' : 'REG',
      msg: t.status === 'approved' ? `Admin approved team: ${t.team_name}` : `Team registered: ${t.team_name}`
    });
  });

  recentBlogs?.forEach(b => {
    activities.push({
      time: new Date(b.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: new Date(b.created_at).getTime(),
      type: 'SYS',
      msg: `Blog post ${b.status}: ${b.title}`
    });
  });

  recentMsgs?.forEach(m => {
    activities.push({
      time: new Date(m.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: new Date(m.sent_at).getTime(),
      type: m.status === 'failed' ? 'ERR' : 'MSG',
      msg: `Broadcast event: ${m.trigger_event} - ${m.status}`
    });
  });

  activities.sort((a, b) => b.timestamp - a.timestamp);
  return activities.slice(0, 8);
}
