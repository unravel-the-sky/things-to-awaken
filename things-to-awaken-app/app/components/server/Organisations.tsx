import { fetchOrganisationsDummy } from "@/app/serverActions/organisations";
import {
  filterAllOrgansations,
  getAllOrganisations,
} from "@/prisma/databaseActions";
import { AdminOrganisationsList } from "../client/AdminOrganisationsList";
import OrganisationCardWrapper from "../client/OrganisationCardWrapper";
import OrganisationCard from "./OrganisationCard";

export default async function Organisations({
  isAdmin = false,
  filter = "",
}: {
  isAdmin?: boolean;
  filter?: string;
}) {
  const organisations = await fetchOrganisationsDummy();
  const test = filter
    ? await filterAllOrgansations(filter)
    : await getAllOrganisations();

  const allOrgs = [...test, ...organisations];

  if (!allOrgs) return null;

  if (isAdmin)
    return (
      <div className="flex flex-col gap-4">
        <AdminOrganisationsList orgs={allOrgs} />
      </div>
    );

  return (
    <div className="w-full max-w-[1400px] grid gap-6 grid-cols-orgs-public justify-center">
      {allOrgs.map((item) => (
        <OrganisationCardWrapper key={item.id} org={item}>
          <OrganisationCard org={item} />
        </OrganisationCardWrapper>
      ))}
    </div>
  );
}
