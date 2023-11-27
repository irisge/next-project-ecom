import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Category } from '@/lib/types/interfaces';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function CardsCategory({ categoriesData }: { categoriesData: Category[] }) {
  return (
    <>
      {categoriesData &&
        categoriesData.map((category) => (
          <Card key={category.id} className='categories h-full max-h-min'>
            <Link
              key={category.id}
              href={`http://localhost:3000/dashboard/categories/${category.id}`}
            >
              <CardHeader className='flex items-start'>
                <CardTitle className='capitalize'>{category.name}</CardTitle>
                <CardDescription className='max-w-[200px] truncate'>
                  {category.description}
                </CardDescription>
              </CardHeader>
            </Link>
            <CardContent className='flex aspect-square w-full items-center justify-center'>
              <div className='aspect-square h-auto w-full rounded-md drop-shadow-md'>
                {category.images && (
                  <Image
                    src={category.images[0].url}
                    alt={category.images[0].imageDescription}
                    quality={50}
                    width={250}
                    height={250}
                    className='aspect-square h-full w-full rounded-sm object-cover drop-shadow-sm'
                  />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
    </>
  );
}

export default CardsCategory;
