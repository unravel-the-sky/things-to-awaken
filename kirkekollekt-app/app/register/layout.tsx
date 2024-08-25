export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col p-4 w-full">{children}</div>;
}
