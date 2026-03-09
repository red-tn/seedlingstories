import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import crypto from 'crypto';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ packId: string }> }
) {
  try {
    const { packId } = await params;
    const supabase = createServiceClient();

    // Get the pack slug for storage path
    const { data: pack, error: packError } = await supabase
      .from('packs')
      .select('slug')
      .eq('id', packId)
      .single();

    if (packError || !pack) {
      return NextResponse.json({ error: 'Pack not found' }, { status: 404 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string; // cover, page-image, narration, coloring, song, memory-verse-card
    const pageNum = formData.get('page') as string | null;

    if (!file || !type) {
      return NextResponse.json({ error: 'File and type are required' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split('.').pop() || 'bin';

    // Generate unguessable UUID path segment (reuse existing if pack already has content)
    const { data: existingContent } = await supabase
      .from('pack_content')
      .select('page_narrations')
      .eq('pack_id', packId)
      .single();

    // Try to extract existing UUID from any existing URL
    let uuid = '';
    const narrations = existingContent?.page_narrations as Array<{ image_url?: string }> | null;
    if (narrations && narrations.length > 0 && narrations[0]?.image_url) {
      const match = narrations[0].image_url.match(/\/([0-9a-f-]{36})\//);
      if (match) uuid = match[1];
    }
    if (!uuid) uuid = crypto.randomUUID();

    // Build file path
    let filename: string;
    switch (type) {
      case 'cover':
        filename = `cover.${ext}`;
        break;
      case 'page-image':
        filename = `page-${pageNum}.${ext}`;
        break;
      case 'narration':
        filename = `narration-page-${pageNum}.mp3`;
        break;
      case 'coloring':
        filename = `coloring-${pageNum || Date.now()}.${ext}`;
        break;
      case 'song':
        filename = `song.mp3`;
        break;
      case 'memory-verse-card':
        filename = `memory-verse-card.${ext}`;
        break;
      default:
        filename = `${type}-${Date.now()}.${ext}`;
    }

    const storagePath = `${pack.slug}/${uuid}/${filename}`;

    const { error: uploadError } = await supabase.storage
      .from('pack-content')
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: { publicUrl } } = supabase.storage
      .from('pack-content')
      .getPublicUrl(storagePath);

    return NextResponse.json({ url: publicUrl, uuid });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
