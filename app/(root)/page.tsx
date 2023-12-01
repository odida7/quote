
import PostCard from "@/components/PostCard";
import { fetchPost } from "@/lib/actions/post.actions";


export default async function Home({
  searchParams,   
}: {
  searchParams: { [key: string]: string | undefined };
}) {

  const result = await fetchPost( searchParams.page ? +searchParams.page : 1,
    30 );
console.log('post:', result);

  return (
    <div className='flex flex-col items-center justify-center p-4 m-4'>
      <div className="w-3/5">
        {result?.posts?.map((post) => (
          <PostCard 
            key={post._id}
            _id={post._id}
            text={post.text}
            userId={post.userId}
            name={post.name}
             createdAt={post.createdAt.toLocaleString()}
          />
        ))}
      </div> 
     
    </div>
  )
}
