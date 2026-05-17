import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import sql from '@/lib/db'
import bcrypt from 'bcryptjs'
import { NextAuthOptions } from 'next-auth'

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials')
        }

        try {
          const users = await sql`
            SELECT * FROM admin_users WHERE email = ${credentials.email}
          `

          if (users.length === 0) {
            throw new Error('User not found')
          }

          const user = users[0]
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password_hash
          )

          if (!isPasswordValid) {
            throw new Error('Invalid password')
          }

          return {
            id: user.id.toString(),
            email: user.email,
          }
        } catch (error) {
          console.error('[v0] Auth error:', error)
          throw new Error('Authentication failed')
        }
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
