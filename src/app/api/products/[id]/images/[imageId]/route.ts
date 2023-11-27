import deleteFileFromS3 from '@/helpers/s3deleter';
import prisma from '@/services/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: { imageId: string } }
) {
  if (request.method !== 'DELETE') {
    return new Response('Method Not Allowed', {
      status: 405,
    });
  }
  const image = params.imageId;

  try {
    const res = await prisma.productImage.findFirst({
      where: {
        id: image,
      },
    });
    if (!res) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    if (res.url) {
      await deleteFileFromS3(res.url);
    }

    await prisma.productImage.delete({
      where: {
        id: image,
      },
    });

    return NextResponse.json({ message: 'Image deleted' }, { status: 200 });
  } catch (e) {
    return new Response('Internal Server Error.', {
      status: 500,
    });
  }
}
