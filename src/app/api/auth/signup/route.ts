import * as z from 'zod';
import prisma from '@/services/prisma';
import { NextResponse } from 'next/server';
import { hashPassword } from '@/helpers/argonHelper';
import { signJwtRefreshToken, signJwtToken } from '@/helpers/signToken';

const BodyScheme = z.object({
  email: z.string().email().max(50).min(5),
  password: z.string().min(12).max(50),
});
export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', {
      status: 405,
    });
  }

  const data = await req.json();

  const dataParsed = BodyScheme.parse(data);

  const { email, password } = dataParsed;

  if (
    await prisma.user.findUnique({
      where: { email: email },
    })
  ) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const user = await prisma.user.create({
    data: {
      email: email,
      password: await hashPassword(password),
    },
  });

  try {
    if (user && user.id) {
      const signedUpUser = await prisma.user.findUniqueOrThrow({
        where: {
          email: user.email,
        },
        select: {
          email: true,
          role: true,
          id: true,
        },
      });

      const accessToken = await signJwtToken({
        id: signedUpUser.id,
        role: signedUpUser.role,
      });
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set('Authorization', `Bearer ${accessToken}`);
      const response = NextResponse.json({
        body: {
          message: 'Authentication succeeded',
        },
        status: 200,
      });

      response.headers.set('Authorization', `Bearer ${accessToken}`);

      //TODO: change secure to true for deployment
      response.cookies.set({
        name: 'refreshToken',
        sameSite: 'strict',
        value: await signJwtRefreshToken({
          id: signedUpUser.id,
          role: signedUpUser.role,
        }),
        httpOnly: true,
        maxAge: 60 * 10,
        secure: false,
      });

      return response;
    } else {
      return new Response('Internal Server Error.', {
        status: 500,
      });
    }
  } catch (e) {
    return new Response('Internal Server Error.', {
      status: 500,
    });
  }
}
