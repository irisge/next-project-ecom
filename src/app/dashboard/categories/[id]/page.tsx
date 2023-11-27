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
import StatusPoint from '@/components/dashboard/statusPoint';

async function getData(id: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/categories/${id}`, {
      method: 'GET',
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      console.error(errorData);
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error);
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const categoryData = await getData(id);

  return (
    <>
      {categoryData.res && (
        <Card>
          <CardHeader>
            <CardTitle className='flex w-full justify-between'>
              <span className='flex w-full flex-col space-y-2'>
                <span className='flex w-full items-center justify-between '>
                  <h1 className='text-lg capitalize'>
                    {categoryData.res.name}
                  </h1>
                  <EditOrDelete id={id} />
                </span>
                <span className='flex items-center space-x-2'>
                  <StatusPoint status={categoryData.res.isActive} />
                  <p className='font-normal'>
                    {categoryData.res.isActive ? 'active' : 'not active'}
                  </p>
                </span>
              </span>
            </CardTitle>
            <CardDescription>{categoryData.res.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='p-auto m-auto h-auto w-full rounded-md drop-shadow-md'>
              {categoryData.res.images.map(
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
                    width={500}
                    height={500}
                    className='aspect-square rounded-sm object-cover drop-shadow-sm'
                  />
                )
              )}
            </div>
            <div>
              <h6>Products bind to this category</h6>
              <div className='grid grid-cols-cards'>
                {/* map des products */}
                {categoryData.res.products &&
                  categoryData.res.products.map((product: any) => (
                    <p key={product.id}>{product.name}</p>
                  ))}
              </div>
            </div>
            <div>
              <h6>SEO related</h6>
              {/* <div> map des trucs SEO </div> */}
            </div>
            <Link href='Link to the shop'>Link to the shop</Link>
          </CardContent>
        </Card>
      )}
    </>
  );
}
