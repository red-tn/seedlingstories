-- Admins table for multi-admin support with roles
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  display_name TEXT,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('super_admin', 'admin', 'editor', 'viewer')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Function to verify admin password
CREATE OR REPLACE FUNCTION verify_admin_password(input_username TEXT, input_password TEXT)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM admins
    WHERE username = input_username
    AND password_hash = crypt(input_password, password_hash)
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Function to create a new admin with hashed password
CREATE OR REPLACE FUNCTION create_admin(input_username TEXT, input_password TEXT, input_display_name TEXT, input_role TEXT DEFAULT 'editor')
RETURNS VOID AS $$
  INSERT INTO admins (username, password_hash, display_name, role)
  VALUES (input_username, crypt(input_password, gen_salt('bf')), input_display_name, input_role);
$$ LANGUAGE sql SECURITY DEFINER;

-- Function to update admin password
CREATE OR REPLACE FUNCTION update_admin_password(admin_id UUID, new_password TEXT)
RETURNS VOID AS $$
  UPDATE admins SET password_hash = crypt(new_password, gen_salt('bf')), updated_at = NOW()
  WHERE id = admin_id;
$$ LANGUAGE sql SECURITY DEFINER;

-- Seed with the initial super admin (password: seedling-admin-2024)
INSERT INTO admins (username, password_hash, display_name, role)
VALUES ('admin', crypt('seedling-admin-2024', gen_salt('bf')), 'Admin', 'super_admin')
ON CONFLICT (username) DO NOTHING;
