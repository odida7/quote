'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

export default function Form() {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });


    if (response?.error) {
     console.error('Authentication failed:', response.error);
  // Handle the error, e.g., display an error message to the user
}


    if (!response?.error) {
      router.push('/');
     // router.refresh();
    }
  };
  return (

    <div className='flex flex-col h-screen items-center justify-center'>

      <div className='flex flex-col items-center justify-center m-2 shadow-xl shadow-gray-400 rounded-md'>
        <form
            onSubmit={handleSubmit}
             className='flex flex-col items-center justify-center m-2 p-4 shadow-xl bg-slate-300 w-full rounded-sm'

        >
            <input
                name="email"
                placeholder='Email'
                className='m-4 border-b-2 p-2 bg-transparent outline-none'
                type="email"
            />
            <input
                name="password"
                placeholder='Password'
                className='m-4 border-b-2 p-2 bg-transparent outline-none'
                type="password"
            />
            <button type="submit" className='w-full bg-blue-400 text-white p-2 rounded-lg hover:bg-blue-300'>
                Login
            </button>
        </form>
        <div className='flex flex-col items-center justify-between m-2 p-4'>
          <span className='text-xs font-light text-gray-400'>
            Dont have an account?{' '}
            <Link href='/signup' className='text-sm font-medium text-blue-400'>
              SignIn
            </Link>{' '}
          </span>
        </div>

      </div> 
    </div>
        
  );
}
