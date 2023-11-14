import RedirectButton from '@/components/dashboard/redirectButton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function Categories() {
  return (
    <div className='flex min-h-screen w-full flex-col items-start justify-start px-14 py-10'>
      <h2 className=''>Categories</h2>
      <section className='my-auto p-4'>
        <Link href='categories/create'>
          <Card>
            <CardHeader>
              <CardTitle>Add a new category</CardTitle>
              <CardDescription>Attach product to this category</CardDescription>
            </CardHeader>
            <CardContent className='flex w-full items-center'>
              <Plus />
            </CardContent>
          </Card>
        </Link>
      </section>
      <section className='my-auto p-4'>
        <RedirectButton />
      </section>
    </div>
  );
}

export default Categories;
