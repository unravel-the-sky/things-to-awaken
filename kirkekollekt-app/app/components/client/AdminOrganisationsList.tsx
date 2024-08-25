"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { OrganisationDto } from "@/lib/types";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import GenericDialog from "../shared/GenericDialog";
import AddOrEditOrganisationForm from "./AddOrEditOrganisationForm";

export function AdminOrganisationsList({ orgs }: { orgs: OrganisationDto[] }) {
  const [showEditOrgDialog, setShowEditOrgDialog] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<OrganisationDto | null>();

  const handleToggleDialog = (
    org: OrganisationDto | null,
    event: SyntheticEvent<EventTarget> | boolean
  ) => {
    setSelectedOrg(org);
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
      <Table>
        <TableCaption>Organisations list</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Organisajons Navn</TableHead>
            <TableHead>Lenke til organisajon</TableHead>
            <TableHead>Offersøknad til organisajon</TableHead>
            <TableHead className="text-right">
              Kontakt info til organisajon
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orgs.map((org) => (
            <TableRow
              key={org.id}
              className="cursor-pointer hover:bg-slate-100 h-12"
              onClick={(event) => handleToggleDialog(org, event)}
            >
              <TableCell className="font-medium">{org.name}</TableCell>
              <TableCell>{org.links[0]}</TableCell>
              <TableCell>
                <Link href={org.links[1]} target="_blank">
                  Offersøknad
                </Link>
              </TableCell>
              <TableCell className="text-right">{org.emails[0]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow></TableRow>
        </TableFooter>
      </Table>
      <GenericDialog
        isOpen={showEditOrgDialog}
        onClose={(event) => handleToggleDialog(null, event)}
      >
        {selectedOrg && (
          <AddOrEditOrganisationForm
            org={selectedOrg}
            onSuccess={handleSuccess}
          />
        )}
      </GenericDialog>
    </>
  );
}
