import EditOrDelete from '@/components/dashboard/categories/[id]/editOrDelete';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// import { ToastAction } from '@/components/ui/toast';
// import { toast } from '@/components/ui/use-toast';
import Link from 'next/link';
import Image from 'next/image';

async function getData(id: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/categories/${id}`, {
      method: 'GET',
    });

    // Check if the request was successful (status code 2xx)
    if (response.ok) {
      console.log(response);
      // Handle success, e.g., show a success message
      return await response.json();
    } else {
      const errorData = await response.json(); // Parse JSON response
      console.log(errorData);
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
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
                  <div
                    className={`${
                      categoryData.res.isActive
                        ? 'bg-emerald-600'
                        : 'bg-red-700'
                    } h-4 w-4 rounded-full`}
                  />
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
              <Image
                src={categoryData.res.image}
                alt='ctaegory image'
                quality={50}
                width={500}
                height={500}
                className='aspect-square rounded-sm object-cover drop-shadow-sm'
              />
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
