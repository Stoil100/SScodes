import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
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
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    session:{
        strategy: "jwt",
    },
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            // Custom logic to handle user sign in
            return true;
        },
        async session({ session, user, token }) {
            if (token._id && session.user) {
                session.user.id = token._id as string
                session.user.name = token.name as string
                session.user.email = token.email as string
                session.user.admin = token.admin as boolean
              }
              return session
        },
        async jwt({ token, user, account, profile }) {
            // if (!token.email) return token
            if (user){
                token._id = user.id
                token.name = user.name
                token.email = user.email
                token.picture = user.image
                token.admin =  user.admin
            }
            return token
        },
    },
    events: {
        async createUser({ user }) {
            const client = await clientPromise;
            const db = client.db();
            await db.collection("users").updateOne(
                { _id: new ObjectId(user.id) },
                { $set: { admin: false } }
            );
        },
    },
});
