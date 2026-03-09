import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const supabase = createServiceClient();

    // Verify password using pgcrypto
    const { data: match } = await supabase.rpc('verify_admin_password', {
      input_username: username.trim(),
      input_password: password,
    });

    if (!match) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Get admin details
    const { data: admin } = await supabase
      .from('admins')
      .select('id, username, display_name, role')
      .eq('username', username.trim())
      .single();

    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = process.env.ADMIN_SESSION_TOKEN || 'default-admin-token';
    const response = NextResponse.json({
      success: true,
      user: {
        id: admin.id,
        username: admin.username,
        display_name: admin.display_name,
        role: admin.role,
      },
    });

    response.cookies.set('admin-session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    // Store user info in readable cookies for client-side checks
    response.cookies.set('admin-user', admin.username, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    response.cookies.set('admin-role', admin.role, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('admin-session');
  response.cookies.delete('admin-role');
  response.cookies.delete('admin-user');
  return response;
}
