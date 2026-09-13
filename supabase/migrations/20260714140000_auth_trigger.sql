-- Function to automatically create a profile for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (
    id, 
    discord_id, 
    discord_username, 
    discord_avatar, 
    email, 
    role
  )
  VALUES (
    NEW.id,
    -- Extract Discord ID from provider_id or sub
    COALESCE(NEW.raw_user_meta_data->>'sub', NEW.id::text),
    -- Extract username from metadata
    COALESCE(NEW.raw_user_meta_data->>'custom_claims'->>'global_name', NEW.raw_user_meta_data->>'name', NEW.email),
    -- Extract avatar URL
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.email,
    'user' -- Default role
  )
  ON CONFLICT (id) DO UPDATE SET
    discord_username = EXCLUDED.discord_username,
    discord_avatar = EXCLUDED.discord_avatar,
    email = EXCLUDED.email;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
