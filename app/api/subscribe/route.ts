import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const supabase = createServiceClient();

    // Upsert subscriber
    const { error } = await supabase
      .from('subscribers')
      .upsert(
        { email: email.toLowerCase().trim(), source: source || 'website' },
        { onConflict: 'email' }
      );

    if (error) {
      console.error('Subscriber upsert error:', error);
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
    }

    // TODO: Add to Resend audience and send welcome email
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({ ... });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
