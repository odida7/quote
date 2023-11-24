import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import User from '@/lib/models/user.models';
import { connectToDB } from '@/lib/mongoose';

const authOptions = {  
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",

 
  async authorize(credentials, req) {
    // ... your authorization logic ...
   await connectToDB();
   
    try {
        
        const user = await User.findOne({
            email: credentials.email,
         
        });

        if (user) {
            console.log("user found:", user); 
            const isPasswordCorrect = await bcrypt.compare(
                credentials.password,
                user.password
            );

            if (isPasswordCorrect) {
                 return user;
            } else {
                throw new Error("Wrong password");
            }
        } else {
            return null;
        }
      } catch (err) {
        console.error("Authorization Error:", err);
        throw new Error(err.message);
      }
    }
  })
 ],

 
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email, id: session.user._id });
      session.user._id = sessionUser._id.toString();
      /**  console.log("Session user:", sessionUser);*/   
      return session; 
      
    },

  },
 
};
const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};
