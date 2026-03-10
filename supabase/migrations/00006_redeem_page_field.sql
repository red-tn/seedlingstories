-- Add redeem_page JSONB column to pack_content for PDF last-page customization
ALTER TABLE pack_content ADD COLUMN IF NOT EXISTS redeem_page JSONB;
