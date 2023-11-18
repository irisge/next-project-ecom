import CardAddCategory from '@/components/dashboard/categories/cardAddCategory';
import CardsCategory from '@/components/dashboard/categories/cardsCategory';
import RedirectButton from '@/components/dashboard/redirectButton';
import Link from 'next/link';
import React from 'react';

function Categories() {
  return (
    <div className='flex min-h-screen w-full flex-col items-start justify-start '>
      <h2 className=''>Categories</h2>
      <section className='grid-cols-cards my-auto grid w-full gap-4'>
        <Link href='categories/create' className='h-full'>
          <CardAddCategory />
        </Link>
        <CardsCategory />
      </section>
      <section className='my-auto p-4'>
        <RedirectButton />
      </section>
    </div>
  );
}

export default Categories;
