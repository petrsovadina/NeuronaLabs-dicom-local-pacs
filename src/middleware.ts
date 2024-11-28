import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAuthenticated } from '@/lib/auth';

const publicPaths = ['/auth/login', '/auth/register'];

export function middleware(request: NextRequest) {
  const isPublicPath = publicPaths.some(path => request.nextUrl.pathname.startsWith(path));
  const isAuthed = isAuthenticated();

  if (!isPublicPath && !isAuthed) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isPublicPath && isAuthed) {
    return NextResponse.redirect(new URL('/pacienti', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/pacienti/:path*',
    '/auth/:path*',
  ],
};
