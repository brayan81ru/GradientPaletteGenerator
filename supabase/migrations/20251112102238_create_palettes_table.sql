/*
  # Create Gradient Palettes Table

  1. New Tables
    - `palettes`
      - `id` (uuid, primary key) - Unique identifier for each palette
      - `user_id` (uuid) - Owner of the palette
      - `name` (text) - Name of the palette
      - `description` (text, nullable) - Optional description
      - `grid_size` (integer) - Number of cells in the grid (e.g., 64 for 8x8)
      - `grid_cols` (integer) - Number of columns in the grid
      - `gradient_data` (jsonb) - Array of gradient definitions with top and bottom colors
      - `is_template` (boolean) - Whether this is a preset template
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
  
  2. Security
    - Enable RLS on `palettes` table
    - Add policy for users to read their own palettes
    - Add policy for users to read public templates
    - Add policy for users to create their own palettes
    - Add policy for users to update their own palettes
    - Add policy for users to delete their own palettes
*/

CREATE TABLE IF NOT EXISTS palettes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  name text NOT NULL,
  description text,
  grid_size integer NOT NULL DEFAULT 64,
  grid_cols integer NOT NULL DEFAULT 8,
  gradient_data jsonb NOT NULL,
  is_template boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE palettes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own palettes"
  ON palettes FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR is_template = true);

CREATE POLICY "Anonymous users can view templates"
  ON palettes FOR SELECT
  TO anon
  USING (is_template = true);

CREATE POLICY "Users can create own palettes"
  ON palettes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own palettes"
  ON palettes FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own palettes"
  ON palettes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_palettes_user_id ON palettes(user_id);
CREATE INDEX IF NOT EXISTS idx_palettes_is_template ON palettes(is_template);