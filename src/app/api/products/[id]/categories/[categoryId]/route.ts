import prisma from '@/services/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; categoryId: string } }
) {
  if (request.method !== 'DELETE') {
    return new Response('Method Not Allowed', {
      status: 405,
    });
  }
  const categId = params.categoryId;
  const prodId = params.id;

  try {
    await prisma.categoriesOnProducts.delete({
      where: {
        productId_categoryId: {
          productId: prodId,
          categoryId: categId,
        },
      },
    });

    return NextResponse.json(
      { message: 'Link to category deleted' },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return new Response('Internal Server Error.', {
      status: 500,
    });
  }
}
