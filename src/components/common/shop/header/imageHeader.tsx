import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import prisma from '@/services/prisma';

export const getHeaderImage = async (page: string, id?: string) => {
  if (page.includes('category')) {
    const res = await prisma.categoryImage.findFirst({
      where: {
        categoryId: id,
      },
    });
    if (!res) return '';
    return res.url;
  } else if (page.includes('product')) {
    const res = await prisma.productImage.findFirst({
      where: {
        productId: id,
      },
    });
    if (!res) return '';
    return res.url;
  } else {
    return;
  }
};

export const ImageHeader = async ({
  page,
  id,
}: {
  page: string;
  id?: string;
}) => {
  const url = await getHeaderImage(page, id);
  return (
    <Image
      src={url ? url : '/header-waiting-backend.jpg'}
      alt={''}
      width={250}
      height={250}
      sizes='100vw'
      className={clsx(
        page !== 'welcome' ? 'h-[20svh]' : 'h-[90svh] lg:h-[75svh]',
        'absolute top-0  w-full object-cover '
      )}
    />
  );
};
