import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    token: string;
    username: string;
    first: boolean;
  }
  interface Session {
    accessToken: string;
    first: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    first: boolean;
  }
}
