-- ORG VERIFICATIONS
CREATE TABLE org_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  org_name TEXT NOT NULL,
  registration_doc_url TEXT,  -- URL to uploaded document in Supabase Storage
  socials_url TEXT,
  contact_email TEXT,
  status TEXT DEFAULT 'pending', -- 'pending' | 'approved' | 'rejected'
  admin_notes TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Note: We might want RLS policies here in production, 
-- but for the current scope we are managing via server-side checks.
