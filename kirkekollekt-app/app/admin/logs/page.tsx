import DonationsLog from "@/app/components/server/Donations";

export default function Logs() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div>logs here</div>
      <DonationsLog />
    </main>
  );
}
