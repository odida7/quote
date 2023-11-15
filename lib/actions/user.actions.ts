'use server';

import User from "../models/user.models";
import { connectToDB } from "../mongoose";

// Define the interface for user creation
interface Props {
  username: string;
  email: string;
  password: string;
}

// Create a user with error handling
export async function createUser({ username, email, password }: Props): Promise<void> {
  try {
    // Connect to the database
    await connectToDB();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create a new user
    const newUser = new User({ username, email, password });
    await newUser.save();
  } catch (error: any) {
    // Handle errors
    throw new Error(`Error creating user: ${error.message}`);
  }
}
