import { login } from "api";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: { username: string; password: string }) {
        const token = await login({
          username: credentials.username,
          password: credentials.password,
        });

        return token ? { token } : null;
      },
    }),
  ],

  callbacks: {
    async session(session, token) {
      session.accessToken = token.accessToken;

      return session;
    },
    async jwt(token, user) {
      if (user) {
        token.accessToken = user.token;
      }

      return token;
    },
  },
});
