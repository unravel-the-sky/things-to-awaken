import { Card, CardContent } from "@/components/ui/card";
import { OrganisationDto } from "@/lib/types";
import Image from "next/image";
import { OrganisationLinks } from "../client/OrganisationDialog";

export const OrganisationElement = ({
  org,
  children,
}: {
  org: OrganisationDto;
  children?: React.ReactNode;
}) => {
  const imageSrc = new URL(org.image).toString();

  return (
    <Card className={`border-gray-200 border rounded-md min-w-[500px]`}>
      <CardContent className="flex justify-between relative">
        <div className="flex gap-4 pt-4 mr-24">
          <div className="w-[50px] h-[50px]">
            <Image
              src={imageSrc}
              alt="org image"
              className="w-full h-full object-cover"
              width={200}
              height={140}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h4>{org.name}</h4>
          </div>
        </div>

        {children}
      </CardContent>
    </Card>
  );
};
