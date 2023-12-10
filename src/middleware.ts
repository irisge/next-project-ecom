import { NextRequest, NextResponse } from 'next/server';
import { verifyJwtToken } from './helpers/verifyToken';
import { signJoseJwtToken } from './helpers/signToken';
import { JWTPayload } from 'jose';

interface AccessTokenPayload {
  id: string;
  role: string;
  iat: string;
  exp: string;
}

export default async function middleware(req: NextRequest) {
  const accessToken = req.headers.get('Authorization');
  const refreshCookie = req.cookies.get('refreshToken');

  if (req.url.includes('sign')) {
    return NextResponse.next();
  }
  if (!accessToken || !accessToken) {
    if (!refreshCookie) {
      return NextResponse.rewrite(new URL('/signin', req.url));
    } else {
      const refreshToken = refreshCookie.value;
      const isValidRefreshToken: JWTPayload =
        await verifyJwtToken(refreshToken);

      if (isValidRefreshToken && isValidRefreshToken.data) {
        const accesTokenRefreshed = await signJoseJwtToken({
          id: (isValidRefreshToken.data as AccessTokenPayload).id,
          role: (isValidRefreshToken.data as AccessTokenPayload).role,
        });

        const headers = new Headers();
        headers.set('Authorization', `Bearer ${accesTokenRefreshed}`);

        // Check user's role after refreshing access token
        if (req.nextUrl.pathname.startsWith('/dashboard')) {
          if (
            (isValidRefreshToken.data as AccessTokenPayload).role === 'ADMIN'
          ) {
            return NextResponse.next({ request: { headers } });
          } else {
            return NextResponse.redirect(new URL(`/not-found`, req.url));
          }
        } else {
          return NextResponse.next({ request: { headers } });
        }
      } else {
        return NextResponse.rewrite(new URL('/signin', req.url));
      }
    }
  } else {
    const isValidAccessToken =
      accessToken &&
      (await verifyJwtToken(accessToken.split(' ')[1]).catch((err: any) =>
        console.error(err)
      ));

    if (!isValidAccessToken) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }

    if (
      (req.nextUrl.pathname.startsWith('/dashboard') && !isValidAccessToken) ||
      (req.nextUrl.pathname.startsWith('/dashboard') &&
        isValidAccessToken.role !== 'ADMIN')
    ) {
      return NextResponse.json({ status: 404 });
    } else {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: [
    '/dashboard',
    '/dashbard/:path*',
    '/dashboard/categories',
    '/cart/:path',
  ],
};
