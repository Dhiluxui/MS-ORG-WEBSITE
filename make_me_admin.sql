-- 1. Sync any users from Supabase Auth into our custom public.users table
INSERT INTO public.users (id, discord_id, discord_username, role)
SELECT 
  id, 
  COALESCE(raw_user_meta_data->>'provider_id', raw_user_meta_data->>'sub', id::text) as discord_id, 
  COALESCE(raw_user_meta_data->'custom_claims'->>'global_name', raw_user_meta_data->>'full_name', raw_user_meta_data->>'name', 'Admin') as discord_username, 
  'super_admin' as role
FROM auth.users
ON CONFLICT (id) DO UPDATE SET role = 'super_admin';

-- 2. Make sure anyone already in the table is an admin so you can test locally
UPDATE public.users SET role = 'super_admin';
