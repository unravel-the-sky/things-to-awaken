import { fetchOrgansationById } from "@/app/serverActions/organisations";
import useDonationStore from "@/app/store/donationStore";
import { Card, CardContent } from "@/components/ui/card";
import { useCallback, useEffect, useState } from "react";

export const RegisteredDatesForOrgs = () => {
  const donationStore = useDonationStore();
  const { donations } = donationStore;

  return (
    <div className="flex flex-col gap-4 pt-4">
      Registered dates
      {Object.keys(donations).map((orgId, index) => (
        <RegisteredDatesList key={index} orgId={orgId} />
      ))}
    </div>
  );
};

export const RegisteredDatesList = ({ orgId }: { orgId: string }) => {
  const [registeredDates, setRegisteredDates] = useState<Date[]>([]);
  const [orgName, setOrgname] = useState("");

  const donationStore = useDonationStore();
  const { donations } = donationStore;

  useEffect(() => {
    if (donations && donations[orgId]) {
      const { dates } = donations[orgId];
      setRegisteredDates(dates);
    }
  }, [donations, orgId]);

  const getOrgName = useCallback(async () => {
    const org = await fetchOrgansationById(orgId);
    const name = org?.name ?? "";
    setOrgname(name);
  }, [orgId]);

  useEffect(() => {
    getOrgName();
  }, [getOrgName]);

  return (
    <div className="flex flex-col gap-2">
      {orgName}:
      {registeredDates.map((item, index) => (
        <Card key={index}>
          <CardContent className="flex justify-between items-center py-2 px-4">
            <p>{item.toDateString()}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
