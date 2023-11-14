import * as z from 'zod';
import prisma from '@/services/prisma';
import { NextResponse } from 'next/server';
import { verifyPassword } from '@/helpers/argonHelper';
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

  const user = await prisma.user.findFirst({
    where: { email: email },
  });

  if (!user)
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  try {
    const passworcCheck = await verifyPassword(user.password, password);
    if (!passworcCheck)
      return NextResponse.json(
        { error: 'Invalid Credentials' },
        { status: 401 }
      );
    const accessToken = await signJwtToken({ id: user.id, role: user.role });

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
      value: await signJwtRefreshToken({ id: user.id, role: user.role }),
      httpOnly: true,
      maxAge: 60 * 10,
      secure: false,
    });

    return response;
  } catch (e) {
    return new Response('Internal Server Error.', {
      status: 500,
    });
  }
}
