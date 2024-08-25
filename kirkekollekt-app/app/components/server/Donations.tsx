import {
  fetchAllDonations,
  fetchAllGroupedDonations,
  fetchDonatorById,
} from "@/app/serverActions/donations";
import { fetchOrgansationById } from "@/app/serverActions/organisations";
import { DonationLogDto } from "@/lib/types";

export default async function DonationsLog() {
  const donations = await fetchAllGroupedDonations();

  if (!donations || donations.length === 0)
    return <div>no donations yet..</div>;

  return (
    <div className="flex flex-col gap-4">
      {donations.map((item) => (
        <div
          className="flex flex-col gap-4 border-2 border-gray-200 p-4"
          key={item.donatorId}
        >
          <Donator id={item.donatorId || ""} />
          <Donation donation={item} />
        </div>
      ))}
    </div>
  );
}

const Donator = async ({ id }: { id: string }) => {
  const donator = await fetchDonatorById(id);

  if (!donator) return null;

  return (
    <div className="flex gap-2">
      <span>{donator.name}</span> -<span>{donator.email}</span>
    </div>
  );
};

const Donation = async ({ donation }: { donation: DonationLogDto }) => {
  const { organisationId, dates } = donation;

  const organisation = await fetchOrgansationById(organisationId);

  return (
    <div className="flex flex-col gap-2">
      <span>{organisation?.name} will get donation in</span>
      <ul>
        {dates.map((date, index) => (
          <li key={index}>{date.toLocaleString("nb")}</li>
        ))}
      </ul>
    </div>
  );
};
