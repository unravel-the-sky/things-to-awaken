"use client";

import { useState, SyntheticEvent } from "react";
import GenericDialog from "../shared/GenericDialog";
import AddOrEditOrganisationForm from "./AddOrEditOrganisationForm";
import { useToast } from "@/components/ui/use-toast";

export default function AddNewOrganisationButton() {
  const [showDialog, setShowDialog] = useState(false);

  const handleShowDialog = (event: SyntheticEvent<EventTarget> | boolean) => {
    if (typeof event !== "boolean") event.stopPropagation();
    setShowDialog(!showDialog);
  };

  const { toast } = useToast();

  const handleSuccess = () => {
    setShowDialog(false);

    // show toaster
    toast({
      title: "Opprettet ny organisajon!",
    });
  };

  return (
    <>
      <div
        className="flex size-14 rounded-full bg-slate-200 cursor-pointer hover:bg-slate-300 justify-center items-center"
        onClick={handleShowDialog}
      >
        <span className="text-lg">Add</span>
      </div>
      <GenericDialog isOpen={showDialog} onClose={handleShowDialog}>
        <AddOrEditOrganisationForm onSuccess={handleSuccess} />
      </GenericDialog>
    </>
  );
}
