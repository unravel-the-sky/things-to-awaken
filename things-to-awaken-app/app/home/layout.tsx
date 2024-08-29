import Link from "next/link";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="fixed flex gap-4 justify-center space-x-2 w-full ml-[-16px] py-2 h-[8] bg-mainBgColor">
        <Link href="/upload">upload</Link>
        <Link href="/zen">zen</Link>
      </div>
      <div className="my-12">{children}</div>
    </div>
  );
}
