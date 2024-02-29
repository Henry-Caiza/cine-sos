import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcrypt';
import prismadb from '@/lib/prismadb';

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error('Email and password are required');
                    }

                    const user = await prismadb.user.findUnique({
                        where: { email: credentials.email }
                    });

                    if (!user || !user.hashedPassword) {
                        throw new Error('Invalid email or password');
                    }

                    const isCorrectPassword = await compare(credentials.password, user.hashedPassword);

                    if (!isCorrectPassword) {
                        throw new Error('Invalid email or password');
                    }

                    return user;
                } catch (error) {
                    throw new Error(error.message);
                }
            }
        })
    ],
    pages: { signIn: '/auth' },
    debug: process.env.NODE_ENV === 'development',
    adapter: PrismaAdapter(prismadb),
    session: { strategy: 'jwt' },
    jwt: { secret: process.env.NEXTAUTH_JWT_SECRET, },
    secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);