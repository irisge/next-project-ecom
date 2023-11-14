import { jwtVerify } from 'jose';
export const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('The environment variable has not been set.');
  }
  const encodedSecret: Uint8Array = new TextEncoder().encode(secret);
  return encodedSecret;
};

export async function verifyJwtToken(token: string) {
  try {
    const verified = await jwtVerify(token, getJwtSecretKey());

    return verified.payload;
  } catch (error) {
    throw new Error('Token has expired or is not valid');
  }
}
