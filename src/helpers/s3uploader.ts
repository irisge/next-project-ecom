import { PutObjectCommand } from '@aws-sdk/client-s3';
import s3Client from '@/services/s3';

export default async function uploadFileToS3(
  file: Buffer,
  fileName: string,
  fileType: string,
  folderName: string,
  categoryName?: string
) {
  const fileBuffer = file;

  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
    Key: `${folderName}/${categoryName}-${fileName}`,
    Body: fileBuffer,
    ContentType: fileType,
  };

  const command = new PutObjectCommand(params);

  try {
    const res = await s3Client.send(command);
    return res; 
  } catch (e) {
    throw new Error('Error uploading file to S3');
  }
}
