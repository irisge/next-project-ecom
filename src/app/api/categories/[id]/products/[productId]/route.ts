import prisma from '@/services/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; productId: string } }
) {
  if (request.method !== 'DELETE') {
    return new Response('Method Not Allowed', {
      status: 405,
    });
  }
  const categId = params.id;
  const prodId = params.productId;

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
      { message: 'Link to product deleted' },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return new Response('Internal Server Error.', {
      status: 500,
    });
  }
}
