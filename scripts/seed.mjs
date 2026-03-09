import { createClient } from '@supabase/supabase-js';

const c = createClient(
  'https://szyvodyudxspzwrihitk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6eXZvZHl1ZHhzcHp3cmloaXRrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzA2Mzk3OCwiZXhwIjoyMDg4NjM5OTc4fQ.2vZfYDAme6BtSU_BDA0E9q_Eon3jt1c4rVeS2HsHz10'
);

async function seed() {
  // Insert packs
  const { data: packs, error: packErr } = await c.from('packs').insert([
    {
      slug: 'god-made-me', title: 'God Made Me!', subtitle: 'A creation story for little ones',
      description: 'A gentle introduction to God as our Creator, with tactile illustrations perfect for tiny hands.',
      age_tier: 'seeds', age_label: 'Ages 2-4', scripture_refs: ['Psalm 139:14'],
      price_display: '$14.99', is_featured: true, is_free: false, sort_order: 1,
      includes: [{type:'story-pages',label:'8 Story Pages'},{type:'coloring-pages',label:'4 Coloring Pages'},{type:'audio-narration',label:'Audio Narration'}],
      status: 'published', series_name: 'Creation & Wonder'
    },
    {
      slug: 'gods-beautiful-world', title: "God's Beautiful World", subtitle: 'Exploring creation day by day',
      description: 'Journey through each day of creation with vibrant watercolor illustrations and soothing narration.',
      age_tier: 'seeds', age_label: 'Ages 2-4', scripture_refs: ['Genesis 1:1-31'],
      price_display: '$14.99', is_featured: false, is_free: false, sort_order: 2,
      includes: [{type:'story-pages',label:'10 Story Pages'},{type:'audio-narration',label:'Audio Narration'},{type:'worship-song',label:'Worship Song'}],
      status: 'published', series_name: 'Creation & Wonder'
    },
    {
      slug: 'gods-love-is-big', title: "God's Love Is Big!", subtitle: "Learning about God's endless love",
      description: 'Simple, powerful reminders of how much God loves each child.',
      age_tier: 'seeds', age_label: 'Ages 2-4', scripture_refs: ['1 John 4:8'],
      price_display: '$14.99', is_featured: false, is_free: true, sort_order: 3,
      includes: [{type:'story-pages',label:'8 Story Pages'},{type:'coloring-pages',label:'3 Coloring Pages'}],
      status: 'published'
    },
    {
      slug: 'the-creation-story', title: 'The Creation Story', subtitle: '7 days of wonder',
      description: 'The complete creation narrative adapted for early readers with interactive audio and activities.',
      age_tier: 'sprouts', age_label: 'Ages 4-6', scripture_refs: ['Genesis 1:1-2:3'],
      price_display: '$14.99', is_featured: true, is_free: false, sort_order: 1,
      includes: [{type:'story-pages',label:'12 Story Pages'},{type:'audio-narration',label:'Audio Narration'},{type:'worship-song',label:'Worship Song'},{type:'animated-video',label:'Animated Video'}],
      status: 'published', series_name: 'Creation & Wonder'
    },
    {
      slug: 'noahs-big-boat', title: "Noah's Big Boat", subtitle: 'An adventure of faith',
      description: "The story of Noah and God's faithfulness, with animals, rain, and a rainbow of promise.",
      age_tier: 'sprouts', age_label: 'Ages 4-6', scripture_refs: ['Genesis 6-9'],
      price_display: '$14.99', is_featured: false, is_free: false, sort_order: 2,
      includes: [{type:'story-pages',label:'12 Story Pages'},{type:'coloring-pages',label:'5 Coloring Pages'},{type:'audio-narration',label:'Audio Narration'}],
      status: 'published', series_name: 'Heroes of Faith'
    },
    {
      slug: 'david-and-goliath', title: 'David & Goliath', subtitle: 'Courage with God',
      description: 'Young David faces the giant — a story of bravery and trust in God.',
      age_tier: 'sprouts', age_label: 'Ages 4-6', scripture_refs: ['1 Samuel 17'],
      price_display: '$14.99', is_featured: false, is_free: false, sort_order: 3,
      includes: [{type:'story-pages',label:'12 Story Pages'},{type:'audio-narration',label:'Audio Narration'},{type:'activity-sheets',label:'Activity Sheets'}],
      status: 'published', series_name: 'Heroes of Faith'
    },
    {
      slug: 'the-good-samaritan', title: 'The Good Samaritan', subtitle: 'Who is my neighbor?',
      description: "Jesus' powerful parable about showing love and kindness to everyone.",
      age_tier: 'branches', age_label: 'Ages 6-9', scripture_refs: ['Luke 10:25-37'],
      price_display: '$14.99', is_featured: true, is_free: false, sort_order: 1,
      includes: [{type:'story-pages',label:'16 Story Pages'},{type:'audio-narration',label:'Audio Narration'},{type:'discussion-guide',label:'Discussion Guide'},{type:'memory-verse-card',label:'Memory Verse Card'}],
      status: 'published', series_name: 'Words of Jesus'
    },
    {
      slug: 'the-prodigal-son', title: 'The Prodigal Son', subtitle: "A father's love",
      description: 'The beautiful story of forgiveness, redemption, and a father who never stopped waiting.',
      age_tier: 'branches', age_label: 'Ages 6-9', scripture_refs: ['Luke 15:11-32'],
      price_display: '$14.99', is_featured: false, is_free: false, sort_order: 2,
      includes: [{type:'story-pages',label:'16 Story Pages'},{type:'audio-narration',label:'Audio Narration'},{type:'worship-song',label:'Worship Song'}],
      status: 'published', series_name: 'Words of Jesus'
    },
    {
      slug: 'armor-of-god', title: 'The Armor of God', subtitle: 'Standing firm in faith',
      description: 'An in-depth study of Ephesians 6 with journaling prompts and reflection questions.',
      age_tier: 'roots', age_label: 'Ages 9-12', scripture_refs: ['Ephesians 6:10-18'],
      price_display: '$14.99', is_featured: true, is_free: false, sort_order: 1,
      includes: [{type:'story-pages',label:'20 Story Pages'},{type:'audio-narration',label:'Audio Narration'},{type:'discussion-guide',label:'Discussion Guide'},{type:'activity-sheets',label:'Journal Prompts'}],
      status: 'published', series_name: 'Armor of God'
    },
    {
      slug: 'queen-esther', title: 'Queen Esther', subtitle: 'For such a time as this',
      description: 'The courageous story of Esther who risked everything to save her people.',
      age_tier: 'roots', age_label: 'Ages 9-12', scripture_refs: ['Esther 1-10'],
      price_display: '$14.99', is_featured: false, is_free: false, sort_order: 2,
      includes: [{type:'story-pages',label:'20 Story Pages'},{type:'audio-narration',label:'Audio Narration'},{type:'memory-verse-card',label:'Memory Verse Card'}],
      status: 'published', series_name: 'Heroes of Faith'
    },
  ]).select('id, slug');

  if (packErr) { console.log('Pack insert error:', packErr.message); return; }
  console.log('Inserted', packs.length, 'packs');

  // Insert pack_content for The Creation Story
  const creationPack = packs.find(p => p.slug === 'the-creation-story');
  if (creationPack) {
    const { error: contentErr } = await c.from('pack_content').insert({
      pack_id: creationPack.id,
      narration_full_url: 'https://szyvodyudxspzwrihitk.supabase.co/storage/v1/object/public/pack-content/the-creation-story/narration-full.mp3',
      narration_duration_seconds: 180,
      page_narrations: [
        { page: 1, title: 'Day 1: Light', audio_url: '#', duration: 25 },
        { page: 2, title: 'Day 2: Sky & Sea', audio_url: '#', duration: 25 },
        { page: 3, title: 'Day 3: Land & Plants', audio_url: '#', duration: 25 },
        { page: 4, title: 'Day 4: Sun, Moon & Stars', audio_url: '#', duration: 25 },
        { page: 5, title: 'Day 5: Fish & Birds', audio_url: '#', duration: 25 },
        { page: 6, title: 'Day 6: Animals & People', audio_url: '#', duration: 30 },
        { page: 7, title: 'Day 7: God Rested', audio_url: '#', duration: 25 },
      ],
      song_title: 'God Made Everything',
      song_url: 'https://szyvodyudxspzwrihitk.supabase.co/storage/v1/object/public/pack-content/the-creation-story/song.mp3',
      song_lyrics: "God made the light, God made the sea,\nGod made the birds and the bumble bee!\nGod made the mountains, God made the trees,\nGod made everything, including me!",
      song_duration_seconds: 120,
      discussion_questions: [
        'What is your favorite thing that God created?',
        'Why do you think God rested on the seventh day?',
        'How does it make you feel to know God made you special?',
        'What can we do to take care of God\'s creation?',
      ],
      memory_verse: 'In the beginning God created the heavens and the earth.',
      memory_verse_ref: 'Genesis 1:1',
    });
    if (contentErr) console.log('Content insert error:', contentErr.message);
    else console.log('Inserted pack_content for Creation Story');

    // Insert invite code
    const { error: codeErr } = await c.from('invite_codes').insert({
      code: 'CREATION-DEMO-2024',
      pack_id: creationPack.id,
      is_active: true,
    });
    if (codeErr) console.log('Invite code error:', codeErr.message);
    else console.log('Inserted invite code: CREATION-DEMO-2024');
  }

  // Insert blog posts
  const { error: blogErr } = await c.from('blog_posts').insert([
    {
      slug: 'why-bible-stories-matter',
      title: 'Why Bible Stories Matter for Young Children',
      excerpt: 'Research shows that storytelling is one of the most powerful ways to teach children about faith.',
      content: 'Children learn best through stories. From the earliest age, narratives help little ones understand complex concepts like love, forgiveness, and faith. When we share Bible stories with our children, we are not just reading words on a page — we are planting seeds of truth that will grow throughout their lives.\n\nStudies in developmental psychology show that children ages 2-6 are in a critical period for moral and spiritual formation. The stories they hear during this window shape their understanding of right and wrong, their sense of belonging, and their relationship with God.\n\nAt Seedling Stories, we believe that beautiful storytelling combined with engaging multimedia creates the most powerful learning experience possible.',
      tags: ['parenting', 'faith', 'early-childhood'],
      status: 'published',
      published_at: '2024-01-15T00:00:00Z'
    },
    {
      slug: 'how-to-use-seedling-stories',
      title: 'How to Use Seedling Stories at Home',
      excerpt: 'A guide for parents on making the most of your Bible story pack experience.',
      content: 'Getting started with Seedling Stories is easy! Here is our recommended approach for making the most of each pack:\n\n1. **Print the Pages**: Download your pack and print the story pages on cardstock for durability. The coloring pages work great on regular paper.\n\n2. **Read Together First**: Before using the audio, read through the story together. Let your child look at the illustrations and ask questions.\n\n3. **Scan the QR Code**: When you are ready for the multimedia experience, scan the QR code on the back of your pack. This unlocks audio narration, worship songs, and animated videos.\n\n4. **Discuss and Reflect**: Use the discussion questions to talk about the story. Even young children can share what they learned!\n\n5. **Memorize the Verse**: Each pack includes a memory verse card. Put it on the fridge or in your car for daily practice.',
      tags: ['how-to', 'guide', 'parents'],
      status: 'published',
      published_at: '2024-02-01T00:00:00Z'
    },
  ]);
  if (blogErr) console.log('Blog insert error:', blogErr.message);
  else console.log('Inserted 2 blog posts');

  console.log('\nDone! Test the invite code at: /listen/CREATION-DEMO-2024');
}

seed();
