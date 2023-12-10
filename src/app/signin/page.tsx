import Link from 'next/link'
import { cookies } from 'next/headers'
import LoginForm from '@/components/auth/LoginForm'


export default function SignIn() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm flex flex-col my-auto space-y-6 lg:space-y-10">
       <h1 className='text-xl m-auto font-bold lg:text-5xl'>Welcome</h1>
       <LoginForm />
       <Link href={'/signup'}>Sign up</Link>
      </div>
    </main>
  )
}


