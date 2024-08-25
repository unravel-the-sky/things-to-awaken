"use client";

import { sendTestMail } from "@/app/serverActions/sendMail";
import { DEFAULT_MAILSENDER_MAIL } from "@/app/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactSchema = z.object({
  receiver: z.string().email({ message: "gyldig e-post addresse" }),
  content: z.string().min(2, { message: "come on write something" }),
});

export default function SendTestMail() {
  const [isPending, startTransition] = useTransition();

  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    setIsSent(false);
  }, []);

  const sendMailForm = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      receiver: "",
      content: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof contactSchema>) => {
    startTransition(async () => {
      try {
        await sendTestMail(values.receiver, values.content);
        setIsSent(true);
      } catch (err) {
        setIsSent(false);
      }
    });
  };

  return (
    <Dialog onOpenChange={() => setIsSent(false)}>
      <DialogTrigger asChild>
        <Button variant="outline">Send test mail</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send test mail</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...sendMailForm}>
            {isPending ? (
              <div>Sending</div>
            ) : isSent ? (
              <div>Mail sent!</div>
            ) : (
              <form
                onSubmit={sendMailForm.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                <div className="flex flex-col gap-4">
                  <FormItem>
                    <FormLabel>Sender e-post addresse</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="E-post addresse"
                        disabled
                        value={DEFAULT_MAILSENDER_MAIL}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <FormField
                    control={sendMailForm.control}
                    name="receiver"
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
                  <FormField
                    control={sendMailForm.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Input placeholder="write something" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" variant={"orange"}>
                  Send test mail
                </Button>
              </form>
            )}
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
