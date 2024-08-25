import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kirkekollekt - Admin",
  description: "",
};

export default function AdminPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
