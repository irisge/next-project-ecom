import React, { SetStateAction } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { karla, nunito } from '../../../../app/font';
import clsx from 'clsx';
import userRound from 'public/userRound.svg';
import shopIcon from 'public/shopIcon.svg';
import wishlistIcon from 'public/heartIcon.svg';
import shoppingCartIcon from 'public/shoppingCartIcon.svg';

export const Nav = ({
  setIsHover,
  setTransitionComplete,
}: {
  setIsHover: React.Dispatch<SetStateAction<boolean>>;
  setTransitionComplete: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <nav
      className={clsx(
        'sticky bottom-0 z-30 flex w-full items-center justify-evenly rounded-sm bg-primary py-2 text-primary-foreground xs:w-[95%] xs:max-w-[400px] md:top-0 md:w-full md:max-w-none md:bg-transparent xl:max-w-[600px]'
      )}
    >
      <h1
        className={clsx(
          nunito.className,
          'hidden font-black md:block md:text-2xl lg:text-3xl'
        )}
      >
        nomdusite.
      </h1>
      <div
        className={clsx(
          karla.className,
          'flex w-full max-w-[350px] items-center justify-between 2xs:text-xs xs:text-sm'
        )}
      >
        <button
          className={`flex flex-col items-center justify-center `}
          onClick={async () => {
            setTransitionComplete(false);
            setIsHover((prev) => !prev);
          }}
        >
          <Image src={shopIcon} alt='' className='stroke-current invert' />
          <h2 className='data-[active]:accent/50 data-[state=open]:accent/50 transition-colors hover:text-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50'>
            Shop
          </h2>
        </button>
        <Link
          href='/shop/new'
          className='flex flex-col items-center justify-center'
        >
          <p className='mb-[2px] h-[22px] w-[32px] rounded-sm border border-primary-foreground px-1 text-[10px]'>
            NEW
          </p>
          <h2 className='data-[active]:accent/50 data-[state=open]:accent/50 transition-colors hover:text-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50'>
            Nouveautés
          </h2>
        </Link>
        <Link
          href='/my-account'
          className='flex flex-col items-center justify-center text-white'
        >
          <Image
            src={userRound}
            alt='user icon linked to user account'
            width={24}
            height={24}
            className='stroke-current invert'
          />
          <h2 className='data-[active]:accent/50 data-[state=open]:accent/50 transition-colors hover:text-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50'>
            Mon compte
          </h2>
        </Link>
        <Link
          href='/panier'
          className='flex flex-col items-center justify-center'
        >
          <Image
            src={shoppingCartIcon}
            alt='cart icon linked to shopping cart'
            width={24}
            height={24}
            className='stroke-current invert'
          />
          <h2>Panier</h2>
        </Link>
        <Link
          href='/wishlist'
          className='flex flex-col items-center justify-center'
        >
          <Image
            src={wishlistIcon}
            alt='heart icon linked to wishlist account'
            width={24}
            height={24}
            className='stroke-current invert'
          />
          <h2 className='data-[active]:accent/50 data-[state=open]:accent/50 transition-colors hover:text-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50'>
            Ma wishlist
          </h2>
        </Link>
      </div>
    </nav>
  );
};
