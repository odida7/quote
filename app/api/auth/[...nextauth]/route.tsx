import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import User from '@/lib/models/user.models';
import { connectToDB } from '@/lib/mongoose';

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        await connectToDB();

        // Validate credentials
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error('Invalid credentials');
        }

        // Find user in the database
        const user = await User.findOne({
          email: credentials.email,
        });

        // Check if the user exists
        if (!user) {
          throw new Error('User not found');
        }

        // Compare passwords
        const passwordCorrect = await compare(
          credentials.password,
          user.password
        );

        if (passwordCorrect) {
          return {
            id: user.id,
            email: user.email,
          };
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
