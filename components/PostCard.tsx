
import { fetchUser } from '@/lib/actions/user.actions';
import React from 'react'

interface Props {
    _id: string;
    userId: string;
    text: string;
    name: string;
    createdAt: string;
}

export default async function PostCard({_id, userId, text, createdAt, name}: Props) {

  const user = await fetchUser(userId);
  const userName = user.name || 'Anonymous';
  console.log('user:', user);
  console.log('username:', userName);

  return (
    
      <div className='flex flex-col items-center justify-center p-4 m-4 bg-slate-100 gap-4 rounded-md'>
        
        
        <p className='flex flex-col bg-white text-lg font-light text-slate-800 overflow-y-auto m-4 p-4 max-h-96 w-full'>
          {text}
        </p>
       
       <div className='flex flex-row w-full justify-between items-center px-6'>
        <span className='text-xl font-semibold text-slate-600'>
            {userName}
        </span>

        <span className='text-md font-light text-slate-600'>
            {createdAt}
        </span>
       </div>
        
      </div>

  )
}
