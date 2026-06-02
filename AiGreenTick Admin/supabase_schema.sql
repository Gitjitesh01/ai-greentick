-- ====================================================================
-- SUPABASE SCHEMA INITIALIZATION FOR AI GREENTICK
-- ====================================================================
-- Run this script in the Supabase SQL Editor (Dashboard -> SQL Editor)
-- to create the required tables and configure Row-Level Security.

-- 1. Create 'site_content' table
CREATE TABLE IF NOT EXISTS site_content (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create 'leads' table
CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company TEXT DEFAULT '',
    type TEXT DEFAULT 'General Inquiry',
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable Row-Level Security (RLS) for security best practices
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- 4. Create public read/write policies for 'site_content' table
DROP POLICY IF EXISTS "Allow public read access on site_content" ON site_content;
CREATE POLICY "Allow public read access on site_content" 
ON site_content FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Allow public write access on site_content" ON site_content;
CREATE POLICY "Allow public write access on site_content" 
ON site_content FOR ALL 
USING (true) 
WITH CHECK (true);

-- 5. Create public access policies for 'leads' table
DROP POLICY IF EXISTS "Allow public read access on leads" ON leads;
CREATE POLICY "Allow public read access on leads" 
ON leads FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Allow public insert access on leads" ON leads;
CREATE POLICY "Allow public insert access on leads" 
ON leads FOR INSERT 
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public delete access on leads" ON leads;
CREATE POLICY "Allow public delete on leads" 
ON leads FOR DELETE 
USING (true);

-- ====================================================================
-- SUPABASE STORAGE BUCKET CONFIGURATION FOR IMAGE LIBRARY
-- ====================================================================
-- The Express backend automatically ensures the 'images' bucket is created
-- in Supabase. Run these policies in your Supabase SQL Editor if you need
-- to authorize public/authenticated uploads or reads on the storage bucket:

-- Allow public read access to uploaded images
DROP POLICY IF EXISTS "Allow public read access on images bucket" ON storage.objects;
CREATE POLICY "Allow public read access on images bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Allow public upload access to images bucket
DROP POLICY IF EXISTS "Allow public upload on images bucket" ON storage.objects;
CREATE POLICY "Allow public upload on images bucket"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'images');

-- Allow public delete access to images bucket
DROP POLICY IF EXISTS "Allow public delete on images bucket" ON storage.objects;
CREATE POLICY "Allow public delete on images bucket"
ON storage.objects FOR DELETE
USING (bucket_id = 'images');

