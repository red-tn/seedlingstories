import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const envUser = process.env.ADMIN_USERNAME;
    const envPass = process.env.ADMIN_PASSWORD;

    if (
      !username || !password ||
      !envUser || !envPass ||
      username !== envUser ||
      password !== envPass
    ) {
      return NextResponse.json({
        error: 'Invalid credentials',
        debug: {
          hasEnvUser: !!envUser,
          hasEnvPass: !!envPass,
          envUserLength: envUser?.length,
          envPassLength: envPass?.length,
          inputUserLength: username?.length,
          inputPassLength: password?.length,
        }
      }, { status: 401 });
    }

    const token = process.env.ADMIN_SESSION_TOKEN || 'default-admin-token';
    const response = NextResponse.json({ success: true });

    response.cookies.set('admin-session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('admin-session');
  return response;
}
