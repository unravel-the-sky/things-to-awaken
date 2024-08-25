import { AuthOptions } from "next-auth";
import { UserRole } from "@/lib/types";
import GoogleProvider from "next-auth/providers/google";
import prisma from '@/lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          role: profile.role ? profile.role : "user",
          image: profile.picture
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  logger: {
    error(code, metadata) {
      console.error("logger has an ERROR");
      console.error(code, metadata);
    },
    warn(code) {
      console.error("logger has a WARNING");
      console.warn(code);
    },
    debug(code, metadata) {
      console.error("logger has a DEBUG");
      console.debug(code, metadata);
    },
  },
  callbacks: {
    async jwt({ token, user, account }) {
      return { ...token, ...user };
    },
    session({ session, token }) {
      if (token) {
        session.user.role = token?.role;
        console.log("session is: ", session);
      }

      return session;
    },
  },
};
