//'use client'

import PostCard from "@/components/PostCard";
import { fetchPost } from "@/lib/actions/post.actions";
//import { fetchUser } from "@/lib/actions/user.actions";
//import { useSession } from "next-auth/react";
//import { useRouter } from "next/navigation";
//import { useEffect, useState } from "react";


export default async function Home({
  searchParams,   
}: {
  searchParams: { [key: string]: string | undefined };
}) {
 // const session = useSession();
 // const router = useRouter(); 
  //const [post, setPost] = useState();

  /*if (session.status === "unauthenticated") {
    router?.push("/login");
  }
*/
 // const currentUserId = session?.user?._id

 //const user = await fetchUser(_id: string);
/*
 const result: {
    error: string;
    status: number;
    posts?: undefined;
    totalPages?: undefined;
    currentPage?: undefined;
    message?: undefined;
} | {
    posts: any[];
    totalPages: number;
    currentPage: number;
    message: string;
    status: number;
    error?: undefined;
}
*/
  const result = await fetchPost( searchParams.page ? +searchParams.page : 1,
    30 );
console.log('post:', result);

  return (
    <div className='flex flex-col items-center justify-center p-4 m-4'>
      <div className="w-3/5">
        {result?.posts?.map((post) => (
          <PostCard 
            key={post._id}
            text={post.text}
          />
        ))}
      </div> 
     
    </div>
  )
}
