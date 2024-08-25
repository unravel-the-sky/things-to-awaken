import { fetchOrganisationsDummy } from "@/app/serverActions/organisations";
import {
  filterAllOrgansations,
  getAllOrganisations,
} from "@/prisma/databaseActions";
import RegisterDonationWrapper from "../client/RegisterDonationWrapper";

export default async function RegisterDonation({
  filter,
}: {
  filter?: string;
}) {
  const organisations = filter
    ? await filterAllOrgansations(filter)
    : await getAllOrganisations();

  if (!organisations) return null;

  return <RegisterDonationWrapper orgs={organisations} />;
}
