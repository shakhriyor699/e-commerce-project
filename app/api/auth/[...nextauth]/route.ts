import NextAuth, { AuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/libs/prisma"

const adminEmails = ['shakhriyor1156@gmail.com'];

export const authOptions: AuthOptions = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: { label: 'name', type: 'text' },
        hashedPassword: { label: 'hashedPassword', type: 'password' }
      },
      async authorize(credentials) {

        const user = await prisma.user.findUnique({
          where: {
            name: credentials?.name
          }
        })
        if (!user) {
          throw new Error('User not found');
        }
        return user
      }
    })
  ],
  
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { authOptions as GET, authOptions as POST }