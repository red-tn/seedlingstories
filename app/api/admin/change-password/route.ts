import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { username, current_password, new_password } = await request.json();

    if (!username || !current_password || !new_password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (new_password.length < 8) {
      return NextResponse.json({ error: 'New password must be at least 8 characters' }, { status: 400 });
    }

    const supabase = createServiceClient();

    // Verify current password
    const { data: match } = await supabase.rpc('verify_admin_password', {
      input_username: username,
      input_password: current_password,
    });

    if (!match) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 });
    }

    // Get admin ID
    const { data: admin } = await supabase
      .from('admins')
      .select('id')
      .eq('username', username)
      .single();

    if (!admin) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update password
    const { error } = await supabase.rpc('update_admin_password', {
      admin_id: admin.id,
      new_password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
