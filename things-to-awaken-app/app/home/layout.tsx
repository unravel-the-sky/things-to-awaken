import Link from "next/link";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-20 w-full px-4">
      <div className="fixed flex gap-4 justify-center w-full py-2 bg-mainBgColor">
        <Link href="/home/upload">upload</Link>
        <Link href="/home/zen">zen</Link>
      </div>
      <div className="my-12">{children}</div>
    </div>
  );
}
