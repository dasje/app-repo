import { findUser } from "@/app/database/repositories/UserRepository";
import { verifyPassword } from "@/app/lib/handlers/auth_handlers/passwordAuthentication";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { KyselyAdapter } from "@auth/kysely-adapter";
import { db } from "@/app/database/database";
import { PROTECTED_ROUTES } from "@/app/lib/routes/routes";

export type CredentialsObject = {
  id: string;
  email: string;
  name: string;
  randomKey: string;
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  adapter: KyselyAdapter(db),
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await findUser({ email: String(credentials.email) });

        if (
          !user ||
          !verifyPassword(user.hashedPassword, String(credentials.password))
        ) {
          return null;
        }
        const retObj: CredentialsObject = {
          id: user.id,
          email: user.email,
          name: user.name,
          randomKey: "Hey cool",
        };
        return retObj;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtected = PROTECTED_ROUTES.some((path) =>
        nextUrl.pathname.startsWith(path)
      );

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL("/", nextUrl.origin);
        redirectUrl.searchParams.append("callbackUrl", nextUrl.href);
        return Response.redirect(redirectUrl);
      }
      return true;
    },
    session: ({ session, token, user }) => {
      return {
        ...session,
        token,
        // user,
        // user: {
        //   ...session.user,
        //   id: token.id,
        //   randomKey: token.randomKey,
        // },
      };
    },
    jwt: ({ token, user, session }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
});
