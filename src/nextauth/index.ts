import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const BASE_PATH = "/auth/api";

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {}, //{ label: "email", type: "text", placeholder: "jsmith" },
        password: {}, //{ label: "Password", type: "password" },
      },
      authorize: async (credentials): Promise<any | null> => {
        try {
          const url = new URL("/auth/check", process.env.NEXT_PUBLIC_BASE_URL)
            .href;

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
