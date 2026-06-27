import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import UserService from "./services/user.service";

const userService = new UserService();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        return await userService.login(
          credentials.email as string,
          credentials.password as string
        );
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