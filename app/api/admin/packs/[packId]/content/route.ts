import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ packId: string }> }
) {
  try {
    const { packId } = await params;
    const body = await request.json();
    const supabase = createServiceClient();

    // Check if pack_content row exists
    const { data: existing } = await supabase
      .from('pack_content')
      .select('id')
      .eq('pack_id', packId)
      .single();

    let data, error;

    if (existing) {
      // Update existing row
      ({ data, error } = await supabase
        .from('pack_content')
        .update(body)
        .eq('pack_id', packId)
        .select()
        .single());
    } else {
      // Insert new row with pack_id + provided fields
      ({ data, error } = await supabase
        .from('pack_content')
        .insert({ pack_id: packId, ...body })
        .select()
        .single());
    }

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ content: data });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
