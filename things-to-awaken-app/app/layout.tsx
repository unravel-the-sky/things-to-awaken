import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Providers from "./components/client/Providers";
import "./globals.css";
import { Cormorant } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Things to awaken.",
  description: "",
};

const cormorant = Cormorant({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${cormorant.className} bg-mainBgColor`}>
        <Providers>
          <nav className="fixed top-0 left-0 h-20 bg-slate-100 bg-gradient-to-r from-mainBgColor to-slate-200 w-full">
            <Link href={"/"}>
              <Image
                src={"/logo-2.webp"}
                width={80}
                height={80}
                alt="logo"
                className="h-full object-cover"
              />
            </Link>
          </nav>
          <main className="flex min-h-screen flex-col items-center justify-center h-full w-full">
            {children}
          </main>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
