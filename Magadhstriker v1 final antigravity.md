# ████████████████████████████████████████████████████████████████
# MAGADH STRIKER ESPORTS — V1 COMPLETE BUILD PROMPT
# Platform: Antigravity AI | Model: Gemini 3.1 High
# Aesthetic: Black & White + ASCII Art Theme
# Stack: React + Next.js + Supabase + Discord Auth
# ████████████████████████████████████████████████████████████████

---

# ═══════════════════════════════════════════════
# PART 0 — MISSION BRIEF
# ═══════════════════════════════════════════════

Build the complete **Magadh Striker Esports (MS Esports)** platform — a full-stack competitive esports website for an Indian organization competing in **Free Fire MAX, BGMI, CODM, MOBA, and Legend RC**, based in Bihar, India.

This platform is NOT a brochure. It is a **live esports operations system** that handles:
- Public esports organization website (5 pages)
- Squad-based tournament registration with **anti-bot verification**
- **Discord authentication** for user login and admin permissions
- **Supabase backend** for all data storage (500 MB free tier)
- **Admin dashboard** for approving/rejecting teams
- **Player verification** via in-game screenshot upload
- **Live streaming integration** (YouTube + Kick embed)
- **LAN event ticketing** system
- **Merchandise store** integration
- Other organizations can **host tournaments on this platform**
- **Room ID distribution** to verified teams only

---

# ═══════════════════════════════════════════════
# PART 1 — DESIGN SYSTEM: BLACK & WHITE + ASCII
# ═══════════════════════════════════════════════

## The Core Aesthetic: "Terminal Domination"

This website is **pure black and white** as the dominant color language, with electric blue as the ONLY accent color. The visual style is inspired by:
- Classic ASCII terminal art
- Halftone print dot grids
- Black-and-white manga action panels
- CRT monitor scanline text
- Old-school esports zine culture

Think: **a fighter's black training uniform** — no flash, pure edge.

---

## Color Palette — Strictly Black, White & Blue

```css
/* === PRIMARY PALETTE === */
--ms-true-black:     #000000    /* pure black — main backgrounds */
--ms-deep-black:     #050505    /* section backgrounds */
--ms-panel-black:    #0A0A0A    /* card, panel backgrounds */
--ms-border-dark:    #111111    /* borders, dividers */
--ms-surface:        #161616    /* input fields, table rows */
--ms-elevated:       #1C1C1C    /* hover states */

/* === WHITE SCALE === */
--ms-white:          #FFFFFF    /* pure white — primary text */
--ms-white-90:       #E8E8E8    /* body text */
--ms-white-60:       #999999    /* muted text, labels */
--ms-white-30:       #4A4A4A    /* very muted, borders */
--ms-white-10:       #1A1A1A    /* ghost backgrounds */

/* === SINGLE ACCENT — MS BLUE === */
--ms-blue:           #2463FF    /* THE ONLY COLOR in the whole site */
--ms-blue-glow:      rgba(36, 99, 255, 0.2)   /* glow effects */
--ms-blue-dim:       rgba(36, 99, 255, 0.08)  /* subtle tints */

/* === STATUS COLORS (admin panel only) === */
--st-green:          #22C55E    /* approved / live / active */
--st-yellow:         #EAB308    /* pending / warning */
--st-red:            #EF4444    /* rejected / error */
--st-orange:         #F97316    /* waitlisted */
--st-gold:           #E8A020    /* winner / prize */
```

## ASCII Art Integration Rules

These ASCII-style design elements must appear throughout the site:

1. **ASCII Border Frames** — surround section titles with text-based borders:
   ```
   ╔══════════════════════════════╗
   ║  OUR DIVISIONS               ║
   ╚══════════════════════════════╝
   ```

2. **Halftone Dot Texture** — faint dot grid overlaid on every hero background
   (CSS radial-gradient pattern, white dots on black at 8px spacing, 3% opacity)

3. **Scanline Overlay** — thin horizontal lines on hero sections
   (repeating-linear-gradient, 2px solid #111 every 4px, 40% opacity)

4. **ASCII Glitch Text** — on H1 hero headings, use CSS animation to occasionally
   swap 2–3 random characters with ASCII symbols ( `@` `#` `|` `/` `\` )
   for 80ms every 4 seconds. Subtle, cinematic glitch.

5. **Monospace Stats** — all numbers and stats in `JetBrains Mono` or `Courier New`
   with `font-variant-numeric: tabular-nums`

6. **Pixel-border Cards** — some feature cards use a CSS border made of
   repeating dots/dashes instead of solid lines:
   `border: 1px dashed #333` or `outline: 2px dotted #2463FF`

7. **MS Triangle Watermark** — the MS triangle logo SVG at large size,
   white at 2% opacity, as a background layer in hero sections

8. **Text Separator Lines** — section breaks use this ASCII divider:
   ```
   ─────────────── ◆ ───────────────
   ```

---

## Typography

```
Hero/Display Headings:   'Orbitron', sans-serif
  — Angular, futuristic, ALL CAPS
  — Weights: 700, 900
  — Color: #FFFFFF (white) or #2463FF (blue accent only on 1 word)

Section Titles:          'Rajdhani', sans-serif
  — Indian-origin gaming font
  — Weight: 600
  — UPPERCASE, letter-spacing: 3px

Body/Paragraphs:         'Inter', sans-serif
  — Clean, readable for sponsors
  — Weight: 400 regular, 500 medium
  — Color: #E8E8E8

Stats/Numbers/IDs/Code:  'JetBrains Mono', monospace
  — All counts, prize pools, scores, room IDs, IGNs
  — Weight: 500
  — Color: #FFFFFF

ASCII Decorative Text:   'Courier New', monospace
  — ASCII art decorations, border frames, scanlines
  — Color: #4A4A4A (very dark, barely visible)

Load all via Google Fonts <link> tag
```

---

## Global Visual Rules

- **Dark mode ONLY** — zero light backgrounds anywhere
- **No gradients in background** — solid black sections
- Cards: `background: #0A0A0A; border: 1px solid #1C1C1C`
- Card hover: `border-color: #2463FF; box-shadow: 0 0 16px rgba(36,99,255,0.2)`
- Section dividers: full-width `<hr style="border: 1px solid #111">` or ASCII `─ ◆ ─` line
- Blue `#2463FF` appears ONLY on: active links, CTA buttons, card hover borders, 1 word per hero title, LIVE status badges
- Everything else: black, white, or gray
- Images on site: displayed in grayscale CSS filter `filter: grayscale(100%)` + `mix-blend-mode: luminosity`
  (makes all photos look like B&W magazine spreads — consistent with ASCII terminal aesthetic)
- Section clip-path cuts: `clip-path: polygon(0 0, 100% 0, 100% 94%, 0 100%)`

---

# ═══════════════════════════════════════════════
# PART 2 — TECH STACK & ARCHITECTURE
# ═══════════════════════════════════════════════

## Frontend
- **React + Next.js 14 App Router** — file-based routing, SSR/SSG
- **Tailwind CSS** + custom CSS variables (design system above)
- **Framer Motion** — page transitions + scroll animations
- **Lucide React** — icons only (no Font Awesome)
- **Recharts** — analytics charts in admin panel

## Backend — Supabase (500 MB free tier)
- **Supabase Auth** — Discord OAuth provider (primary login method)
- **Supabase Database** (PostgreSQL) — all tournament, team, player, blog, merch data
- **Supabase Storage** — player screenshots, logo uploads, blog images (max 50 MB/file)
- **Supabase Realtime** — live leaderboard updates + slot counter updates
- **Supabase Row Level Security (RLS)** — admin vs. user vs. public data access

## Authentication Flow
- **Discord OAuth via Supabase Auth** — primary login for all users
  - When user clicks `LOGIN WITH DISCORD` → Discord OAuth → Supabase session
  - Supabase `users` table stores Discord ID, username, avatar, guild membership
  - Admin permissions: based on user's Discord role in Magadh Striker Discord server
    (check guild roles via Discord API after OAuth)
  - Admin roles: `super_admin` | `tournament_mgr` | `content_mgr` | `support`

## Anti-Bot Measures
- Squad-based registration ONLY (team leader creates team, invites 3 members)
- Each member must verify by Discord login (must be in MS Discord server)
- Player must upload **in-game screenshot** (game ID, level, stats)
- Captain must upload **payment screenshot** (UPI transaction)
- Human verification (hCaptcha) on form submit
- Rate limiting: max 3 registration attempts per Discord account per tournament

## Key Integrations
- YouTube embed API (livestream tab)
- Kick.com embed (alternative stream)
- Discord Webhooks (auto-notifications)
- UPI payment flow (screenshot upload → admin verifies)
- Third-party merch fulfillment (integrate store link or embedded iframe)
- LAN event ticketing (custom ticket booking module)

---

# ═══════════════════════════════════════════════
# PART 3 — DATABASE SCHEMA (Supabase / PostgreSQL)
# ═══════════════════════════════════════════════

```sql
-- USERS (Discord-authenticated)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  discord_id TEXT UNIQUE NOT NULL,
  discord_username TEXT NOT NULL,
  discord_avatar TEXT,
  email TEXT,
  role TEXT DEFAULT 'user',  -- user | super_admin | tournament_mgr | content_mgr | support
  is_banned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TOURNAMENTS
CREATE TABLE tournaments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  game TEXT NOT NULL,           -- 'Free Fire MAX' | 'BGMI' | 'CODM' | 'MOBA' | 'Legend RC'
  type TEXT NOT NULL,           -- 'open' | 'invitational' | 'govt_scrim' | 'private_scrim'
  format TEXT NOT NULL,         -- 'Solo' | 'Duo' | 'Squad'
  description TEXT,
  rules TEXT,
  cover_image TEXT,
  registration_opens TIMESTAMPTZ,
  registration_closes TIMESTAMPTZ,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  total_slots INT DEFAULT 32,
  waitlist_slots INT DEFAULT 16,
  entry_fee INT DEFAULT 0,
  upi_id TEXT,
  prize_pool INT DEFAULT 0,
  prize_distribution JSONB,     -- {first: 12500, second: 7500, third: 5000}
  scoring_system TEXT,          -- 'battle_royale' | 'kill_only' | 'placement_only'
  scoring_formula JSONB,
  total_rounds INT DEFAULT 6,
  status TEXT DEFAULT 'draft',  -- 'draft'|'published'|'registering'|'full'|'live'|'completed'|'cancelled'
  allow_other_orgs BOOLEAN DEFAULT FALSE,  -- other orgs can host their tourns here
  hosting_org_name TEXT,        -- if hosted by another org
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TEAMS
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID REFERENCES tournaments(id),
  team_name TEXT NOT NULL,
  team_tag TEXT,
  captain_id UUID REFERENCES users(id),
  captain_discord TEXT NOT NULL,
  captain_phone TEXT,
  captain_email TEXT,
  payment_screenshot TEXT,      -- Supabase Storage URL
  payment_upi_ref TEXT,
  payment_status TEXT DEFAULT 'pending',  -- 'pending'|'verified'|'failed'
  status TEXT DEFAULT 'pending',  -- 'pending'|'approved'|'rejected'|'waitlisted'
  rejection_reason TEXT,
  admin_notes TEXT,
  slot_number INT,
  registered_at TIMESTAMPTZ DEFAULT NOW()
);

-- PLAYERS (squad members)
CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id),
  user_id UUID REFERENCES users(id),
  ign TEXT NOT NULL,            -- in-game name
  game_id_screenshot TEXT,      -- Supabase Storage URL (verification)
  player_level INT,
  role TEXT,                    -- 'IGL'|'Rusher'|'Sniper'|'Support'|'Sub'
  is_substitute BOOLEAN DEFAULT FALSE,
  verified BOOLEAN DEFAULT FALSE,
  banned_ign BOOLEAN DEFAULT FALSE,   -- banned IGN flag
  joined_at TIMESTAMPTZ DEFAULT NOW()
);

-- MATCHES + BRACKET
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID REFERENCES tournaments(id),
  round_number INT,
  round_name TEXT,
  match_number INT,
  team_a_id UUID REFERENCES teams(id),
  team_b_id UUID REFERENCES teams(id),
  room_id TEXT,
  room_password TEXT,
  room_sent BOOLEAN DEFAULT FALSE,
  scheduled_time TIMESTAMPTZ,
  status TEXT DEFAULT 'pending',   -- 'pending'|'live'|'completed'
  winner_id UUID REFERENCES teams(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROUND SCORES (per match, per round)
CREATE TABLE round_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID REFERENCES matches(id),
  team_id UUID REFERENCES teams(id),
  round_number INT,
  position INT,
  kills INT DEFAULT 0,
  position_points INT DEFAULT 0,
  kill_points INT DEFAULT 0,
  total_points INT DEFAULT 0,
  recorded_by UUID REFERENCES users(id),
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- LEADERBOARD (auto-computed view + manual override)
CREATE TABLE leaderboard (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID REFERENCES tournaments(id),
  team_id UUID REFERENCES teams(id),
  rank INT,
  total_points INT DEFAULT 0,
  total_kills INT DEFAULT 0,
  published BOOLEAN DEFAULT FALSE,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- ROSTER (public-facing org team page)
CREATE TABLE roster (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  real_name TEXT,
  ign TEXT NOT NULL,
  role TEXT,               -- 'IGL'|'Rusher'|'Sniper'|'Coach'|'Manager'|'Creator'
  game TEXT,
  type TEXT,               -- 'competitive'|'content'|'management'
  status TEXT DEFAULT 'active',
  featured_home BOOLEAN DEFAULT FALSE,
  instagram TEXT,
  youtube TEXT,
  bio TEXT,
  image TEXT,              -- Supabase Storage URL
  display_order INT
);

-- BLOG POSTS
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT,
  tags TEXT[],
  author_id UUID REFERENCES users(id),
  author_name TEXT,
  author_role TEXT,
  status TEXT DEFAULT 'draft',  -- 'draft'|'published'|'scheduled'
  scheduled_at TIMESTAMPTZ,
  featured_image TEXT,
  excerpt TEXT,
  content TEXT,            -- rich HTML
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PRODUCTS (merchandise)
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price INT NOT NULL,
  original_price INT,
  images TEXT[],
  badge TEXT,
  category TEXT,
  sizes JSONB,             -- [{size: 'M', stock: 24}]
  low_stock_alert INT DEFAULT 5,
  status TEXT DEFAULT 'active'
);

-- LAN TICKETS
CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT NOT NULL,
  event_date TIMESTAMPTZ,
  venue TEXT,
  price INT NOT NULL,
  total_seats INT,
  sold_seats INT DEFAULT 0,
  buyer_id UUID REFERENCES users(id),
  buyer_name TEXT,
  buyer_phone TEXT,
  payment_screenshot TEXT,
  status TEXT DEFAULT 'pending',   -- 'pending'|'confirmed'|'cancelled'
  ticket_code TEXT UNIQUE,         -- unique ticket ID
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SPONSORS
CREATE TABLE sponsors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  tier TEXT,               -- 'title'|'gold'|'bronze'
  logo TEXT,
  website TEXT,
  display_order INT,
  contract_start DATE,
  contract_end DATE,
  is_active BOOLEAN DEFAULT TRUE
);

-- COMMUNICATION LOG
CREATE TABLE message_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_team_id UUID REFERENCES teams(id),
  channel TEXT,            -- 'whatsapp'|'discord'|'discord_webhook'
  trigger_event TEXT,
  message TEXT,
  status TEXT DEFAULT 'sent',
  sent_by UUID REFERENCES users(id),
  sent_at TIMESTAMPTZ DEFAULT NOW()
);

-- SITE SETTINGS (key-value)
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# ═══════════════════════════════════════════════
# PART 4 — PUBLIC WEBSITE (5 PAGES)
# ═══════════════════════════════════════════════

## GLOBAL COMPONENTS

### Navbar (all pages — sticky top)
```
Background: rgba(0,0,0,0.92) | backdrop-filter: blur(16px)
Border-bottom: 1px solid #111

LEFT:   MS triangle SVG logo (white) + "MAGADH STRIKER" (Orbitron, white)
CENTER: Home | Tournaments | Services | Blog | Our Story
RIGHT:  [LOGIN WITH DISCORD] (outline white) | [REGISTER TEAM] (solid blue #2463FF)

Active link: underline with blue #2463FF
Mobile: hamburger → full-screen black overlay with nav links
```

### Footer (all pages)
```
Background: #000000
Border-top: 1px solid #111

4-column grid:
  Col 1: MS logo (white SVG) + tagline in Courier New ASCII style:
          > REPRESENTING INDIA
          > DOMINATING ESPORTS
          + social icons (white)

  Col 2: QUICK LINKS
          ASCII border around this column header:
          ┌─ QUICK LINKS ─┐

  Col 3: GAME DIVISIONS (with small text badges)

  Col 4: COMMUNITY
          Discord join button (blue)
          WhatsApp channel link
          Email newsletter input

Bottom bar: © 2026 MAGADH STRIKER ESPORTS | BIHAR, INDIA
ASCII divider above it: ─────────────── ◆ ───────────────
```

---

## ─────────────────────────────────────────
## PAGE 1: LANDING PAGE — / (8 SECTIONS)
## ─────────────────────────────────────────

### S1 — HERO (Full Viewport)

```
Background: #000000
Overlay: halftone dot grid (CSS background-image radial-gradient, white dots, 3% opacity)
Overlay 2: horizontal scanlines (repeating-linear-gradient, 2px per 4px, #111, 40% opacity)
MS triangle logo: centered, white SVG, 40vh height, opacity 0.04 (watermark)

CONTENT (centered over watermark):
  Small label in Courier New: [ MS_ESPORTS_V1 // SYSTEM_ONLINE ]
  H1 (Orbitron 900 weight, 72-96px):
    DOMINATE.
    [COMPETE].      ← this word is #2463FF
    CONQUER.
  (CSS glitch animation: randomly replaces 1-2 chars with @#| for 80ms every 4s)

  Subtext (Rajdhani, 18px, #999):
    "India's competitive esports organization.
     Free Fire MAX · BGMI · CODM · MOBA · Legend RC"

  CTA Row:
    [▶ WATCH ORG STORY] (solid blue #2463FF)
    [VIEW TOURNAMENTS →] (white outline)

  ASCII divider below CTAs:
  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

  Bottom row: Instagram / YouTube / Discord / Twitter-X / WhatsApp (white icons)
  Scroll arrow: animated ▼ in Courier New
```

### S2 — STATS TICKER

```
Background: #0A0A0A
Border-top + bottom: 1px solid #1C1C1C

ASCII frame around each stat:
  ┌─────────┐
  │  500+   │  ← JetBrains Mono, white, 48px
  │SCOUTS   │  ← Rajdhani, #999, 12px uppercase
  └─────────┘

5 stats in a row (Intersection Observer count-up on scroll):
  500+     50+       ₹10L+        4           10+
  Players  Tourneys  Prize Won    Divisions   Hosted
  Scouted  Played

Thin vertical dividers: 1px solid #1C1C1C between each
```

### S3 — GAME DIVISIONS

```
Section title with ASCII border:
  ╔══════════════════════╗
  ║   OUR DIVISIONS      ║
  ╚══════════════════════╝

4-card grid (4-col desktop / 2-col tablet / 1-col mobile):

Each card:
  Background: #0A0A0A
  Border: 1px solid #1C1C1C → hover: 1px solid #2463FF
  Image: game screenshot GRAYSCALE (CSS filter: grayscale(100%))
  On hover: image desaturates less (80% gray) — subtle color bleeds in

  Header line in Courier New: > DIVISION_[GAME_NAME]
  Game name in Orbitron bold 20px
  Player count: JetBrains Mono "5 ACTIVE"
  Status tag: ACTIVE (white outline pill) or EXPANDING (dotted border pill)

  Two links:
    [VIEW ROSTER →]
    [VIEW TOURNAMENTS →]

Games: FREE FIRE MAX | BGMI | CODM | MOBA & MORE
```

### S4 — ABOUT TEASER

```
2-column (50/50):

LEFT:
  Courier New header: // ABOUT_MS_ESPORTS
  Big pull-quote (Orbitron 44px, white):
    "MORE THAN A TEAM.
     WE ARE A
     [MOVEMENT]."   ← MOVEMENT in #2463FF

RIGHT:
  Body paragraph: Magadh Striker's origin in Bihar, national vision,
  expanding into every major title, talent from grassroots to pro.

  3 feature pills (dashed border style):
  ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
  ¦ 🏆 EXCELLENCE  ¦
  ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌

Gold text link: READ OUR FULL STORY →
```

### S5 — TOURNAMENT SPOTLIGHT

```
ASCII section title:
  ─── TOURNAMENTS ───── ◆ ──────────────

3 large tournament cards:
  Each card (B&W with ASCII details):
    Header bar: ██████████ STATUS ██████████
    Tournament name (Orbitron 20px)
    Courier New details block:
      GAME   > Free Fire MAX
      DATE   > 20 JAN 2026 | 18:00 IST
      FORMAT > SQUAD (4v4)
      SLOTS  > 24/32 [████████░░] 75%   ← slot bar in ASCII blocks
      PRIZE  > ₹25,000                  ← ONLY this line is #2463FF
      ENTRY  > ₹100/TEAM
    [REGISTER NOW] button (solid blue)
    [VIEW DETAILS →] text link

Below cards:
  Full-width dark panel:
  ┌────────────────────────────────────────────┐
  │  HOST YOUR TOURNAMENT ON OUR PLATFORM      │
  │  Other orgs can register & host here →     │
  │  [CONTACT FOR HOSTING →]                   │
  └────────────────────────────────────────────┘

[VIEW ALL TOURNAMENTS →] centered link
```

### S6 — MERCH + STREAM

```
2-column split:

LEFT — MERCHANDISE:
  ASCII label: // OFFICIAL_GEAR
  3 product cards (stacked):
    - Grayscale product image
    - Name + price in JetBrains Mono: "MS JERSEY 2026 ... ₹1,299"
    - [SHOP →] blue button
  [SEE ALL MERCH →]

RIGHT — LIVESTREAM:
  ASCII label: // LIVE_STREAM
  Embedded YouTube/Kick iframe (black border, 16:9)
  Stream status: [🔴 LIVE] or [UPCOMING: 20 JAN 18:00 IST]
  Platform switcher: [YOUTUBE] [KICK]
  Sub-text in Courier New:
    > STREAM_PLATFORM: YOUTUBE
    > REVENUE_SPLIT: 70% CREATOR
    > KICK_REVENUE_SPLIT: 95% CREATOR
```

### S7 — SPONSORS

```
ASCII label: // OUR_PARTNERS
Infinite CSS marquee of sponsor logo tiles:
  Each tile: dark background (#0A0A0A), white logo (grayscale filter),
  1px solid #1C1C1C border

Below marquee:
  "Sponsorship opportunities available for brands investing in
   Indian esports. Government CSR packages welcomed."
  [BECOME A SPONSOR →] outline button
```

### S8 — COMMUNITY JOIN CTA

```
Full-width black section, halftone dot overlay

Heading (Orbitron): "JOIN THE STRIKER FAMILY"

3 path cards (ASCII box style):
  ┌──────────────────────┐   ┌──────────────────────┐   ┌──────────────────────┐
  │  🎮 PLAY WITH US     │   │  💬 DISCORD COMMUNITY │   │  🤝 PARTNER WITH US  │
  │  Register as a player│   │  10k+ members         │   │  Sponsor the org     │
  │  [AUDITION HERE →]   │   │  [JOIN SERVER →]      │   │  [CONTACT US →]      │
  └──────────────────────┘   └──────────────────────┘   └──────────────────────┘
```

---

## ─────────────────────────────────────────────────────
## PAGE 2: TOURNAMENT HUB — /tournaments (6 SECTIONS)
## ─────────────────────────────────────────────────────

### S1 — HERO

```
Full hero (60vh), scanline overlay, halftone dots

ASCII terminal splash:
  > MAGADH_STRIKER::TOURNAMENT_SYSTEM v1.0
  > STATUS: ONLINE
  > ACTIVE_TOURNAMENTS: 4

H1: TOURNAMENTS (Orbitron, 96px, white)
Sub: "Compete · Host · Win — Open scrims to government events."

CTAs:
  [REGISTER TEAM] (solid blue)
  [HOST A TOURNAMENT] (outline white) — for other orgs
```

### S2 — FILTER BAR + LIVE BANNER

```
LIVE BANNER (conditional — only when status=live):
  Background: #000 | Border-left: 4px solid #2463FF (pulsing animation)
  > [🔴] LIVE NOW: MS Winter Clash 2026 — ROUND 3 UNDERWAY
  > [VIEW BRACKET →]  [LIVE LEADERBOARD →]

Sticky filter bar (black, border-bottom: 1px #111):
  STATUS: [ALL] [🔴 LIVE] [UPCOMING] [COMPLETED]
  GAME:   [ALL] [FREE FIRE MAX] [BGMI] [CODM] [MOBA] [LEGEND RC]
  TYPE:   [ALL] [OPEN] [INVITATIONAL] [GOVT SCRIM] [PRIVATE]
  SEARCH: > type to search...   (Courier New placeholder style)

  All filters: JS .filter() on Supabase data — no page reload
```

### S3 — TOURNAMENT LISTING GRID

```
3-col desktop / 2-col tablet / 1-col mobile

Each TOURNAMENT CARD:
┌────────────────────────────────────────┐
│ STATUS_TAG: [UPCOMING] or [🔴 LIVE]    │
│                                        │
│ TOURNAMENT NAME (Orbitron, 18px)       │
│                                        │
│ > GAME   :: Free Fire MAX              │  ← Courier New, all details
│ > DATE   :: 20 JAN 2026 18:00 IST      │
│ > FORMAT :: SQUAD (4v4)                │
│ > SLOTS  :: 24/32                      │
│ > PRIZE  :: ₹25,000                    │  ← #2463FF only
│ > ENTRY  :: ₹100/TEAM                  │
│ > TYPE   :: OPEN TOURNAMENT            │
│                                        │
│ SLOTS: [████████░░░░░] 75% FULL        │  ← ASCII progress bar
│                                        │
│ [REGISTER NOW]      [VIEW DETAILS →]   │
└────────────────────────────────────────┘

Organized by another org gets a badge:
  ┌ HOSTED BY: LIT E-SPORTS ┐
```

### S4 — TOURNAMENT DETAIL MODAL

```
Full-screen dark modal (black, no blur background)

Header:
  TOURNAMENT NAME (Orbitron 32px)
  ASCII status line: > STATUS :: UPCOMING | GAME :: Free Fire MAX | TYPE :: Open

4 quick-stat boxes (ASCII border):
  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
  │32 SLOTS│ │₹25,000 │ │ SQUAD  │ │  OPEN  │
  └────────┘ └────────┘ └────────┘ └────────┘

Tabs:
  [DETAILS] [RULES] [SCHEDULE] [REGISTERED TEAMS] [BRACKET] [LEADERBOARD]

DETAILS tab: description paragraph
RULES tab: accordion expandable rules (▶ Room Settings ▶ Conduct ▶ Prizes)
SCHEDULE tab: day-by-day timeline
REGISTERED TEAMS: list of approved team names + captain IGNs
BRACKET: visual bracket tree (only when live/completed)
LEADERBOARD: live ranking table (only when live/completed)

Bottom: [REGISTER YOUR TEAM →] solid blue
```

### S5 — TEAM REGISTRATION FLOW (Squad-Based + Anti-Bot)

```
STEP-BY-STEP WIZARD (multi-step modal):

STEP 1 — CAPTAIN CREATES TEAM
  > LOGIN WITH DISCORD (required — must be in MS Discord server)
  Team Name: [___________]
  Team Tag:  [___________]
  Game:      [Select ▼]
  Format:    [Squad ▼]
  
  hCaptcha widget (anti-bot)
  [CREATE TEAM & INVITE MEMBERS →]

STEP 2 — INVITE SQUAD MEMBERS
  Share invite link to 3 players:
  > INVITE_LINK: https://ms.gg/team/invite/XXXXXX
  [Copy Link] [Share to Discord]
  
  Member status panel:
  > SLOT 1: @CaptainIGN    [✓ JOINED]
  > SLOT 2: @Player2       [✓ JOINED]
  > SLOT 3: [Waiting...]
  > SLOT 4: [Waiting...]
  > SUB:    [Optional — Waiting...]
  
  Members join by clicking invite link → Discord OAuth login → fill their IGN
  Members upload: in-game screenshot (ID + level stats)

STEP 3 — PAYMENT
  Entry Fee: ₹100
  UPI ID: magadhstriker@upi
  
  After payment:
  Transaction ID: [___________]
  Payment Screenshot: [📎 Upload]  → goes to Supabase Storage
  
  [SUBMIT REGISTRATION]

STEP 4 — SUCCESS STATE
  > REGISTRATION_STATUS :: SUBMITTED
  > SLOT_STATUS :: PENDING_APPROVAL
  > PAYMENT_STATUS :: AWAITING_VERIFICATION
  
  ┌──────────────────────────────────────────────┐
  │ Team submitted! Admin will verify your squad │
  │ and payment within 24h via WhatsApp/Discord  │
  └──────────────────────────────────────────────┘

Slot counter updates live via Supabase Realtime subscription
```

### S6 — PAST RESULTS & HALL OF FAME

```
ASCII header: ─── RESULTS_ARCHIVE ─── ◆ ───────────

Toggle: [MS HOSTED] [TOURNAMENTS WE COMPETED IN]

Hall of Fame (3 featured winner cards):
  ASCII trophy art:
    🏆 CHAMPION: Phoenix Squad
       MS Winter Clash 2026 | ₹12,500

Full results table:
  Columns: Tournament | Date | Game | Champion | Runner-Up | Prize
  All numbers in JetBrains Mono

[VIEW ALL RESULTS] expander

CTA at bottom:
  > WANT_YOUR_NAME_HERE? → [REGISTER FOR NEXT TOURNAMENT]
```

---

## ─────────────────────────────────────────────────
## PAGE 3: SERVICES — /services (5 SECTIONS)
## ─────────────────────────────────────────────────

### S1 — HERO

```
50vh hero, scanlines
ASCII terminal:
  > MS_ESPORTS::SERVICES_MODULE
  > WHAT_WE_OFFER

H1: WHAT WE OFFER (Orbitron 56px)
Sub: "From competitive rosters to government tournaments. Full esports ecosystem."
```

### S2 — CORE SERVICES GRID

```
6 cards in 3×2 grid (or 2×3 on tablet, 1-col mobile):

Each card has:
  ASCII box header:
  ╔═══════════════════════╗
  ║ SERVICE_01            ║
  ╚═══════════════════════╝
  Icon (Lucide, white, 28px)
  Service name (Rajdhani, 18px)
  Description (Inter, 14px, #999)

Services:
  01. COMPETITIVE ROSTER — Scouting, coaching, pro player contracts
  02. TOURNAMENT HOSTING — Host your tournaments on our platform
       (Other orgs pay to use our platform infrastructure)
  03. MERCHANDISE & GEAR — Jerseys, caps, mousepads, custom peripherals
  04. SPONSORSHIPS — Title/Gold/Bronze brand partnerships
  05. CONTENT & MEDIA — YouTube, streams, social media, highlights
  06. PLAYER AUDITIONS — Open tryouts for all game divisions

Card hover: border glows blue, small blue corner triangle appears
```

### S3 — GAME TITLES + STREAMING PLATFORMS

```
2-column:

LEFT — GAME TITLES WE SUPPORT:
  ASCII label: > ACTIVE_DIVISIONS
  6 game tiles with ACTIVE/COMING SOON tags
  Filter: only B&W logos (grayscale CSS)

RIGHT — STREAMING PARTNERSHIPS:
  ASCII label: > STREAM_PLATFORMS
  YouTube block: [🔴 YOUTUBE] — 70% revenue share
  Kick block:    [🟢 KICK]    — 95% revenue share ← highlighted
  Integration: embed live stream directly on website
  Comparison table (ASCII formatted):
  ┌──────────┬────────────┬────────────┐
  │ PLATFORM │ REVENUE    │ AUDIENCE   │
  ├──────────┼────────────┼────────────┤
  │ YouTube  │ 70%        │ Massive    │
  │ Kick     │ 95%        │ Growing    │
  └──────────┴────────────┴────────────┘
```

### S4 — SPONSORSHIP PACKAGES

```
ASCII title: ─── SPONSOR_TIERS ─── ◆ ───────────

3-column pricing table:

╔════════════════╗  ╔════════════════╗  ╔════════════════╗
║  BRONZE        ║  ║  [GOLD]        ║  ║  TITLE         ║
║  PARTNER       ║  ║  PARTNER       ║  ║  SPONSOR       ║
║                ║  ║  POPULAR       ║  ║                ║
╠════════════════╣  ╠════════════════╣  ╠════════════════╣
║  ₹XX,XXX/mo    ║  ║  ₹XX,XXX/mo   ║  ║  Custom        ║
╠════════════════╣  ╠════════════════╣  ╠════════════════╣
║ ✓ Sleeve logo  ║  ║ ✓ Chest logo  ║  ║ ✓ FRONT logo   ║
║ ✓ Social posts ║  ║ ✓ Co-naming   ║  ║ ✓ All naming   ║
║ ✓ Site logo    ║  ║ ✓ Banners     ║  ║ ✓ Exclusivity  ║
║                ║  ║ ✓ Bronze+ ✓  ║  ║ ✓ Gold+Bronze  ║
╠════════════════╣  ╠════════════════╣  ╠════════════════╣
║ [CONTACT US]   ║  ║ [CONTACT US]  ║  ║ [CONTACT US]   ║
╚════════════════╝  ╚════════════════╝  ╚════════════════╝

Note: Government and CSR partnership packages available on request
```

### S5 — CONTACT FORM

```
2-column:

LEFT: Contact terminal block (ASCII styled)
  ┌──────────────────────────────────┐
  │ > EMAIL  :: contact@ms.gg       │
  │ > WHATSAPP :: +91-XXXXXXXXXX    │
  │ > CITY   :: Bihar, India        │
  │ > DISCORD :: discord.gg/ms      │
  └──────────────────────────────────┘

RIGHT: Form (all inputs on #0A0A0A, 1px solid #1C1C1C border)
  Name | Email | Phone | Organization
  Message (textarea)
  I am a: [Sponsor ▼] / [Player ▼] / [Tournament Organizer ▼] / [Media ▼]
  [SEND MESSAGE →] (solid blue)
  Supabase function saves form submission
```

---

## ──────────────────────────────────────────────
## PAGE 4: OUR STORY — /our-story (5 SECTIONS)
## ──────────────────────────────────────────────

### S1 — HERO

```
Cinematic 70vh, heavy scanline overlay
ASCII opening text (Courier New, #333, animated typewriter):
  > INITIATING_SEQUENCE
  > LOADING_MAGADH_STRIKER_STORY
  > ...
  > ONLINE.

H1 (Orbitron 56px): THE MAGADH STRIKER STORY
Sub: "Born from passion. Built for greatness. Fighting for Indian esports."
```

### S2 — ORIGIN

```
2-column:

LEFT: Big pull-quote (Orbitron 36px):
  "WE DIDN'T JUST
   BUILD A TEAM.
   WE BUILT A
   [MOVEMENT]."   ← blue

RIGHT: Origin story paragraph (Inter, #E8E8E8)
  Founders' story, Bihar origins, gap in Indian esports, early struggles,
  national ambition, talent from tier-2/tier-3 cities.
  Team/founder photo: GRAYSCALE CSS filter
```

### S3 — MILESTONE TIMELINE

```
Vertical timeline with scroll-in animation (Framer Motion)
Each milestone slides in from left on scroll

Timeline line: 1px solid #1C1C1C, left side
Dot: white circle (4px) at each milestone point

Each milestone:
  YEAR badge (JetBrains Mono, #2463FF):  2022
  Event title (Rajdhani, 16px, white):   ORGANIZATION FOUNDED
  Detail (Inter, 13px, #666):            Bihar, India

Timeline entries:
  2022 — Organization Founded in Bihar, India
  2023 — First Free Fire MAX Competitive Squad
  2023 — First National Tournament Qualifier
  2024 — BGMI Division + Official Merch Store
  2025 — Government Scrim Partnerships
  2025 — 500+ Players Scouted Through Platform
  2026 — Full Platform Launch | Website V1 LIVE
  2026 — Multi-game Expansion | International Goals
```

### S4 — MEET THE TEAM

```
ASCII label: > ROSTER_DATABASE :: ONLINE

Tab switcher (ASCII pill tabs):
  [COMPETITIVE PLAYERS] [CONTENT CREATORS] [MANAGEMENT & STAFF]

Player cards (4-col / 2-col / 1-col):
  Photo: GRAYSCALE + slight blue tint on hover (filter: grayscale(100%) → grayscale(50%) sepia(0.3))
  Border: 1px solid #1C1C1C → hover: 1px solid #2463FF

  Courier New header: > PLAYER_ID_001
  IGN (Orbitron, 16px, white)
  Real name (Inter, 13px, #666)
  Role badge (dashed border pill): IGL / RUSHER / SNIPER / COACH
  Game tag: FREE FIRE MAX (small, #666)
  Social icons: Instagram, YouTube (white, 14px)

Players loaded from Supabase `roster` table in real-time
```

### S5 — MISSION & VALUES

```
4 value blocks in 2×2 grid (ASCII box borders):

╔═══════════════════╗  ╔═══════════════════╗
║  01. EXCELLENCE   ║  ║  02. COMMUNITY    ║
║  Win at every     ║  ║  Give back to     ║
║  level. Always.   ║  ║  Indian gaming.   ║
╚═══════════════════╝  ╚═══════════════════╝

╔═══════════════════╗  ╔═══════════════════╗
║  03. INTEGRITY    ║  ║  04. GROWTH       ║
║  Fair play,       ║  ║  Careers, not     ║
║  clean always.    ║  ║  just players.    ║
╚═══════════════════╝  ╚═══════════════════╝

Full-width closing manifesto (Orbitron 20px, white):
"MAGADH STRIKER REPRESENTS EVERY INDIAN GAMER
 WHO WAS TOLD THIS ISN'T A REAL CAREER.
 WE ARE PROVING THEM [WRONG]."  ← WRONG in blue
```

---

## ──────────────────────────────────────────
## PAGE 5: BLOG — /blog (3 SECTIONS)
## ──────────────────────────────────────────

### S1 — HERO

```
40vh, scanlines
ASCII header:
  > MS_BLOG :: NEWS_FEED_ONLINE
  > FILTER_BY: CATEGORY

H1: NEWS & UPDATES (Orbitron 48px)

Category filter tabs (ASCII pill style with dashed borders):
  [ALL] [MATCH REPORTS] [ROSTER UPDATES] [TOURNAMENTS] [TIPS] [ORG NEWS]
  Each tab: color-coded with subtle left-border accent when active
```

### S2 — BLOG GRID

```
Featured post (full-width card):
  Image: GRAYSCALE, 16:9
  Category badge (Courier New): > MATCH_REPORT
  Title (Orbitron 28px)
  Author line: > WRITTEN_BY :: @AdminHandle | ROLE | JAN 20, 2026
  Excerpt (2-3 lines, Inter)
  [READ MORE →]

Regular grid (3-col / 2-col / 1-col):
  Each card:
    Image: GRAYSCALE thumbnail
    Category tag (Courier New small)
    Title (Rajdhani 16px)
    Author line (Courier New, #666)
    Excerpt (2 lines)
    [READ →]

Category filter: JS .filter() on Supabase-loaded blogPosts array
Multiple authors supported: any admin user (tournament_mgr, content_mgr, etc.)

Pagination:
  ← PREV  [1] [2] [3]  NEXT →
  In JetBrains Mono
```

### S3 — NEWSLETTER + SOCIAL

```
ASCII separator: ─────────────── ◆ ───────────────

2-column:

LEFT:
  ASCII label: > SUBSCRIBE_TO_FEED
  Email input + [SUBSCRIBE →] blue button
  "Match results, roster drops, room IDs. No spam."

RIGHT:
  ASCII label: > SOCIAL_CHANNELS
  5 platform blocks:
  > [IG] INSTAGRAM    ─ @magadhstriker
  > [YT] YOUTUBE      ─ /magadhstriker
  > [DC] DISCORD      ─ discord.gg/ms
  > [TW] TWITTER/X    ─ @ms_esports
  > [WA] WHATSAPP CH  ─ link
```

---

# ═══════════════════════════════════════════════
# PART 5 — ADMIN PANEL (/admin)
# ═══════════════════════════════════════════════

## Admin Design: "War Room Terminal"

Same B&W aesthetic as public site, but even DENSER.
Think: green/white text terminal meets military ops dashboard.
All data in tables. Monospace everywhere. No decorative elements.

Admin sidebar labels use Courier New:
```
> DASHBOARD
> TOURNAMENTS
  ↳ ALL_TOURNAMENTS
  ↳ CREATE_NEW
  ↳ [LIVE: MS WINTER CLASH]
> TEAMS_AND_PLAYERS
  ↳ ALL_TEAMS
  ↳ PLAYER_REGISTRY
  ↳ BANNED_IGNs
> CONTENT_CMS
  ↳ BLOG_POSTS
  ↳ ROSTER_MANAGER
  ↳ MERCHANDISE
  ↳ SPONSORS
  ↳ LAN_TICKETS
  ↳ MEDIA_LIBRARY
> COMMUNICATIONS
  ↳ BROADCAST
  ↳ AUTO_TEMPLATES
  ↳ MESSAGE_LOG
> ANALYTICS
> SETTINGS
  ↳ ADMIN_USERS
  ↳ SITE_CONFIG
  ↳ AUDIT_LOG
```

---

## ADMIN MODULE A — LOGIN

```
Route: /admin/login

Full-screen black terminal:
  ASCII art logo (monospace characters forming "MS")
  > MAGADH STRIKER ADMIN PORTAL
  > AUTHENTICATION REQUIRED

  [LOGIN WITH DISCORD] — primary button (solid blue)
  (Discord OAuth → Supabase Auth → check Discord guild role)

  If not in Discord server:
  > ERROR :: NOT_A_MEMBER_OF_MS_DISCORD
  > ACTION_REQUIRED :: JOIN_SERVER_FIRST

Role assignment:
  Discord guild role "Admin" → super_admin in Supabase
  Discord guild role "Tournament Manager" → tournament_mgr
  Discord guild role "Content" → content_mgr
  Regular member → redirect to public site
```

---

## ADMIN MODULE B — DASHBOARD

```
Route: /admin

Live tournament alert (if any tournament is live):
  > [🔴 LIVE] MS WINTER CLASH 2026 — ROUND 3 | 24 TEAMS ACTIVE
  [MANAGE →]

8 KPI cards (JetBrains Mono numbers):
  ACTIVE_TOURS: 4     LIVE_NOW: 1 🔴    PENDING_REGS: 23    TOTAL_TEAMS: 187
  PRIZE_TOTAL: ₹2.4L  BLOG_POSTS: 42    MERCH_ORDERS: 7     SITE_VISITS: 12.4K

4 Recharts:
  Registrations 12-month area chart
  Revenue by tournament bar chart
  Division popularity donut chart
  Daily traffic line chart

Activity log (monospace, right column):
  > 18:32 [REG] Phoenix Squad registered for MS Winter Clash
  > 18:30 [PAY] Payment screenshot submitted — pending verify
  > 17:55 [APP] Admin approved 5 teams (FF MAX Open)
  > 17:40 [SYS] Registration closed — FULL 32/32

Quick action buttons (outline style):
  [+ CREATE TOURNAMENT] [✓ APPROVE PENDING] [📢 BROADCAST] [📊 REPORTS]
```

---

## ADMIN MODULE C — TOURNAMENT MANAGEMENT

Route: `/admin/tournaments`

### C1 — Tournament List
Full table: ID | Name | Game | Type | Date | Slots | Prize | Status | Actions
Status badges: DRAFT | PUBLISHED | REGISTERING | FULL | 🔴 LIVE | COMPLETED | CANCELLED
Actions per row: [Edit] [Manage] [Results] [Archive]

### C2 — 6-Step Creation Wizard
**Step 1**: Basic info (name, game, type, format, description, rules, cover image upload to Supabase Storage)
**Step 2**: Schedule (date/time pickers, day-by-day schedule builder)
**Step 3**: Slots & registration (total slots, waitlist, invite code, registration mode)
**Step 4**: Prize & entry (prize pool, UPI ID, auto-distribution %)
**Step 5**: Scoring formula (BR Points / Kill-only / Custom, rounds, tiebreaker, room ID pattern)
**Step 6**: Review + [SAVE DRAFT] / [PUBLISH NOW] / [SCHEDULE PUBLISH date/time]

### C3 — Tournament Management Hub: `/admin/tournaments/[id]/manage`

**6 Sub-Tabs:**

#### TAB 1 — OVERVIEW
Phase tracker: DRAFT → PUBLISHED → REGISTERING → BRACKET → LIVE → COMPLETED
Counts: Registered / Approved / Rejected / Waitlisted
[ADVANCE TO NEXT PHASE →]

#### TAB 2 — REGISTRATIONS (Core operational tab)
Supabase real-time subscription — new registrations appear instantly

Table: # | Team | Captain | Discord | Players | Payment | Status | Actions
Filter: All | Pending | Approved | Rejected | Waitlisted | Paid | Unpaid
Bulk: [✓ APPROVE ALL PAID] [✗ REJECT UNPAID] [📤 EXPORT CSV] [💬 BROADCAST]

Per-row actions: [✓ APPROVE] [✗ REJECT] [↓ WAITLIST] [👁 VIEW] [💬 MSG]

**Team Detail Modal** (click VIEW):
```
> TEAM_ID :: reg_001
> TEAM_NAME :: Phoenix Squad
> CAPTAIN :: Raj Kumar | +91-98XXXXXX | Discord: RajXX#0001

> SQUAD_ROSTER:
  SLOT_1 :: IGN: PhoenixRaj_FF   | ROLE: IGL     | VERIFIED: ✓
  SLOT_2 :: IGN: KingSlayer99    | ROLE: RUSHER  | VERIFIED: ✓
  SLOT_3 :: IGN: SniperDev       | ROLE: SNIPER  | VERIFIED: ✓
  SLOT_4 :: IGN: HealthBot       | ROLE: SUPPORT | VERIFIED: ✓
  SUB    :: IGN: BenchWarmr      | ROLE: SUB     | VERIFIED: ✓

> PLAYER VERIFICATION:
  Each player's in-game screenshot: [VIEW IMAGE ↗]
  Level/Stats visible in screenshot: [VERIFIED ✓] / [NEEDS REVIEW]

> PAYMENT:
  ENTRY_FEE :: ₹100
  UPI_REF   :: XXXX-XXXX-XXXX
  SCREENSHOT :: [VIEW IMAGE ↗]
  STATUS    :: [VERIFIED ▼]

> COMMUNICATION_LOG:
  Jan 18 4:32 — Auto WhatsApp: "Registration received" ✓
  Jan 18 6:05 — Manual WhatsApp: "Payment verified, approved!" ✓

> ADMIN_NOTES: [editable]

[✓ APPROVE] [✗ REJECT — reason:] [↓ WAITLIST] [💬 SEND MSG]
```

#### TAB 3 — BRACKET GENERATOR
Format: Single Elim / Double Elim / Swiss / Round Robin / Group Stage
Seeding: Random / Manual drag-drop (@dnd-kit) / Past performance
Visual bracket tree renders after generation
[PUBLISH BRACKET → WEBSITE]
[EXPORT PNG/PDF]

#### TAB 4 — ROOM ID & MATCH SCORING

**Room ID Panel:**
```
CURRENT MATCH: QF Match 3 | Scheduled: 7:00 PM IST

> ROOM_ID   :: MS-2026-0120-M3  [AUTO-GEN] [COPY]
> PASSWORD  :: STRIKER#42        [AUTO-GEN] [COPY]
> MAP       :: Bermuda
> MODE      :: Classic | TPP | Squad

SEND TO: [All Approved Teams ▼] or [Teams In This Match]
CHANNEL: [✓ Discord Webhook] [✓ WhatsApp via log]
TIMING:  [30 min before ▼]

MESSAGE PREVIEW (Courier New):
> ROOM DETAILS — MS WINTER CLASH 2026
> MATCH: QF_3 | TIME: 19:00 IST | JAN 20
> ROOM_ID: MS-2026-0120-M3
> PASS: STRIKER#42
> MAP: Bermuda | TPP | Classic
> BE_READY: 18:50 IST (10 min early)
> GOODLUCK — MAGADH STRIKER

[📤 SEND ROOM DETAILS]
```

**Score Entry Table:**
All 8 teams per match, round-by-round input
Position dropdown + kills input → auto-calculates from formula
[SAVE ROUND] [+ ADD ROUND] [FINALIZE MATCH]

#### TAB 5 — LIVE LEADERBOARD

Auto-calculated from all saved scores via Supabase query
Supabase Realtime subscription → updates live as scores saved

```
MS WINTER CLASH 2026 — STANDINGS (AFTER R4/6)
[🔴 LIVE — AUTO-UPDATING]

RANK  TEAM              PTS   KILLS   R1   R2   R3   R4
─────────────────────────────────────────────────────────
🥇 1  Phoenix Squad      98    42     20   22   28   28
🥈 2  NoScope Kings      87    31     12   20   27   28
🥉 3  Dark Hunters       82    28     12   22   22   26

[PUBLISH TO WEBSITE] [HIDE] [EXPORT PDF]
Toggle: AUTO-PUBLISH AFTER EACH ROUND [ON ●─]
```

#### TAB 6 — RESULTS & PRIZE

```
FINAL RESULTS
🏆 CHAMPION:     Phoenix Squad    ₹12,500 → [MARK PAID]
🥈 RUNNER-UP:    NoScope Kings    ₹7,500  → [MARK PAID]
🥉 3RD PLACE:    Dark Hunters     ₹5,000  → [MARK PAID]
⚡ MVP:           PhoenixRaj_FF   ₹500    → [MARK PAID]

[PUBLISH FINAL RESULTS TO WEBSITE]
[SEND WINNER ANNOUNCEMENT — Discord + WhatsApp]
[GENERATE WINNER CERTIFICATES (PDF)]
[ARCHIVE TOURNAMENT]
```

---

## ADMIN MODULE D — TEAMS & PLAYERS

```
/admin/teams — Team directory (all tournaments)
  Table: Team | Captain | Game | Tournaments | W/L | Winnings | Status

/admin/teams/players — Player IGN registry
  Search by IGN, Discord, phone
  🚩 DUPLICATE IGN DETECTOR (same IGN in 2 teams = cheat flag)
  [🚫 BAN IGN] button → blacklists from future registrations

/admin/teams/banned — Banned IGN list with reason + unban (Super Admin only)
```

---

## ADMIN MODULE E — CMS

```
/admin/cms/blog        — Blog list + rich text editor (Tiptap) + multi-author + scheduling
/admin/cms/roster      — Add/edit/delete players (syncs to public /our-story page)
/admin/cms/merch       — Products with size variants + stock tracking + low-stock alerts
/admin/cms/sponsors    — Tier system + contract expiry auto-deactivation + drag-reorder
/admin/cms/lan-tickets — Create LAN events, set seat count, manage ticket orders, generate ticket codes
/admin/cms/media       — Supabase Storage browser (upload, copy URL, delete, filter by type)
```

### LAN Ticket Module (new — from meeting notes)
```
CREATE EVENT:
  Event Name | Date | Venue | Total Seats | Ticket Price | Description

TICKET ORDERS TABLE:
  Buyer | Discord | Phone | Payment Screenshot | Status | Ticket Code | Actions

Each confirmed ticket → unique 8-char ticket code auto-generated
QR code generation for each ticket (for LAN entry scan)
[CONFIRM] [CANCEL] [EXPORT ATTENDEES LIST]
```

---

## ADMIN MODULE F — COMMUNICATIONS

```
/admin/communications    — Broadcast composer (target: tournament/game/all/approved/waitlisted)
                           Channels: Discord Webhook + manual WhatsApp log
/admin/communications/templates — 10 auto-trigger templates (editable, variable-based)
/admin/communications/log       — Full sent message log (searchable, resend-failed button)
```

Auto-notification triggers:
| Event | Template |
|-------|---------|
| Team registers | "Registration Received" |
| Team approved | "You're IN! 🎮" |
| Team rejected | "Registration Issue" |
| Slots full | "Tournament FULL" |
| Bracket published | "Bracket is LIVE" |
| Room ID ready | "Room Details for Match" |
| Results published | "Final Results Out!" |
| Ticket confirmed | "Your LAN Ticket is Ready!" |

---

## ADMIN MODULE G — ANALYTICS

```
/admin/analytics     — Overview charts (Recharts):
                        Registrations over 12 months | Revenue by tournament
                        Division popularity donut | Ticket sales | Blog views

/admin/analytics/reports — Report generator:
                        Tournament Summary | Registration Export | Prize Record
                        Team Performance | Revenue Summary | Full Season
                        Export: PDF (jsPDF) | CSV | Excel
```

---

## ADMIN MODULE H — SETTINGS

```
/admin/settings/users   — Add/edit/deactivate admin users (tied to Discord roles)
/admin/settings/site    — Website config: org name, UPI ID, Discord webhooks, social links,
                          YouTube/Kick URLs, hero stats values
/admin/settings/scoring — Scoring template library (create/save/reuse formulas)
/admin/settings/audit   — Read-only audit log: every admin action with user + timestamp
```

---

# ═══════════════════════════════════════════════
# PART 6 — FULL AUTOMATION LIFECYCLE
# ═══════════════════════════════════════════════

```
STEP 1 — TOURNAMENT PUBLISHED
  Supabase: status → 'published'
  Public /tournaments page: card appears immediately (Supabase Realtime)
  Discord webhook: #announcements auto-post

STEP 2 — TEAM REGISTERS (squad-based flow)
  Captain: Discord login → creates team → Supabase teams row (status: pending)
  Players: join via invite link → Discord login → fill IGN → upload screenshot
  Payment: captain uploads UPI screenshot → stored in Supabase Storage
  Slot counter updates: Supabase Realtime → public site updates live
  Auto Discord DM (webhook): "Registration received ✅"

STEP 3 — SLOTS FULL
  Supabase: status → 'full' (triggered when slots = totalSlots)
  Public site: "SLOTS FULL" badge auto-appears
  Waitlist: opens automatically if enabled

STEP 4 — ADMIN APPROVES (with player verification)
  Admin views: team details + player screenshots + payment screenshot
  Checks: player level/stats visible in screenshots
  Approves → Supabase: team status → 'approved'
  Discord webhook: captain notified "You're IN! 🎮"
  Public registered teams list: team name appears

STEP 5 — PAYMENT DEADLINE PASSES
  Supabase Edge Function (cron): auto-flags unpaid teams
  Admin bulk-reject option surfaces
  Freed slots → waitlisted teams notified

STEP 6 — BRACKET GENERATED
  Admin: generates bracket → published to public tournament page
  Discord webhook: "Bracket is LIVE! [link]"
  All approved teams: notified of their match opponent

STEP 7 — 30 MIN BEFORE MATCH (Supabase Edge Function / cron)
  Room ID + Password saved to Supabase matches table
  Sent to Discord webhook #room-info
  All teams in match see it in their public team page

STEP 8 — ADMIN ENTERS SCORES
  Supabase: round_scores rows inserted
  Leaderboard: auto-recalculated via Supabase DB function
  Supabase Realtime: public leaderboard updates live

STEP 9 — TOURNAMENT COMPLETED
  Supabase: status → 'completed', results stored
  Final leaderboard published
  Discord webhook: winner announcement
  PDF certificates generated (jsPDF)
  Prize payment tracker updated

STEP 10 — ARCHIVE
  All data preserved in Supabase (permanent)
  Team stats auto-update (wins, winnings)
  Tournament appears in /tournaments Hall of Fame section
  Analytics charts auto-update
```

---

# ═══════════════════════════════════════════════
# PART 7 — ASCII MAGIC LOGO TREATMENT
# ═══════════════════════════════════════════════

For the MS Esports logo displayed on the website (ASCII art version):

Use **ASCII Magic** at https://www.ascii-magic.com/app with these exact settings:

```
Style:      Characters (classic ASCII art)
            URL: ascii-magic.com/styles/ascii-art

Settings:
  Character Ramp: @#S%?*+;:,. (high contrast, B&W optimized)
  Font Size:      8px (maximum detail)
  Density:        85%
  Brightness:     +10
  Contrast:       +25

Color Mode: BLACK AND WHITE (monochrome toggle)
  → Background: Black (#000000)
  → Characters: White (#FFFFFF)

Post-Effects (stack all):
  ✓ Scanlines       (spacing: 2, intensity: 30%)
  ✓ Vignette        (dark corners)
  ✓ CRT Curvature   (subtle, 20%)

Export:
  Format: PNG
  Resolution: 4× (print quality)
  Background: None (transparent) — then set black in CSS
```

This produces a **white ASCII character art** version of the MS triangle logo on black background.
Use this as the hero watermark element (opacity: 0.04) and as the About section decorative background.

Display in site: `<pre>` tag with `font-family: 'Courier New'` and `white-space: pre`
CSS: `color: #FFFFFF; opacity: 0.04; font-size: 6px; line-height: 1`

---

# ═══════════════════════════════════════════════
# PART 8 — QUALITY CHECKLIST
# ═══════════════════════════════════════════════

## Design
- [ ] Pure black (#000000) backgrounds everywhere — no gradients
- [ ] White text hierarchy (#FFF / #E8E8E8 / #999 / #4A4A4A)
- [ ] Blue (#2463FF) used ONLY as accent — never as background
- [ ] ALL photos/images in CSS grayscale filter
- [ ] Orbitron for headings, JetBrains Mono for stats/IDs
- [ ] ASCII decorative elements in at least 6 sections
- [ ] Scanline overlay on all hero sections
- [ ] MS triangle watermark in hero sections (opacity 0.04)
- [ ] Glitch text animation on H1 heroes
- [ ] Halftone dot pattern overlaid on hero backgrounds

## Authentication
- [ ] Discord OAuth works via Supabase Auth
- [ ] Admin role assigned based on Discord guild role
- [ ] Non-members redirected to Discord join page
- [ ] Session persists across page refreshes

## Tournament Flow
- [ ] Squad-based registration (invite link system)
- [ ] hCaptcha anti-bot on all registration forms
- [ ] Player screenshot upload → Supabase Storage
- [ ] Payment screenshot upload → Supabase Storage
- [ ] Supabase Realtime slot counter updates live on public site
- [ ] Admin team detail modal shows all player screenshots
- [ ] Bracket generator works with approved teams
- [ ] Room ID sent via Discord webhook
- [ ] Score entry → leaderboard auto-recalculates
- [ ] Supabase Realtime → public leaderboard updates live
- [ ] Winner certificates PDF generated

## Platform Features (from meeting)
- [ ] Other orgs can HOST tournaments on this platform
- [ ] LAN event ticketing with unique ticket codes
- [ ] YouTube + Kick stream embed with switcher
- [ ] Merchandise store section (with third-party link integration)
- [ ] Discord auth for all user logins
- [ ] In-game screenshot verification in registration
- [ ] Custom admin dashboard (not generic)
- [ ] All player data visible to admin for verification

## Technical
- [ ] All 5 public pages navigable
- [ ] Supabase database connected for all dynamic data
- [ ] Supabase Auth (Discord OAuth) working
- [ ] Supabase Storage for file uploads working
- [ ] Supabase Realtime for live updates
- [ ] Admin panel RBAC working
- [ ] All 8 admin modules functional
- [ ] Mobile responsive (320px / 768px / 1024px / 1440px)
- [ ] Dark mode ONLY — no light mode anywhere

---

# ═══════════════════════════════════════════════
# PART 9 — THE NORTH STAR
# ═══════════════════════════════════════════════

## For the Public Website:
The aesthetic must feel like a **professional fighter's emblem** — clean, black, no nonsense, with the sharp blue accent cutting through like a blade. When a sponsor or government esports official opens this site, they should feel: *"This organization is serious."*

The ASCII art details are NOT gimmicks — they are the brand voice. Terminal aesthetics say: we speak the language of technology and competition. The grayscale photos say: this is focused, disciplined, no distractions.

## For the Admin Panel:
When the MS Esports team opens this on tournament day, they must complete the full operations cycle — verify squads with screenshots, bulk-approve teams, generate bracket, send room IDs to Discord, enter live scores, watch the Supabase Realtime leaderboard update automatically, announce the winner, generate certificates, handle LAN tickets — **all from one screen, all connected to Supabase, zero manual effort.**

## The Mission:
Build the platform that **every serious Indian esports org should have** but doesn't. This is Magadh Striker's weapon. Build it.