"use client";

import { submitForm } from "@/app/serverActions/fileUpload";
import { deleteOrganisationById } from "@/app/serverActions/organisations";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { Skeleton } from "@/components/ui/skeleton";
import { OrganisationDto } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "@radix-ui/react-dialog";
import { Save, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  orgName: z.string().min(2, {
    message: "Organisasjonsnavnet må være på minst 2 tegn.",
  }),
  orgEmail: z.string().email({ message: "Ugyldig e-post addresse" }),
  linkToOrg: z.string().min(2, {
    message: "Lenke til organisajonen må være på minst 2 tegn.",
  }),
  orgLogo: z
    .instanceof(File)
    .refine(
      (file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
      "Kun .jpg, .jpeg, .png and .webp formatter er støttet."
    )
    .or(z.string().min(1, { message: "lol" })),
  orgDocument: z.instanceof(File).or(z.string().min(1, { message: "lol" })),
});

export default function AddOrEditOrganisationForm({
  onSuccess,
  org,
}: {
  onSuccess: () => void;
  org?: OrganisationDto;
}) {
  const isEditMode = !!org;

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orgName: org?.name ?? "",
      orgEmail: org?.emails[0] ?? "",
      linkToOrg: org?.links[0] ?? "",
      orgLogo: org?.image ?? undefined,
      orgDocument: org?.links[1] ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("values are: ", values);

    startTransition(async () => {
      const formData = new FormData();
      formData.append("orgName", values.orgName);
      formData.append("orgEmail", values.orgEmail);
      formData.append("linkToOrg", values.linkToOrg);
      formData.append("orgLogo", values.orgLogo);
      formData.append("orgDocument", values.orgDocument);

      const res = await submitForm(
        formData,
        org?.id || undefined,
        org?.documentFileKey
      );

      if (res) onSuccess();
    });
  };

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = () => {
    startTransition(async () => {
      if (org?.id) await deleteOrganisationById(org.id);

      onSuccess();
    });
  };

  return (
    <>
      <Form {...form}>
        <div className="flex flex-col gap-4 w-full h-[600px]">
          {isPending ? (
            <div className="space-y-2 flex flex-col h-full items-center justify-center">
              <Skeleton className="h-4 w-[60%]" />
              <Skeleton className="h-4 w-[60%]" />
              <Skeleton className="h-4 w-[60%]" />
              <Skeleton className="h-4 w-[60%]" />
              <Skeleton className="h-4 w-[60%]" />
            </div>
          ) : (
            <>
              <p>Her kan du legge til ny orginasjon.</p>

              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="orgName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organisasjonsnavn</FormLabel>
                      <FormControl>
                        <Input placeholder="Org navn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4 w-full">
                  {isEditMode && org.image && (
                    <Image
                      src={org.image}
                      width={120}
                      height={60}
                      alt={"org"}
                    />
                  )}
                  <FormField
                    control={form.control}
                    name="orgLogo"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel htmlFor="orgLogo">
                          Organisajonslogo
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="logo"
                            type="file"
                            {...fieldProps}
                            accept="image/*"
                            onChange={(event) =>
                              onChange(
                                event.target.files && event.target.files[0]
                              )
                            }
                            className="h-8"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="orgEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Organisasjons kontakt e-post addresse
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Org e-post" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="linkToOrg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lenke til organisasjon</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Lenke til organisasjon"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col gap-2 w-full">
                  {isEditMode && org.links[1] && (
                    <div>
                      <p>
                        Her er{" "}
                        <Link href={org.links[1]} target="_blank">
                          <span>offersøknad</span>
                        </Link>{" "}
                        til organisajon, last opp en ny dokument hvis det ikke
                        er riktig
                      </p>
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name="orgDocument"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel htmlFor="orgDocument">
                          Offersøknad dokument (PDF only)
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="orgDocument"
                            type="file"
                            {...fieldProps}
                            accept="application/pdf"
                            onChange={(event) =>
                              onChange(
                                event.target.files && event.target.files[0]
                              )
                            }
                            className="h-8"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="w-fit flex gap-2">
                    <Save className="h-4 w-4" />
                    {isEditMode ? "Save" : "Register"}
                  </Button>
                  {isEditMode && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant={"destructive"}
                          className="w-fit flex gap-2"
                          onClick={() => setShowConfirmation(true)}
                        >
                          <Trash2 className="h-4 w-4" />
                          Slett organisajon
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Er du sikker?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete this organisation from the database
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDelete}>
                            Slett
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </Form>
      {showConfirmation && <Dialog></Dialog>}
    </>
  );
}
