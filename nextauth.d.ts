import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    token: string;
    username: string;
  }
  interface Session {
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
  }
}
