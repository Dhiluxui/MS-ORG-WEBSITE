# ████████████████████████████████████████████████████████████████████
# MAGADH STRIKER ESPORTS — V3 CONTINUATION PROMPT
# Platform: Antigravity AI | Model: Gemini 3.1 High
# Continues from: V2 (Supabase wired, Tournament Hub complete)
# ████████████████████████████████████████████████████████████████████

---

# ═══════════════════════════════════════════════
# CONTEXT: WHAT IS ALREADY BUILT — DO NOT REBUILD
# ═══════════════════════════════════════════════

✅ COMPLETE — DO NOT TOUCH:

```
src/
├── lib/supabase/
│   ├── client.ts          ← browser client
│   ├── server.ts          ← SSR client
│   └── admin.ts           ← service role client
├── types/database.ts      ← all Supabase types
├── middleware.ts           ← /admin route protection
├── app/
│   ├── api/auth/callback/route.ts     ← Discord OAuth handler
│   ├── page.tsx           ← Landing page (all 8 sections)
│   │   └── HeroSection.tsx
│   └── tournaments/
│       ├── page.tsx       ← Tournament Hub (all 6 sections)
│       └── _components/
│           ├── TournamentCard.tsx
│           ├── TournamentGrid.tsx
│           ├── TournamentDetailModal.tsx (6-tab)
│           ├── RegistrationWizard.tsx (4-step)
│           └── HallOfFame.tsx
└── hooks/
    └── useTournaments.ts  ← Supabase Realtime hook
```

---

# ═══════════════════════════════════════════════
# V3 BUILD ORDER — EXECUTE IN THIS EXACT SEQUENCE
# ═══════════════════════════════════════════════

```
PHASE 3A — Services Page         /services         (5 sections)
PHASE 3B — Our Story Page        /our-story        (5 sections)
PHASE 3C — Blog Page             /blog             (3 sections)
PHASE 3D — Admin Layout          /admin/**         (sidebar + topbar shell)
PHASE 3E — Admin Dashboard       /admin            (KPIs + charts + feed)
PHASE 3F — Admin Tournaments     /admin/tournaments (list + 6-step wizard)
PHASE 3G — Tournament Hub        /admin/tournaments/[id]/manage (6-tab hub)
PHASE 3H — Admin Teams           /admin/teams/**
PHASE 3I — Admin CMS             /admin/cms/**     (6 sub-modules)
PHASE 3J — Admin Communications  /admin/communications/**
PHASE 3K — Admin Analytics       /admin/analytics/**
PHASE 3L — Admin Settings        /admin/settings/**
PHASE 3M — LAN Events            /events/**
PHASE 3N — Automation            Edge Functions + pg_cron
PHASE 3O — PDF + Certs           jsPDF integration
PHASE 3P — Final Polish          connect all loose ends
```

---

# ═══════════════════════════════════════════════
# DESIGN RULES REMINDER (same as V1 + V2)
# ═══════════════════════════════════════════════

Carry these into EVERY component in V3 without exception:

```
Colors:
  bg:         #000000 / #0A0A0A / #161616
  text:       #FFFFFF / #E8E8E8 / #999999 / #4A4A4A
  accent:     #2463FF (ONLY color — no gradients, no other colors)
  borders:    #1C1C1C default → #2463FF on hover

Fonts:
  font-orbitron   → all headings (H1–H3)
  font-rajdhani   → subheadings, section labels, tab headers
  font-inter      → all body text
  font-mono       → stats, IDs, terminal labels, IGNs, prices
  (JetBrains Mono loaded as font-mono in tailwind)

Images: ALL use className="grayscale hover:grayscale-[50%] transition-all"

ASCII decorations required in every section:
  Section titles:  ╔═══ TITLE ═══╗ / ╚═══════════╝
  Data labels:     > KEY :: VALUE
  Dividers:        ─── ◆ ───
  Progress bars:   [████████░░░░] 75%
  Status tags:     [ LIVE ] / [ UPCOMING ] / [ DRAFT ]

Card style:
  bg-[#0A0A0A] border border-[#1C1C1C]
  hover:border-[#2463FF] hover:shadow-[0_0_16px_rgba(36,99,255,0.2)]
  transition-all duration-300

No file over 400 lines. Split into _components/ subfolders.
```

---

# ═══════════════════════════════════════════════
# PHASE 3A — SERVICES PAGE
# File: src/app/services/page.tsx
# ═══════════════════════════════════════════════

Create as a Server Component that fetches contact form config from Supabase site_settings.
Split into 5 section components in src/app/services/_components/.

## S1 — ServicesHero.tsx (50vh)
```
Background: #000 + scanline overlay + halftone dots (CSS only)

ASCII boot line (font-mono, #4A4A4A, animated typewriter with useEffect):
  > MS_ESPORTS::SERVICES_MODULE
  > STATUS :: ONLINE

H1 (Orbitron 56px, white): WHAT WE OFFER
Sub (Rajdhani 20px, #999):
  "Full-stack esports — from competitive rosters to government tournament infrastructure."

diagonal clip-path bottom: polygon(0 0, 100% 0, 100% 92%, 0 100%)
```

## S2 — ServicesGrid.tsx (6 cards, 3×2 grid)
```
Static data array (no DB needed):
const SERVICES = [
  {
    id: "01",
    icon: "Trophy",          // Lucide icon name
    title: "COMPETITIVE ROSTER",
    desc: "End-to-end player scouting, coaching programs, contract management, and performance analytics for all game divisions."
  },
  {
    id: "02",
    icon: "Server",
    title: "TOURNAMENT HOSTING",
    desc: "Other organizations can host their own tournaments on the MS platform. Full registration, bracket, scoring, and results management included."
  },
  {
    id: "03",
    icon: "ShoppingBag",
    title: "MERCHANDISE & GEAR",
    desc: "Official MS jerseys, caps, mousepads, and custom gaming peripherals. Pan-India shipping. White-label options for partner orgs."
  },
  {
    id: "04",
    icon: "Handshake",
    title: "SPONSORSHIPS",
    desc: "3-tier brand partnership packages — Bronze, Gold, and Title Sponsor. Government CSR and esports development packages available."
  },
  {
    id: "05",
    icon: "Video",
    title: "CONTENT & MEDIA",
    desc: "Match highlights, team vlogs, YouTube + Kick stream production, social media management, and brand storytelling."
  },
  {
    id: "06",
    icon: "Users",
    title: "PLAYER AUDITIONS",
    desc: "Open tryouts for all game divisions. Talent scouting, development pipeline, and pathway from grassroots to pro roster."
  }
]

Each card layout:
  ASCII header: ╔═══ SERVICE_0{id} ═══╗
  Lucide icon (white, 28px)
  h3 (Rajdhani 600 18px, white)
  p (Inter 14px, #999)
  border-bottom on hover: 2px solid #2463FF
```

## S3 — StreamingAndGames.tsx (2-col)
```
LEFT COLUMN — > ACTIVE_DIVISIONS
  6 game tiles in 3×2 grid:
    FREE FIRE MAX | BGMI | CODM
    WILD RIFT     | COC  | LEGEND RC
  Each tile: font-mono name + status badge
    Active:   text-green-400 border-green-400/30
    Expanding: text-[#4A4A4A] border-[#1C1C1C] dashed

RIGHT COLUMN — > STREAM_PLATFORMS
  ASCII comparison table:
  ┌─────────────┬────────────┬──────────────┐
  │ PLATFORM    │ REV SHARE  │ INTEGRATION  │
  ├─────────────┼────────────┼──────────────┤
  │ YouTube     │ 70%        │ ✓ ACTIVE     │
  │ Kick        │ 95%        │ ✓ ACTIVE     │
  └─────────────┴────────────┴──────────────┘
  Note below: "Kick integration delivers 95% revenue to creators.
               Streams embed directly on tournament pages."
```

## S4 — SponsorshipTiers.tsx (3 pricing cards)
```
ASCII section title:
  ─── SPONSOR_TIERS ──── ◆ ────────────────

3-col grid (stack on mobile):

BRONZE card:
  ╔══ BRONZE_PARTNER ══╗ border #1C1C1C
  ₹XX,XXX/month (font-mono)
  Feature list with > prefix for each:
    > Jersey sleeve logo
    > Social media mentions (3/month)
    > Website logo placement
    > Discord server credit

GOLD card (POPULAR):
  ╔══ [GOLD_PARTNER] ══╗ border #2463FF, glow shadow
  "POPULAR" badge: bg-[#2463FF] font-mono text-xs px-2 py-0.5
  ₹XX,XXX/month
  > Jersey chest placement
  > Tournament co-naming rights
  > Match day banner (physical)
  > Feature content placement
  > All Bronze perks included

TITLE card:
  ╔══ TITLE_SPONSOR ══╗ border #4A4A4A dashed
  CUSTOM PACKAGE
  > Jersey FRONT logo (primary)
  > Full naming rights — all platforms
  > Exclusive category rights
  > Dedicated content campaigns
  > Priority tournament placement
  > All Gold + Bronze perks

Each: [CONTACT US] button → scrolls to S5 contact form
```

## S5 — ContactSection.tsx
```
2-col layout:

LEFT — Terminal contact block:
  ┌────────────────────────────────────┐
  │ > EMAIL  :: contact@ms.gg          │
  │ > PHONE  :: +91-XXXXXXXXXX         │
  │ > CITY   :: Bihar, India           │
  │ > DISCORD :: discord.gg/ms         │
  │ > INSTA  :: @magadhstriker         │
  └────────────────────────────────────┘
  (All in font-mono, with white values and #999 keys)

RIGHT — Form:
  Fields (all: bg-[#161616] border border-[#1C1C1C] focus:border-[#2463FF]
           font-mono text-sm text-white p-3 w-full):
    > NAME
    > EMAIL
    > PHONE
    > ORGANIZATION (optional)
    > MESSAGE (textarea, 4 rows)
    > I AM A:
      <select>: Sponsor / Player / Tournament Organizer / Media / Fan / Other

  Submit: saves to Supabase `contact_submissions` table
    CREATE TABLE contact_submissions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT, email TEXT, phone TEXT,
      organization TEXT, message TEXT, type TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

  Success state (font-mono, green-400):
    > SUBMISSION_STATUS :: RECEIVED
    > RESPONSE_TIME :: WITHIN_24H
    > CHANNEL :: EMAIL + WHATSAPP
```

---

# ═══════════════════════════════════════════════
# PHASE 3B — OUR STORY PAGE
# File: src/app/our-story/page.tsx
# ═══════════════════════════════════════════════

Fetches roster from Supabase. Split into _components/.

## S1 — StoryHero.tsx (70vh)
```
Heavy scanlines (opacity-60) + halftone

Typewriter effect (useEffect, setInterval 80ms per char):
Sequence: "> INITIATING_SEQUENCE..." → pause → "> LOADING_MS_STORY..." → pause → "> ONLINE."
After complete, fade in H1 with Framer Motion (opacity 0→1, y 20→0, delay 0.5s)

H1 (Orbitron 56px): THE MAGADH STRIKER STORY
Sub (Rajdhani, #999): "Born from passion. Built for greatness. Fighting for Indian esports."

MS triangle watermark: large white SVG opacity-[0.03] centered behind text
```

## S2 — OriginSection.tsx (2-col)
```
LEFT (45%):
  font-mono text-xs text-[#4A4A4A] mb-2: // ABOUT_ORIGIN
  Orbitron 36px white pull-quote:
    "WE DIDN'T JUST
     BUILD A TEAM.
     WE BUILT A"
  Then on new line: <GlitchText> component → "MOVEMENT." in #2463FF

RIGHT (55%):
  Inter body text, #E8E8E8, leading-relaxed:
    "Magadh Striker was born in Bihar — India's heartland — out of a simple
     belief: world-class esports talent exists everywhere, not just in metro
     cities. We started with one game, one squad, and zero resources.
     What we had was something bigger: the hunger to prove Indian gaming
     belongs on the world stage.

     Today, MS Esports is a multi-game organization competing nationally,
     hosting its own tournaments, and building a pipeline from grassroots
     players to professional athletes. This is only the beginning."

  Team photo placeholder below text:
    div className="mt-6 aspect-video bg-[#0A0A0A] border border-[#1C1C1C]
                   flex items-center justify-center font-mono text-xs text-[#4A4A4A]"
    Text: > TEAM_PHOTO :: UPLOAD_PENDING
```

## S3 — MilestoneTimeline.tsx
```
Install: npm install framer-motion (already installed)
Use useInView hook from framer-motion

Section title: ╔═══ TIMELINE ═══╗

Vertical layout:
  Left: 1px solid #1C1C1C vertical line (full height)
  Each milestone: slides in from left on scroll (useInView stagger)

const MILESTONES = [
  { year: "2022", title: "ORGANIZATION FOUNDED", desc: "Bihar, India. Started with a dream, a Discord server, and zero budget." },
  { year: "2023", title: "FIRST COMPETITIVE SQUAD", desc: "Free Fire MAX Division assembled. First national qualifier attempt." },
  { year: "2023", title: "REGIONAL QUALIFIER", desc: "Placed top 8 in first state-level Free Fire tournament." },
  { year: "2024", title: "BGMI DIVISION LAUNCH", desc: "Expanded into Battlegrounds Mobile India with a full squad." },
  { year: "2024", title: "OFFICIAL MERCH STORE", desc: "First MS jerseys manufactured and sold to fans across India." },
  { year: "2025", title: "GOVERNMENT SCRIM PARTNERSHIPS", desc: "Signed first government-backed esports event contracts." },
  { year: "2025", title: "500+ PLAYERS SCOUTED", desc: "Platform-based scouting system processes hundreds of auditions." },
  { year: "2026", title: "PLATFORM V1 LAUNCH", desc: "Full esports platform goes live. Multi-game expansion begins." },
]

Each milestone item:
  Left dot: w-2 h-2 rounded-full bg-[#2463FF]
  Year: JetBrains Mono, #2463FF, text-sm
  Title: Rajdhani 600, white, 16px
  Desc: Inter, #999, text-sm
```

## S4 — RosterSection.tsx
```
Section title: > ROSTER_DATABASE :: ONLINE

3-tab switcher:
  const tabs = ["COMPETITIVE", "CONTENT", "MANAGEMENT"]
  Active tab: border-b-2 border-[#2463FF] text-white
  Inactive: text-[#999] hover:text-white

Each tab shows filtered roster from Supabase:
  const { data: roster } = await supabase
    .from('roster')
    .select('*')
    .eq('type', activeTab.toLowerCase())
    .eq('status', 'active')
    .order('display_order')

Player card (4-col / 2-col / 1-col):
  bg-[#0A0A0A] border border-[#1C1C1C]
  hover:border-[#2463FF] hover:shadow-[0_0_16px_rgba(36,99,255,0.15)]

  Image area:
    <img src={player.image ?? '/placeholder-player.png'}
         className="w-full aspect-square object-cover grayscale
                    hover:grayscale-[50%] transition-all duration-500" />

  Content below image (p-4):
    font-mono text-xs text-[#4A4A4A]: > PLAYER_ID_{i+1}
    Orbitron 16px white: {player.ign}
    Inter 13px #999: {player.real_name}
    Role badge (dashed border):
      <span className="border border-dashed border-[#2463FF] text-[#2463FF]
                      font-mono text-xs px-2 py-0.5">{player.role}</span>
    Game tag: font-mono text-xs text-[#4A4A4A] mt-1: {player.game}
    Social icons row (if instagram/youtube present):
      white 14px icons, gap-2

Below grid:
  font-mono text-xs text-[#999] text-center:
  "> WANT_YOUR_NAME_HERE?" + [AUDITION HERE →] button (outline)
```

## S5 — ValuesSection.tsx
```
Section title: ╔═══ MISSION_VALUES ═══╗

4 value blocks in 2×2 grid (on desktop), 1-col on mobile:

const VALUES = [
  { num: "01", title: "EXCELLENCE", body: "We compete to win at every level. No compromises. Every round, every game." },
  { num: "02", title: "COMMUNITY", body: "We represent Indian gaming culture and actively invest back into the ecosystem that raised us." },
  { num: "03", title: "INTEGRITY", body: "Fair play, clean competition, transparent operations. Always, without exception." },
  { num: "04", title: "GROWTH", body: "We develop complete careers — not just mechanical skills. Players leave better than they arrived." },
]

Each block: ASCII box border ╔═══ 0{num}. {TITLE} ═══╗ / ╚══════════╝
Body: Inter, #999, text-sm inside

Full-width closing manifesto (below 2×2 grid):
  border-t border-[#1C1C1C] pt-12 mt-12
  Orbitron 20px white text-center leading-relaxed:
  "MAGADH STRIKER REPRESENTS EVERY INDIAN GAMER
   WHO WAS TOLD THIS ISN'T A REAL CAREER.
   WE ARE PROVING THEM "
  then inline span in #2463FF with <GlitchText>: "WRONG."
```

---

# ═══════════════════════════════════════════════
# PHASE 3C — BLOG PAGE
# File: src/app/blog/page.tsx
# ═══════════════════════════════════════════════

## BlogHero.tsx (40vh)
```
ASCII header: > MS_BLOG :: NEWS_FEED_ONLINE
H1 (Orbitron 48px): NEWS & UPDATES
Sub: "Match results, roster drops, org news, and gaming insights from the MS Esports family."

Category filter pills row:
const CATEGORIES = ["ALL", "MATCH REPORTS", "ROSTER UPDATES", "TOURNAMENTS", "GAMING TIPS", "ORG NEWS"]

Each pill: font-mono text-xs
  inactive: border border-[#1C1C1C] text-[#999] hover:border-[#2463FF]
  active: border border-[#2463FF] text-[#2463FF] bg-[#2463FF]/10
```

## BlogGrid.tsx
```
'use client' — receives initialPosts from server, filters client-side

Fetch: SELECT * FROM blog_posts WHERE status='published' ORDER BY published_at DESC

Featured post (first item — full width card):
  Grayscale image (16:9 aspect ratio, full width)
  Row below image:
    Category tag: font-mono text-xs border border-[#1C1C1C] px-2 py-0.5
    Author + date: font-mono text-xs text-[#999]
      > WRITTEN_BY :: {author_name} | {author_role} | {date}
  Title: Orbitron 24px white
  Excerpt: Inter #999 3 lines max
  [READ MORE →] link in #2463FF font-mono

Regular grid (3-col / 2-col / 1-col for remaining posts):
  bg-[#0A0A0A] border border-[#1C1C1C] hover:border-[#2463FF] transition-all
  Grayscale thumbnail (aspect-video)
  Content (p-4):
    Category tag
    Title (Rajdhani 16px white)
    font-mono text-xs text-[#4A4A4A]: > {author_name} | {date}
    Excerpt (2 lines, Inter #999 text-sm)
    [READ →] font-mono text-xs text-[#2463FF]

Client-side filter: const filtered = posts.filter(p => activeCategory === 'ALL' || p.category === activeCategory)

Pagination:
  Show 9 posts per page
  const [page, setPage] = useState(0)
  const paginated = filtered.slice(page * 9, (page + 1) * 9)
  Prev / page numbers / Next — all font-mono text-xs
```

## NewsletterSocial.tsx
```
─── ◆ ─── divider

2-col grid:

LEFT:
  font-mono text-xs text-[#4A4A4A] mb-2: > SUBSCRIBE_TO_FEED
  h3 (Rajdhani, white): NEVER MISS AN UPDATE
  flex row: email input + [SUBSCRIBE →] button
  Saves email to Supabase: INSERT INTO newsletter_subscribers (email, subscribed_at)
  Success: font-mono text-xs text-green-400: > SUBSCRIBED :: CONFIRMED

RIGHT:
  font-mono text-xs text-[#4A4A4A] mb-2: > SOCIAL_CHANNELS
  5 platform rows:
    > [IG] INSTAGRAM  ─  @magadhstriker
    > [YT] YOUTUBE    ─  /MagadhStriker
    > [DC] DISCORD    ─  discord.gg/ms
    > [TW] TWITTER/X  ─  @ms_esports
    > [WA] WHATSAPP   ─  Channel Link
  Each: font-mono text-xs, hover: text-white transition-colors
```

---

# ═══════════════════════════════════════════════
# PHASE 3D — ADMIN LAYOUT
# File: src/app/admin/layout.tsx
# ═══════════════════════════════════════════════

Server Component that wraps all /admin/* pages.
Renders AdminSidebar + AdminTopbar + children.

## src/components/admin/AdminSidebar.tsx

```tsx
'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

const NAV = [
  { label: '> DASHBOARD', href: '/admin', icon: 'LayoutDashboard' },
  {
    label: '> TOURNAMENTS', icon: 'Trophy',
    children: [
      { label: '↳ ALL_TOURNAMENTS', href: '/admin/tournaments' },
      { label: '↳ CREATE_NEW', href: '/admin/tournaments/new' },
    ]
  },
  {
    label: '> TEAMS_&_PLAYERS', icon: 'Users',
    children: [
      { label: '↳ ALL_TEAMS', href: '/admin/teams' },
      { label: '↳ PLAYER_REGISTRY', href: '/admin/teams/players' },
      { label: '↳ BANNED_IGNs', href: '/admin/teams/banned' },
    ]
  },
  {
    label: '> CONTENT_CMS', icon: 'FileText',
    children: [
      { label: '↳ BLOG_POSTS', href: '/admin/cms/blog' },
      { label: '↳ ROSTER', href: '/admin/cms/roster' },
      { label: '↳ MERCHANDISE', href: '/admin/cms/merch' },
      { label: '↳ SPONSORS', href: '/admin/cms/sponsors' },
      { label: '↳ LAN_TICKETS', href: '/admin/cms/lan-tickets' },
      { label: '↳ MEDIA_LIBRARY', href: '/admin/cms/media' },
    ]
  },
  {
    label: '> COMMUNICATIONS', icon: 'MessageSquare',
    children: [
      { label: '↳ BROADCAST', href: '/admin/communications' },
      { label: '↳ TEMPLATES', href: '/admin/communications/templates' },
      { label: '↳ MESSAGE_LOG', href: '/admin/communications/log' },
    ]
  },
  { label: '> ANALYTICS', href: '/admin/analytics', icon: 'BarChart2' },
  {
    label: '> SETTINGS', icon: 'Settings',
    children: [
      { label: '↳ ADMIN_USERS', href: '/admin/settings/users' },
      { label: '↳ SITE_CONFIG', href: '/admin/settings/site' },
      { label: '↳ AUDIT_LOG', href: '/admin/settings/audit' },
    ]
  },
]

Sidebar styles:
  w-64 fixed top-0 left-0 h-screen bg-[#070C1A] border-r border-[#111]
  overflow-y-auto flex flex-col

Header area (top of sidebar):
  px-4 py-5 border-b border-[#111]
  pre font-mono text-xs text-[#4A4A4A]:
    ╔═══════════╗
    ║  MS ADMIN ║
    ╚═══════════╝
  font-mono text-xs text-[#4A4A4A] mt-1: > PORTAL_V1.0

Nav items:
  font-mono text-xs
  Parent labels: text-[#4A4A4A] px-4 py-2 mt-3
  Child links:
    active: text-white border-l-2 border-[#2463FF] bg-[#0D1535]/40
    inactive: text-[#999] hover:text-white hover:bg-[#111]
    px-4 py-1.5 transition-colors

Bottom (mt-auto):
  border-t border-[#111] p-4
  User avatar (Discord) + username + role
  [LOGOUT] button → supabase.auth.signOut() → router.push('/admin/login')
```

## src/components/admin/AdminTopbar.tsx

```tsx
'use client'
// Fixed 60px bar

styles:
  h-15 fixed top-0 left-64 right-0 bg-[#03060F]/95 border-b border-[#111]
  flex items-center justify-between px-6

LEFT: breadcrumb from usePathname():
  font-mono text-xs text-[#4A4A4A]
  e.g. "> admin / tournaments / MS_Winter_Clash"

RIGHT:
  Bell icon + pending registrations badge (red circle, count from Supabase)
  Search icon
  Discord avatar circle (from session)
```

---

# ═══════════════════════════════════════════════
# PHASE 3E — ADMIN DASHBOARD
# File: src/app/admin/page.tsx
# ═══════════════════════════════════════════════

Server Component. Wrap with <AuthGuard requiredRole="support">.

## Data fetching (Promise.all, parallel):
```typescript
const supabase = await createServerSupabaseClient()

const [
  { count: activeTours },
  { count: liveTours },
  { count: pendingRegs },
  { count: totalTeams },
  { data: blogData },
  { data: leaderData },
] = await Promise.all([
  supabase.from('tournaments').select('*', { count: 'exact', head: true })
    .in('status', ['published','registering','full','live']),
  supabase.from('tournaments').select('*', { count: 'exact', head: true })
    .eq('status', 'live'),
  supabase.from('teams').select('*', { count: 'exact', head: true })
    .eq('status', 'pending'),
  supabase.from('teams').select('*', { count: 'exact', head: true }),
  supabase.from('blog_posts').select('*', { count: 'exact', head: true })
    .eq('status', 'published'),
  supabase.from('leaderboard').select('total_points').limit(100),
])

const totalPrize = leaderData?.reduce((sum, r) => sum + (r.total_points ?? 0), 0) ?? 0
```

## KPI Cards row — AdminKpiCards.tsx
```
8 cards in responsive grid (4-col / 2-col / 1-col):
Card style: bg-[#070C1A] border border-[#111] p-5

Each card:
  font-mono text-xs text-[#4A4A4A] mb-1: LABEL
  JetBrains Mono text-3xl white: VALUE
  font-mono text-xs mt-1 (trend/context): muted color

Cards:
  ACTIVE_TOURS:  {activeTours}    context: "→ currently open"
  LIVE_NOW:      {liveTours} 🔴  context: link to live tournament
  PENDING_REGS:  {pendingRegs}    context: "→ needs action" (text-yellow-400 if > 0)
  TOTAL_TEAMS:   {totalTeams}     context: "→ all time"
  BLOG_POSTS:    {blogData}       context: "→ published"
  PRIZE_GIVEN:   ₹{totalPrize}L  context: "→ this year" (rough calc)
  SITE_VISITS:   12.4K           context: "→ /month (mock)"
  MERCH_ORDERS:  7               context: "→ pending ship (mock)"

LIVE alert banner (only when liveTours > 0):
  Full-width strip above KPI cards
  bg-[#070C1A] border-l-4 border-[#2463FF] p-3 font-mono text-xs
  text: > [🔴] LIVE_NOW :: {liveTournamentName} | ROUND {n} UNDERWAY
  Links: [VIEW_BRACKET →] [LIVE_LEADERBOARD →]
```

## Charts row — AdminCharts.tsx
```
'use client' — uses Recharts

import { LineChart, BarChart, PieChart, ... } from 'recharts'

Fetch chart data from Supabase:
  Registrations by month: GROUP BY DATE_TRUNC('month', registered_at)
  Revenue by tournament: entry_fee × approved_team_count per tournament
  Division breakdown: COUNT teams JOINed to tournaments GROUP BY game

4 charts in 2×2 grid:
  Each chart card: bg-[#070C1A] border border-[#111] p-4
  Chart title: font-mono text-xs text-[#4A4A4A] mb-3: > CHART_TITLE

  All Recharts:
    bg transparent, grid lines stroke="#1C1C1C"
    line/bar/slice color "#2463FF"
    text/axis: font-mono text-[10px] fill="#4A4A4A"
    tooltip: bg-[#0A0A0A] border border-[#2463FF] font-mono text-xs
```

## ActivityFeed.tsx
```
'use client' with Supabase Realtime on `teams` + `message_log`

useEffect subscribe:
  supabase.channel('admin-feed')
    .on('postgres_changes', { event: 'INSERT', table: 'teams' }, handler)
    .on('postgres_changes', { event: 'UPDATE', table: 'teams' }, handler)
    .subscribe()

Renders last 50 events, newest first:
  Scrollable div, max-h-96 overflow-y-auto
  Each row: font-mono text-xs
    [timestamp] · icon + event description
  Colors:
    new registration: text-green-400
    approved:         text-[#2463FF]
    rejected:         text-red-400
    pending:          text-yellow-400
    system:           text-[#4A4A4A]
```

## Quick Actions bar
```
4 buttons in a row:
  [+ CREATE_TOURNAMENT →]  bg-[#2463FF] text-white font-mono text-xs px-4 py-2
  [✓ APPROVE_ALL_PAID →]  border border-[#1C1C1C] text-[#999] font-mono text-xs px-4 py-2
  [📢 BROADCAST →]        border border-[#1C1C1C] ...
  [📊 REPORTS →]          border border-[#1C1C1C] ...
```

---

# ═══════════════════════════════════════════════
# PHASE 3F — ADMIN TOURNAMENT LIST + WIZARD
# ═══════════════════════════════════════════════

## src/app/admin/tournaments/page.tsx

```typescript
// Server Component
// Fetch all tournaments, sorted newest first
const { data: tournaments } = await supabase
  .from('tournaments')
  .select('*, teams(count)')
  .order('created_at', { ascending: false })

// Render <TournamentsTable tournaments={tournaments} />
```

## TournamentsTable.tsx ('use client')
```
Filter bar: Status | Game | Type
  font-mono text-xs inputs

Table (overflow-x-auto):
  cols: ID | NAME | GAME | TYPE | DATE | SLOTS | PRIZE | STATUS | ACTIONS

  Cells: font-mono text-xs
  Status badges (border pill):
    draft:       border-[#4A4A4A] text-[#4A4A4A]
    published:   border-[#2463FF] text-[#2463FF]
    registering: border-green-400 text-green-400
    full:        border-orange-400 text-orange-400
    live:        border-red-400 text-red-400 + pulsing dot
    completed:   border-[#4A4A4A] text-[#4A4A4A]
    cancelled:   border-red-900 text-red-900

  Per-row actions:
    [MANAGE]  → /admin/tournaments/[id]/manage
    [RESULTS] → /admin/tournaments/[id]/manage?tab=results (if completed)
    [ARCHIVE] → confirm dialog → status = 'cancelled'

Bulk actions bar (appears when rows checked):
  [PUBLISH SELECTED] [CANCEL SELECTED] [EXPORT CSV]
```

## src/app/admin/tournaments/new/page.tsx — 6-Step Wizard

```typescript
'use client'
// useState for step (1-6) and form data
// Framer Motion AnimatePresence for step transitions

const STEPS = ['BASIC_INFO', 'SCHEDULE', 'TEAMS_&_SLOTS', 'PRIZE_&_ENTRY', 'SCORING_RULES', 'REVIEW_&_PUBLISH']

// Progress indicator:
// ─[1]─────[2]─────[3]─────[4]─────[5]─────[6]─
// Each step number: circle, filled blue when complete

// Step 1 — Basic Info:
  Name input, Game select, Type select, Format select
  Description: <textarea>
  Rules: <textarea> (plain text, converted to HTML later by Tiptap editor in CMS)
  Cover image: file input → Supabase Storage 'media' bucket → store URL

// Step 2 — Schedule:
  registration_opens: <input type="datetime-local">
  registration_closes: <input type="datetime-local">
  start_date: <input type="datetime-local">
  end_date: <input type="datetime-local">
  Platform: Mobile / PC / Console select
  Region: India / Global select

  Match Day Builder:
    State: days = [{ date, eventName, startTime, endTime }]
    [+ ADD DAY] button adds new row
    Each row: date input | event name | start time | end time | [×] remove

// Step 3 — Teams & Slots:
  total_slots: select [8,16,24,32,48,64] or custom input
  waitlist_slots: number input (default 16)
  registration type: Open | Invite Code | Admin-Approved
  invite_code: text input (or [AUTO-GENERATE] button → random 8-char)
  enable_waitlist: toggle (default: true)

// Step 4 — Prize & Entry:
  entry_fee: number input (0 = free)
  upi_id: text input
  payment_deadline_hours: number input (default: 24)

  prize_pool: number input
  Prize distribution mode: [AUTO] [MANUAL]
  AUTO: sliders for 1st/2nd/3rd % with live ₹ calculation
    1st: [████████░░] 50% = ₹12,500
    2nd: [████░░░░░░] 30% = ₹7,500
    3rd: [██░░░░░░░░] 20% = ₹5,000
  MANUAL: individual ₹ inputs

  Optional awards toggle:
    [✓] MVP Award: ₹___
    [✓] Top Fragger: ₹___

// Step 5 — Scoring Rules:
  scoring_system: select [battle_royale | kill_only | placement_only | custom]

  Battle Royale config:
    Position point table (editable):
    Pos 1: [12] | Pos 2: [9] | Pos 3: [8] | ... | Per Kill: [1]
  
  total_rounds: number input (default: 6)
  tiebreaker: select [Total Kills | Placement Count | Earliest Placement]

  Room ID pattern: text input (default: MS-{YEAR}-{MMDD}-M{N})
  Room password pattern: text input (default: STRIKER#{NN})
  Auto-send timing: select [15 min | 30 min | 60 min] before match

  allow_other_orgs: toggle (other orgs can host on this platform)

// Step 6 — Review:
  Full JSON summary of all 5 steps in formatted font-mono display
  [PREVIEW PUBLIC PAGE] → opens /tournaments in new tab
  3 action buttons:
    [SAVE AS DRAFT] → INSERT status='draft'
    [PUBLISH NOW]   → INSERT status='published'
    [SCHEDULE →]    → datetime-local picker → INSERT + store scheduled_publish_at
```

---

# ═══════════════════════════════════════════════
# PHASE 3G — TOURNAMENT MANAGEMENT HUB (6 TABS)
# File: src/app/admin/tournaments/[id]/manage/page.tsx
# ═══════════════════════════════════════════════

Server Component shell, client-side tab switcher component.

```typescript
// Fetch tournament + phase data
const { data: tournament } = await supabase
  .from('tournaments').select('*').eq('id', params.id).single()
const { count: registeredCount } = await supabase
  .from('teams').select('*', { count: 'exact', head: true })
  .eq('tournament_id', params.id)
```

Phase progress bar (top of page):
```
DRAFT → PUBLISHED → REGISTERING → BRACKET → LIVE → COMPLETED
  ●────────●────────────●────────────○──────────○──────────○
  (past phases: filled #2463FF, current: pulsing, future: #1C1C1C)
```

## TAB 1 — OverviewTab.tsx

```
Tournament header:
  font-mono text-xs text-[#4A4A4A]: > TOURNAMENT_ID :: {id}
  Orbitron 24px: {tournament.name}
  font-mono text-xs: > STATUS :: {status} | GAME :: {game} | TYPE :: {type}

4 stat boxes:
  Registered | Approved | Rejected | Waitlisted
  (fetched with COUNT per status from teams table)

[ADVANCE TO NEXT PHASE →] button:
  Opens confirmation modal
  On confirm: UPDATE tournaments SET status = nextStatus WHERE id = tournamentId
  Phase sequence: draft→published→registering→live→completed

[✏️ EDIT DETAILS] → /admin/tournaments/{id}/edit
[❌ CANCEL TOURNAMENT] → confirm + UPDATE status='cancelled'
```

## TAB 2 — RegistrationsTab.tsx (MOST IMPORTANT TAB)

```typescript
'use client'

// Supabase Realtime — new registrations appear instantly
useEffect(() => {
  const channel = supabase.channel('registrations-realtime')
    .on('postgres_changes',
      { event: '*', schema: 'public', table: 'teams',
        filter: `tournament_id=eq.${tournamentId}` },
      (payload) => {
        // Update registrations state
        setRegistrations(prev => {
          const exists = prev.find(r => r.id === payload.new.id)
          if (exists) return prev.map(r => r.id === payload.new.id ? payload.new as Team : r)
          return [payload.new as Team, ...prev]
        })
      }
    ).subscribe()
  return () => supabase.removeChannel(channel)
}, [tournamentId])
```

Filter pills: ALL | PENDING | APPROVED | REJECTED | WAITLISTED | PAID | UNPAID

Bulk action bar:
```
[✓ APPROVE ALL PAID]   → UPDATE status='approved' WHERE payment_status='verified' AND status='pending'
[✗ REJECT UNPAID]      → UPDATE status='rejected' WHERE payment_status='pending' AND registered_at < NOW() - INTERVAL '24h'
[📤 EXPORT CSV]        → generate CSV blob, trigger download
[💬 BROADCAST TO ALL]  → opens BroadcastModal
```

Registrations table:
```
#  | TEAM           | CAPTAIN      | DISCORD        | PLAYERS | PAYMENT  | STATUS    | ACTIONS
───┼────────────────┼──────────────┼────────────────┼─────────┼──────────┼───────────┼─────────────────
1  | Phoenix Squad  | Raj Kumar    | PhoenixRaj#001 | 4+1 sub | 🟢 PAID  | APPROVED  | [👁 VIEW][💬]
2  | Dark Hunters   | Amit Sharma  | ADS#4421       | 4 plyr  | 🟡 PEND  | PENDING   | [✓][✗][👁][💬]
3  | Ghost Protocol | Dev Mehta    | DevM#8812      | 4 plyr  | ❌ NONE  | REJECTED  | [👁][💬]
```

All in font-mono text-xs. Row hover: bg-[#101929].

Per-row [✓ APPROVE] and [✗ REJECT] buttons:
  On reject: opens modal with rejection reason text input
  UPDATE teams SET status='rejected', rejection_reason=reason WHERE id=teamId

**TeamDetailModal.tsx** (the key admin tool):
```typescript
// Fetches full team + players on open
const { data: teamDetails } = await supabase
  .from('teams').select('*, players(*)').eq('id', teamId).single()

// Renders:
// Terminal header
// > TEAM_ID :: {id}
// > TEAM_NAME :: {teamName}
// > CAPTAIN :: {name} | {phone} | Discord: {discord} | Email: {email}

// SQUAD ROSTER section:
// SLOT_1 :: IGN: {ign}  | ROLE: {role}  | VERIFIED: ✓/✗
// SLOT_2 :: IGN: {ign}  | ROLE: {role}  | VERIFIED: ✓/✗
// ... all players including sub

// Per player: [VIEW SCREENSHOT ↗] button
//   Opens Supabase Storage URL in new tab
//   Admin visually checks game ID + level visible in screenshot
//   [MARK VERIFIED] / [MARK UNVERIFIED] buttons

// PAYMENT section:
// UPI_REF :: {upiRef}
// SCREENSHOT: [VIEW IMAGE ↗]
// STATUS: dropdown [PENDING ▼] / [VERIFIED ▼] / [FAILED ▼]
//   On change: UPDATE teams SET payment_status=value WHERE id=teamId

// ADMIN NOTES: textarea → saves to teams.admin_notes

// COMMUNICATION LOG: list from message_log WHERE recipient_team_id = teamId

// Footer buttons:
[✓ APPROVE] [✗ REJECT — REASON:] [↓ WAITLIST] [💬 SEND MESSAGE]
```

## TAB 3 — BracketTab.tsx

```typescript
// Format selector:
const [format, setFormat] = useState<'single' | 'double' | 'swiss' | 'round_robin' | 'group'>('single')

// Seeds list (approved teams, drag-to-reorder with @dnd-kit)
// npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

// Each seed row: drag handle + seed number + team name + [✕ remove]

// [🎲 SHUFFLE SEEDS] button → shuffleSeeds(seeds)

// [GENERATE BRACKET] button:
//   calls generateSingleElimBracket(seeds) from src/lib/utils/bracket.ts
//   INSERT matches rows into Supabase
//   Show visual bracket tree

// Visual bracket tree (BracketTree.tsx):
//   Horizontal layout: rounds as columns
//   Each match card: team A vs team B, with scores if entered
//   Winner line connects to next round match
//   Colors: winner team text-white, loser text-[#4A4A4A]

// [PUBLISH BRACKET → PUBLIC SITE] button:
//   UPDATE tournaments SET bracket_published=true WHERE id=tournamentId
//   Posts Discord webhook: "🏆 Bracket is LIVE for {tournamentName}!"

// [EXPORT BRACKET PNG] button (html2canvas approach)
```

## TAB 4 — ScoringTab.tsx

```
Two panels (left: Room ID, right: Score Entry):

LEFT — Room ID Panel:
  Current match selector: dropdown of all matches
  After selecting:
    ROOM_ID input (pre-filled auto-generated) + [COPY] button
    PASSWORD input (pre-filled) + [COPY] button
    Map / Mode / Perspective selects

  Message preview (font-mono, border, bg-[#0A0A0A]):
    > ROOM DETAILS — {tournamentName}
    > MATCH: {roundName} | {matchNumber}
    > TIME: {scheduledTime} IST
    > ROOM_ID: {roomId}
    > PASS: {password}
    > MAP: {map} | {perspective} | {mode}
    > GOODLUCK — MAGADH STRIKER

  Send to: [All Approved Teams ▼] or [Teams In This Match]
  Channel: [✓ Discord Webhook] [✓ WhatsApp Log]

  [📤 SEND ROOM DETAILS] button:
    UPDATE matches SET room_id, room_password, room_sent=true WHERE id=matchId
    POST to Discord webhook URL from site_settings
    INSERT into message_log

RIGHT — Score Entry:
  Match tab selector (M1, M2, M3...)
  Round tabs within selected match (R1, R2, R3...)

  Score table for all teams in match:
  ┌─────────────────────┬──────────┬────────┬──────────┬──────────┬──────────┐
  │ TEAM                │ POSITION │ KILLS  │ POS PTS  │ KILL PTS │ TOTAL    │
  ├─────────────────────┼──────────┼────────┼──────────┼──────────┼──────────┤
  │ Phoenix Squad       │ [1 ▼]   │ [8   ] │ 12       │ 8        │ 20       │
  │ Dark Hunters        │ [4 ▼]   │ [5   ] │ 7        │ 5        │ 12       │

  Position: <select 1–20>
  Kills: <input type="number" min=0>
  Pos pts + Kill pts + Total: auto-calculated from tournament.scoring_formula

  [SAVE ROUND] button:
    UPSERT round_scores for each team
    INSERT into message_log (admin action)

  [FINALIZE MATCH] → mark match as completed, advance bracket winners
```

## TAB 5 — LeaderboardTab.tsx

```typescript
'use client'

// Supabase Realtime subscription on round_scores:
useEffect(() => {
  const channel = supabase.channel('leaderboard-realtime')
    .on('postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'round_scores' },
      () => recalculateLeaderboard()
    ).subscribe()
  return () => supabase.removeChannel(channel)
}, [])

async function recalculateLeaderboard() {
  const { data: allScores } = await supabase
    .from('round_scores')
    .select('team_id, total_points, kills')
    .in('match_id', matchIds)

  // Group by team, sum totals
  const grouped = allScores?.reduce((acc, row) => {
    if (!acc[row.team_id]) acc[row.team_id] = { total: 0, kills: 0 }
    acc[row.team_id].total += row.total_points
    acc[row.team_id].kills += row.kills
    return acc
  }, {} as Record<string, {total: number, kills: number}>)

  const ranked = Object.entries(grouped ?? {})
    .sort((a, b) => b[1].total - a[1].total)
    .map(([teamId, data], idx) => ({
      tournament_id: tournamentId,
      team_id: teamId,
      team_name: teamMap[teamId],
      rank: idx + 1,
      total_points: data.total,
      total_kills: data.kills,
      published: isAutoPublish,
    }))

  for (const entry of ranked) {
    await supabase.from('leaderboard')
      .upsert(entry, { onConflict: 'tournament_id,team_id' })
  }
  setLeaderboard(ranked)
}

// Toggle: auto-publish after each round save
// [PUBLISH TO WEBSITE] button → UPDATE leaderboard SET published=true
// [HIDE FROM PUBLIC] button → UPDATE published=false
// [EXPORT PDF] → generateTournamentReport(...)
```

Leaderboard table:
```
> STANDINGS — AFTER ROUND {n}/{total}   [🔴 LIVE — AUTO-UPDATING]

RANK  TEAM               PTS   KILLS   R1   R2   R3   R4
─────────────────────────────────────────────────────────
🥇 1  Phoenix Squad       98    42     20   22   28   28
🥈 2  NoScope Kings       87    31     12   20   27   28
🥉 3  Dark Hunters        82    28     12   22   22   26
```
All in font-mono text-xs, JetBrains Mono for numbers.

## TAB 6 — ResultsTab.tsx

```
Only accessible when status = 'completed'

Final results display:
  🏆 CHAMPION:     {winnerTeam.team_name}  →  ₹{prize1st}
  🥈 RUNNER-UP:    {2nd.team_name}          →  ₹{prize2nd}
  🥉 3RD PLACE:    {3rd.team_name}          →  ₹{prize3rd}
  ⚡ MVP AWARD:     {mvp.ign}               →  ₹{mvpPrize}
  🎯 TOP FRAGGER:  {topFragger.ign}  ({n} kills)  →  ₹{topFraggerPrize}

Prize Payment Tracker:
  Per winner: team name | UPI ID input | amount | [MARK PAID] button
  On click: INSERT into a prize_payments table (team_id, amount, paid_at, marked_by)

Action buttons:
  [🌐 PUBLISH FINAL RESULTS TO WEBSITE]
    → UPDATE tournaments SET results_published=true
    → Supabase Realtime triggers public /tournaments update

  [📢 SEND ANNOUNCEMENT — Discord]
    → POST to DISCORD_WEBHOOK_ANNOUNCEMENTS
    → "🏆 {teamName} wins {tournamentName}! Final results: [link]"

  [📜 GENERATE CERTIFICATES (PDF)]
    → calls generateWinnerCertificate() from src/lib/utils/pdf.ts
    → downloads 3 PDFs (champion, runner-up, 3rd)

  [🗄️ ARCHIVE TOURNAMENT]
    → confirm dialog
    → UPDATE tournaments SET status='completed', completed_at=NOW()
```

---

# ═══════════════════════════════════════════════
# PHASE 3H — ADMIN TEAMS & PLAYERS
# ═══════════════════════════════════════════════

## src/app/admin/teams/page.tsx
```
Server Component. Fetch all teams with tournament join.

Table: Team | Captain | Game | Tournaments | W/L | Winnings | Status | Actions
Filter: Game | Status | Active/Banned
Click team → /admin/teams/[teamId] → full team profile page

Team profile: stats + roster + tournament history + ban/flag buttons
```

## src/app/admin/teams/players/page.tsx
```
All player IGNs across all registrations.
Search input (client-side filter by IGN, Discord, phone)

Duplicate IGN detector:
  SELECT ign, COUNT(*) as count FROM players GROUP BY ign HAVING COUNT(*) > 1
  Display 🚩 DUPLICATE_IGN_DETECTED rows in yellow-400

[🚫 BAN IGN] button per row:
  UPDATE players SET banned_ign=true WHERE ign=targetIgn
  Also INSERT into a banned_igns table for future registration checks
```

## src/app/admin/teams/banned/page.tsx
```
SELECT * FROM players WHERE banned_ign=true
Table: IGN | Banned By | Banned At | Reason | [UNBAN] button (Super Admin only)
```

---

# ═══════════════════════════════════════════════
# PHASE 3I — ADMIN CMS (6 SUB-MODULES)
# ═══════════════════════════════════════════════

## Blog Editor — src/app/admin/cms/blog/

```
/admin/cms/blog/page.tsx — list:
  Table: ID | Title | Author | Category | Status | Published Date | Actions
  [+ NEW POST] → /admin/cms/blog/new
  [EDIT] → /admin/cms/blog/[id]

/admin/cms/blog/new/page.tsx and /admin/cms/blog/[id]/page.tsx — editor:
  npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link

  Layout: 2-col (editor 70% | sidebar 30%)

  LEFT — Tiptap editor:
    Toolbar: Bold | Italic | H1 H2 H3 | UL | OL | Link | Image Upload | Code
    Editor area: bg-[#0A0A0A] border border-[#1C1C1C] min-h-96 p-4
    text color white, selection color #2463FF/30

  RIGHT — Metadata sidebar:
    Status: [Draft ▼] / [Published ▼] / [Scheduled ▼]
    Scheduled date: datetime-local (shows if status=scheduled)
    Featured image: file input → Supabase Storage 'blog-images' bucket
    Category: select
    Tags: multi-input (type + enter to add pill)
    Author: select from users table (multi-author support)
    SEO slug: text input (auto-generated from title, editable)
    Meta description: textarea

    [SAVE DRAFT] | [PUBLISH NOW] | [PREVIEW →]
```

## Roster Manager — src/app/admin/cms/roster/page.tsx

```
Game filter tabs: ALL | FF MAX | BGMI | CODM | MOBA | MANAGEMENT

Player card grid with inline edit toggle:
  [+ ADD PLAYER] opens PlayerFormModal

PlayerFormModal:
  Photo upload → Supabase Storage 'roster-photos' bucket
  Real Name | IGN | Role select | Game select
  Type: [competitive / content / management]
  Status: [active / inactive]
  Featured Home: [Yes / No]
  Featured Story: [Yes / No]
  Instagram URL | YouTube URL
  Bio: textarea (max 200 chars)
  Display Order: number

  [SAVE] → UPSERT roster table
  [DELETE] → confirm → DELETE roster WHERE id=id
```

## Merchandise — src/app/admin/cms/merch/page.tsx

```
Product list table: ID | Name | Price | Stock | Status | Actions

ProductFormModal (new/edit):
  Name | Description (textarea)
  Price (₹) | Original Price (₹) for strikethrough
  Multi-image upload (up to 5 images → Supabase 'product-images' bucket)
    Drag-to-reorder thumbnails
  Badge: [None / NEW / BEST SELLER / LIMITED / OUT OF STOCK]
  Category: [Jersey / Cap / Mousepad / Hoodie / Accessories / Gaming Gear]
  Size variants:
    dynamic list: [S stock:__] [M stock:__] [L stock:__] [XL stock:__] [XXL stock:__]
    [+ ADD SIZE] button
  Low stock alert threshold: number input
  Status: [active / inactive]

Stock indicator (in list):
  Total stock = sum of all sizes
  If any size < low_stock_alert → orange-400 warning
  If any size = 0 → red-400 "OOS"
```

## Sponsors — src/app/admin/cms/sponsors/page.tsx

```
3 sections: TITLE | GOLD | BRONZE (one per tier)

Each section: drag-to-reorder sponsor tiles (@dnd-kit)
On reorder: UPDATE sponsors SET display_order WHERE id

SponsorFormModal:
  Name | Website URL
  Tier: [title / gold / bronze]
  Logo upload → Supabase 'sponsor-logos' bucket
    Display as grayscale preview
  Contract Start: date | Contract End: date
  Internal Notes: textarea
  Active: toggle

  After contract_end date passes:
    Logo auto-grays (CSS filter: grayscale(100%) opacity-30)
    Badge: "CONTRACT_EXPIRED" shown to admin only

[+ ADD SPONSOR] button
```

## LAN Tickets — src/app/admin/cms/lan-tickets/page.tsx

```
Two sub-sections:

TOP: Create/Edit LAN Events
  EventFormModal:
    Event Name | Event Date | Venue | City
    Total Seats | Ticket Price (₹) | Description
    Cover image upload
    [CREATE EVENT] → INSERT into tickets table (as event template)

BOTTOM: Ticket Orders table
  Filter: Event | Status (Pending/Confirmed/Cancelled)
  Table: Buyer | Discord | Phone | Payment Screenshot | Status | Ticket Code | Actions

  Per row:
    [VIEW PAYMENT ↗] → Supabase Storage URL
    [✓ CONFIRM] → UPDATE tickets SET status='confirmed', ticket_code=generateTicketCode()
    [✗ CANCEL] → UPDATE status='cancelled'

  Ticket Code format: MS-{6 random alphanumeric}

  Export: [DOWNLOAD ATTENDEES CSV] button
    Downloads: name, phone, discord, ticket_code, status
```

## Media Library — src/app/admin/cms/media/page.tsx

```typescript
'use client'

// List from Supabase Storage 'media' bucket
const { data: files } = await supabase.storage.from('media').list('', {
  limit: 100, sortBy: { column: 'created_at', order: 'desc' }
})

// Filter tabs: All | Blog | Players | Products | Sponsors
// (stored in different paths within 'media' bucket or separate buckets)

// Grid display: masonry or simple grid
// Each file:
//   image preview (grayscale)
//   filename truncated
//   file size
//   [COPY URL] button → navigator.clipboard.writeText(publicUrl)
//   [DELETE] → supabase.storage.from('media').remove([path])

// Drag-drop upload zone:
//   dragover + drop events
//   upload(file) → supabase.storage.from('media').upload(name, file, {upsert:true})

// Storage usage bar:
//   estimated from files.reduce((sum, f) => sum + (f.metadata?.size ?? 0), 0)
//   shown as ASCII bar: STORAGE: [████████░░] 82% of 500MB
```

---

# ═══════════════════════════════════════════════
# PHASE 3J — ADMIN COMMUNICATIONS
# ═══════════════════════════════════════════════

## src/app/admin/communications/page.tsx — Broadcast Composer

```
'use client'

Target selector:
  <select>:
    All registered teams (all time)
    Teams in specific tournament → tournament <select>
    Teams by game → game <select>
    Approved teams only
    Waitlisted teams only

Message composer:
  <textarea> — font-mono text-sm bg-[#0A0A0A] border border-[#1C1C1C] p-3 w-full
  Character count: font-mono text-xs text-[#4A4A4A] text-right

Channels:
  [✓ Discord Webhook] toggle
  [✓ Log to WhatsApp] toggle (logs number + message for manual sending)

Preview section:
  Shows "Sending to: N teams" based on selected target

[SEND NOW] button:
  async function broadcast(message: string, targetTeams: Team[]) {
    // 1. Post to Discord webhook
    if (discordEnabled) {
      await fetch(webhookUrl, { method:'POST',
        body: JSON.stringify({ content: message }) })
    }
    // 2. Log each team in message_log
    for (const team of targetTeams) {
      await supabase.from('message_log').insert({
        recipient_team_id: team.id,
        channel: 'discord_webhook',
        trigger_event: 'manual_broadcast',
        message, status: 'sent', sent_by: currentUser.id
      })
    }
  }
```

## src/app/admin/communications/templates/page.tsx

```
10 pre-built templates, all editable:

const DEFAULT_TEMPLATES = [
  { id: 'registration_received', name: 'REGISTRATION_RECEIVED', trigger: 'Auto on register',
    body: `🎮 Hey {captain_name}!\n\nYour team **{team_name}** has been registered for **{tournament_name}**.\n\nWe'll verify your payment and confirm your slot within 24h.\n\n— Magadh Striker Esports` },
  { id: 'registration_approved', name: 'YOU_ARE_IN', trigger: 'Auto on approve',
    body: `✅ **{team_name}** is OFFICIALLY IN for **{tournament_name}**!\n\n📅 {tournament_date} | 🏆 ₹{prize_pool} Prize Pool\n\nRoom details sent 30 min before your match. Join Discord: {discord_link}\n\n— MS Esports` },
  { id: 'registration_rejected', name: 'REGISTRATION_ISSUE', trigger: 'Auto on reject',
    body: `⚠️ Sorry, **{team_name}** was not approved for **{tournament_name}**.\nReason: {rejection_reason}\n\nContact us on Discord for help. — MS Esports` },
  { id: 'waitlisted', name: 'WAITLISTED', trigger: 'Auto on waitlist', body: '...' },
  { id: 'slot_opened', name: 'SLOT_AVAILABLE', trigger: 'Auto when slot freed', body: '...' },
  { id: 'tournament_full', name: 'TOURNAMENT_FULL', trigger: 'Auto on status=full', body: '...' },
  { id: 'room_details', name: 'ROOM_DETAILS', trigger: 'Manual — sent before match',
    body: `🎮 ROOM DETAILS — {tournament_name}\nMATCH: {match_name} | {match_time} IST\nROOM_ID: {room_id}\nPASSWORD: {room_password}\nMAP: {map} | {perspective}\nBe ready 10 min early 🔴\n— MS Esports` },
  { id: 'results_out', name: 'RESULTS_PUBLISHED', trigger: 'Auto on results publish', body: '...' },
  { id: 'winner_announcement', name: 'CHAMPION_ANNOUNCED', trigger: 'Manual post-tournament', body: '...' },
  { id: 'ticket_confirmed', name: 'TICKET_CONFIRMED', trigger: 'Auto on ticket confirm', body: '...' },
]

Template editor per card:
  Title (read-only) + Trigger (read-only) label
  <textarea> for body (editable, saves to Supabase site_settings as JSON)
  Variable chips: {captain_name} {team_name} {tournament_name} ... (click to insert at cursor)
  [TEST SEND] → sends to admin's own Discord
  [SAVE TEMPLATE] → UPDATE site_settings SET value WHERE key='template_{id}'
```

## src/app/admin/communications/log/page.tsx

```
Server Component. Fetch message_log with team join.

Filterable table:
  Date/Time | Recipient Team | Channel | Trigger | Status | Actions

Filter: Tournament | Team | Channel | Date Range | Status

[RESEND FAILED] button on failed rows:
  Re-triggers the same webhook call

Export: [DOWNLOAD LOG CSV]
```

---

# ═══════════════════════════════════════════════
# PHASE 3K — ADMIN ANALYTICS
# ═══════════════════════════════════════════════

## src/app/admin/analytics/page.tsx

```typescript
'use client' — uses Recharts

// All chart data fetched from Supabase:

// 1. Registrations by month (last 12 months):
const { data: regsByMonth } = await supabase.rpc('get_registrations_by_month')
// SQL function: SELECT DATE_TRUNC('month', registered_at) as month, COUNT(*) FROM teams GROUP BY 1

// 2. Revenue by tournament:
const { data: revenueData } = await supabase
  .from('tournaments').select('name, entry_fee, teams(count)')
  .neq('status', 'draft')

// 3. Division breakdown:
const { data: divisionData } = await supabase.rpc('get_division_counts')
// SQL: SELECT game, COUNT(*) FROM teams JOIN tournaments USING(tournament_id) GROUP BY game

// 4. Prize distribution history:
const { data: prizeHistory } = await supabase
  .from('tournaments').select('name, prize_pool, completed_at').eq('status', 'completed')

// All charts wrapped in same card style as dashboard:
// bg-[#070C1A] border border-[#111] p-4
// Recharts: all colors #2463FF, dark grid, monospace fonts
```

## src/app/admin/analytics/reports/page.tsx

```
Report type selector (full dropdown list):
  Tournament Summary | Registration Export | Prize Record | Revenue | Season Report

Tournament selector + Date range inputs

[GENERATE & DOWNLOAD PDF] button:
  import { generateTournamentReport } from '@/lib/utils/pdf'
  const blob = await generateTournamentReport({ tournament, teams, leaderboard, matches })
  triggerDownload(blob, 'MS_Report_{tournamentName}_{date}.pdf')

[GENERATE CSV] button:
  Build CSV string from fetched data
  Trigger download as .csv blob
```

---

# ═══════════════════════════════════════════════
# PHASE 3L — ADMIN SETTINGS
# ═══════════════════════════════════════════════

## src/app/admin/settings/users/page.tsx (Super Admin only)

```
AuthGuard requiredRole="super_admin"

Users table: ID | Name | Email | Discord | Role | Last Login | Status | Actions

[+ ADD ADMIN] → UserFormModal:
  Name | Email | Phone | Role select
  [SAVE] → INSERT into users + send Discord DM with invite

Per-row:
  [EDIT ROLE] → UPDATE users SET role WHERE id
  [DEACTIVATE] → UPDATE users SET is_banned=true WHERE id (confirm dialog)
  [RESET SESSION] → supabase.auth.admin.signOut(userId) (requires service role)
```

## src/app/admin/settings/site/page.tsx

```
Key-value editor backed by site_settings table.
Groups:

ORGANIZATION:
  org_name | tagline | contact_email | contact_phone | location | upi_id

SOCIAL:
  instagram | youtube | twitter | discord_invite | whatsapp_channel

DISCORD_WEBHOOKS:
  webhook_announcements | webhook_room_info | webhook_registrations | webhook_admin_alerts
  Each: text input + [TEST] button → sends test message to webhook

HERO_SETTINGS:
  hero_video_url (YouTube embed URL)
  stat_players | stat_tournaments | stat_prize | stat_hosted (editable numbers for landing page ticker)

Each group: [SAVE GROUP] button → batch UPSERT site_settings
```

## src/app/admin/settings/audit/page.tsx

```
Read-only log. Append to message_log table on every admin action.

Table: Date/Time | Admin | Action | Details | IP (optional)
Search input + date range filter
[EXPORT CSV] button

Every significant admin action in the codebase should call:
  await supabase.from('message_log').insert({
    channel: 'audit',
    trigger_event: 'admin_action',
    message: `${currentUser.name}: ${actionDescription}`,
    sent_by: currentUser.id,
    status: 'sent'
  })

Actions to log:
  Tournament created/published/cancelled
  Team approved/rejected/waitlisted
  Score entered
  Leaderboard published
  Certificate generated
  Blog post published
  Admin user added/deactivated
  Broadcast sent
```

---

# ═══════════════════════════════════════════════
# PHASE 3M — LAN EVENTS (PUBLIC-FACING)
# File: src/app/events/page.tsx
# ═══════════════════════════════════════════════

```
Hero (40vh):
  > MS_EVENTS :: LAN_SCHEDULE
  H1: LIVE EVENTS

Fetch events:
  SELECT * FROM tickets WHERE type='event' AND event_date > NOW() ORDER BY event_date

Event cards (3-col / 2-col / 1-col):
  bg-[#0A0A0A] border border-[#1C1C1C]
  Event name (Orbitron 18px)
  Date + Venue (font-mono)
  Seats: [████████░░] 85% SOLD  (sold_seats / total_seats)
  Price: ₹{price}
  Status: OPEN | ALMOST FULL | SOLD OUT

  [BUY TICKET →] → /events/{id}/ticket

Past events section below (grayscale, opacity-50)
```

## src/app/events/[id]/ticket/page.tsx

```
4-step wizard (same structure as RegistrationWizard):

Step 1: Discord login gate (same as tournament registration)
Step 2: Fill buyer details
  Buyer Name: [___________]
  Phone: [+91-XXXXXXXXXX]
  Quantity: [1 ▼] (if multiple tickets allowed)
Step 3: Payment
  ₹{price} × {quantity} = ₹{total}
  UPI: magadhstriker@upi
  Transaction ID + Screenshot upload → Supabase Storage 'tickets' bucket
  [SUBMIT]
Step 4: Success
  > TICKET_STATUS :: SUBMITTED
  > CONFIRMATION :: PENDING_ADMIN_REVIEW
  Admin confirms → unique ticket code generated → visible in user's profile
```

---

# ═══════════════════════════════════════════════
# PHASE 3N — AUTOMATION ENGINE
# Supabase Edge Functions + pg_cron
# ═══════════════════════════════════════════════

## Edge Function 1: tournament-lifecycle-webhook

Deploy via Supabase CLI: `supabase functions deploy tournament-lifecycle-webhook`

Create as Database Webhook on `tournaments` table (UPDATE event):

```typescript
// supabase/functions/tournament-lifecycle-webhook/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  const { record, old_record, type } = await req.json()

  const announcementsWebhook = Deno.env.get('DISCORD_WEBHOOK_ANNOUNCEMENTS')!
  const adminAlertWebhook = Deno.env.get('DISCORD_WEBHOOK_ADMIN_ALERTS')!

  const post = (url: string, content: string) =>
    fetch(url, { method: 'POST', headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ content }) })

  if (type === 'UPDATE') {
    // Tournament just went FULL
    if (record.status === 'full' && old_record.status !== 'full') {
      await post(announcementsWebhook,
        `🔴 **${record.name}** is now **FULL**! ${record.total_slots}/${record.total_slots} slots taken. No more registrations accepted.`)
    }
    // Tournament went LIVE
    if (record.status === 'live' && old_record.status !== 'live') {
      await post(announcementsWebhook,
        `🏆 **${record.name}** IS NOW LIVE! Best of luck to all teams! 🎮\n> Prize Pool: ₹${record.prize_pool?.toLocaleString()}`)
    }
    // Tournament COMPLETED
    if (record.status === 'completed' && old_record.status !== 'completed') {
      await post(announcementsWebhook,
        `✅ **${record.name}** is complete! Final results are live on the website.`)
    }
    // Tournament CANCELLED
    if (record.status === 'cancelled' && old_record.status !== 'cancelled') {
      await post(adminAlertWebhook,
        `⚠️ ADMIN ALERT: Tournament **${record.name}** was CANCELLED.`)
    }
  }

  return new Response('OK', { status: 200 })
})
```

## Edge Function 2: team-status-webhook

Database Webhook on `teams` table (UPDATE event):

```typescript
// When team approved:
if (record.status === 'approved' && old_record.status !== 'approved') {
  // Fetch tournament name
  const tournamentName = await fetchTournamentName(record.tournament_id)
  await post(roomInfoWebhook,
    `✅ **${record.team_name}** has been approved for **${tournamentName}**! Welcome aboard! 🎮\nRoom details will be sent 30 min before your first match.`)
}
// When bracket published: handled from admin UI direct call
// When results published: handled from admin UI direct call
```

## pg_cron Jobs (run in Supabase SQL Editor):

```sql
-- Enable pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Auto-close registrations when deadline passes
SELECT cron.schedule(
  'auto-close-registrations',
  '*/15 * * * *',  -- every 15 minutes
  $$
    UPDATE tournaments
    SET status = CASE
      WHEN (SELECT COUNT(*) FROM teams WHERE tournament_id = tournaments.id AND status = 'approved') >= total_slots
        THEN 'full'
      ELSE status
    END
    WHERE status = 'registering'
    AND registration_closes < NOW();
  $$
);

-- Auto-reject unpaid teams after 24h
SELECT cron.schedule(
  'auto-reject-unpaid',
  '0 * * * *',  -- every hour
  $$
    UPDATE teams
    SET status = 'rejected',
        rejection_reason = 'Payment not received within 24 hours of registration'
    WHERE status = 'pending'
    AND payment_status = 'pending'
    AND registered_at < NOW() - INTERVAL '24 hours';
  $$
);

-- Auto-set tournament to 'live' at scheduled start time
SELECT cron.schedule(
  'auto-start-tournaments',
  '*/5 * * * *',  -- every 5 minutes
  $$
    UPDATE tournaments
    SET status = 'live'
    WHERE status IN ('registering','full')
    AND start_date <= NOW()
    AND start_date > NOW() - INTERVAL '10 minutes';
  $$
);
```

---

# ═══════════════════════════════════════════════
# PHASE 3O — PDF UTILITIES
# File: src/lib/utils/pdf.ts
# ═══════════════════════════════════════════════

```
npm install jspdf

Create generateWinnerCertificate() and generateTournamentReport() functions.
(Full implementation already provided in V2 prompt — copy from there)

Install: npm install qrcode @types/qrcode
Create generateQRCode(ticketCode: string): Promise<string>
  returns data URL for QR code image
  Used in LAN ticket confirmation

Also create:
  downloadBlob(blob: Blob, filename: string)
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = filename; a.click()
    URL.revokeObjectURL(url)
```

---

# ═══════════════════════════════════════════════
# PHASE 3P — FINAL POLISH & CONNECTIONS
# ═══════════════════════════════════════════════

## npm install (all missing packages)
```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link
npm install jspdf
npm install qrcode @types/qrcode
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
npm install zustand
npm install framer-motion  # (likely already installed from V1)
```

## Toast System — src/components/ui/Toast.tsx

```typescript
import { create } from 'zustand'
// (full implementation from V2 prompt — copy from there)

// Add <ToastProvider /> to src/app/layout.tsx
// Usage anywhere: useToastStore.getState().add('success', '> TEAM_APPROVED')
```

## Landing Page connections (update V1 components):

```
TournamentSpotlight.tsx:
  Replace mock data with:
  const { data } = await supabase
    .from('tournaments').select('*').neq('status','draft')
    .order('start_date').limit(3)

MerchStream.tsx:
  Replace mock merch with:
  const { data: products } = await supabase
    .from('products').select('*').eq('status','active').limit(3)

Sponsors.tsx:
  Replace mock sponsors with:
  const { data: sponsors } = await supabase
    .from('sponsors').select('*').eq('is_active',true).order('display_order')

StatsTicker.tsx:
  Replace hardcoded numbers with site_settings values:
  const { data: settings } = await supabase
    .from('site_settings').select('*')
    .in('key', ['stat_players','stat_tournaments','stat_prize','stat_hosted'])
```

## Supabase Storage Buckets (create in dashboard)
```
media              (public)
blog-images        (public)
roster-photos      (public)
product-images     (public)
sponsor-logos      (public)
payment-screenshots (private — admin service role only)
player-screenshots  (private — admin service role only)
tickets            (private — admin service role only)
```

## Row Level Security (add to existing SQL schema)
```sql
-- Enable RLS on all tables
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE roster ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "public_read_tournaments" ON tournaments FOR SELECT
  USING (status != 'draft');
CREATE POLICY "public_read_blog" ON blog_posts FOR SELECT
  USING (status = 'published');
CREATE POLICY "public_read_roster" ON roster FOR SELECT
  USING (status = 'active');
CREATE POLICY "public_read_products" ON products FOR SELECT
  USING (status = 'active');
CREATE POLICY "public_read_sponsors" ON sponsors FOR SELECT
  USING (is_active = true AND (contract_end IS NULL OR contract_end > NOW()));

-- Auth write policies (admins)
-- Use auth.jwt() to check role stored in users table
CREATE POLICY "admin_full_tournaments" ON tournaments FOR ALL
  USING ((SELECT role FROM users WHERE id = auth.uid())
    IN ('super_admin','tournament_mgr'));

-- Teams: own team + admin
CREATE POLICY "captain_insert_team" ON teams FOR INSERT
  WITH CHECK (captain_id = auth.uid());
CREATE POLICY "admin_read_all_teams" ON teams FOR SELECT
  USING (captain_id = auth.uid() OR
    (SELECT role FROM users WHERE id = auth.uid())
    IN ('super_admin','tournament_mgr','support'));
CREATE POLICY "admin_update_teams" ON teams FOR UPDATE
  USING ((SELECT role FROM users WHERE id = auth.uid())
    IN ('super_admin','tournament_mgr'));
```

---

# ═══════════════════════════════════════════════
# COMPLETE V3 OUTPUT FILE TREE
# ═══════════════════════════════════════════════

```
src/
├── app/
│   ├── services/
│   │   ├── page.tsx                      ← NEW (server component)
│   │   └── _components/
│   │       ├── ServicesHero.tsx           ← NEW
│   │       ├── ServicesGrid.tsx           ← NEW
│   │       ├── StreamingAndGames.tsx      ← NEW
│   │       ├── SponsorshipTiers.tsx       ← NEW
│   │       └── ContactSection.tsx         ← NEW
│   ├── our-story/
│   │   ├── page.tsx                      ← NEW
│   │   └── _components/
│   │       ├── StoryHero.tsx              ← NEW
│   │       ├── OriginSection.tsx          ← NEW
│   │       ├── MilestoneTimeline.tsx      ← NEW
│   │       ├── RosterSection.tsx          ← NEW (Supabase)
│   │       └── ValuesSection.tsx          ← NEW
│   ├── blog/
│   │   ├── page.tsx                      ← NEW
│   │   └── _components/
│   │       ├── BlogHero.tsx               ← NEW
│   │       ├── BlogGrid.tsx               ← NEW (Supabase)
│   │       └── NewsletterSocial.tsx       ← NEW
│   ├── events/
│   │   ├── page.tsx                      ← NEW
│   │   └── [id]/ticket/page.tsx          ← NEW
│   └── admin/
│       ├── layout.tsx                    ← NEW (sidebar + topbar)
│       ├── page.tsx                      ← UPDATE (full dashboard)
│       ├── tournaments/
│       │   ├── page.tsx                  ← NEW
│       │   ├── new/page.tsx              ← NEW (6-step wizard)
│       │   └── [id]/manage/
│       │       ├── page.tsx              ← NEW (6-tab hub)
│       │       └── _components/
│       │           ├── OverviewTab.tsx    ← NEW
│       │           ├── RegistrationsTab.tsx ← NEW (Realtime)
│       │           ├── TeamDetailModal.tsx  ← NEW
│       │           ├── BracketTab.tsx     ← NEW (@dnd-kit)
│       │           ├── ScoringTab.tsx     ← NEW
│       │           ├── LeaderboardTab.tsx ← NEW (Realtime)
│       │           └── ResultsTab.tsx     ← NEW
│       ├── teams/
│       │   ├── page.tsx                  ← NEW
│       │   ├── players/page.tsx          ← NEW
│       │   └── banned/page.tsx           ← NEW
│       ├── cms/
│       │   ├── blog/
│       │   │   ├── page.tsx              ← NEW
│       │   │   ├── new/page.tsx          ← NEW (Tiptap)
│       │   │   └── [id]/page.tsx         ← NEW (Tiptap)
│       │   ├── roster/page.tsx           ← NEW
│       │   ├── merch/page.tsx            ← NEW
│       │   ├── sponsors/page.tsx         ← NEW
│       │   ├── lan-tickets/page.tsx      ← NEW
│       │   └── media/page.tsx            ← NEW (Storage browser)
│       ├── communications/
│       │   ├── page.tsx                  ← NEW
│       │   ├── templates/page.tsx        ← NEW
│       │   └── log/page.tsx              ← NEW
│       ├── analytics/
│       │   ├── page.tsx                  ← NEW (Recharts)
│       │   └── reports/page.tsx          ← NEW (jsPDF)
│       └── settings/
│           ├── users/page.tsx            ← NEW
│           ├── site/page.tsx             ← NEW
│           └── audit/page.tsx            ← NEW
├── components/
│   ├── admin/
│   │   ├── AdminSidebar.tsx              ← NEW
│   │   ├── AdminTopbar.tsx               ← NEW
│   │   ├── ActivityFeed.tsx              ← NEW (Realtime)
│   │   └── BracketTree.tsx               ← NEW
│   └── ui/
│       └── Toast.tsx                     ← NEW (Zustand)
└── lib/
    └── utils/
        ├── bracket.ts                    ← NEW
        └── pdf.ts                        ← NEW
supabase/
├── functions/
│   ├── tournament-lifecycle-webhook/     ← NEW (Edge Function)
│   └── team-status-webhook/              ← NEW (Edge Function)
└── migrations/
    ├── (existing migrations)
    └── 20260715_rls_policies.sql         ← NEW
```

---

# ═══════════════════════════════════════════════
# V3 QUALITY CHECKLIST
# ═══════════════════════════════════════════════

## Public Pages
- [ ] /services: all 5 sections render, contact form saves to Supabase
- [ ] /our-story: typewriter effect works, timeline scroll-animates, roster loads from DB
- [ ] /blog: posts load from Supabase, category filter works, pagination works
- [ ] /events: LAN events load, ticket purchase wizard completes

## Admin Authentication
- [ ] Sidebar role-based: content_mgr can't see tournament management tabs
- [ ] Super Admin only sees /settings/users
- [ ] AuthGuard redirects unauthorized roles correctly

## Admin Dashboard  
- [ ] All 8 KPIs pull real data from Supabase
- [ ] Recharts render with real data (not mock)
- [ ] ActivityFeed updates live without refresh
- [ ] Live tournament alert banner appears/disappears correctly
- [ ] Quick action buttons navigate correctly

## Tournament Management
- [ ] 6-step wizard saves all data to Supabase correctly
- [ ] Tournament list table reflects DB state
- [ ] RegistrationsTab: new registrations appear via Realtime without refresh
- [ ] TeamDetailModal shows player screenshots (Supabase Storage URLs)
- [ ] Bulk approve all paid works correctly
- [ ] BracketTab generates matches in Supabase from approved teams
- [ ] @dnd-kit drag-to-reorder seeds works
- [ ] Room ID sent via Discord webhook + logged to message_log
- [ ] Score entry auto-calculates from tournament.scoring_formula
- [ ] Leaderboard recalculates when scores saved + publishes via Realtime
- [ ] PDF certificates generate and download
- [ ] Archive updates tournament status

## CMS
- [ ] Tiptap editor saves HTML to Supabase blog_posts.content
- [ ] Multi-author: different users can be selected as author
- [ ] Blog preview matches public /blog rendering exactly
- [ ] Roster CRUD syncs to public /our-story page
- [ ] Product size variants save correctly (JSONB)
- [ ] Sponsor drag-reorder updates display_order in DB
- [ ] LAN ticket confirmation generates unique ticket code
- [ ] Media library upload + URL copy works

## Communications
- [ ] Broadcast sends to Discord webhook + logs to message_log
- [ ] Templates save edits to site_settings
- [ ] Test send delivers to admin Discord
- [ ] Message log shows real entries with timestamps

## Automation
- [ ] Edge Functions deployed and receiving webhooks
- [ ] pg_cron jobs created (verify in Supabase dashboard → Extensions → pg_cron)
- [ ] Auto-close registrations triggers at deadline
- [ ] Auto-reject unpaid teams triggers after 24h

## Design Consistency
- [ ] EVERY new component uses only the B&W + #2463FF palette
- [ ] ALL images wrapped in grayscale filter class
- [ ] font-mono on all numbers, IDs, stats, prices
- [ ] ASCII decorations (╔══╗, > LABEL ::, ─ ◆ ─) in every section
- [ ] No file exceeds 400 lines (split as needed)

---

# ═══════════════════════════════════════════════
# THE V3 DIRECTIVE
# ═══════════════════════════════════════════════

V1 built the skeleton.
V2 wired the Supabase brain and built the tournament machine.
V3 completes everything.

After V3:
  - Every public page is live and data-connected
  - Every admin action reflects instantly on the public site
  - A tournament can run from creation to archive without leaving the dashboard
  - The design is airtight — B&W, ASCII, professional

When the admin confirms a LAN ticket, the buyer gets a unique code.
When the admin presses publish leaderboard, fans see it in 2 seconds.
When a team registers at 2am, the slot counter updates for everyone watching.

This is the complete platform. Build it.