import { S3Client } from '@aws-sdk/client-s3';

if (
  !process.env.NEXT_PUBLIC_AWS_REGION ||
  !process.env.NEXT_PUBLIC_AWS_ACCESS_KEY ||
  !process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
) {
  throw new Error('Fail to load env');
}

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

export default s3Client;
