"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UploadButton() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    return (
      <div className="grid grid-cols-2 divide-x-2 divide-blue-200">
        <Button
          variant="link"
          type="button"
          onClick={() => router.push("./upload")}
        >
          upload
        </Button>
        <Button variant="link" type="button" onClick={() => signOut()}>
          sign out
        </Button>
      </div>
    );
  }
}
