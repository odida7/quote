'use server'


import Post from "../models/post.models";
import User from "../models/user.models";
import { connectToDB } from "../mongoose";

interface Params {
  text: string;
  userId: string;
  createdAt: string;
}

export async function createPost({ text, userId, createdAt }: Params) {
  try {
    await connectToDB();

    // Find the author (user) based on the provided userId
    const author = await User.findById({_id: userId}, { userId: 1 });
    console.log('userId:', author)

    if(author){
      // Create a new post document
      const newPost = new Post({ text, userId: author, createdAt });

      // Set the author field to the user ID
      //newPost.user = author._id;

      // Save the new post
      await newPost.save();

      return { message: 'Post has been created successfully.', status: 200 };
    } else {
      // If the author (user) is not found, respond with an error
      return { error: 'Author not found.', status: 404 };
    }
  } catch (err: any) {
    console.error(`Error creating post: ${err.message}`);
    // Respond with an error message
    return { error: `Error creating post: ${err.message}`, status: 500 };
  }
}


//////////////////fetch post

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