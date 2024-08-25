"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OrganisationDto } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

const getLinkTexts = (orgName: string): string[] => {
  return [
    `Finn ut mer om ${orgName} her`,
    `Last ned ${orgName}s offersøknad her`,
  ];
};

export default function OrganisationDialog({
  org,
  isOpen,
  onClose,
}: {
  org: OrganisationDto;
  isOpen: boolean;
  onClose: (data: any) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[200px] lg:w-[50%] md:w-[70%] sm:w-[100%] max-h-dvh">
        <ScrollArea className="max-h-dvh">
          <DialogHeader className="pb-4">
            <DialogTitle>{org.name}</DialogTitle>
          </DialogHeader>
          <div className="flex gap-4 h-[250px] items-center w-full justify-between">
            <div className="w-[40%]">
              <Image
                src={org.image}
                width={300}
                height={150}
                alt="org image"
                className="w-full object-cover"
              />
            </div>
            <OrganisationLinks org={org} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export const OrganisationLinks = ({ org }: { org: OrganisationDto }) => {
  return (
    <div className="flex flex-col gap-2">
      {org.links.map((item, index) => (
        <Link href={item} key={index} target="_blank">
          {<span>{getLinkTexts(org.name)[index]}</span>}
        </Link>
      ))}
    </div>
  );
};
