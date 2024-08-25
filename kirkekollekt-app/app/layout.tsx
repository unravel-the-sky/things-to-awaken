import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Providers from "./components/client/Providers";
import SigninButton from "./components/client/SigninButton";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kirkekollekt - 2024",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Topbar />
          <main className="flex min-h-screen flex-col items-center justify-start mt-[100px]">
            {children}
          </main>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}

const Topbar = () => {
  return (
    <div>
      <nav className="fixed h-fit inset-x-0 top-0 z-50 bg-white shadow-lg dark:bg-gray-950/90">
        <div className="w-full mx-auto">
          <div className="flex justify-between h-fit items-center">
            <Link href={"/"}>
              <Image
                src="/kirkekollekt-header.png"
                alt="logo"
                width={350}
                height={250}
              />
            </Link>
            <Link href={"https://kpk.no"} target="_blank">
              <Image
                src="/kirkekollekt-logo.jpg"
                alt="logo"
                width={120}
                height={120}
              />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};
