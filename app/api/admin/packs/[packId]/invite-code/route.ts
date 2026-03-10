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
