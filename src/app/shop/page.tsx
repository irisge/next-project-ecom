import { ImageHeader } from '@/components/common/shop/header/imageHeader';
import Link from 'next/link';

export default async function Home() {
  return (
    <>
      <ImageHeader page={'others'} />
      <main className='relative flex min-h-screen flex-col  items-center justify-between p-24'>
        <div className='z-10 my-auto flex w-full max-w-5xl flex-col items-center justify-between space-y-6 text-sm lg:space-y-10'>
          <h1 className='m-auto text-xl font-bold lg:text-5xl'>Welcome</h1>
          <Link href='/signup'>Signup</Link>
        </div>
      </main>
    </>
  );
}
