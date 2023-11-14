import jwt from 'jsonwebtoken';
import { SignJWT } from 'jose';

export async function signJwtToken(userData: object) {
  try {
    const token = jwt.sign(
      { data: userData },
      process.env.JWT_SECRET as jwt.Secret,
      { expiresIn: '1m', algorithm: 'HS256' }
    );
    return token;
  } catch (error) {
    throw new Error('Please sign in');
  }
}

export async function signJoseJwtToken(payload: any): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60; // one min

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
}

export async function signJwtRefreshToken(userData: object) {
  try {
    const token = jwt.sign(
      { data: userData },
      process.env.JWT_SECRET as jwt.Secret,
      { expiresIn: '10m', algorithm: 'HS256' }
    );
    return token;
  } catch (error) {
    throw new Error('Please sign in');
  }
}
