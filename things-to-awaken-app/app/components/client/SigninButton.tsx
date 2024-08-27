"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function SigninButton() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (status === "loading") {
    return (
      <div className="space-y-2 flex flex-col items-center justify-center">
        <div>loading user..</div>
      </div>
    );
  }

  if (session && session.user) {
    return <div className="lowercase">it&rsquo;s you, {session.user.name}</div>;
  }

  if (status === "unauthenticated") {
    return (
      <Button variant={"blue"} onClick={() => signIn()}>
        Log in
      </Button>
    );
  }

  if (session && session.user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="p-6 bg-slate-50">
            <div className="flex gap-4 items-center">
              <p>{session.user.name}</p>
              <Image
                src={session.user.image ?? ""}
                alt={session.user.name ?? ""}
                className="rounded-full"
                width={32}
                height={32}
              />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>User</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => signOut()}>Log in</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  console.log(pathname);

  if (pathname === "/admin") {
    return (
      <Button variant={"blue"} onClick={() => signIn("google")}>
        Logg på
      </Button>
    );
  }

  return null;
}
