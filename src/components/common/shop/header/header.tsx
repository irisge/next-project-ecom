'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { MenuHover } from './menuHover';
import { Nav } from './nav';
import searchIcon from 'public/searchIcon.svg';
import { nunito } from '@/app/font';

export const Header = ({
  categories,
}: {
  categories: {
    id: string;
    name: string;
  }[];
}) => {
  const [isHover, setIsHover] = React.useState<boolean>(false);
  const [isTransitionComplete, setTransitionComplete] = useState(false);

  const onAnimationEnd = () => {
    setTransitionComplete(true);
  };

  return (
    <header className='relative flex h-[90svh] w-screen items-center justify-center lg:h-[75svh]'>
      <div
        className={clsx(
          'transition-width absolute bottom-0 origin-bottom',
          isHover
            ? 'visible absolute z-20 flex h-[70svh] w-[90svw] items-start justify-evenly rounded-md bg-primary px-6 py-6 md:top-0 md:w-[80svw] md:items-center md:px-0 md:py-0'
            : 'hidden'
        )}
        onKeyDown={(e) => {
          if (e.key == ('Escape' || 'Enter')) {
            setTransitionComplete(false);
            setIsHover(false);
          }
        }}
        onTouchMove={() => {
          setTransitionComplete(false);
          setIsHover(false);
        }}
        onAnimationEnd={onAnimationEnd}
      >
        {isTransitionComplete && (
          <MenuHover
            categories={categories}
            isTransitionComplete={isTransitionComplete}
            isHover={isHover}
            setIsHover={setIsHover}
          />
        )}
      </div>
      <div className='absolute top-0 mx-auto flex h-[90svh] w-full flex-col items-center justify-between text-primary-foreground md:h-[75svh] '>
        <div className='flex w-full items-center justify-center space-x-6 py-4 md:max-w-[550px] md:justify-evenly md:space-x-0 md:py-0 lg:max-w-[650px] xl:max-w-[700px]'>
          <span className='z-10 rounded-full border p-3'>
            <Image
              src={searchIcon}
              alt='search icon for browsing product and themes'
              width={24}
              height={24}
              className='stroke-current invert'
            />
          </span>
          <h1
            className={clsx(
              nunito.className,
              'z-10  text-2xl font-black sm:block md:hidden'
            )}
          >
            nomdusite.
          </h1>
          <div className='hidden w-full md:visible md:flex'>
            <Nav
              setIsHover={setIsHover}
              setTransitionComplete={setTransitionComplete}
            />
          </div>
        </div>
        <div className='w-full md:hidden'>
          <Nav
            setIsHover={setIsHover}
            setTransitionComplete={setTransitionComplete}
          />
        </div>
      </div>
    </header>
  );
};
