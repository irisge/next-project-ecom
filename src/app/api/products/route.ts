import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/services/prisma';
import uploadFileToS3 from '@/helpers/s3uploader';
import { z } from 'zod';

const ACCEPTED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const BodySchema = z.object({
  name: z.string().min(2).max(30),
  description: z.string().min(3).max(400),
  file: z
    .custom<File>()
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type)),
  imageAlt: z.string().min(1).max(100),
  tags: z.string(),
  isActive: z.string(),
  categories: z.string(),
  formats: z.string(
    z.object({
      value: z.string().min(5),
      price: z.string(),
      stock: z.string().optional(),
    })
  ),
});
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const parsedData = BodySchema.parse({
      name: formData.get('name')?.toString(),
      description: formData.get('description')?.toString(),
      file: formData.get('file'),
      imageAlt: formData.get('imageAlt'),
      formats: formData.get('formats'),
      tags: formData.get('tags'),
      isActive: formData.get('isActive'),
      categories: formData.get('categories'),
    });

    const file = parsedData.file;
    const fileType = file.type;
    const productName = parsedData.name.toLowerCase();
    const description = parsedData.description;
    const formats = JSON.parse(parsedData.formats).map((format: any) => ({
      formatName: format.value,
      price: format.price,
      quantityStock: format.stock ? Number(format.stock) : undefined,
    }));

    const tags = JSON.parse(parsedData.tags);
    const isActive = Boolean(parsedData.isActive);
    const categories = JSON.parse(parsedData.categories);

    if (!productName || !description) {
      return NextResponse.json(
        { error: 'Name and description are required' },
        { status: 400 }
      );
    }

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'File is required' }, { status: 400 });
    }

    const checkProductName = await prisma.product.findFirst({
      where: {
        name: productName,
      },
    });

    if (checkProductName) {
      return NextResponse.json(
        { error: 'this product name is already used' },
        { status: 400 }
      );
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name.toLowerCase();

    const productNameWoWhiteSpace = productName
      .replaceAll(' ', '')
      .toLocaleLowerCase();

    await uploadFileToS3(
      buffer,
      fileName,
      fileType,
      'products',
      productNameWoWhiteSpace
    );

    // Construct the S3 file URL
    const s3FileUrl = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.amazonaws.com/products/${productNameWoWhiteSpace}-${fileName}`;

    const product = await prisma.product.create({
      data: {
        name: productName,
        description: description,
        isActive: isActive,
        tag: tags,
        categories: {
          create: categories.map(
            (category: { label: string; value: string }) => ({
              assignedAt: new Date(),
              category: {
                connect: {
                  id: category['value'],
                },
              },
            })
          ),
        },
        images: {
          create: [
            {
              url: s3FileUrl,
              imageDescription: parsedData.imageAlt,
            },
          ],
        },
        format: {
          create: [...formats],
        },
      },
      include: { categories: true, images: true, format: true },
    });

    return Response.json({ data: product }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const getAllProducts = await prisma.product.findMany({
      include: { categories: true, images: true },
    });
    return NextResponse.json({ getAllProducts });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Error retrieving categories' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  if (req.method === 'PUT') {
    const res = await req.json();

    try {
      const getAllCategories = await Promise.all(
        res.newData.map(async (category: any, index: number) => {
          await prisma.category.update({
            where: { id: category.id },
            data: { orderIndex: index + 1 },
          });
        })
      );

      return NextResponse.json({ getAllCategories });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: 'Error retrieving categories' },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }
}
