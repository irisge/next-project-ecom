import clsx from 'clsx';
import Link from 'next/link';
import React, { SetStateAction } from 'react';

export const MenuHover = ({
  categories,
  isTransitionComplete,
  isHover,
  setIsHover,
}: {
  categories: {
    id: string;
    name: string;
  }[];
  isTransitionComplete: boolean;
  isHover: boolean;
  setIsHover: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={clsx(
        'h-full w-full items-start justify-evenly text-primary-foreground sm:items-center',
        isHover && isTransitionComplete
          ? 'delay-2000 transition-fade flex md:mt-[60px] lg:mt-0'
          : 'hidden'
      )}
    >
      <div className='z-20 hidden max-h-full rounded-sm bg-white md:block md:h-[50svh] md:w-[300px] xl:h-[500px] xl:w-[300px] landscape:sm:mb-2'></div>
      <div className='flex w-full flex-col space-y-6 md:max-w-[300px] xl:max-w-[400px]'>
        <div className='flex w-full items-end space-x-6'>
          <h2 className='text-2xl font-bold'>SHOP BY THEMES</h2>
          <Link href={'/shop'} onClick={() => setIsHover(false)}>
            <p className='text-sm'>See all</p>
          </Link>
        </div>
        <ul className='flex w-full flex-col items-start space-y-6'>
          {categories.map((category: { name: string; id: string }) => (
            <Link
              key={category.id}
              href={`/shop/categories/${category.id}`}
              className='data-[active]:accent/50 data-[state=open]:accent/50 transition-colors hover:text-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50'
            >
              <li>{category.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};
