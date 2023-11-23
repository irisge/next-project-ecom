import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import s3Client from '@/services/s3';

export default async function deleteFileFromS3(filePath: string) {
  let fileName: string;
  fileName = filePath.replace(
    `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.amazonaws.com/`,
    ''
  );

  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
    Key: `${fileName}`,
  };

  const command = new DeleteObjectCommand(params);

  try {
    const res = await s3Client.send(command);
    return res; 
  } catch (e) {
    throw new Error('Error deleting file from S3');
  }
}
