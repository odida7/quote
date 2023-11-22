'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <div className='bg-gray-100 flex flex-row items-center justify-between shadow-sm shadow-gray-300'>
        <div className='flex flex-row items-center gap-4 p-2'>

         <Link href={'/'}>
            <h1 className='text-xl text-slate-600 font-bold'>
                Quote
            </h1>
         </Link>
          
         <Link href={'/createPost'}>
          <span className='hover:bg-gray-200 p-1 rounded-lg'>Create-Quote</span>  
         </Link> 
        </div>

        <div className='flex flex-row items-center gap-4 p-2'>
            <Link href={'/user'}>
             <span>username</span>  
            </Link>

            <button 
              onClick={()=> signOut({redirect: false})}
               className='bg-slate-100 text-sm font-light text-slate-500 p-1 sm:p-2 hover:bg-red-600 hover:text-white rounded-full'
            >
                Logout
            </button>
        </div>
      
    </div>
  )
}
