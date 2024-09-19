import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient, User } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

// Add this function
import jwt from 'jsonwebtoken'

const generateAccessToken = (user: User) => {
  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1d' })
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'your@email.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { profile: true }
        })
        

        if (!user) {
          throw new Error('No user found with this email')
        }

        const isValid = await bcrypt.compare(credentials.password, user.hashedPassword)

        if (!isValid) {
          throw new Error('Invalid password')
        }

        const accessToken = generateAccessToken(user);

        
        // Modify the return statement
        return {
          id: user.id,
          email: user.email,
          name: user.name || '',
          role: user.role || '',
          imageUrl: user.profile?.imageUrl || null,
          token :accessToken,
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.imageUrl = user.imageUrl; // Add this line
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.imageUrl = token.imageUrl as string | null;
        session.user.token = token.accessToken as string | undefined;
      }
      return session;
    }
  },
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
})
