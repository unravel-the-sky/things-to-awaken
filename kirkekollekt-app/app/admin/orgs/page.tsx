import { Search } from "lucide-react";

import Organisations from "@/app/components/server/Organisations";
import { Input } from "@/components/ui/input";
import AdminOrganisationsSearch from "@/app/components/client/AdminOrganisationsSearch";
import { Suspense } from "react";
import Loading from "@/app/loading";
import AddNewOrganisationButton from "@/app/components/client/AddNewOrganisationButton";

export default function OrgsPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const filter = searchParams["filter"];

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold md:text-2xl">Organisations</h1>
        <AddNewOrganisationButton />
      </div>

      <Suspense fallback={<Loading />}>
        <AdminOrganisationsSearch />
        <Organisations isAdmin={true} filter={filter as string} />
      </Suspense>
    </main>
  );
}
