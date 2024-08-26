import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <Image src={"/logo.webp"} width={200} height={200} alt="logo" />
      <h3>hello, friend</h3>
    </div>
  );
}
