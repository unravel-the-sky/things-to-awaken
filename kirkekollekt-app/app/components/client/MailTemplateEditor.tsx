"use client";

import { createMailTemplate } from "@/app/serverActions/sendMail";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useMemo, useTransition } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { z } from "zod";

const templateSchema = z.object({
  template: z.string().min(2, {
    message: "Vennligst skriv noe",
  }),
});

export default function MailTemplateEditor({
  template,
}: {
  template?: string;
}) {
  const templateForm = useForm<z.infer<typeof templateSchema>>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      template,
    },
  });

  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const handleSubmit = async (values: z.infer<typeof templateSchema>) => {
    console.log("values: ", values);
    startTransition(async () => {
      const res = await createMailTemplate(values.template);
      if (res) {
        toast({
          title: "Hurra!",
          description: "Oppdatert mail template!",
        });
      }
    });
  };

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <Form {...templateForm}>
      <form onSubmit={templateForm.handleSubmit(handleSubmit)}>
        <span>
          Here is the mail template for the automated mails to be sent
        </span>
        <div className="flex flex-col h-full gap-4">
          <div className="flex-grow">
            <FormField
              control={templateForm.control}
              name="template"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ReactQuill
                      {...field}
                      theme="snow"
                      placeholder="Skriv din melding"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            className="w-fit"
            type="submit"
            variant={"orange"}
            disabled={isPending}
          >
            Lagre
          </Button>
        </div>
      </form>
    </Form>
  );
}
