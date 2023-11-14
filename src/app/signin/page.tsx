import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';

export default function SignIn() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 my-auto flex w-full max-w-5xl flex-col items-center justify-between space-y-6 text-sm lg:space-y-10'>
        <h1 className='m-auto text-xl font-bold lg:text-5xl'>Welcome</h1>
        <LoginForm />
        <Link href={'/signup'}>Sign up</Link>
      </div>
    </main>
  );
}
