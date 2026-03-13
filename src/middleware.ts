import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_development';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;

  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (req.nextUrl.pathname === '/admin/login') {
      if (token) {
        try {
          // If token is valid, redirect away from login page to admin dashboard
          const secret = new TextEncoder().encode(JWT_SECRET);
          await jwtVerify(token, secret);
          return NextResponse.redirect(new URL('/admin', req.url));
        } catch (e) {
          // invalid token, stay on login page
        }
      }
      return NextResponse.next();
    }

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      // Invalid token
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  // Protect API routes except auth
  if (req.nextUrl.pathname.startsWith('/api/') && !req.nextUrl.pathname.startsWith('/api/auth') && !req.nextUrl.pathname.startsWith('/api/contact')) {
     if (req.method !== 'GET') { // allow public GET to services/projects
        if (!token) {
           return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }
        try {
          const secret = new TextEncoder().encode(JWT_SECRET);
          await jwtVerify(token, secret);
        } catch (error) {
          return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }
     }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
