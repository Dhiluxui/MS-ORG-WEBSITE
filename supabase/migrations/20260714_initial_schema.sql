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
