 'use server'

import User from "../models/user.models";
import { connectToDB } from "../mongoose";
import bcrypt from "bcrypt";

// Create a user with error handling
export const createUser = async (formData: any) => {
  const { username, email, password } = formData;
  try {
    // Connect to the database
    await connectToDB();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // Respond with a success message
    return { message: "User has been created", status: 200 };

  } catch (error: any) {
    // Handle errors
    console.error(`Error creating user: ${error.message}`);
    // Respond with an error message
    return { error: `Error creating user: ${error.message}`, status: 500 };
  }
};


export async function fetchUser(_id: string) {
    try {
        await connectToDB();
        const user = await User.findById(_id);

        if (user) {
            return { user, message: 'User found', status: 200 };
        } else {
            return { error: 'User not found', status: 404 };
        }
    } catch (err: any) {
        throw new Error(`Failed to fetch user: ${err.message}`);
    }
}