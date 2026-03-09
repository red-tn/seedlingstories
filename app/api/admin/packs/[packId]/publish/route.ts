import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ packId: string }> }
) {
  try {
    const { packId } = await params;
    const body = await request.json();
    const supabase = createServiceClient();

    // Update pack status
    const { error: packError } = await supabase
      .from('packs')
      .update({ status: 'published' })
      .eq('id', packId);

    if (packError) return NextResponse.json({ error: packError.message }, { status: 500 });

    // Create invite code if requested
    if (body.inviteCode) {
      const { data: existing } = await supabase
        .from('invite_codes')
        .select('id')
        .eq('pack_id', packId)
        .eq('code', body.inviteCode)
        .single();

      if (!existing) {
        const { error: codeError } = await supabase
          .from('invite_codes')
          .insert({
            code: body.inviteCode,
            pack_id: packId,
            is_active: true,
          });

        if (codeError) return NextResponse.json({ error: codeError.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
