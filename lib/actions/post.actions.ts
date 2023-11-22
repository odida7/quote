'use server'

import Post from "../models/post.models";
import User from "../models/user.models";
import { connectToDB } from "../mongoose";

interface Params {
    text: string;
    userId: string;
    createdAt: Date;
}

export async function createPost({ text, userId, createdAt }: Params) {
    try {
        await connectToDB();
        // Use Post.create directly, which creates and saves the document
        const author = await User.findById(userId)

        if(author){
          await Post.create({ text, userId, createdAt });
        }
        

        return { message: 'Post has been created successfully.', status: 200 };
    } catch (err: any) {
        console.error(`Error creating post: ${err.message}`);
        // Respond with an error message
        return { error: `Error creating post: ${err.message}`, status: 500 };
    }
}



/////////////////////fetch post
/*
export async function fetchPost(pageNumber = 1, pageSize = 20){
   try {
    await connectToDB();
    //calculate the number of posts to skip base on page size and page number
    const skipAmount = (pageNumber - 1) * pageSize;
  
    const post = await Post.find()
    .sort({ createdAt: 'desc'})
    .skip(skipAmount)
    .limit(pageSize)
    
    return { post, message: 'success', status: 200 };

   }catch (err: any){
       console.error(`Error fetching post: ${err.message}`);
        // Respond with an error message
        return { error: `Error fetching post: ${err.message}`, status: 500 };
   }
}
*/


export async function fetchPost(pageNumber = 1, pageSize = 20) {
    try {
        await connectToDB();

        const totalPosts = await Post.countDocuments(); // Count total number of posts
        const totalPages = Math.ceil(totalPosts / pageSize);

        if (pageNumber < 1 || pageNumber > totalPages) {
            return { error: 'Invalid page number', status: 400 };
        }

        const skipAmount = (pageNumber - 1) * pageSize;

        const posts = await Post.find()
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(pageSize);

        return { posts, totalPages, currentPage: pageNumber, message: 'Success', status: 200 };
    } catch (err: any) {
        console.error(`Error fetching posts: ${err.message}`);
        return { error: `Error fetching posts: ${err.message}`, status: 500 };
    }
}