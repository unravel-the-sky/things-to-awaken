"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function UploadButton() {
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <Link href="/upload" type="button">
        upload
      </Link>
    );
  }
}
