import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const BASE_PATH = "/auth/api";

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {}, //{ label: "Username", type: "text", placeholder: "jsmith" },
        password: {}, //{ label: "Password", type: "password" },
      },
      authorize: async (credentials): Promise<any | null> => {
        console.log(credentials, "authorize fn credentials");

        if (
          credentials?.username === "jsmith" &&
          credentials?.password === "pass"
        ) {
          return {
            id: "1",
            name: "John Smith",
            email: "jsmith@me.com",
            secret_data: "secret",
          };
        }
        return null;

        /* const response = await fetch('request')
        if(!response.ok) return null
        return await response.json() ?? null */
      },
      /* async authorize(credentials) {
        const res = await fetch(`${BASE_PATH}/callback`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });
        return null;
      }, */
    }),
  ],
  basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
