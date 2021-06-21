import { login, logout } from "apis/auth";
import NextAuth from "next-auth";
import { signIn } from "next-auth/client";
import { JWT } from "next-auth/jwt";
import Providers from "next-auth/providers";

type Credentials = {
  username: string;
  password: string;
};

export default NextAuth({
  session: {
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },

  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize({ username, password }: Credentials) {
        const { token, first } = await login({
          username,
          password,
        });

        return token ? { token, username, first } : null;
      },
    }),
  ],

  callbacks: {
    async session(session, token: JWT) {
      session.accessToken = token.accessToken;
      session.first = token.first;

      return session;
    },
    async jwt(token, user) {
      if (user) {
        token.accessToken = user.token;
        token.first = user.first;
      }

      return token;
    },
  },

  events: {
    async signOut(message: JWT) {
      await logout({ token: message.accessToken });
    },
  },
});
