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
  isActive: z.string(),
});
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const parsedData = BodySchema.parse({
      name: formData.get('name')?.toString(),
      description: formData.get('description')?.toString(),
      file: formData.get('file'),
      isActive: formData.get('isActive'),
    });

    const file = parsedData.file;
    const fileType = file.type;
    const categoryName = parsedData.name;
    const description = parsedData.description;
    const isActive = Boolean(parsedData.isActive);

    if (!categoryName || !description) {
      return NextResponse.json(
        { error: 'Name and description are required' },
        { status: 400 }
      );
    }

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'File is required' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name;

    await uploadFileToS3(
      buffer,
      fileName,
      fileType,
      'categories',
      categoryName
    );

    // Construct the S3 file URL
    const s3FileUrl = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.amazonaws.com/categories/${categoryName}-${fileName}`;

    const checkCategoryName = await prisma.category.findFirst({
      where: {
        name: categoryName,
      },
    });

    if (checkCategoryName) {
      return NextResponse.json(
        { error: 'this category name is already used' },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: {
        name: categoryName,
        description: description,
        image: s3FileUrl,
        isActive: isActive,
      },
    });

    return NextResponse.json(
      { success: true, fileUrl: s3FileUrl, category: category },
      { status: 200 }
    );
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
    const getAllCategories = await prisma.category.findMany();
    return NextResponse.json({ getAllCategories });
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
        res.categoriesData.map(async (category: any, index: number) => {
          await prisma.category.update({
            where: { id: category.id },
            data: { order: index + 1 }, // Assuming order starts from 1
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
