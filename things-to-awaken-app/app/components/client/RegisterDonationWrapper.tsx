"use client";

import useDonationStore from "@/app/store/donationStore";
import { Button } from "@/components/ui/button";
import { OrganisationDto } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { OrganisationElement } from "../shared/OrganisationElement";
import RegisterDonationBox from "./RegisterDonationBox";
import RegisterContactForm from "./RegisterContactForm";
import { RegisteredDatesForOrgs } from "./RegisteredDatesList";
import LoadingSkeleton from "../shared/Skeleton";
import { RegisterOrganisationsList } from "./RegisterOrganisationsList";
import AdminOrganisationsSearch from "./AdminOrganisationsSearch";

type RegistrationStep = {
  label: string;
  name: "register" | "contact" | "complete";
};

const registrationSteps: RegistrationStep[] = [
  {
    name: "register",
    label: "Register donations for the organisations",
  },
  {
    name: "contact",
    label: "Fill in contact info",
  },
  {
    name: "complete",
    label: "Done!",
  },
];

export default function RegisterDonationWrapper({
  orgs,
}: {
  orgs: OrganisationDto[];
}) {
  const donationStore = useDonationStore();
  const { donations } = donationStore;

  const count = Object.keys(donations).length;

  const [stepIndex, setStepIndex] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const router = useRouter();

  const handleNextStep = () => {
    console.log("yello next step");
    if (stepIndex === registrationSteps.length - 1) {
      router.push("/");
      return;
    }
    setStepIndex(stepIndex + 1);
  };

  const handlePrevStep = () => {
    console.log("yello next step");
    if (stepIndex === registrationSteps.length - 1) {
      router.push("/");
      return;
    }
    setStepIndex(stepIndex - 1);
  };

  const currentStep = useMemo(() => {
    return registrationSteps[stepIndex];
  }, [stepIndex]);

  const handleSuccess = () => {
    // handle success here, omg success? handling it? what shall i do omg so much pressure.
    handleNextStep();
  };

  const handleLoading = (state: boolean) => {
    setIsLoading(state);
  };
  const handleError = (isError: boolean) => {
    setIsError(true);
  };

  return isLoading ? (
    <LoadingSkeleton numLines={4} />
  ) : isError ? (
    <div>oups error</div>
  ) : (
    <>
      {count > 0 && (
        <Steps
          step={stepIndex}
          onNext={handleNextStep}
          onPrev={handlePrevStep}
        />
      )}
      {currentStep.name === "register" && (
        <div className="flex flex-col gap-4">
          <AdminOrganisationsSearch />
          <RegisterOrganisationsList orgs={orgs} />
        </div>
      )}

      {currentStep.name === "contact" && (
        <div className="flex flex-col gap-4 divide-y">
          <RegisterContactForm
            onSuccess={handleSuccess}
            onError={handleError}
            onLoading={handleLoading}
          />
          <RegisteredDatesForOrgs />
        </div>
      )}
      {currentStep.name === "complete" && (
        <div>Donation is registered, takk!</div>
      )}
    </>
  );
}

const Steps = ({
  step,
  onNext,
  onPrev,
}: {
  step: number;
  onNext: () => void;
  onPrev: () => void;
}) => {
  return step === 0 ? (
    <div>
      <Button variant={"orange"} onClick={onNext}>
        Neste
      </Button>
    </div>
  ) : (
    <div>
      <Button variant={"orange"} onClick={onPrev}>
        Tilbake
      </Button>
    </div>
  );
};
