import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    const supabase = createServiceClient();

    // Look up the invite code
    const { data: invite, error: inviteError } = await supabase
      .from('invite_codes')
      .select('*, packs(*)')
      .eq('code', code.trim().toUpperCase())
      .eq('is_active', true)
      .single();

    if (inviteError || !invite) {
      return NextResponse.json({ error: 'Invalid or expired code' }, { status: 404 });
    }

    // Get the pack content
    const { data: content, error: contentError } = await supabase
      .from('pack_content')
      .select('*')
      .eq('pack_id', invite.pack_id)
      .single();

    if (contentError || !content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    // Increment redeemed count
    await supabase
      .from('invite_codes')
      .update({ redeemed_count: invite.redeemed_count + 1 })
      .eq('id', invite.id);

    return NextResponse.json({
      pack: invite.packs,
      content,
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
