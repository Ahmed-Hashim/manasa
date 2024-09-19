// types/next-auth.d.ts
import { DefaultUser, DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: string;
      hello:string;
      imageUrl: string | null;
      token?: string; // Add accessToken here
    };
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
    token?: string; // Add accessToken here if necessary
  }
}
