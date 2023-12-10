'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { MenuHover } from './menuHover';
import { Nav } from './nav';
import searchIcon from 'public/searchIcon.svg';
import { nunito } from '@/app/font';

export const HeaderOther = ({
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
    <header className='relative flex h-[90svh] w-screen items-center justify-center lg:h-[20svh]'>
      <div
        className={clsx(
          'transition-width absolute bottom-0 origin-bottom',
          isHover
            ? 'visible absolute z-20 flex h-[80svh] max-w-[400px] items-start justify-evenly overflow-auto rounded-md bg-primary px-6 py-6 2xs:w-full xs:w-[95svw] sm:h-[80svh] sm:w-[90svw] md:top-0 md:h-[70svh] md:w-[80svw] md:max-w-none md:items-center md:px-0 md:py-0 landscape:items-center'
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
      <div className='absolute top-0 mx-auto  flex h-[95svh] w-full flex-col items-center justify-between text-primary-foreground md:h-[20svh] md:px-0 '>
        <div
          className={clsx(
            isHover && 'bg-primary',
            'flex w-full items-center justify-center space-x-6 py-4 md:max-w-[550px] md:justify-evenly md:space-x-0 md:py-0 lg:max-w-[650px] xl:max-w-[700px]'
          )}
        >
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
        <div className='flex w-full xs:justify-center md:hidden md:items-start'>
          <Nav
            setIsHover={setIsHover}
            setTransitionComplete={setTransitionComplete}
          />
        </div>
      </div>
    </header>
  );
};
