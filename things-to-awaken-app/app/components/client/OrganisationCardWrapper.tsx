"use client";

import { SyntheticEvent, useState } from "react";
import OrganisationDialog from "./OrganisationDialog";
import { OrganisationDto } from "@/lib/types";

export default function OrganisationCardWrapper({
  org,
  children,
}: {
  org: OrganisationDto;
  children: React.ReactNode;
}) {
  const [showDialog, setShowDialog] = useState(false);

  const handleShowDialog = (event: SyntheticEvent<EventTarget> | boolean) => {
    if (typeof event !== "boolean") event.stopPropagation();
    setShowDialog(!showDialog);
  };

  return (
    <>
      <div onClick={handleShowDialog} className="cursor-pointer">
        {children}
      </div>
      <OrganisationDialog
        isOpen={showDialog}
        onClose={handleShowDialog}
        org={org}
      />
    </>
  );
}
