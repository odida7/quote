 'use client' 

import { createUser } from '@/lib/actions/user.actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Signup = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await createUser(formData);

      // Check the response status
     
        // Optionally, you can redirect the user to another page after successful registration
      response.status === 200 && router.replace('/login');
      

      // Clear the form fields after successful registration
      setFormData({
        username: '',
        email: '',
        password: '',
      });
    } catch (error: any) {
      console.error('Error creating user:', error.message);
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
            type='text'
            name='username'
            placeholder='Username'
            required
            value={formData.username}
            onChange={handleChange}
            className='m-4 border-b-2 p-2 bg-transparent outline-none'
          />

          <input
            type='email'
            name='email'
            placeholder='Email'
            required
            value={formData.email}
            onChange={handleChange}
            className='m-4 border-b-2 p-2 bg-transparent outline-none'
          />

          <input
            type='password'
            name='password'
            placeholder='Enter password'
            required
            value={formData.password}
            onChange={handleChange}
            className='m-4 mb-6 border-b-2 p-2 bg-transparent outline-none'
          />

          <button
            type='submit'
            className='w-full bg-blue-400 text-white p-2 rounded-lg hover:bg-blue-300'
          >
            Register
          </button>
        </form>

        <div className='flex flex-col items-center justify-between m-2 p-4'>
          <span className='text-xs font-light text-gray-400'>
            Already have an account?{' '}
            <Link href='/login' className='text-sm font-medium text-blue-400'>
              LogIn
            </Link>{' '}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
