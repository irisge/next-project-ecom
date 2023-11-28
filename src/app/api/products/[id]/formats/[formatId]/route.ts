import prisma from '@/services/prisma';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const BodySchema = z.object({
  formatName: z.string().optional(),
  quantityStock: z.number().optional(),
  price: z.number().optional(),
});
export async function PUT(
  request: Request,
  { params }: { params: { id: string; formatId: string } }
) {
  if (request.method !== 'PUT') {
    return new Response('Method Not Allowed', {
      status: 405,
    });
  }
  const formatId = params.formatId;

  const data = await request.json();

  const dataParsed = BodySchema.parse(data);

  const { formatName, quantityStock, price } = dataParsed;

  try {
    const res = await prisma.productFormat.findFirst({
      where: {
        id: formatId,
      },
    });
    if (!res) {
      return NextResponse.json(
        { error: 'Attribute not found' },
        { status: 404 }
      );
    }

    await prisma.productFormat.update({
      where: {
        id: formatId,
      },
      data: {
        formatName: formatName,
        quantityStock: quantityStock,
        price: price,
      },
    });

    return NextResponse.json(
      { message: 'Attributes updated' },
      { status: 200 }
    );
  } catch (e) {
    return new Response('Internal Server Error.', {
      status: 500,
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { formatId: string } }
) {
  if (request.method !== 'DELETE') {
    return new Response('Method Not Allowed', {
      status: 405,
    });
  }
  const formatId = params.formatId;

  try {
    await prisma.productFormat.delete({
      where: {
        id: formatId,
      },
    });

    return NextResponse.json(
      { message: 'Attributes deleted' },
      { status: 200 }
    );
  } catch (e) {
    return new Response('Internal Server Error.', {
      status: 500,
    });
  }
}
