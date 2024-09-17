// types/next-auth.d.ts
import { DefaultUser, DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: string;
    };
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
  }
}
