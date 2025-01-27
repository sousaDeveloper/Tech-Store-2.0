import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    name: string | null;
    id: string;
    favorites?: string[];
  }
  interface Session {
    user: User & {
      name: string;
      id: string;
      favorites?: string[];
    };
    token: {
      name: string;
      id: string;
      favorites?: string[];
    };
  }
}
