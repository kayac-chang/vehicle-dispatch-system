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
