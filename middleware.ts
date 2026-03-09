import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Add noindex header for /listen/ and /read/ routes (paid content)
  if (pathname.startsWith('/listen/') || pathname.startsWith('/read/')) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  // Admin auth check
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const session = request.cookies.get('admin-session');
    if (!session || session.value !== process.env.ADMIN_SESSION_TOKEN) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/listen/:path*', '/read/:path*', '/admin/:path*'],
};
