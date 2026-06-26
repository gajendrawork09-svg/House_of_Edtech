import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        // We will connect Prisma later

        return {
          id: "1",
          name: "Sunny",
          email: credentials?.email as string,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },
});