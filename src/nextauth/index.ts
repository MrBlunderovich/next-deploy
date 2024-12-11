import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const BASE_PATH = "/auth/api";

export const authConfig: NextAuthConfig = {
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {}, //{ label: "email", type: "text", placeholder: "jsmith" },
        password: {}, //{ label: "Password", type: "password" },
      },
      authorize: async (credentials): Promise<any | null> => {
        try {
          const url = new URL("/auth/check", "http://localhost:3201").href;

          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });
          if (!response.ok) return null;
          return await response.json();
        } catch (error) {
          console.error(error);

          return null;
        }
      },
    }),
  ],
  basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
