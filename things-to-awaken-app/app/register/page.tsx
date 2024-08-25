import { Suspense } from "react";
import Loading from "../loading";
import RegisterDonation from "../components/server/RegisterDonation";

export default function RegisterPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const filter = searchParams["filter"];

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col gap-4 w-[50%]" id="register">
        <RegisterDonation filter={filter as string} />
      </div>
    </Suspense>
  );
}
