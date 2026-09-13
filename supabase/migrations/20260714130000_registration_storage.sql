-- Enable Storage for Registration Screenshots

INSERT INTO storage.buckets (id, name, public) 
VALUES ('screenshots', 'screenshots', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
-- Allow anyone to upload a screenshot (since they might not be authenticated until later in the flow if using custom auth)
-- In a strict setup, we would restrict this to authenticated users only.
CREATE POLICY "Allow public uploads to screenshots" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'screenshots');

-- Allow public viewing of screenshots (so admins and the UI can render them)
CREATE POLICY "Allow public read access to screenshots" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'screenshots');
