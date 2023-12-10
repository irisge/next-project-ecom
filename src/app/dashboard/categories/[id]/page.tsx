'use client';
import Link from 'next/link';
import Image from 'next/image';

import EditOrDelete from '@/components/dashboard/categories/[id]/editOrDelete';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import StatusPoint from '@/components/common/dashboard/statusPoint';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Category } from '@/lib/types/interfaces';

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [categoryData, setCategoryData] = useState<Category>();

  const handleFetchCategoryData = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/categories/${id}`,
        {
          method: 'GET',
        }
      );

      if (response.ok) {
        const json = await response.json();
        return setCategoryData(json.res);
      } else {
        const errorData = await response.json();
        console.error(errorData);
      }
      return await response.json();
    } catch (error: any) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    handleFetchCategoryData(id);
  }, [id]);

  return (
    <>
      {categoryData && (
        <Card>
          <CardHeader>
            <CardTitle className='flex w-full justify-between'>
              <span className='flex w-full flex-col space-y-2'>
                <span className='flex w-full items-center justify-between '>
                  <h1 className='text-lg capitalize'>{categoryData.name}</h1>
                  <EditOrDelete id={id} />
                </span>
                <span className='flex items-center space-x-2'>
                  <StatusPoint status={categoryData.isActive} />
                  <p className='font-normal'>
                    {categoryData.isActive ? 'active' : 'not active'}
                  </p>
                </span>
              </span>
            </CardTitle>
            <CardDescription>{categoryData.description}</CardDescription>
          </CardHeader>
          <CardContent className='flex w-full flex-col space-y-6'>
            <div className='p-auto m-auto grid h-auto w-full grid-cols-2 rounded-md drop-shadow-md'>
              {categoryData.images.map(
                (image: {
                  id: string;
                  url: string;
                  imageDescription: string;
                  categoryId: string;
                }) => (
                  <Image
                    key={image.id}
                    src={image.url}
                    alt={image.imageDescription}
                    quality={50}
                    width={250}
                    height={250}
                    className='aspect-square rounded-sm object-cover drop-shadow-sm'
                  />
                )
              )}
            </div>
            <div className='flex w-full flex-col'>
              <h6 className='text-lg font-medium'>Products in this category</h6>
              <div className='flex w-full space-x-4'>
                {categoryData.products &&
                  categoryData.products.map((product: any) => (
                    <Link
                      href={`http://localhost:3000/dashboard/products/${product.productId}`}
                      key={product.productId}
                    >
                      <Badge
                        variant='secondary'
                        className='w-max rounded-md px-4 py-2'
                        key={product.productId}
                      >
                        {product.product.name}
                      </Badge>
                    </Link>
                  ))}
              </div>
            </div>
            <div className='flex w-full flex-col space-y-2'>
              <h6 className='text-lg font-medium'>SEO related</h6>
              <div className='sm:grid-cols-seo my-2 font-normal sm:grid'>
                <p>Meta title</p>
                <p className=' font-light'>
                  {categoryData.metaTitle
                    ? categoryData.metaTitle
                    : 'no meta title defined'}
                </p>
              </div>
              <div className='sm:grid-cols-seo my-4 font-normal sm:grid'>
                <p>Keywords</p>
                <p className=' font-light'>
                  {categoryData.keywords
                    ? categoryData.keywords
                    : 'no keywords defined'}
                </p>
              </div>
              <div className='sm:grid-cols-seo my-4 font-normal sm:grid'>
                <p>Meta Description</p>
                <p className=' font-light'>
                  {categoryData.metaDescription
                    ? categoryData.metaDescription
                    : 'no meta description defined'}
                </p>
              </div>
            </div>
            <Link href='Link to the shop'>Link to the shop</Link>
          </CardContent>
        </Card>
      )}
    </>
  );
}
