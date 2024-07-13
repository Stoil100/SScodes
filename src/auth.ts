import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";
import { ObjectId } from "mongodb";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env
                .NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
                allowDangerousEmailAccountLinking: true
        }),
        GitHubProvider({
            clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string,
            clientSecret: process.env
                .NEXT_PUBLIC_GITHUB_CLIENT_SECRET as string,
        }),
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
        }),
    ],
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            // Custom logic to handle user sign in
            return true;
        },
        async session({ session, user, token }) {
            // Add additional user information to session object
            session.user.id = user.id;
            return session;
        },
        async jwt({ token, user, account, profile }) {
            // Add additional information to JWT token
            if (user) {
                token.id = user.id;
            }
            return token;
        },
    },
    events: {
        async createUser({ user }) {
            const client = await clientPromise;
            const db = client.db();
            await db.collection("users").updateOne(
                { _id: new ObjectId(user.id) }, // Convert string ID to ObjectId
                { $set: { admin: false } }
            );
            // This event is triggered when a new user is created
            // You can add additional logic here if needed
        },
    },
});
