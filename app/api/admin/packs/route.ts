import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('packs')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ packs: data });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = createServiceClient();

    // Create the pack
    const { data: pack, error: packError } = await supabase
      .from('packs')
      .insert({
        title: body.title || 'Untitled Pack',
        slug: body.slug || `pack-${Date.now()}`,
        age_tier: body.age_tier || 'sprouts',
        status: 'draft',
        price_display: '$0.00',
        is_featured: false,
        is_free: false,
        sort_order: 0,
        includes: [],
      })
      .select()
      .single();

    if (packError) return NextResponse.json({ error: packError.message }, { status: 500 });

    // Create empty pack_content row
    const { error: contentError } = await supabase
      .from('pack_content')
      .insert({
        pack_id: pack.id,
        page_narrations: [],
        discussion_questions: [],
      });

    if (contentError) return NextResponse.json({ error: contentError.message }, { status: 500 });

    return NextResponse.json({ pack });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
