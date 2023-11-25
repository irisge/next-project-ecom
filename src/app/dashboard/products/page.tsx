import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

function ProductPage() {
  return (
    <div className='flex min-h-screen w-full flex-col items-start justify-start space-y-4 '>
      <h2 className='font-bold text-[#4d4ab4]'>Products</h2>
      <section className='my-auto flex w-full '>
        <Link href='products/create' className='h-full'>
          <Button> Add new product</Button>
        </Link>
      </section>
    </div>
  );
}

export default ProductPage;
