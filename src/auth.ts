import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";
import { ObjectId } from "mongodb";
import { compare } from "bcrypt";

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
            allowDangerousEmailAccountLinking: true,
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
            authorize: async (credentials, req) => {
                if (!credentials) return null;
                const client = await clientPromise;
                const db = client.db();
                const { email, password } = credentials;
                const user = await db.collection("users").findOne({ email });
                if (!user || !user._id) {
                    throw new Error("No user found with the email");
                }
                const isValid = await compare(
                    password as string,
                    user.password
                );
                if (!isValid) return null;
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    admin: user.admin,
                    image: user.image,
                };
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account, profile, credentials }) {
            if (account?.provider === "credentials" && user.id) {
                const client = await clientPromise;
                const db = client.db();
                const email = credentials!.email;
                const user = await db.collection("users").findOne({ email });
                if (!user) return false;
            }

            return true;
        },
        async session({ session, user, token }) {
            if (token._id && session.user) {
                session.user.id = token._id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.admin = token.admin as boolean;
            }
            return session;
        },
        async jwt({ token, user, account, profile }) {
            if (user) {
                token._id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.picture = user.image;
                token.admin = user.admin;
            }
            return token;
        },
    },
    events: {
        async createUser({ user }) {
            const client = await clientPromise;
            const db = client.db();
            await db
                .collection("users")
                .updateOne(
                    { _id: new ObjectId(user.id) },
                    { $set: { admin: false } }
                );
        },
    },
});
