// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
// export const authOptions:AuthOptions = NextAuth({
//     adapter: MongoDBAdapter(clientPromise),
//     providers: [
//         GoogleProvider({
//             clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
//             clientSecret: process.env
//                 .NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
//         }),
//         GitHubProvider({
//             clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string,
//             clientSecret: process.env
//                 .NEXT_PUBLIC_GITHUB_CLIENT_SECRET as string,
//         }),
//         CredentialsProvider({
//             // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//             // e.g. domain, username, password, 2FA token, etc.
//             credentials: {
//               email: {},
//               password: {},
//             },
//             authorize: async (credentials) => {
//               let user = null
//               // logic to salt and hash password
//               const pwHash = saltAndHashPassword(credentials.password)

//               // logic to verify if user exists
//               user = await getUserFromDb(credentials.email, pwHash)

//               if (!user) {
//                 // No user found, so this is their first attempt to login
//                 // meaning this is also the place you could do registration
//                 throw new Error("User not found.")
//               }

//               // return user object with the their profile data
//               return user
//             },
//           }),
//     ],
// });

// const uri = process.env.MONGODB_URI as string;

// let client: MongoClient;

// async function connectToDatabase() {
//     if (!client) {
//         client = new MongoClient(uri);
//         await client.connect();
//     }
//     return client.db("portfolio");
// }

// declare module "next-auth" {
//     interface Session {
//         user: User & {
//             id: string | null;
//             admin: boolean | null;
//         };
//     }

//     interface User {
//         id: string | null;
//         admin: boolean | null;
//     }
// }

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env
                .NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
        }),
        GitHubProvider({
            clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string,
            clientSecret: process.env
                .NEXT_PUBLIC_GITHUB_CLIENT_SECRET as string,
        }),
        // CredentialsProvider({
        //     name: "Credentials",
        //     credentials: {
        //         email: { label: "Email", type: "email" },
        //         password: { label: "Password", type: "password" },
        //     },
        //     async authorize(credentials) {
        //         const db = await connectToDatabase();
        //         const usersCollection = db.collection("users");

        //         const user = await usersCollection.findOne({
        //             email: credentials?.email,
        //         });

        //         if (
        //             user &&
        //             (await compare(credentials!.password, user.password))
        //         ) {
        //             return {
        //                 id: user._id.toString(), // Convert ObjectId to string
        //                 email: user.email,
        //                 name: user.name,
        //                 image: user.image,
        //                 admin: user.admin,
        //             };
        //         }
        //         return null;
        //     },
        // }),
    ],
    // callbacks: {
    //     async signIn({ user, account }) {
    //         const db = await connectToDatabase();
    //         const usersCollection = db.collection("users");

    //         if (
    //             account!.provider === "google" ||
    //             account!.provider === "github"
    //         ) {
    //             const existingUser = await usersCollection.findOne({
    //                 email: user.email,
    //             });
    //             if (!existingUser) {
    //                 const newUser: UserType = {
    //                     email: user.email!,
    //                     id: user.id,
    //                     name: user.name!,
    //                     admin: false,
    //                 };
    //                 await usersCollection.insertOne(newUser);
    //             }
    //         }
    //         return true;
    //     },
    //     async session({ session, token }) {
    //         if (token) {
    //             session.user.id = token.id as string;
    //             session.user.admin = token.admin as boolean | null;
    //         }
    //         return session;
    //     },
    //     async jwt({ token, user }) {
    //         if (user) {
    //             token.id = user.id;
    //             token.admin = user.admin;
    //         }
    //         return token;
    //     },
    //     async redirect({ url, baseUrl }) {
    //         console.log('Redirect callback:', { url, baseUrl });
    //         try {
    //           const urlObject = new URL(url, baseUrl);
    //           const baseUrlObject = new URL(baseUrl);
    //           const locale = urlObject.pathname.split('/')[1];
    //             console.log(urlObject,baseUrlObject,locale);
    //           if (urlObject.pathname.startsWith('/')) {
    //             return `${baseUrlObject.origin}/${locale}/profile`;
    //           } else if (urlObject.origin === baseUrlObject.origin) {
    //             return `${baseUrlObject.origin}/${locale}/profile`;
    //           }
    //         } catch (error) {
    //           console.error('Redirect error:', error);
    //           return `${baseUrl}/profile`; // Fallback to /profile page in case of an error
    //         }
    //         return `${baseUrl}/profile`; // Ensure a string is always returned
    //       },
    //     },
    // secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    // pages: {
    //     signIn: "/auth/signin",
    //     signOut: '/auth/signout',
    // },
});
