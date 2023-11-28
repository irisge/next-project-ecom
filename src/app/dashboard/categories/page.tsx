'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import CardAddCategory from '@/components/dashboard/categories/cardAddCategory';
import CardsCategory from '@/components/dashboard/categories/cardsCategory';
import DialogOrderCategories from '@/components/dashboard/categories/DialogOrderCategories';
import { Category } from '@/lib/types/interfaces';

function Categories() {
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [data, setData] = useState<Category[]>(categoriesData);
  const [isOrderModalClose, setIsOrderModalClose] = useState<boolean>(true);

  const getAllCategories = async () => {
    const res = await fetch('http://localhost:3000/api/categories');
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`${errorData.error}`);
    }
    const data = await res.json();
    return setCategoriesData(data.getAllCategories);
  };

  useEffect(() => {
    getAllCategories();
  }, [isOrderModalClose]);

  useEffect(() => {
    setData(categoriesData);
  }, [categoriesData]);

  console.log(categoriesData)

  return (
    <div className='flex min-h-screen w-full flex-col items-start justify-start space-y-4 '>
      <h2 className='font-bold text-[#4d4ab4]'>Categories</h2>
      <span className='my-auto flex h-full w-full flex-col justify-evenly space-y-4'>
        <section className='my-auto grid w-full grid-cols-cards gap-4'>
          <Link href='categories/create' className='h-full'>
            <CardAddCategory />
          </Link>
          <CardsCategory categoriesData={categoriesData} />
        </section>
        <DialogOrderCategories
          data={data}
          setData={setData}
          setIsOrderModalClose={setIsOrderModalClose}
          categoriesData={categoriesData}
          isOrderModalClose={isOrderModalClose}
        />
      </span>
      <section className='py-auto my-auto flex w-full flex-col space-y-2'></section>
    </div>
  );
}

export default Categories;
