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
      <body className={cormorant.className}>
        <Providers>
          <main className="flex min-h-screen flex-col items-center justify-center h-full w-full bg-mainBgColor">
            {children}
          </main>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
