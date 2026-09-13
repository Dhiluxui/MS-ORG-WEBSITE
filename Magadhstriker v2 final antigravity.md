# ██████████████████████████████████████████████████████████████████████████
# MAGADH STRIKER ESPORTS — V2 CONTINUATION PROMPT
# Platform: Antigravity AI | Model: Gemini 3.1 High
# Status: Continues from V1 scaffold already built
# ██████████████████████████████████████████████████████████████████████████

---

# ═══════════════════════════════════════════════════════
# CONTEXT — WHAT V1 ALREADY BUILT (DO NOT REBUILD)
# ═══════════════════════════════════════════════════════

V1 successfully scaffolded these files. DO NOT recreate them unless fixing a bug:

```
ALREADY EXISTS — SKIP THESE:
  src/app/globals.css                    ← B&W design tokens, fonts, animations
  tailwind.config.ts                     ← Custom colors, JetBrains Mono config
  src/components/ui/Button.tsx           ← Primary, Secondary, Outline variants
  src/components/ui/TerminalCard.tsx     ← ASCII border card
  src/components/ui/Divider.tsx          ← ─── ◆ ─── separator
  src/components/ui/GlitchText.tsx       ← Hero H1 glitch animation
  src/components/ui/Typography.tsx       ← H1–H6, Body, Mono variants
  src/components/layout/Navbar.tsx       ← Sticky glass navbar
  src/components/layout/Footer.tsx       ← 4-col footer
  src/app/not-found.tsx                  ← Custom 404
  src/app/layout.tsx                     ← Root layout with fonts
  src/app/page.tsx                       ← Landing page (partial)
  Landing page sections (partial):
    StatsTicker.tsx, GameDivisions.tsx, AboutTeaser.tsx
    TournamentSpotlight.tsx, MerchStream.tsx, Sponsors.tsx, CommunityJoinCTA.tsx
  src/app/tournaments/page.tsx           ← Tournament hub (partial)
  src/app/tournaments/layout.tsx
  src/components/tournaments/TournamentHero.tsx
  src/components/tournaments/FilterBar.tsx
  src/app/admin/page.tsx                 ← Basic admin dashboard stub
  src/app/admin/layout.tsx               ← Admin layout stub
  20260714_initial_schema.sql            ← Supabase schema SQL
```

---

# ═══════════════════════════════════════════════════════
# V2 MISSION — COMPLETE EVERYTHING MISSING
# ═══════════════════════════════════════════════════════

V2 must complete the ENTIRE platform in this exact order. Follow each phase completely before moving to the next.

---

# ═══════════════════════════════════════════════════════
# PHASE 1 — SUPABASE SETUP & AUTH FOUNDATION
# (Do this first — everything depends on it)
# ═══════════════════════════════════════════════════════

## 1A — Environment & Supabase Client

Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=your_hcaptcha_key
HCAPTCHA_SECRET_KEY=your_hcaptcha_secret
DISCORD_WEBHOOK_ANNOUNCEMENTS=webhook_url
DISCORD_WEBHOOK_ROOM_INFO=webhook_url
DISCORD_WEBHOOK_ADMIN_ALERTS=webhook_url
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Create `src/lib/supabase/client.ts`:
```typescript
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

Create `src/lib/supabase/server.ts`:
```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database'

export async function createServerSupabaseClient() {
  const cookieStore = await cookies()
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
}
```

Create `src/lib/supabase/admin.ts` (server-only, uses service role):
```typescript
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

export function createAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
```

## 1B — TypeScript Database Types

Create `src/types/database.ts` with full typed Database interface matching ALL tables from the SQL schema:

```typescript
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          discord_id: string
          discord_username: string
          discord_avatar: string | null
          email: string | null
          role: 'user' | 'super_admin' | 'tournament_mgr' | 'content_mgr' | 'support'
          is_banned: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      tournaments: {
        Row: {
          id: string
          name: string
          game: 'Free Fire MAX' | 'BGMI' | 'CODM' | 'MOBA' | 'Legend RC'
          type: 'open' | 'invitational' | 'govt_scrim' | 'private_scrim'
          format: 'Solo' | 'Duo' | 'Squad' | 'Custom'
          description: string | null
          rules: string | null
          cover_image: string | null
          registration_opens: string | null
          registration_closes: string | null
          start_date: string | null
          end_date: string | null
          total_slots: number
          waitlist_slots: number
          entry_fee: number
          upi_id: string | null
          prize_pool: number
          prize_distribution: Json | null
          scoring_system: string | null
          scoring_formula: Json | null
          total_rounds: number
          status: 'draft' | 'published' | 'registering' | 'full' | 'live' | 'completed' | 'cancelled'
          allow_other_orgs: boolean
          hosting_org_name: string | null
          created_by: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['tournaments']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['tournaments']['Insert']>
      }
      teams: {
        Row: {
          id: string
          tournament_id: string
          team_name: string
          team_tag: string | null
          captain_id: string | null
          captain_discord: string
          captain_phone: string | null
          captain_email: string | null
          payment_screenshot: string | null
          payment_upi_ref: string | null
          payment_status: 'pending' | 'verified' | 'failed'
          status: 'pending' | 'approved' | 'rejected' | 'waitlisted'
          rejection_reason: string | null
          admin_notes: string | null
          slot_number: number | null
          registered_at: string
        }
        Insert: Omit<Database['public']['Tables']['teams']['Row'], 'id' | 'registered_at'>
        Update: Partial<Database['public']['Tables']['teams']['Insert']>
      }
      players: {
        Row: {
          id: string
          team_id: string
          user_id: string | null
          ign: string
          game_id_screenshot: string | null
          player_level: number | null
          role: 'IGL' | 'Rusher' | 'Sniper' | 'Support' | 'Sub' | null
          is_substitute: boolean
          verified: boolean
          banned_ign: boolean
          joined_at: string
        }
        Insert: Omit<Database['public']['Tables']['players']['Row'], 'id' | 'joined_at'>
        Update: Partial<Database['public']['Tables']['players']['Insert']>
      }
      matches: {
        Row: {
          id: string
          tournament_id: string
          round_number: number
          round_name: string | null
          match_number: number
          team_a_id: string | null
          team_b_id: string | null
          room_id: string | null
          room_password: string | null
          room_sent: boolean
          scheduled_time: string | null
          status: 'pending' | 'live' | 'completed'
          winner_id: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['matches']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['matches']['Insert']>
      }
      round_scores: {
        Row: {
          id: string
          match_id: string
          team_id: string
          round_number: number
          position: number
          kills: number
          position_points: number
          kill_points: number
          total_points: number
          recorded_by: string | null
          recorded_at: string
        }
        Insert: Omit<Database['public']['Tables']['round_scores']['Row'], 'id' | 'recorded_at'>
        Update: Partial<Database['public']['Tables']['round_scores']['Insert']>
      }
      leaderboard: {
        Row: {
          id: string
          tournament_id: string
          team_id: string
          rank: number
          total_points: number
          total_kills: number
          published: boolean
          last_updated: string
        }
        Insert: Omit<Database['public']['Tables']['leaderboard']['Row'], 'id' | 'last_updated'>
        Update: Partial<Database['public']['Tables']['leaderboard']['Insert']>
      }
      roster: {
        Row: {
          id: string
          real_name: string | null
          ign: string
          role: string | null
          game: string | null
          type: 'competitive' | 'content' | 'management' | null
          status: string
          featured_home: boolean
          instagram: string | null
          youtube: string | null
          bio: string | null
          image: string | null
          display_order: number | null
        }
        Insert: Omit<Database['public']['Tables']['roster']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['roster']['Insert']>
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          category: string | null
          tags: string[] | null
          author_id: string | null
          author_name: string | null
          author_role: string | null
          status: 'draft' | 'published' | 'scheduled'
          scheduled_at: string | null
          featured_image: string | null
          excerpt: string | null
          content: string | null
          published_at: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['blog_posts']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>
      }
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          original_price: number | null
          images: string[] | null
          badge: string | null
          category: string | null
          sizes: Json | null
          low_stock_alert: number
          status: string
        }
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['products']['Insert']>
      }
      tickets: {
        Row: {
          id: string
          event_name: string
          event_date: string | null
          venue: string | null
          price: number
          total_seats: number | null
          sold_seats: number
          buyer_id: string | null
          buyer_name: string | null
          buyer_phone: string | null
          payment_screenshot: string | null
          status: 'pending' | 'confirmed' | 'cancelled'
          ticket_code: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['tickets']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['tickets']['Insert']>
      }
      sponsors: {
        Row: {
          id: string
          name: string
          tier: 'title' | 'gold' | 'bronze' | null
          logo: string | null
          website: string | null
          display_order: number | null
          contract_start: string | null
          contract_end: string | null
          is_active: boolean
        }
        Insert: Omit<Database['public']['Tables']['sponsors']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['sponsors']['Insert']>
      }
      site_settings: {
        Row: { key: string; value: string | null; updated_at: string }
        Insert: Omit<Database['public']['Tables']['site_settings']['Row'], 'updated_at'>
        Update: Partial<Database['public']['Tables']['site_settings']['Insert']>
      }
    }
  }
}

// Convenience type aliases
export type Tournament = Database['public']['Tables']['tournaments']['Row']
export type Team = Database['public']['Tables']['teams']['Row']
export type Player = Database['public']['Tables']['players']['Row']
export type Match = Database['public']['Tables']['matches']['Row']
export type RoundScore = Database['public']['Tables']['round_scores']['Row']
export type Leaderboard = Database['public']['Tables']['leaderboard']['Row']
export type RosterPlayer = Database['public']['Tables']['roster']['Row']
export type BlogPost = Database['public']['Tables']['blog_posts']['Row']
export type Product = Database['public']['Tables']['products']['Row']
export type Ticket = Database['public']['Tables']['tickets']['Row']
export type Sponsor = Database['public']['Tables']['sponsors']['Row']
export type SiteSetting = Database['public']['Tables']['site_settings']['Row']
export type AdminUser = Database['public']['Tables']['users']['Row']
```

## 1C — Auth Middleware

Create `src/middleware.ts`:
```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const { pathname } = request.nextUrl

  // Protect all /admin routes
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    // Check if user has admin role in our users table
    const { data: adminUser } = await supabase
      .from('users')
      .select('role, is_banned')
      .eq('id', user.id)
      .single()

    if (!adminUser || adminUser.is_banned || adminUser.role === 'user') {
      return NextResponse.redirect(new URL('/admin/login?error=unauthorized', request.url))
    }
  }

  // Redirect logged-in admins away from login page
  if (pathname === '/admin/login' && user) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
}
```

## 1D — Auth Route Handler

Create `src/app/api/auth/callback/route.ts`:
```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll() },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          },
        },
      }
    )
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && data.user) {
      // Upsert user into our users table on first login
      await supabase.from('users').upsert({
        id: data.user.id,
        discord_id: data.user.user_metadata.provider_id ?? '',
        discord_username: data.user.user_metadata.full_name ?? data.user.user_metadata.name ?? 'Unknown',
        discord_avatar: data.user.user_metadata.avatar_url ?? null,
        email: data.user.email ?? null,
      }, { onConflict: 'id', ignoreDuplicates: false })
      
      return NextResponse.redirect(`${origin}${next}`)
    }
  }
  return NextResponse.redirect(`${origin}/admin/login?error=auth_failed`)
}
```

---

# ═══════════════════════════════════════════════════════
# PHASE 2 — COMPLETE THE LANDING PAGE
# ═══════════════════════════════════════════════════════

The V1 Hero section was missing. Create `src/components/home/HeroSection.tsx`:

```
HERO SECTION SPEC (complete, production-ready):

Background layers (stacked):
  Layer 1: bg-black (absolute inset)
  Layer 2: Halftone dot grid — CSS background-image:
    radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)
    background-size: 24px 24px
  Layer 3: Scanlines — repeating-linear-gradient:
    (to bottom, transparent 0, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)
  Layer 4: MS triangle SVG watermark — absolute center, opacity-[0.03], scale-150

CONTENT (z-10, text-center, flex col center):
  Terminal badge (Courier New, text-xs, border border-white/20 px-3 py-1):
    > MS_ESPORTS_V1 // SYSTEM_ONLINE

  H1 (GlitchText component, Orbitron, text-6xl md:text-8xl font-black leading-none):
    Line 1: "DOMINATE."  (text-white)
    Line 2: "COMPETE."   (text-[#2463FF]) ← blue accent line
    Line 3: "CONQUER."   (text-white)
  
  Subtext (Rajdhani, text-lg, text-white/60, tracking-widest):
    "INDIA'S COMPETITIVE ESPORTS ORGANIZATION"
    "FREE FIRE MAX · BGMI · CODM · MOBA · LEGEND RC"

  CTAs (flex gap-4 justify-center mt-8):
    <Button variant="primary" size="lg">▶ WATCH ORG STORY</Button>
    <Button variant="outline" size="lg" href="/tournaments">VIEW TOURNAMENTS →</Button>

  ASCII divider:
    <Divider className="my-8 max-w-xs mx-auto" />

  Social icons row (gap-6, text-white/40 hover:text-white):
    Instagram | YouTube | Discord | Twitter/X | WhatsApp
    (Lucide icons, size 20)

  Scroll indicator:
    Animated bouncing ▼ in Courier New, text-white/30, absolute bottom-8

FRAMER MOTION:
  All content fades in and slides up (staggerChildren 0.1s delay)
  H1 lines each animate individually with 0.1s stagger
```

Also update `src/app/page.tsx` to include HeroSection as the FIRST section.

---

# ═══════════════════════════════════════════════════════
# PHASE 3 — COMPLETE TOURNAMENT HUB PAGE
# ═══════════════════════════════════════════════════════

## 3A — Tournament Data Hook

Create `src/hooks/useTournaments.ts`:
```typescript
'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Tournament } from '@/types/database'

type FilterState = {
  status: string
  game: string
  type: string
  search: string
}

export function useTournaments(filters: FilterState) {
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchTournaments() {
      setLoading(true)
      let query = supabase
        .from('tournaments')
        .select('*')
        .neq('status', 'draft')
        .order('created_at', { ascending: false })

      if (filters.status && filters.status !== 'all')
        query = query.eq('status', filters.status)
      if (filters.game && filters.game !== 'all')
        query = query.eq('game', filters.game)
      if (filters.type && filters.type !== 'all')
        query = query.eq('type', filters.type)
      if (filters.search)
        query = query.ilike('name', `%${filters.search}%`)

      const { data } = await query
      setTournaments(data ?? [])
      setLoading(false)
    }
    fetchTournaments()
  }, [filters.status, filters.game, filters.type, filters.search])

  // Supabase Realtime — slot count updates live
  useEffect(() => {
    const channel = supabase
      .channel('tournaments-realtime')
      .on('postgres_changes', {
        event: '*', schema: 'public', table: 'tournaments'
      }, (payload) => {
        setTournaments(prev =>
          prev.map(t => t.id === (payload.new as Tournament).id ? payload.new as Tournament : t)
        )
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  return { tournaments, loading }
}
```

## 3B — Tournament Card Component

Create `src/components/tournaments/TournamentCard.tsx`:

```
DESIGN SPEC:

Background: bg-[#0A0A0A]
Border: border border-[#1C1C1C] → hover:border-[#2463FF]
Transition: all 0.2s ease
Hover shadow: 0 0 16px rgba(36,99,255,0.15)
Corner decoration: small blue triangle (::before pseudo, clip-path triangle) on hover

HEADER (px-4 pt-4):
  Status badge full-width:
    UPCOMING → text-white/60 border-b border-[#1C1C1C] text-xs Courier New
    LIVE → blinking red dot + "🔴 LIVE" text-[#EF4444] with pulse animation
    COMPLETED → text-white/30 "✅ COMPLETED"
  If another org: small tag "> HOSTED_BY :: {org_name}"

MAIN CONTENT (px-4 py-3, space-y-1):
  Team name (Orbitron, text-lg, text-white font-bold)
  
  Details block (JetBrains Mono, text-xs, space-y-1):
    > GAME   :: {game}
    > DATE   :: {formatted_date} | {time} IST
    > FORMAT :: {format}
    > SLOTS  :: {filled}/{total}
    > PRIZE  :: ₹{prize_pool.toLocaleString()}     ← color: #2463FF ONLY this line
    > ENTRY  :: ₹{entry_fee}/TEAM
    > TYPE   :: {type.toUpperCase().replace('_', ' ')}

  Slot progress bar:
    Container: bg-[#111] h-1 w-full rounded-none
    Fill: bg-white → turns bg-[#F97316] at 80% → bg-[#EF4444] at 100%
    ASCII label below: "{filled}/{total} [{'█'.repeat(filled_pct/10)}{'░'.repeat(10-filled_pct/10)}]"
    (JetBrains Mono, text-[10px], text-white/40)

FOOTER (px-4 pb-4, flex gap-2 mt-3):
  If status === 'full':
    <Button variant="outline" disabled className="opacity-40 cursor-not-allowed flex-1">
      SLOTS FULL
    </Button>
  Else if status === 'completed':
    <Button variant="outline" className="flex-1" href={`/tournaments/${id}/results`}>
      VIEW RESULTS →
    </Button>
  Else:
    <Button variant="primary" className="flex-1" onClick={onRegister}>
      REGISTER NOW
    </Button>
  <Button variant="ghost" onClick={onViewDetails}>VIEW DETAILS →</Button>
```

## 3C — Tournament Grid + Live Banner

Create `src/components/tournaments/TournamentGrid.tsx`:

Renders `useTournaments` results in responsive grid.
Shows skeleton cards (3 animated pulsing placeholder cards) while `loading === true`.

Skeleton card: same dimensions as real card, `bg-[#0A0A0A] animate-pulse`

Live banner (conditional):
```tsx
// If any tournament has status === 'live', show this above the grid:
<div className="border-l-4 border-[#2463FF] bg-black px-4 py-3 mb-6 flex items-center justify-between">
  <div className="flex items-center gap-3">
    <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
    <span className="font-mono text-sm text-white">
      LIVE NOW: {liveTournament.name} — ROUND {currentRound}/{totalRounds}
    </span>
  </div>
  <div className="flex gap-4">
    <a href={`/tournaments/${liveTournament.id}?tab=bracket`} className="text-[#2463FF] text-xs font-mono">VIEW BRACKET →</a>
    <a href={`/tournaments/${liveTournament.id}?tab=leaderboard`} className="text-[#2463FF] text-xs font-mono">LEADERBOARD →</a>
  </div>
</div>
```

## 3D — Tournament Detail Modal

Create `src/components/tournaments/TournamentDetailModal.tsx`:

Full-screen modal (fixed inset-0 z-50, bg-black):

```
HEADER:
  [X close button] top-right, Courier New "[ CLOSE ]"
  Tournament name (Orbitron 32px)
  ASCII status line (Courier New):
    > STATUS :: {STATUS} | GAME :: {game} | TYPE :: {type}

4 QUICK STAT BOXES (grid 2x2 on mobile, 4-col on desktop):
  Each: border border-[#1C1C1C] p-3 text-center
  ┌────────┐  Value: JetBrains Mono 24px text-white
  │32 SLOTS│  Label: Courier New 10px text-white/40
  └────────┘

TAB BAR (border-b border-[#1C1C1C], Courier New tabs):
  [DETAILS] [RULES] [SCHEDULE] [TEAMS] [BRACKET] [LEADERBOARD]
  Active tab: border-b-2 border-[#2463FF] text-white

TAB: DETAILS
  Description paragraph (Inter, text-white/80)
  Registration dates formatted in JetBrains Mono

TAB: RULES
  Accordion items (▶ click to expand):
    ▶ Room Settings & In-Game Rules
    ▶ Code of Conduct & Fair Play
    ▶ Prize Distribution
    ▶ Dispute Resolution

TAB: SCHEDULE
  Day-by-day list (JetBrains Mono):
    > DAY_1 :: 20 JAN — QUALIFIER ROUNDS — 18:00-22:00 IST
    > DAY_2 :: 21 JAN — SEMI FINALS — 18:00-21:00 IST
    > DAY_3 :: 22 JAN — GRAND FINALS — 18:00-21:00 IST

TAB: TEAMS
  Loads teams from Supabase where tournament_id = id AND status = 'approved'
  List of approved team names + captain Discord tag
  Count: "24/32 TEAMS REGISTERED"

TAB: BRACKET (only shows data if published=true)
  Visual bracket tree component (see Phase 6B)
  If not published: "> BRACKET_STATUS :: NOT_YET_PUBLISHED"

TAB: LEADERBOARD (only shows data if published=true)
  Leaderboard table (see Phase 6C)
  If not published: "> LEADERBOARD_STATUS :: MATCH_NOT_STARTED"

BOTTOM CTA (sticky bottom):
  border-t border-[#1C1C1C] p-4 bg-black flex justify-end
  <Button variant="primary" onClick={openRegistrationWizard}>
    REGISTER YOUR TEAM →
  </Button>
```

## 3E — Squad Registration Wizard (MOST IMPORTANT COMPONENT)

Create `src/components/tournaments/RegistrationWizard.tsx`:

4-step multi-step modal with Framer Motion slide transitions between steps.

```
WIZARD HEADER (all steps):
  > REGISTRATION_WIZARD :: {tournament_name}
  Progress bar: 4 segments, filled = current step
  ─ STEP 1 ─── STEP 2 ─── STEP 3 ─── STEP 4 ─

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 1 — CAPTAIN CREATES TEAM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IF NOT LOGGED IN:
  "> AUTH_REQUIRED :: DISCORD_LOGIN_NEEDED"
  Instruction block (Courier New):
    > STEP_1A :: Click login button below
    > STEP_1B :: Authorize with Discord
    > STEP_1C :: Must be in MS Esports Discord server
  
  <Button variant="primary" onClick={loginWithDiscord} className="w-full">
    LOGIN WITH DISCORD
  </Button>

  async function loginWithDiscord() {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?next=/tournaments`,
        scopes: 'identify guilds',
      }
    })
  }

IF LOGGED IN:
  Show: "> AUTHENTICATED :: @{discord_username}"
  
  Form fields (all: bg-[#0A0A0A] border border-[#1C1C1C] focus:border-[#2463FF]):
    Team Name:  [________________]  required
    Team Tag:   [____]              required (max 4 chars, uppercase)
    Game:       [Select ▼]          required (Free Fire MAX / BGMI / CODM / MOBA / Legend RC)
    Format:     [Squad ▼]           auto-filled from tournament
  
  hCaptcha widget (import @hcaptcha/react-hcaptcha):
    <HCaptcha sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY} onVerify={setToken} />
  
  [CREATE TEAM & GET INVITE LINK →] — calls POST /api/teams/create

  API Route — `src/app/api/teams/create/route.ts`:
    1. Verify hCaptcha token with secret
    2. Verify user is authenticated
    3. Check user not already registered in this tournament
    4. Insert into teams table (status: 'pending', captain_id: user.id)
    5. Generate unique invite token (nanoid 12 chars)
    6. Store invite token in a teams_invites table or embed in team.id URL
    7. Return { team_id, invite_link: `${APP_URL}/join-team/${invite_token}` }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 2 — INVITE YOUR SQUAD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Invite link box (Courier New, border border-[#2463FF]):
    > INVITE_LINK :: https://ms.gg/join-team/XXXXXXXXXXXX
    [COPY LINK] [SHARE TO DISCORD]
  
  Player join status (Supabase Realtime subscription on players table):
    Each slot updates live as members join:
    
    > SLOT_1 :: [CAPTAIN] @{captain_discord}  ✓ JOINED
    > SLOT_2 :: [Waiting for player...]        ⏳ PENDING
    > SLOT_3 :: [Waiting for player...]        ⏳ PENDING
    > SLOT_4 :: [Waiting for player...]        ⏳ PENDING
    > SUB    :: [Optional — Waiting...]        ○ OPTIONAL
  
  Each joined player also fills:
    IGN: [___________]  required
    Role: [IGL ▼]       IGL / Rusher / Sniper / Support / Sub
    Game Screenshot: [📎 Upload your in-game profile]
      → Upload to Supabase Storage: players/{team_id}/{player_id}_screenshot.jpg
  
  [NEXT: PAYMENT →] — enabled only when slots 1-4 are filled AND all have uploaded screenshots

  Join Team Page — `src/app/join-team/[token]/page.tsx`:
    1. Validate token → fetch team info
    2. Require Discord login if not authenticated
    3. Show form: IGN + role + screenshot upload
    4. Insert into players table
    5. Redirect back to team status

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 3 — PAYMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Terminal styled instructions:
    > ENTRY_FEE :: ₹{entry_fee}
    > UPI_ID    :: magadhstriker@upi
    > AMOUNT    :: ₹{entry_fee} EXACTLY
    > NOTE      :: Team name "{team_name}"
  
  QR code placeholder (img or canvas showing UPI QR if available)
  
  Form:
    UPI Transaction ID: [________________]  required
    Payment Screenshot: [📎 Upload]         required
      → Upload to Supabase Storage: payments/{team_id}/payment_screenshot.jpg
  
  [SUBMIT REGISTRATION →] — calls POST /api/teams/submit-payment

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 4 — SUCCESS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ASCII success block:
    ╔══════════════════════════════════════════╗
    ║  > REGISTRATION_STATUS :: SUBMITTED      ║
    ║  > PAYMENT_STATUS      :: UNDER_REVIEW   ║
    ║  > SLOT_STATUS         :: PENDING        ║
    ║                                          ║
    ║  We'll confirm via WhatsApp + Discord    ║
    ║  within 24 hours.                        ║
    ║                                          ║
    ║  TEAM :: {team_name}                     ║
    ║  TOURNAMENT :: {tournament_name}         ║
    ╚══════════════════════════════════════════╝
  
  [JOIN OUR DISCORD →] [BACK TO TOURNAMENTS]
```

## 3F — Hall of Fame Section

Create `src/components/tournaments/HallOfFame.tsx`:

Fetches completed tournaments with winner data from Supabase.
Shows 3 featured winner cards (B&W trophy cards) + full results table.

---

# ═══════════════════════════════════════════════════════
# PHASE 4 — COMPLETE REMAINING PUBLIC PAGES
# ═══════════════════════════════════════════════════════

## 4A — Services Page — `src/app/services/page.tsx` + components

Create `src/app/services/page.tsx` that imports these section components:

**ServicesHero.tsx** — 50vh hero, scanlines, terminal header
**ServicesGrid.tsx** — 6 service cards in 3×2 grid, ASCII box borders, Supabase-driven or static content
**StreamingGaming.tsx** — 2-col: Game tiles + YouTube/Kick comparison table
**SponsorshipPackages.tsx** — 3-tier ASCII table (Bronze / Gold / Title) with pricing
**ContactForm.tsx** — 2-col contact info + Supabase-wired form (saves to a `contact_submissions` table)

ContactForm API route `src/app/api/contact/route.ts`:
  - Validates all fields
  - Inserts into Supabase contact_submissions table (create this table)
  - Sends Discord webhook notification to admin channel
  - Returns 200 success

## 4B — Our Story Page — `src/app/our-story/page.tsx` + components

**StoryHero.tsx** — Cinematic 70vh, typewriter animation ("INITIATING SEQUENCE..."), Framer Motion
**StoryOrigin.tsx** — 2-col, pull quote + body, founder photo grayscale
**MilestoneTimeline.tsx** — Vertical timeline, Supabase-driven OR static data, scroll-trigger Framer Motion each milestone
**RosterDatabase.tsx**:
  - 3 tab switcher: COMPETITIVE / CONTENT / MANAGEMENT
  - Fetches from Supabase `roster` table: `.eq('type', activeTab)`
  - Supabase Realtime subscription for live roster updates
  - Player cards: grayscale photo, IGN (Orbitron), real name (Inter), role badge
  - Photo filter: CSS `filter: grayscale(100%)` → hover: `grayscale(50%) sepia(0.2)`
**MissionValues.tsx** — 4 ASCII box value cards + closing manifesto

## 4C — Blog Page — `src/app/blog/page.tsx` + components

**BlogHero.tsx** — 40vh, category filter tabs
**BlogGrid.tsx**:
  - Fetches from Supabase `blog_posts` where status = 'published', order by published_at desc
  - Category filter: useState for activeCategory, filters the fetched array
  - Featured post (first/pinned) as large full-width card
  - Remaining posts in 3-col grid
  - Pagination: LIMIT 9, page state, prev/next buttons
  - Each post: grayscale thumbnail, category badge, title (Rajdhani), author in Courier New, excerpt, READ → link
  - Click links to `/blog/[slug]`
**NewsletterSocial.tsx** — Newsletter signup (Supabase insert to `newsletter_subscribers` table) + social links

Blog Post Page — `src/app/blog/[slug]/page.tsx`:
  - Fetch single post from Supabase by slug
  - generateStaticParams for SSG
  - Render rich HTML content from `post.content` (with `dangerouslySetInnerHTML` — sanitize first)
  - Article layout: grayscale header image, title, author info, category, published date, body content
  - Back link: ← BACK TO NEWS

---

# ═══════════════════════════════════════════════════════
# PHASE 5 — COMPLETE ADMIN LOGIN + DASHBOARD
# ═══════════════════════════════════════════════════════

## 5A — Admin Login Page — `src/app/admin/login/page.tsx`

```
FULL SCREEN BLACK TERMINAL:

Center-aligned, max-w-sm:

ASCII art header (Courier New, text-[#1C1C1C], text-sm, pre):
  ╔═══════════════╗
  ║  MS ESPORTS  ║
  ║  ADMIN PORTAL║
  ╚═══════════════╝

"> MAGADH_STRIKER :: ADMIN_SYSTEM_v1"
"> AUTHENTICATION_REQUIRED"
"─────────────── ◆ ───────────────"

<Button variant="primary" size="lg" className="w-full mt-6" onClick={signInWithDiscord}>
  SIGN IN WITH DISCORD
</Button>

function signInWithDiscord() {
  const supabase = createClient()
  supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo: `${window.location.origin}/api/auth/callback?next=/admin`,
      scopes: 'identify guilds',
    }
  })
}

Error display (if error query param):
  "> ERROR :: UNAUTHORIZED_ACCESS"
  "> ACTION :: CONTACT_SUPER_ADMIN"

Bottom: "> UNAUTHORIZED_ACCESS_IS_LOGGED"
```

## 5B — Admin Dashboard — `src/app/admin/page.tsx` (COMPLETE)

Replace the V1 stub with a full implementation:

```
COMPONENTS NEEDED:
  src/components/admin/KPICards.tsx      — 8 stat cards from Supabase
  src/components/admin/LiveBanner.tsx    — conditional live tournament alert
  src/components/admin/ActivityFeed.tsx  — last 50 actions from Supabase audit log
  src/components/admin/DashboardCharts.tsx — Recharts 4 charts
  src/components/admin/QuickActions.tsx  — 4 action buttons
  src/components/admin/UpcomingEvents.tsx — next 5 tournaments timeline

KPICards fetches (parallel Supabase queries):
  const [activeTours, liveTour, pendingRegs, totalTeams, prizeGiven, blogPosts, siteVisits] =
    await Promise.all([
      supabase.from('tournaments').select('id', {count: 'exact'}).in('status', ['registering','live']),
      supabase.from('tournaments').select('*').eq('status', 'live').single(),
      supabase.from('teams').select('id', {count: 'exact'}).eq('status', 'pending'),
      supabase.from('teams').select('id', {count: 'exact'}),
      supabase.from('leaderboard').select('total_points').eq('rank', 1), // approximation
      supabase.from('blog_posts').select('id', {count: 'exact'}).eq('status', 'published'),
      supabase.from('site_settings').select('value').eq('key', 'total_visitors').single(),
    ])

DashboardCharts uses Recharts:
  Chart 1: AreaChart — registrations by month (last 12)
  Chart 2: BarChart — prize pool by tournament
  Chart 3: PieChart — team distribution by game division
  Chart 4: LineChart — daily blog views (mock data or Supabase analytics table)

  Chart styling:
    background: transparent
    grid: stroke="#1C1C1C"
    axes: stroke="#4A4A4A" tick fill="#4A4A4A" fontFamily="JetBrains Mono"
    data lines/bars/areas: #2463FF for primary, #FFFFFF for secondary
    tooltips: bg-[#0A0A0A] border border-[#1C1C1C] font-mono text-white
```

## 5C — Complete Admin Layout & Sidebar

Replace V1 `src/app/admin/layout.tsx` stub with full implementation:

```
ADMIN LAYOUT (flex, h-screen, overflow-hidden):

SIDEBAR (w-64, bg-[#070C1A], border-r border-[#1A2540], flex flex-col, fixed left-0 top-0 h-screen):
  Header (p-4 border-b border-[#1A2540]):
    MS logo SVG (white, 24px) + "ADMIN PORTAL" (Courier New, text-xs, text-white/40)

  Nav (flex-1, overflow-y-auto, py-4):
    Each nav group (label + sub-items):
    
    Group: MAIN
      > DASHBOARD          /admin
    
    Group: TOURNAMENTS
      > ALL_TOURNAMENTS    /admin/tournaments
      > CREATE_NEW         /admin/tournaments/new
      If live tournament: > 🔴 {name}  /admin/tournaments/[id]/manage  (pulsing)

    Group: TEAMS_PLAYERS
      > ALL_TEAMS          /admin/teams
      > PLAYER_REGISTRY    /admin/teams/players
      > BANNED_IGNs        /admin/teams/banned

    Group: CONTENT_CMS
      > BLOG_POSTS         /admin/cms/blog
      > ROSTER_MANAGER     /admin/cms/roster
      > MERCHANDISE        /admin/cms/merch
      > SPONSORS           /admin/cms/sponsors
      > LAN_TICKETS        /admin/cms/tickets
      > MEDIA_LIBRARY      /admin/cms/media

    Group: COMMUNICATIONS
      > BROADCAST          /admin/communications
      > AUTO_TEMPLATES     /admin/communications/templates
      > MESSAGE_LOG        /admin/communications/log

    Group: REPORTS
      > ANALYTICS          /admin/analytics
      > REPORTS            /admin/analytics/reports

    Group: SYSTEM
      > ADMIN_USERS        /admin/settings/users
      > SITE_CONFIG        /admin/settings/site
      > AUDIT_LOG          /admin/settings/audit

  Footer (p-4 border-t border-[#1A2540]):
    User avatar + discord_username + role badge
    [SIGN OUT] → supabase.auth.signOut()

TOPBAR (ml-64, h-14, border-b border-[#1A2540], bg-[#03060F]):
  Left: breadcrumb (Courier New, text-xs, text-white/40)
  Right: notifications bell (Lucide, badge count from pending regs) + admin avatar

MAIN (ml-64, mt-14, flex-1, overflow-y-auto, p-6, bg-[#03060F]):
  {children}
```

---

# ═══════════════════════════════════════════════════════
# PHASE 6 — COMPLETE ADMIN TOURNAMENT MANAGEMENT
# ═══════════════════════════════════════════════════════

## 6A — Tournament List — `src/app/admin/tournaments/page.tsx`

Full data table with Supabase fetch:
- Columns: ID | Name | Game | Type | Date | Slots | Prize | Status | Actions
- Status badges: colored pill tags using st-* variables
- Per-row actions: Edit (link) | Manage (link) | Archive (button with confirm dialog)
- Bulk actions: checkbox select → bulk publish / bulk cancel / export CSV
- Filter bar: Status dropdown | Game dropdown | Date range pickers | Search input
- [+ NEW TOURNAMENT] → links to /admin/tournaments/new

## 6B — Tournament Creation Wizard — `src/app/admin/tournaments/new/page.tsx`

6-step wizard with React useState for step tracking and form data.

Create `src/components/admin/tournaments/wizard/`:
```
Step1BasicInfo.tsx
Step2Schedule.tsx
Step3SlotsRegistration.tsx
Step4PrizeEntry.tsx
Step5ScoringRooms.tsx
Step6ReviewPublish.tsx
WizardProgress.tsx
```

**Step1BasicInfo** fields (all styled: bg-[#0B1223] border border-[#1A2540] focus:border-[#2463FF]):
  - Tournament Name (text input)
  - Game Division (select: Free Fire MAX / BGMI / CODM / MOBA / Legend RC)
  - Tournament Type (select: open / invitational / govt_scrim / private_scrim)
  - Format (select: Solo / Duo / Squad / Custom)
  - Allow Other Orgs to Host (toggle switch)
  - Hosting Org Name (text, conditional on above toggle)
  - Description (textarea, rich text if Tiptap installed)
  - Rules (textarea)
  - Cover Image (upload to Supabase Storage: tournaments/covers/{filename})

**Step2Schedule** fields:
  - Registration Opens (datetime-local input)
  - Registration Closes (datetime-local input)
  - Tournament Start (datetime-local input)
  - Tournament End (datetime-local input)
  - Schedule Builder: array of {day, date, event, startTime, endTime} — [+ Add Day] button

**Step3SlotsRegistration** fields:
  - Total Slots (select: 8/16/24/32/48/64)
  - Waitlist Slots (number)
  - Auto-close on full (toggle)
  - Registration Mode (select: open / invite_code / admin_approved)
  - Invite Code (text, auto-generate button)

**Step4PrizeEntry** fields:
  - Entry Fee ₹ (number)
  - UPI ID (text)
  - Payment Deadline Hours (number, default 24)
  - Auto-reject unpaid after deadline (toggle)
  - Prize Pool ₹ (number)
  - Distribution mode (toggle: Auto % / Manual ₹)
  - Auto: 1st % / 2nd % / 3rd % (inputs, validate sum = 100)
  - MVP Award ₹ (optional, toggle)
  - Top Fragger Award ₹ (optional, toggle)

**Step5ScoringRooms** fields:
  - Scoring System (select: battle_royale / kill_only / placement_only / custom)
  - Position points table (editable grid: Position 1-20+ → pts per position)
  - Kill points per kill (number)
  - Total Rounds (number)
  - Tiebreaker (select: total_kills / total_placements / head_to_head)
  - Room ID Pattern (text, default: MS-{YEAR}-{MMDD}-M{N})
  - Password Pattern (text, default: STRIKER#{NN})
  - Auto-send room details (toggle)
  - Auto-send timing (select: 15min / 30min / 1hr before match)

**Step6ReviewPublish**:
  - Display all collected data in ASCII-formatted review block
  - Preview public page button (opens preview in new tab)
  - [SAVE AS DRAFT] → Supabase insert with status: 'draft'
  - [PUBLISH NOW] → Supabase insert with status: 'published', send Discord webhook
  - [SCHEDULE → datetime] → Supabase insert + create cron/edge function trigger

## 6C — Tournament Management Hub — `src/app/admin/tournaments/[id]/manage/page.tsx`

Tab-based layout. Create sub-components:

```
src/components/admin/tournaments/manage/
  OverviewTab.tsx
  RegistrationsTab.tsx
  BracketTab.tsx
  ScoringTab.tsx
  LeaderboardTab.tsx
  ResultsTab.tsx
```

### OverviewTab.tsx

Fetch tournament + aggregate registration stats from Supabase.
Show phase pipeline (current phase highlighted in blue).
[ADVANCE TO NEXT PHASE] button → updates tournament status in Supabase → sends Discord webhook.

### RegistrationsTab.tsx (CRITICAL)

```
DATA: supabase.from('teams')
  .select('*, players(*)')
  .eq('tournament_id', tournamentId)
  .order('registered_at', { ascending: false })

Supabase Realtime subscription: new registrations appear instantly (no refresh)

TOP BAR:
  Filter tabs: All | Pending | Approved | Rejected | Waitlisted | Paid | Unpaid
  Bulk actions (shown when rows checked):
    [✓ APPROVE SELECTED] [✗ REJECT SELECTED] [📤 EXPORT CSV] [💬 BROADCAST]
  [✓ APPROVE ALL PAID] — one-click bulk approve where payment_status = 'verified'

TABLE (all data from Supabase):
  Columns (JetBrains Mono cells):
    ☐ | # | TEAM_NAME | CAPTAIN | DISCORD | PLAYERS | PAYMENT | STATUS | ACTIONS

  Each row:
    Status badge: PENDING (yellow) | APPROVED (green) | REJECTED (red) | WAITLISTED (orange)
    Payment: 🟢 VERIFIED | 🟡 PENDING | ❌ NOT_RECEIVED
    Actions: [✓] [✗] [👁] [💬]

TEAM DETAIL MODAL (clicking 👁):
  Title: "> TEAM_PROFILE :: {team_name}"
  
  All team data (JetBrains Mono):
    > CAPTAIN      :: {name} | {phone} | {email}
    > DISCORD      :: {discord_username}
    > REGISTERED   :: {formatted datetime}
    > PAYMENT_REF  :: {upi_ref}
    > PAYMENT_SS   :: [VIEW IMAGE ↗] → opens in new tab (Supabase Storage URL)
  
  Player roster:
    > SLOT_1 :: IGN: {ign} | ROLE: {role} | SCREENSHOT: [VIEW ↗] | LEVEL: {level}
    > SLOT_2 :: ...
    (Fetch from players table by team_id)
  
  Admin Notes: textarea → saves to teams.admin_notes in Supabase on blur
  
  Communication Log:
    (Fetch from message_log where recipient_team_id = team.id, order by sent_at desc)
    > {datetime} [{channel}] {message} [{status}]
  
  Actions:
    [✓ APPROVE] → supabase.from('teams').update({status: 'approved'}) + Discord DM webhook
    [✗ REJECT + REASON] → modal input for reason → update + notify
    [↓ WAITLIST] → update status to 'waitlisted'
    [💬 SEND MSG] → opens compose modal → logs to message_log
```

### BracketTab.tsx

```
STATE: bracketType (single_elim / double_elim / swiss / group_stage)
      seedingMethod (random / manual)
      generatedBracket (array of rounds + matches)
      published (boolean from Supabase)

BRACKET GENERATOR UI:
  Config selectors (same terminal style as all admin inputs)
  [🎲 GENERATE BRACKET] button

Bracket Generation Logic (src/utils/bracket/generator.ts):

export function generateSingleElimination(teams: Team[]): BracketRound[] {
  const shuffled = [...teams].sort(() => Math.random() - 0.5)
  const rounds: BracketRound[] = []
  let currentTeams = shuffled
  let roundNum = 1

  while (currentTeams.length > 1) {
    const matches: BracketMatch[] = []
    for (let i = 0; i < currentTeams.length; i += 2) {
      matches.push({
        id: `r${roundNum}_m${i/2+1}`,
        teamA: currentTeams[i] ?? null,
        teamB: currentTeams[i+1] ?? null,
        winner: null,
        roundNumber: roundNum,
        matchNumber: i/2+1,
      })
    }
    rounds.push({ roundNumber: roundNum, name: getRoundName(currentTeams.length), matches })
    currentTeams = matches.map(m => m.winner ?? null).filter(Boolean) as Team[]
    roundNum++
  }
  return rounds
}

function getRoundName(teamCount: number): string {
  if (teamCount <= 2) return 'Grand Final'
  if (teamCount <= 4) return 'Semi Finals'
  if (teamCount <= 8) return 'Quarter Finals'
  return `Round of ${teamCount}`
}

VISUAL BRACKET (src/components/admin/tournaments/manage/BracketTree.tsx):
  Renders rounds horizontally, matches stacked vertically
  Each match cell:
    border border-[#1A2540] p-2 min-w-[160px]
    Team A name (text-white text-sm)
    vs (text-white/20 text-xs text-center)
    Team B name (text-white text-sm)
    Score (JetBrains Mono text-[#2463FF] if decided)
  
  Connector lines between rounds (SVG or CSS borders)
  
  Drag-to-swap seeding: wrap team names in <Draggable> from @dnd-kit/core

[PUBLISH BRACKET → WEBSITE] button:
  → Save all match rows to Supabase matches table
  → Send Discord webhook: "Bracket is LIVE! 🏆 [link]"
  → Sets published = true

[EXPORT PNG] → html2canvas or similar
```

### ScoringTab.tsx

```
MATCH SELECTOR: dropdown of all matches for this tournament
Selected match shows:

ROOM ID PANEL:
  > MATCH :: {round_name} — Match {match_number}
  > SCHEDULED :: {formatted datetime}
  
  Inputs:
    Room ID:  [AUTO-GEN based on pattern | editable] [COPY]
    Password: [AUTO-GEN | editable] [COPY]
    Map: [Bermuda ▼]  Mode: [Classic ▼]  POV: [TPP ▼]
  
  Send panel:
    Recipients: [All Approved Teams ▼] | [Teams In This Match Only]
    Timing: [30 min before ▼]
    [📤 SEND ROOM DETAILS]
    
    → POST /api/admin/send-room-details
    → Updates match.room_id + room_password + room_sent in Supabase
    → Posts to Discord webhook #room-info with message

SCORE ENTRY TABLE (after room is sent):
  Header: "> ROUND {n} SCORES — {round_name}"
  
  For each team in this match (fetched from teams table):
    Row: Team Name | Position [1-20 ▼] | Kills [number] | Pos Pts (auto) | Kill Pts (auto) | TOTAL (auto)
  
  Auto-calculation (live, triggered on Position/Kills change):
    positionPoints = scoring_formula.placements[position] ?? 0
    killPoints = kills * scoring_formula.killPoints
    total = positionPoints + killPoints
  
  [SAVE ROUND {n}] → Inserts round_scores rows into Supabase
  [+ ADD ROUND] → increments round counter
  [FINALIZE MATCH] → determines winners, advances bracket

Score calculation utility (src/utils/scoring/calculator.ts):
  export function calculateTeamScore(
    formula: ScoringFormula,
    position: number,
    kills: number
  ): { positionPoints: number; killPoints: number; total: number }
  
  export function recalculateLeaderboard(
    tournamentId: string,
    allScores: RoundScore[]
  ): LeaderboardEntry[]
    → Aggregates total points + kills per team across all rounds
    → Sorts by total_points desc, tiebreak by total_kills desc
    → Returns ranked array
```

### LeaderboardTab.tsx

```
DATA: Supabase Realtime subscription on round_scores + leaderboard tables for this tournament
  → Auto-recalculates whenever new scores are saved

TABLE (dense, monospace):
  Columns: RANK | TEAM_NAME | TOTAL_PTS | KILLS | R1 | R2 | R3 | R4 | R5 | R6

  Top 3 rows: gold/silver/bronze emoji prefix 🥇🥈🥉
  All numbers: JetBrains Mono
  
  Auto-updates when new round_scores are saved (Realtime)

TOGGLE: AUTO_PUBLISH AFTER EACH ROUND [ON/OFF]
  When ON → sets leaderboard.published = true after each save → appears on public site

[PUBLISH TO WEBSITE] → supabase.from('leaderboard').update({published: true})
[HIDE FROM PUBLIC] → update published = false
[EXPORT PDF] → jsPDF table render
```

### ResultsTab.tsx

```
FINAL RESULTS (shows after last round completed):
  Fetch top 3 from leaderboard + formula for MVP/Top Fragger

  Display:
    🏆 CHAMPION   :: {team_name}  →  ₹{prize_first}   [MARK PAID ✓]
    🥈 RUNNER-UP  :: {team_name}  →  ₹{prize_second}  [MARK PAID ✓]
    🥉 3RD PLACE  :: {team_name}  →  ₹{prize_third}   [MARK PAID ✓]
    ⚡ MVP         :: {player_ign} →  ₹{mvp_prize}     [MARK PAID ✓]
    🎯 TOP FRAGGER :: {player_ign}({kills}K) → ₹{frag_prize} [MARK PAID ✓]

  MARK PAID → updates teams.payment_status in results (or a separate prizes table)

  POST-TOURNAMENT ACTIONS:
  [🌐 PUBLISH FINAL RESULTS TO WEBSITE]
    → sets tournament.status = 'completed'
    → publishes final leaderboard

  [📢 SEND WINNER ANNOUNCEMENT]
    → POST /api/admin/announce-winner
    → Sends to Discord webhook #announcements:
      "🏆 {team_name} wins {tournament_name}! Prize: ₹{prize_pool} [results link]"
    → Logs to message_log

  [📜 GENERATE CERTIFICATES (PDF)]
    → Creates PDF per winner using jsPDF:
      - MS Esports header (text logo since no image embedding in prompt)
      - "This certifies that {TEAM_NAME}"
      - "achieved {POSITION} place in {TOURNAMENT_NAME}"
      - "Date: {date} | Prize: ₹{prize}"
      - "— Magadh Striker Esports, Bihar, India"
    → Auto-downloads ZIP of 3 PDFs

  [🗄️ ARCHIVE TOURNAMENT]
    → Confirm dialog
    → Sets tournament.status = 'completed' (already set above)
    → Removes from active view, moves to archive tab
```

---

# ═══════════════════════════════════════════════════════
# PHASE 7 — COMPLETE REMAINING ADMIN MODULES
# ═══════════════════════════════════════════════════════

## 7A — Teams & Players — `src/app/admin/teams/`

**`/admin/teams/page.tsx`** — All teams across all tournaments:
  - Table: Team Name | Captain Discord | Game | Tournament | Registered | W/L | Status
  - Click any row → /admin/teams/[id] team profile page
  - Filter: by game, tournament, status

**`/admin/teams/players/page.tsx`** — Player IGN registry:
  - Search across all players table by IGN, Discord, phone
  - Duplicate IGN detector: highlight rows where same IGN appears > 1 time
  - [🚫 BAN IGN] → sets player.banned_ign = true + blocks future registrations

**`/admin/teams/banned/page.tsx`** — Banned IGNs list with reason + unban (super_admin only)

## 7B — CMS Modules

**`/admin/cms/blog/page.tsx`** — Blog list table
**`/admin/cms/blog/new/page.tsx`** AND **`/admin/cms/blog/[id]/page.tsx`** — Blog editor:
  - Rich text editor using Tiptap: `npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image`
  - Toolbar: Bold | Italic | H1/H2/H3 | Lists | Blockquote | Link | Image upload
  - SEO fields: Title | Meta Description | Slug (auto-generated, editable)
  - Category (select) + Tags (input + chip list)
  - Author selector (dropdown from users table where role != 'user')
  - Status: draft / published / scheduled + schedule datetime picker
  - [PREVIEW] → renders into a modal with public site styling
  - [SAVE DRAFT] / [PUBLISH NOW] / [SCHEDULE]
  - All saves go to Supabase blog_posts table

**`/admin/cms/roster/page.tsx`** — Player cards with inline edit:
  - Add/Edit/Delete player cards (fetches from Supabase roster table)
  - Image upload to Supabase Storage: roster/{id}.jpg
  - Featured on homepage toggle → roster.featured_home

**`/admin/cms/merch/page.tsx`** — Products manager:
  - Add/Edit/Delete products (fetches from products table)
  - Multi-image upload gallery (Supabase Storage: products/{id}/)
  - Size variant builder: S/M/L/XL/XXL + per-size stock count
  - Low stock badge when any size stock < low_stock_alert

**`/admin/cms/sponsors/page.tsx`** — Sponsor manager:
  - Tier tabs: Title / Gold / Bronze
  - Drag-to-reorder (display_order field) using @dnd-kit
  - Contract date expiry: if contract_end < today → auto set is_active = false

**`/admin/cms/tickets/page.tsx`** — LAN Tickets module:
  - Create LAN event (event_name, date, venue, total_seats, price)
  - Ticket orders table: buyer | phone | payment screenshot | status | ticket_code
  - [CONFIRM] → generates unique 8-char ticket_code (nanoid), sets status = 'confirmed'
  - [EXPORT ATTENDEES] → CSV download with all confirmed buyers

**`/admin/cms/media/page.tsx`** — Media Library:
  - Lists all files from Supabase Storage (list all buckets: tournaments, players, payments, roster, products)
  - Grid view with thumbnails (image files) or file icons
  - Click → copy public URL to clipboard
  - Delete file button (with confirm)
  - Upload zone (drag and drop → upload to selected bucket)

## 7C — Communications — `src/app/admin/communications/`

**`/page.tsx`** — Broadcast Composer:
  - Target audience dropdown: All Teams | Tournament Teams | By Game | Approved Only | Waitlisted
  - If Tournament Teams: tournament selector dropdown
  - Message textarea (plain text with character count)
  - Channel checkboxes: [Discord Webhook ✓] [Log for WhatsApp]
  - [PREVIEW MESSAGE] → shows template rendered
  - [SEND NOW] / [SCHEDULE → datetime]
  - Sends to selected Discord webhooks + logs to message_log table

**`/templates/page.tsx`** — Auto Notification Templates:
  - Table of 10 templates (listed below)
  - Edit each template (textarea with variable hints)
  - [TEST SEND] → sends to admin's own Discord
  - Save → updates a `notification_templates` table in Supabase

  10 templates:
    1. registration_received — WhatsApp
    2. team_approved — WhatsApp
    3. team_rejected — WhatsApp
    4. team_waitlisted — WhatsApp
    5. waitlist_promoted — WhatsApp
    6. slots_full — Discord
    7. bracket_published — Discord + WhatsApp
    8. room_details — WhatsApp
    9. results_published — Discord + WhatsApp
    10. ticket_confirmed — WhatsApp

**`/log/page.tsx`** — Message Log:
  - Full table from message_log table: Date | Recipient Team | Channel | Trigger | Status
  - Filter: tournament, team, channel, status, date range
  - [RESEND] button on failed rows → re-triggers the send

## 7D — Analytics — `src/app/admin/analytics/`

**`/page.tsx`** — Overview Charts (Recharts):
  All charts styled with black bg, JetBrains Mono axes, blue (#2463FF) data color:
  
  1. AreaChart — registrations per month (last 12 months)
  2. BarChart — prize pool per tournament (top 10)
  3. PieChart — teams by game division
  4. LineChart — leaderboard score trends (mock or real)

**`/reports/page.tsx`** — Report Generator:
  - Report type selector: Tournament Summary | Registration Export | Prize Record | Full Season
  - Tournament selector + date range
  - Format: PDF / CSV
  - [GENERATE & DOWNLOAD]
  
  CSV: construct CSV string client-side from Supabase data, trigger download via Blob
  PDF: jsPDF with tournament data formatted as table

## 7E — Settings — `src/app/admin/settings/`

**`/users/page.tsx`** — Admin User Manager (super_admin only):
  - Table of all users where role != 'user'
  - [+ ADD ADMIN] → form: Discord username search + assign role
  - [DEACTIVATE] → sets is_banned = true
  - Role change dropdown per row

**`/site/page.tsx`** — Website Configuration:
  - Form loads all key-value pairs from site_settings table
  - Fields: org_name | tagline | contact_email | phone | location | upi_id
  - Hero stats: players_scouted | tournaments_played | prize_pool | hosted
  - Social URLs: instagram | youtube | twitter | discord | whatsapp
  - Discord webhooks: announcements | room_info | admin_alerts
  - Hero video URL (YouTube)
  - [SAVE ALL SETTINGS] → batch upsert to site_settings table

**`/audit/page.tsx`** — Audit Log (read-only):
  - Create `audit_log` table in Supabase:
    (id, admin_id, admin_name, action, details, entity_type, entity_id, created_at)
  - Create a Supabase trigger/function that inserts to audit_log on key table changes
  - Display as table: Datetime | Admin | Action | Details
  - Full-text search + date range filter
  - Export CSV

---

# ═══════════════════════════════════════════════════════
# PHASE 8 — API ROUTES & SERVER ACTIONS
# ═══════════════════════════════════════════════════════

Create these Next.js API routes:

```
src/app/api/
  auth/
    callback/route.ts          ← DONE in Phase 1D
  teams/
    create/route.ts            ← Creates team + generates invite token
    submit-payment/route.ts    ← Saves payment screenshot + updates team
    join/[token]/route.ts      ← Validates invite token, adds player
  admin/
    send-room-details/route.ts ← Sends room ID to Discord webhook + logs
    announce-winner/route.ts   ← Sends winner announcement to Discord
    broadcast/route.ts         ← Sends broadcast message to Discord webhook
    generate-certificate/route.ts ← Returns PDF buffer for winner cert
  contact/route.ts             ← Saves contact form + Discord admin alert
  newsletter/route.ts          ← Saves email to newsletter_subscribers
  upload/route.ts              ← Handles file uploads to Supabase Storage
```

Discord Webhook utility `src/lib/discord.ts`:
```typescript
export async function sendDiscordWebhook(webhookUrl: string, message: {
  content?: string
  embeds?: Array<{
    title?: string
    description?: string
    color?: number
    fields?: Array<{ name: string; value: string; inline?: boolean }>
  }>
}) {
  if (!webhookUrl) return
  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  })
}

export const webhooks = {
  announcements: process.env.DISCORD_WEBHOOK_ANNOUNCEMENTS ?? '',
  roomInfo: process.env.DISCORD_WEBHOOK_ROOM_INFO ?? '',
  adminAlerts: process.env.DISCORD_WEBHOOK_ADMIN_ALERTS ?? '',
}
```

---

# ═══════════════════════════════════════════════════════
# PHASE 9 — TOAST, MODALS & GLOBAL UI STATE
# ═══════════════════════════════════════════════════════

## Toast System — `src/components/ui/Toast.tsx` + `src/contexts/ToastContext.tsx`

```typescript
// Context provides:
// addToast(message: string, type: 'success' | 'error' | 'warning' | 'info')
// removeToast(id: string)

// Toast display: fixed top-4 right-4 z-[100], flex flex-col gap-2
// Each toast:
//   bg-[#0A0A0A] border border-[#1C1C1C] p-3 flex gap-3 items-start
//   Icon: ✓ (success, green) | ✗ (error, red) | ⚠ (warning, yellow) | ℹ (info, blue)
//   Text: Courier New, text-sm, text-white
//   Auto-dismiss after 4 seconds with slide-out Framer Motion animation
```

## Confirm Dialog — `src/components/ui/ConfirmDialog.tsx`

For all destructive actions (reject team, ban IGN, cancel tournament, archive):
```
Modal overlay:
  bg-black/80 fixed inset-0 z-50 flex items-center justify-center

Dialog (bg-[#0A0A0A] border border-[#1A2540] p-6 max-w-sm):
  "> CONFIRM_ACTION_REQUIRED"
  Title: what action
  Description: what will be deleted/changed
  If type = 'type-to-confirm':
    "Type {confirmWord} to proceed:"
    [text input]
  Buttons:
    [CANCEL] (outline) [CONFIRM] (solid red for destructive)
```

---

# ═════════════════════════════════════════════════�