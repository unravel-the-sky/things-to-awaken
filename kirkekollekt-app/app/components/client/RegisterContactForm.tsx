import { registerDonation } from "@/app/serverActions/donations";
import useDonationStore from "@/app/store/donationStore";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DonationDto } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactSchema = z.object({
  contactName: z.string().min(2, {
    message: "Vennligst fyll in navnet",
  }),
  contactEmail: z.string().email({ message: "gyldig e-post addresse" }),
});

export default function RegisterContactForm({
  onLoading,
  onError,
  onSuccess,
}: {
  onLoading: (state: boolean) => void;
  onError: (isError: boolean) => void;
  onSuccess: () => void;
}) {
  const donationStore = useDonationStore();
  const { donations } = donationStore;

  const [isError, setIsError] = useState(false);

  const contactForm = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      contactName: "",
      contactEmail: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof contactSchema>) => {
    onLoading(true);
    const donationObject: DonationDto = {
      donatorName: values.contactName,
      donatorEmail: values.contactEmail,
      donation: donations,
    };

    try {
      const res = await registerDonation(donationObject);
      if (res?.success) onSuccess();
    } catch (err) {
      console.log("error happened and received from backend: ", err);
      onError(true);
    } finally {
      onLoading(false);
    }
  };

  return (
    <div>
      {isError ? (
        <div>Oups did not work out well</div>
      ) : (
        <Form {...contactForm}>
          <form
            onSubmit={contactForm.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <span>Please fill in your contact info here</span>
            <div className="flex flex-col gap-4">
              <FormField
                control={contactForm.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kontakt navn</FormLabel>
                    <FormControl>
                      <Input placeholder="Ditt navn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={contactForm.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kontakt e-post addresse</FormLabel>
                    <FormControl>
                      <Input placeholder="E-post addresse" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" variant={"orange"}>
              Send
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
