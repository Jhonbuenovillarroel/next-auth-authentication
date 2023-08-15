import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import type { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import { toast } from "react-hot-toast";

export const authOptions: NextAuthOptions = {
   adapter: PrismaAdapter(prisma),
   session: {
      strategy: "jwt",
   },
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),

      CredentialsProvider({
         name: "Credentials",
         credentials: {
            username: {
               label: "Username",
               type: "text",
               placeholder: "jsmith",
            },
            password: {
               label: "Password",
               type: "password",
               placeholder: "*********",
            },
            email: {
               label: "Email",
               type: "email",
               placeholder: "E-mail",
            },
         },
         async authorize(credentials, req) {
            const user = await prisma.user.findUnique({
               where: {
                  name: credentials?.username,
               },
            });

            if (user) {
               const contraseñaCoincide = await bcrypt.compare(
                  credentials?.password,
                  user.password
               );
               if (contraseñaCoincide) {
                  return { id: user.id, name: user.name, email: user.email };
               } else {
                  throw new Error("Usuario o contraseña incorrectos");
               }
            } else {
               throw new Error("El usuario no existe, por favor registrate");
            }
         },
      }),
   ],
   callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
         // console.log({ user, account, profile, email, credentials });
         const isAllowedToSignIn = true;
         if (isAllowedToSignIn) {
            return true;
         } else {
            // Return false to display a default error message
            return false;
            // Or you can return a URL to redirect to:
            // return '/unauthorized'
         }
      },
      async jwt({ token, account, profile }) {
         // Persist the OAuth access_token and or the user id to the token right after signin
         // console.log({ token, account, profile });

         // console.log(token, account, profile);
         return token;
      },
      async session({ session, token, user }) {
         // Send properties to the client, like an access_token and user id from a provider.
         // console.log({ session, token, user });
         return session;
      },
   },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
