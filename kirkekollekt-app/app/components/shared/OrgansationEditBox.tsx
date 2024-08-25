"use client";

import { useToast } from "@/components/ui/use-toast";
import { OrganisationDto } from "@/lib/types";
import { useState, SyntheticEvent } from "react";
import AddOrEditOrganisationForm from "../client/AddOrEditOrganisationForm";
import GenericDialog from "./GenericDialog";

export const EditBox = ({ org }: { org: OrganisationDto }) => {
  const [showEditOrgDialog, setShowEditOrgDialog] = useState(false);

  const handleShowDialog = (event: SyntheticEvent<EventTarget> | boolean) => {
    if (typeof event !== "boolean") event.stopPropagation();
    setShowEditOrgDialog(!showEditOrgDialog);
  };

  const { toast } = useToast();

  const handleSuccess = () => {
    setShowEditOrgDialog(false);

    // show toaster
    toast({
      title: "Lagret endringene i organisajonen!",
    });
  };

  return (
    <>
      <div
        className="absolute right-0 cursor-pointer h-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 w-24"
        onClick={handleShowDialog}
      >
        Redigere
      </div>
      <GenericDialog isOpen={showEditOrgDialog} onClose={handleShowDialog}>
        <AddOrEditOrganisationForm org={org} onSuccess={handleSuccess} />
      </GenericDialog>
    </>
  );
};
