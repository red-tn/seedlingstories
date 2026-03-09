CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE packs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  age_tier TEXT NOT NULL CHECK (age_tier IN ('seeds', 'sprouts', 'branches', 'roots')),
  age_label TEXT,
  scripture_refs TEXT[],
  price_display TEXT DEFAULT '$14.99',
  etsy_url TEXT,
  gumroad_url TEXT,
  cover_image_url TEXT,
  preview_images TEXT[],
  preview_audio_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_free BOOLEAN DEFAULT FALSE,
  sort_order INT DEFAULT 0,
  includes JSONB DEFAULT '[]',
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  series_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE pack_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pack_id UUID NOT NULL REFERENCES packs(id) ON DELETE CASCADE,
  narration_full_url TEXT,
  narration_duration_seconds INT,
  page_narrations JSONB,
  song_title TEXT,
  song_url TEXT,
  song_lyrics TEXT,
  song_duration_seconds INT,
  video_url TEXT,
  video_duration_seconds INT,
  video_thumbnail_url TEXT,
  discussion_questions TEXT[],
  memory_verse TEXT,
  memory_verse_ref TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(pack_id)
);

CREATE TABLE invite_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  pack_id UUID NOT NULL REFERENCES packs(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT TRUE,
  redeemed_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  source TEXT DEFAULT 'website',
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image_url TEXT,
  tags TEXT[],
  seo_title TEXT,
  seo_description TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_packs_slug ON packs(slug);
CREATE INDEX idx_packs_age_tier ON packs(age_tier);
CREATE INDEX idx_packs_status ON packs(status);
CREATE INDEX idx_packs_featured ON packs(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_invite_codes_code ON invite_codes(code);
CREATE INDEX idx_invite_codes_pack ON invite_codes(pack_id);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_subscribers_email ON subscribers(email);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_packs_updated_at BEFORE UPDATE ON packs FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_pack_content_updated_at BEFORE UPDATE ON pack_content FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
