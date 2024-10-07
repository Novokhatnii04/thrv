import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const auth_token = request.cookies.get('thrive.auth_token')?.value;

  const pathName = request.nextUrl.pathname;
  const authPaths = ['/login', '/sign-up', '/reset-password', '/welcome'];
  const banWithoutAuthPaths = ['/profile', '/vault', '/history'];

  if (auth_token && authPaths.includes(pathName)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!auth_token && banWithoutAuthPaths.includes(pathName)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = { matcher: '/((?!.*\\.).*)' };
