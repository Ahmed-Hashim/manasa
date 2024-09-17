import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'your@email.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const email: string = credentials?.email ?? ''  // Explicitly typed as string
        const password: string = credentials?.password ?? ''  // Explicitly typed as string

        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
          throw new Error('No user found with this email')
        }

        const isValid = await bcrypt.compare(password, user.hashedPassword)

        if (!isValid) {
          throw new Error('Invalid password')
        }

        // Return user object with id and role, explicitly typed as string
        return {
          id: user.id as string,  // Explicitly typed as string
          email: user.email as string,  // Explicitly typed as string
          name: user.name as string,  // Explicitly typed as string
          role: user.role as string  // Explicitly typed as string
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string  // Explicitly typed as string
        token.role = user.role as string  // Explicitly typed as string
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string  // Explicitly typed as string
        session.user.role = token.role as string  // Explicitly typed as string
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
})
