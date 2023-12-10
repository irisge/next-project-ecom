import Link from 'next/link';
import { karla } from './font';
import clsx from 'clsx';
import * as React from 'react';
import { Header } from '@/components/common/shop/header/header';
import prisma from '@/services/prisma';
import { ImageHeader } from '@/components/common/shop/header/imageHeader';

export default async function Home() {
  const categories = await prisma.category.findMany({
    select: { name: true, id: true },
  });

  return (
    <section
      className={clsx(karla.className, 'relative flex h-full w-full flex-col')}
    >
      <Header categories={categories} />
      <ImageHeader page='welcome' />

      <main className='relative flex min-h-screen flex-col  items-center justify-between p-24'>
        <div className='z-10 my-auto flex w-full max-w-5xl flex-col items-center justify-between space-y-6 text-sm lg:space-y-10'>
          <h1 className='m-auto text-xl font-bold lg:text-5xl'>Welcome</h1>
          <Link href='/signup'>Signup</Link>
        </div>
      </main>
    </section>
  );
}
