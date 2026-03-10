import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ packId: string }> }
) {
  try {
    const { packId } = await params;
    const supabase = createServiceClient();

    const { data } = await supabase
      .from('invite_codes')
      .select('code')
      .eq('pack_id', packId)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    return NextResponse.json({ code: data?.code || null });
  } catch {
    return NextResponse.json({ code: null });
  }
}

// Save/update invite code for a pack (without requiring publish)
export async function POST(
  request: Request,
  { params }: { params: Promise<{ packId: string }> }
) {
  try {
    const { packId } = await params;
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    const supabase = createServiceClient();

    // Check if this pack already has an active code
    const { data: existing } = await supabase
      .from('invite_codes')
      .select('id, code')
      .eq('pack_id', packId)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (existing) {
      // Update existing code
      const { error } = await supabase
        .from('invite_codes')
        .update({ code })
        .eq('id', existing.id);

      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      // Create new code
      const { error } = await supabase
        .from('invite_codes')
        .insert({ code, pack_id: packId, is_active: true });

      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, code });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
