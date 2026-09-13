import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Security check: Only allow in development or with a secret key
  if (process.env.NODE_ENV !== 'development') {
    const { searchParams } = new URL(request.url);
    if (searchParams.get('secret') !== 'super-secret-seed-key') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  try {
    // 1. Seed Tournaments
    const { data: tournaments, error: tError } = await supabase.from('tournaments').insert([
      {
        name: 'MS Winter Clash 2026',
        game: 'Free Fire MAX',
        type: 'open',
        format: 'Squad',
        description: 'The biggest winter showdown of 2026.',
        total_slots: 32,
        entry_fee: 100,
        prize_pool: 25000,
        status: 'live'
      },
      {
        name: 'BGMI Showdown',
        game: 'BGMI',
        type: 'invitational',
        format: 'Squad',
        total_slots: 16,
        entry_fee: 500,
        prize_pool: 150000,
        status: 'published'
      },
      {
        name: 'CODM Weekly Scrims',
        game: 'CODM',
        type: 'open',
        format: 'Squad',
        total_slots: 64,
        prize_pool: 5000,
        status: 'registering'
      }
    ]).select();

    if (tError) throw tError;

    // 2. Seed Teams (attach to MS Winter Clash)
    const winterClash = tournaments.find(t => t.name === 'MS Winter Clash 2026');
    
    if (winterClash) {
      await supabase.from('teams').insert([
        {
          tournament_id: winterClash.id,
          team_name: 'Phoenix Squad',
          captain_discord: 'RajXX#0001',
          payment_status: 'verified',
          status: 'approved'
        },
        {
          tournament_id: winterClash.id,
          team_name: 'GodLike Esports',
          captain_discord: 'GodL#9999',
          payment_status: 'pending',
          status: 'pending'
        },
        {
          tournament_id: winterClash.id,
          team_name: 'NoScope Kings',
          captain_discord: 'NSK#1234',
          payment_status: 'verified',
          status: 'approved'
        }
      ]);
    }

    // 3. Seed Blog Posts
    await supabase.from('blog_posts').insert([
      {
        title: 'Welcome to Magadh Striker Esports',
        slug: 'welcome-to-ms',
        category: 'Announcements',
        status: 'published',
        content: '<p>We are officially launching our new platform.</p>',
        author_name: 'Admin',
      },
      {
        title: 'Winter Clash 2026 Details',
        slug: 'winter-clash-2026',
        category: 'Tournaments',
        status: 'published',
        content: '<p>Registration opens tomorrow!</p>',
        author_name: 'Tournament Mgr',
      }
    ]);

    // 4. Seed Products
    await supabase.from('products').insert([
      {
        name: 'MS Pro Jersey 2026',
        price: 999,
        category: 'Apparel',
        status: 'active'
      },
      {
        name: 'Striker Gaming Sleeve',
        price: 299,
        category: 'Accessories',
        status: 'active'
      }
    ]);

    return NextResponse.json({ success: true, message: 'Database successfully seeded!' });

  } catch (error: any) {
    console.error('Seed error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
