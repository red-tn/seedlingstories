ALTER TABLE packs ENABLE ROW LEVEL SECURITY;
ALTER TABLE pack_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE invite_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public read for published packs
CREATE POLICY "Anyone can read published packs" ON packs FOR SELECT USING (status = 'published');

-- Email subscribe (insert only)
CREATE POLICY "Anyone can subscribe" ON subscribers FOR INSERT WITH CHECK (true);

-- Public read for published blog posts
CREATE POLICY "Anyone can read published posts" ON blog_posts FOR SELECT USING (status = 'published');

-- Contact form submissions (insert only)
CREATE POLICY "Anyone can submit contact form" ON contact_submissions FOR INSERT WITH CHECK (true);

-- pack_content and invite_codes: NO public policies
-- Accessed only via API routes using service role key
