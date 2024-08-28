import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Providers from "./components/client/Providers";
import "./globals.css";
import { Cormorant } from "next/font/google";
import LeafAnimator from "./components/client/LeafAnimator";

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
          <nav className="fixed z-10 top-0 left-0 h-20 bg-slate-100 bg-gradient-to-r from-mainBgColor via-[#f0f0f0] to-mainBgColor w-full flex">
            <Link href={"/"} className="absolute left-0">
              <Image
                src={"/logo-2.webp"}
                width={80}
                height={80}
                alt="logo"
                className="h-full object-cover"
              />
            </Link>
            <div className="m-auto flex flex-col gap-0">
              <h3 className="m-auto">things to awaken</h3>
              <h4 className="m-auto text-sm">a very personal website</h4>
            </div>
          </nav>
          <main className="flex min-h-screen mt-20 flex-col items-center justify-center h-full w-full">
            {children}
          </main>
          <LeafAnimator />
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
