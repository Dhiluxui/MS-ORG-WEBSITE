-- 1. Insert Tournaments and return their IDs
WITH new_tournaments AS (
  INSERT INTO tournaments (id, name, game, type, format, description, total_slots, entry_fee, prize_pool, status)
  VALUES 
    (gen_random_uuid(), 'MS Winter Clash 2026', 'Free Fire MAX', 'open', 'Squad', 'The biggest winter showdown of 2026.', 32, 100, 25000, 'live'),
    (gen_random_uuid(), 'BGMI Showdown', 'BGMI', 'invitational', 'Squad', 'Pro teams only.', 16, 500, 150000, 'published'),
    (gen_random_uuid(), 'CODM Weekly Scrims', 'CODM', 'open', 'Squad', 'Weekly practice.', 64, 0, 5000, 'registering')
  RETURNING id, name
)
-- 2. Insert Teams linked to MS Winter Clash
INSERT INTO teams (tournament_id, team_name, captain_discord, payment_status, status)
SELECT 
  id as tournament_id, 
  'Phoenix Squad' as team_name, 
  'RajXX#0001' as captain_discord, 
  'verified' as payment_status, 
  'approved' as status
FROM new_tournaments WHERE name = 'MS Winter Clash 2026'

UNION ALL

SELECT 
  id, 'GodLike Esports', 'GodL#9999', 'pending', 'pending'
FROM new_tournaments WHERE name = 'MS Winter Clash 2026'

UNION ALL

SELECT 
  id, 'NoScope Kings', 'NSK#1234', 'verified', 'approved'
FROM new_tournaments WHERE name = 'MS Winter Clash 2026';

-- 3. Insert Blog Posts
INSERT INTO blog_posts (title, slug, category, status, content, author_name)
VALUES 
  ('Welcome to Magadh Striker Esports', 'welcome-to-ms', 'Announcements', 'published', '<p>We are officially launching our new platform.</p>', 'Admin'),
  ('Winter Clash 2026 Details', 'winter-clash-2026', 'Tournaments', 'published', '<p>Registration opens tomorrow!</p>', 'Tournament Mgr');

-- 4. Insert Products
INSERT INTO products (name, price, category, status)
VALUES 
  ('MS Pro Jersey 2026', 999, 'Apparel', 'active'),
  ('Striker Gaming Sleeve', 299, 'Accessories', 'active');
