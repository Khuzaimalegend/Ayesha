-- Insert default categories
INSERT INTO categories (name, slug, description) VALUES
  ('Islamic Reflections', 'islamic-reflections', 'Deep thoughts and reflections on Islamic teachings and spirituality'),
  ('Quranic Insights', 'quranic-insights', 'Understanding and contemplating verses from the Holy Quran'),
  ('Spiritual Growth', 'spiritual-growth', 'Articles about developing and strengthening your relationship with Allah'),
  ('Islamic Lifestyle', 'islamic-lifestyle', 'Living according to Islamic principles in the modern world'),
  ('Duas and Dhikr', 'duas-and-dhikr', 'The power and beauty of Islamic prayers and remembrance')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, content, excerpt, category_id, published, featured, meta_title, meta_description, tags, reading_time) VALUES
  (
    'The Beauty of Morning Dhikr',
    'beauty-of-morning-dhikr',
    'Starting your day with the remembrance of Allah brings peace and barakah to your entire day. The morning dhikr, or morning remembrance, is a beautiful Sunnah that connects us with our Creator from the very beginning of each day.

When we wake up and immediately turn our hearts to Allah, we set the tone for everything that follows. The Prophet (peace be upon him) taught us specific supplications to recite upon waking, and these words carry immense spiritual power.

"الحمد لله الذي أحيانا بعد ما أماتنا وإليه النشور"
"All praise is for Allah who gave us life after having taken it from us, and unto Him is the resurrection."

This simple yet profound dhikr reminds us of Allah''s mercy in granting us another day of life. It acknowledges that sleep is like a small death, and waking is like a resurrection - a daily reminder of the greater resurrection to come.

The morning dhikr also includes seeking Allah''s protection for the day ahead, asking for His guidance, and expressing gratitude for His countless blessings. When we begin our day in this state of mindfulness and connection with Allah, we find that our hearts remain more centered throughout the day''s challenges and joys.',
    'Discover the spiritual power and peace that comes from starting your day with the beautiful practice of morning dhikr and remembrance of Allah.',
    (SELECT id FROM categories WHERE slug = 'duas-and-dhikr'),
    true,
    true,
    'The Beauty of Morning Dhikr - Islamic Spiritual Practice',
    'Learn about the importance and benefits of morning dhikr in Islam. Discover how starting your day with remembrance of Allah brings peace and barakah.',
    ARRAY['dhikr', 'morning prayers', 'Islamic spirituality', 'sunnah', 'remembrance'],
    5
  ),
  (
    'Finding Peace in Surah Al-Fatiha',
    'finding-peace-surah-al-fatiha',
    'Surah Al-Fatiha, the opening chapter of the Quran, is perhaps the most recited and beloved passage in all of Islamic literature. Known as "The Opening" and "The Mother of the Book," this magnificent surah contains within its seven verses the essence of the entire Quran.

Every time we stand in prayer, we recite these blessed words, yet how often do we pause to truly contemplate their profound meaning? Each verse of Al-Fatiha is a treasure trove of spiritual wisdom and guidance.

"بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
"In the name of Allah, the Most Gracious, the Most Merciful."

We begin with the Basmala, invoking Allah''s mercy and grace. This opening reminds us that everything we do should be done in Allah''s name and with His blessing.

"الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ"
"All praise is due to Allah, Lord of all the worlds."

Here we acknowledge Allah as the Creator and Sustainer of everything that exists. The word "Hamd" encompasses not just praise, but gratitude, love, and recognition of Allah''s perfection.

When we recite Al-Fatiha with presence and understanding, it becomes a conversation with our Creator - we praise Him, seek His guidance, and ask for His mercy. This daily dialogue through prayer keeps our hearts connected to the Divine and provides us with the spiritual nourishment we need to navigate life''s journey.',
    'Explore the profound spiritual meanings within Surah Al-Fatiha and discover how this beloved chapter can bring peace and guidance to your daily prayers.',
    (SELECT id FROM categories WHERE slug = 'quranic-insights'),
    true,
    true,
    'Finding Peace in Surah Al-Fatiha - Quranic Reflection',
    'Discover the deep spiritual meanings in Surah Al-Fatiha, the opening chapter of the Quran, and how it can transform your daily prayers.',
    ARRAY['Quran', 'Al-Fatiha', 'prayer', 'spiritual reflection', 'Islamic meditation'],
    7
  ),
  (
    'The Art of Gratitude in Islam',
    'art-of-gratitude-islam',
    'Gratitude, or "Shukr" in Arabic, is one of the most emphasized concepts in Islam. It is not merely saying "Alhamdulillah" - though that is beautiful and important - but rather a complete state of being that encompasses our heart, tongue, and actions.

The Quran repeatedly reminds us of the importance of gratitude: "If you are grateful, I will certainly give you more" (14:7). This divine promise shows us that gratitude is not just a nice quality to have, but a key that unlocks Allah''s continued blessings in our lives.

True Islamic gratitude has three dimensions:

**Gratitude of the Heart (Shukr bil-Qalb):** This is recognizing in our hearts that every blessing comes from Allah alone. When we receive something good, our first thought should be of Allah''s generosity and mercy.

**Gratitude of the Tongue (Shukr bil-Lisan):** This involves expressing our thanks through words - saying Alhamdulillah, making dua, and speaking about Allah''s blessings to others.

**Gratitude of the Limbs (Shukr bil-Arkan):** This is using Allah''s blessings in ways that please Him. If Allah has given us wealth, we use it for good causes. If He has given us knowledge, we share it. If He has given us health, we use it in His service.

The Prophet (peace be upon him) was known for his extraordinary gratitude. Even in times of difficulty, he would find reasons to thank Allah. This teaches us that gratitude is not dependent on our circumstances, but on our perspective and faith.',
    'Learn about the Islamic concept of Shukr (gratitude) and how cultivating true thankfulness can transform your relationship with Allah and bring more blessings into your life.',
    (SELECT id FROM categories WHERE slug = 'spiritual-growth'),
    true,
    false,
    'The Art of Gratitude in Islam - Shukr and Spiritual Growth',
    'Discover the three dimensions of Islamic gratitude (Shukr) and how practicing true thankfulness can transform your spiritual life and attract more blessings.',
    ARRAY['gratitude', 'shukr', 'Islamic spirituality', 'blessings', 'spiritual growth'],
    6
  )
ON CONFLICT (slug) DO NOTHING;

-- Insert admin user (password: ayesha - in production, this should be properly hashed)
INSERT INTO admin_users (email, password_hash, name, role) VALUES
  ('ayesha@noorwritings.com', '$2b$10$rQZ8qNqZ8qNqZ8qNqZ8qNOe', 'Ayesha', 'admin')
ON CONFLICT (email) DO NOTHING;
