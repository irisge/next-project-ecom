import deleteFileFromS3 from '@/helpers/s3deleter';
import prisma from '@/services/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  //   if (request.method !== 'GET') {
  //     return new Response('Method Not Allowed', {
  //       status: 405,
  //     });
  //   }
  const category = params.id;
  console.log(category, 'idddddddd');

  try {
    const res = await prisma.category.findFirst({
      where: {
        id: category,
      },
    });
    if (!res)
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );

    return NextResponse.json({ res });
  } catch (e) {
    return new Response('Internal Server Error.', {
      status: 500,
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (request.method !== 'DELETE') {
    return new Response('Method Not Allowed', {
      status: 405,
    });
  }
  const category = params.id;
  console.log(category, 'iddddddd');

  try {
    const res = await prisma.category.findFirst({
      where: {
        id: category,
      },
      select: {
        image: true,
      },
    });
    if (!res) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    if (res.image) {
      console.log('ici');
      await deleteFileFromS3(res.image);
      console.log('la');
    }

    await prisma.category.delete({
      where: {
        id: category,
      },
    });

    return NextResponse.json({ message: 'Category deleted' }, { status: 200 });
  } catch (e) {
    return new Response('Internal Server Error.', {
      status: 500,
    });
  }
}
