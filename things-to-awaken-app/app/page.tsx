import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import SigninButton from "./components/client/SigninButton";
import UploadButton from "./components/client/UploadButton";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <Image src={"/logo-2.webp"} width={250} height={250} alt="logo" />
      <h3>hello, friend</h3>

      <SigninButton />
      <UploadButton />
    </div>
  );
}
