-- Add coloring pages and memory verse card to pack_content
ALTER TABLE pack_content ADD COLUMN IF NOT EXISTS coloring_pages JSONB DEFAULT '[]'::jsonb;
ALTER TABLE pack_content ADD COLUMN IF NOT EXISTS memory_verse_card_url TEXT;
