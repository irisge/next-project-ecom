import prisma from '@/services/prisma';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const BodySchema = z.object({
  formatName: z.string(),
  quantityStock: z.number(),
  price: z.number(),
});
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', {
      status: 405,
    });
  }
  const productId = params.id;

  const data = await request.json();

  const dataParsed = BodySchema.parse(data);

  const { formatName, quantityStock, price } = dataParsed;

  try {
    const res = await prisma.product.findFirst({
      where: {
        id: productId,
      },
      select: {
        name: true,
      },
    });
    if (!res) {
      return NextResponse.json(
        { error: 'Attribute not found' },
        { status: 404 }
      );
    }

    await prisma.productFormat.create({
      data: {
        formatName: formatName,
        quantityStock: quantityStock,
        price: price,
        product: {
          connect: {
            id: productId,
          },
        },
      },
    });

    return NextResponse.json(
      { message: 'Attributes created' },
      { status: 200 }
    );
  } catch (e) {
    return new Response('Internal Server Error.', {
      status: 500,
    });
  }
}
