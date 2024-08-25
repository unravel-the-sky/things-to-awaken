"use client";

import useDonationStore from "@/app/store/donationStore";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { OrganisationDto } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CalendarIcon, Cross1Icon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import GenericDialog from "../shared/GenericDialog";

export default function RegisterDonationBox({ org }: { org: OrganisationDto }) {
  const [showEditOrgDialog, setShowEditOrgDialog] = useState(false);

  const handleShowDialog = (event: SyntheticEvent<EventTarget> | boolean) => {
    if (typeof event !== "boolean") event.stopPropagation();
    setShowEditOrgDialog(!showEditOrgDialog);
  };

  const handleSuccess = () => {
    setShowEditOrgDialog(false);
  };

  const donationStore = useDonationStore();
  const { donations } = donationStore;

  const donationCountForOrg = useMemo(() => {
    return (
      org.id &&
      donations &&
      donations[org.id] &&
      donations[org.id || ""].dates.length > 0 &&
      donations[org.id || ""].dates.length
    );
  }, [donations, org.id]);

  return (
    <>
      <div
        className="absolute right-0 cursor-pointer h-full flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 w-24"
        onClick={handleShowDialog}
      >
        <p>Register</p>
        {donationCountForOrg && <p>({donationCountForOrg})</p>}
      </div>
      <GenericDialog
        isOpen={showEditOrgDialog}
        onClose={handleShowDialog}
        preventInteractOutside
      >
        <RegisterDonationToOrganisationForm
          orgId={org.id}
          onSave={handleSuccess}
        />
      </GenericDialog>
    </>
  );
}

export const RegisterDonationToOrganisationForm = ({
  orgId,
  onSave,
}: {
  orgId: string | undefined;
  onSave: () => void;
}) => {
  const [registeredDates, setRegisteredDates] = useState<Date[]>([]);

  const donationStore = useDonationStore();
  const { donations, setDonation, removeDonation } = donationStore;

  useEffect(() => {
    if (donations && orgId && donations[orgId]) {
      const { dates } = donations[orgId];
      setRegisteredDates(dates);
    }
  }, [donations, orgId]);

  const handleSelectedDate = (date: Date) => {
    setRegisteredDates([...registeredDates, date]);
  };

  const handleSaveDates = async () => {
    if (orgId) {
      if (registeredDates.length === 0) {
        removeDonation(orgId);
      } else {
        setDonation({
          organisationId: orgId,
          dates: registeredDates,
        });
      }
    }

    onSave();
  };

  const handleRemoveDate = (removeIndex: number) => {
    setRegisteredDates(
      registeredDates.filter((item, index) => {
        return index === removeIndex ? null : item;
      })
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      Her kan du registrere donasjon til orgnasjon
      <div className="grid grid-cols-2 gap-4">
        <RegisterDate onSelectDate={handleSelectedDate} />
        {registeredDates.length > 0 ? (
          <div className="flex flex-col gap-2">
            Registerert datoer:
            {registeredDates.map((item, index) => (
              <Card key={index}>
                <CardContent className="flex justify-between items-center py-2 px-4">
                  <p>{item.toDateString()}</p>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleRemoveDate(index)}
                  >
                    <Cross1Icon />
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button
              variant={"orange"}
              className="w-fit"
              onClick={handleSaveDates}
            >
              Save
            </Button>
          </div>
        ) : (
          <div>Pick a date to register donation..</div>
        )}
      </div>
    </div>
  );
};

const RegisterDate = ({
  onSelectDate,
}: {
  onSelectDate: (date: Date) => void;
}) => {
  const [date, setDate] = useState<Date>();

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleSelectDate = (date: Date | undefined) => {
    setDate(date);
    if (date) onSelectDate(date);
    setIsCalendarOpen(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <span>Velg dato</span>
      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger asChild>
          <div id="yo">
            <Button
              variant={"outline"}
              className={cn(
                "w-[320px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Dato</span>}
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelectDate}
            initialFocus
            locale={nb}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
