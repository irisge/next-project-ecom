import { NextResponse } from 'next/server';
import { z } from 'zod';
import deleteFileFromS3 from '@/helpers/s3deleter';
import uploadFileToS3 from '@/helpers/s3uploader';
import prisma from '@/services/prisma';

const ACCEPTED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const BodyEditSchema = z.object({
  name: z.optional(z.string()),
  description: z.optional(z.string()),
  isActive: z.optional(z.string()),
  file: z.optional(
    z.custom<File>().refine((file) => ACCEPTED_FILE_TYPES.includes(file.type))
  ),
  metaTitle: z.optional(z.string()),
  keywords: z.optional(z.string()),
  metaDescription: z.optional(z.string()),
});
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const category = params.id;
  try {
    const res = await prisma.category.findFirst({
      where: {
        id: category,
      },
    });
    if (!res) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ res });
  } catch (e) {
    return NextResponse.json(
      { error: 'Internal Server Error.' },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const categoryId = params.id;

  try {
    const getCategory = await prisma.category.findFirst({
      where: {
        id: categoryId,
      },
    });

    if (!getCategory) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    const formData = await request.formData();

    // Validate the form data with Zod
    const parsedData = BodyEditSchema.parse({
      name: formData.get('name') || undefined,
      description: formData.get('description') || undefined,
      isActive: formData.get('isActive') || undefined,
      file: formData.get('file') || undefined,
      metaTitle: formData.get('metaTitle') || undefined,
      keywords: formData.get('keywords') || undefined,
      metaDescription: formData.get('metaDescription') || undefined,
    });

    // Extract modified fields from the form data
    const name = parsedData.name;
    const description = parsedData.description;
    const isActive = parsedData.isActive;
    const metaTitle = parsedData.metaTitle;
    const keywords = parsedData.keywords;
    const metaDescription = parsedData.metaDescription;

    // Create an object with only the modified fields
    const updateData: any = {};
    if (name !== null) updateData.name = name;
    if (description !== null) updateData.description = description;
    if (isActive !== null && isActive !== undefined)
      updateData.isActive = isActive === 'true' ? true : false;

    // If an image is provided, update the image field
    if (formData.has('file')) {
      const file = formData.get('file') as File;
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = file.name.toLowerCase();
      const fileType = file.type;
      const categoryNameForS3 = name
        ? name.toLocaleLowerCase()
        : getCategory.name.toLocaleLowerCase();

      await uploadFileToS3(
        buffer,
        fileName,
        fileType,
        'categories',
        categoryNameForS3
      );

      // Construct the S3 file URL
      const s3FileUrl = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.amazonaws.com/categories/${categoryNameForS3}-${fileName}`;
      updateData.image = s3FileUrl;
    }

    if (metaTitle !== null) updateData.metaTitle = metaTitle;
    if (keywords !== null) updateData.keywords = keywords;
    if (metaDescription !== null) updateData.metaDescription = metaDescription;

    const updatedCategory = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: { ...updateData },
    });

    return NextResponse.json({ updatedCategory });
  } catch (e) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      {
        status: 500,
      }
    );
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
      await deleteFileFromS3(res.image);
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
