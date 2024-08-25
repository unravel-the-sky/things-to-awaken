import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { OrganisationDto } from "@/lib/types";
import Image from "next/image";

export default function OrganisationCard({ org }: { org: OrganisationDto }) {
  const imageSrc = new URL(org.image).toString();

  return (
    <Card className={`aspect-auto hover:shadow-lg`}>
      <CardContent className="h-[150px] flex justify-center items-center overflow-hidden">
        <div className="h-[120px]">
          <Image
            src={imageSrc}
            alt="org image"
            className="object-cover h-full"
            width={150}
            height={100}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-center items-center rounded-b-xl shadow-md bg-gray-50 p-4 text-sm capitalize">
        <span>{org.name}</span>
      </CardFooter>
    </Card>
  );
}
