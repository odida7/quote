import { createUser } from '@/lib/actions/user.actions';
import Link from 'next/link'
import React from 'react'

async function Page() {

  //const user = await createUser();

  return (
     <div className='flex flex-col h-screen items-center justify-center'>
      
      <div className='flex flex-col items-center justify-center m-2 shadow-xl shadow-gray-400 rounded-md'>
     
       <form 
        //onSubmit={handleSubmit}
        className='flex flex-col items-center justify-center m-2 p-4 shadow-xl bg-slate-300 w-full rounded-sm'
       >
         <input 
           type='text' 
           placeholder='Username' 
           required
           className='m-4 border-b-2 p-2 bg-transparent outline-none'
        />

         <input 
           type='email' 
           placeholder='Email' 
           required
           className='m-4 border-b-2 p-2 bg-transparent outline-none'
        />

         <input 
           type='password' 
           placeholder='Enter password' 
           required
           className='m-4 mb-6 border-b-2 p-2 bg-transparent outline-none'
        />
      
        
       
         <button className='w-full bg-blue-400 text-white p-2 rounded-lg hover:bg-blue-300'>
          Register
        </button> 
       </form>

      <div className='flex flex-col items-center justify-between m-2 p-4'>

        
        <span className='text-xs font-light text-gray-400'>Already have an account? <Link href='/login' className='text-sm font-medium text-blue-400'>LogIn</Link> </span>
       </div> 
      </div>
    </div>
  )
}

export default Page;
