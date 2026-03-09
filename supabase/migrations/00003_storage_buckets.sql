INSERT INTO storage.buckets (id, name, public) VALUES ('pack-covers', 'pack-covers', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('pack-previews', 'pack-previews', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('pack-content', 'pack-content', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('site-assets', 'site-assets', true);

-- Public read for all storage buckets
CREATE POLICY "Public read all buckets" ON storage.objects FOR SELECT USING (true);

-- Note: pack-content uses random UUIDs in paths to make URLs unguessable
-- e.g., pack-content/{pack-slug}/{random-uuid}/narration-full.mp3
