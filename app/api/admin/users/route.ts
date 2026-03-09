import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

// List all admins
export async function GET() {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('admins')
    .select('id, username, display_name, role, created_at')
    .order('created_at', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// Create a new admin
export async function POST(request: Request) {
  try {
    const { username, password, display_name, role } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const validRoles = ['super_admin', 'admin', 'editor', 'viewer'];
    const adminRole = validRoles.includes(role) ? role : 'editor';

    const supabase = createServiceClient();

    const { error } = await supabase.rpc('create_admin', {
      input_username: username.trim(),
      input_password: password,
      input_display_name: display_name || username.trim(),
      input_role: adminRole,
    });

    if (error) {
      if (error.message.includes('unique') || error.message.includes('duplicate')) {
        return NextResponse.json({ error: 'Username already exists' }, { status: 409 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Update admin role or display name
export async function PATCH(request: Request) {
  try {
    const { id, role, display_name } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Admin ID is required' }, { status: 400 });
    }

    const supabase = createServiceClient();
    const updates: Record<string, string> = { updated_at: new Date().toISOString() };

    if (role) {
      const validRoles = ['super_admin', 'admin', 'editor', 'viewer'];
      if (!validRoles.includes(role)) {
        return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
      }
      updates.role = role;
    }

    if (display_name !== undefined) {
      updates.display_name = display_name;
    }

    const { error } = await supabase.from('admins').update(updates).eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Delete an admin
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Admin ID is required' }, { status: 400 });
    }

    const supabase = createServiceClient();

    // Prevent deleting the last super_admin
    const { data: superAdmins } = await supabase
      .from('admins')
      .select('id')
      .eq('role', 'super_admin');

    const targetAdmin = await supabase
      .from('admins')
      .select('role')
      .eq('id', id)
      .single();

    if (
      targetAdmin.data?.role === 'super_admin' &&
      (superAdmins?.length || 0) <= 1
    ) {
      return NextResponse.json({ error: 'Cannot delete the last super admin' }, { status: 400 });
    }

    const { error } = await supabase.from('admins').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
