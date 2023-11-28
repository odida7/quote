'use client'

import { createPost } from '@/lib/actions/post.actions';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'

interface Props {
  text: string;
  userId: string;
  createdAt: Date;
  _id: string;
}

 /*
 interface Session {
    user: {
      address: string
    }
  }
*/

export default function CreatePost({text, userId, createdAt, _id}: Props) {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    router.replace("/login");
  }

  const user = session?.user?._id;
  console.log('id:', user);
  
  const [formData, setFormData] = useState({
    text: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
     // _id: userId,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
     if (user){

        setLoading(true);
        const res = await createPost({
          userId: user,   
          text: formData.text, 
          createdAt: new Date(),
        });
        if (res.status === 200) {
          // Clear the form and reset state
          setFormData({ text: '' });
          setError(null);
          router.replace('/');
        } else {
          setError('Failed to create post. Please try again.');
        }
    }
    } catch (error: any) {
      setError(`Error creating post: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col h-screen items-center justify-center'>
      <h1 className='text-center p-4 text-xl text-slate-700 font-semibold'>
        Create Quote
      </h1>

      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center justify-center m-2 p-4 shadow-xl bg-slate-300 w-1/2 rounded-sm gap-4'
      >
        <textarea
          name='text'
          placeholder='Publish a quote'
          onChange={handleChange}
          value={formData.text}
          rows={5}
          cols={20}
          className='w-full outline-none'
        />

        <button
          type='submit'
          className='w-full bg-blue-400 text-white p-2 rounded-lg hover:bg-blue-300'
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create'}
        </button>

        {error && (
          <p className='text-red-500 text-sm mt-2'>{`Error: ${error}`}</p>
        )}
      </form>
    </div>
  );
}
