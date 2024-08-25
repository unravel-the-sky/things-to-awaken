import { User } from "@prisma/client";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    error: RefreshAccessTokenError;
    access_token?: string;
    id_token?: string;
    user: User
  }

  interface Account {
    ext_expires_in: number;
  }
}

declare module 'next-auth/jwt' {
  type JWT = User;
}

export type UserRole = "admin" | "user" | "owner";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MAILERSEND_API_KEY: string
    }
  }
}

export type OrganisationDto = {
  id?: string,
  image: string,
  name: string,
  emails: string[],
  links: string[],
  documentFileKey: string,
  description?: string,
  createdAt?: Date;
}

export type RegisterOrganisationDto = {
  dates: Date[] // for now
  organisationId: string
}

export type DonationType = {
  [orgId: string]: {
    dates: Date[]
  }
}

export type DonationDto = {
  donatorName: string,
  donatorEmail: string,
  donation: DonationType
}

export type SubmittedFormData = {
  orgName: FormDataEntryValue | null;
  orgEmail: FormDataEntryValue | null;
  linkToOrg: FormDataEntryValue | null;
  orgLogo: string;
  orgDocument: string
};

export type DonationLogDto = {
  id: string;
  organisationId: string;
  dates: Date[];
  registeredDonationId: string | null;
  donatorId: string | null;
}

export type DonatorDto = {
  id: string;
  name: string;
  email: string;
}