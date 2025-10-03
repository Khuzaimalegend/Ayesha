-- Create blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  author_name TEXT DEFAULT 'Noor Writings',
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  category TEXT DEFAULT 'Islamic Reflections',
  tags TEXT[] DEFAULT '{}',
  quranic_verse TEXT,
  verse_reference TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Insert default categories
INSERT INTO categories (name, slug, description) VALUES
('Islamic Reflections', 'islamic-reflections', 'Spiritual insights and reflections on Islamic teachings'),
('Quran Studies', 'quran-studies', 'Deep dives into Quranic verses and their meanings'),
('Hadith Wisdom', 'hadith-wisdom', 'Lessons from the sayings and actions of Prophet Muhammad (PBUH)'),
('Islamic History', 'islamic-history', 'Stories and lessons from Islamic history'),
('Personal Growth', 'personal-growth', 'Islamic perspectives on self-improvement and spirituality')
ON CONFLICT (slug) DO NOTHING;

-- Create RLS policies
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published posts
CREATE POLICY "Public can read published posts" ON blog_posts
  FOR SELECT USING (published = true);

-- Allow public read access to categories
CREATE POLICY "Public can read categories" ON categories
  FOR SELECT USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for blog_posts
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
