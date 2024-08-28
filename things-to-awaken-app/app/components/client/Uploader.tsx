"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast, useToast } from "@/components/ui/use-toast";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createPost } from "@/app/serverActions/posts";
import { useRouter } from "next/navigation";

type ParsedObject = {
  description: string;
  urls: { url: string; source: string }[];
};

const parseRawText = (input: string): ParsedObject[] => {
  const lines = input.split(/\r?\n/).filter((line) => line.trim() !== "");

  const parsedArray: ParsedObject[] = [];
  let currentDescription: string | null = null;
  let currentUrls: { url: string; source: string }[] = [];

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Check if the line is a URL or a description
    if (trimmedLine.startsWith("http")) {
      // It's a URL
      let source = "";
      if (trimmedLine.includes("youtube") || trimmedLine.includes("youtu.be")) {
        source = "youtube";
      } else if (trimmedLine.includes("instagram")) {
        source = "instagram";
      } else {
        source = "unknown";
      }

      currentUrls.push({ url: trimmedLine, source });
    } else {
      // It's a description
      if (currentDescription) {
        // Push the previous description and URLs to the parsed array
        parsedArray.push({
          description: currentDescription,
          urls: currentUrls,
        });
      }

      // Start a new description
      currentDescription = trimmedLine;
      currentUrls = [];
    }
  }

  // Push the last description and URLs (if any)
  if (currentDescription) {
    parsedArray.push({
      description: currentDescription,
      urls: currentUrls,
    });
  }

  return parsedArray;
};

const uploadSchema = z.object({
  url: z.string().url({ message: "not a url" }),
  description: z.string(),
  batch: z.string(),
});

const uploadSchemaLeft = z.object({
  url: z.string().url({ message: "not a url" }),
  description: z.string().min(2, { message: "come on write something" }),
});

const uploadSchemaRight = z.object({
  batch: z.string().min(2, { message: "come on write something" }),
});

const defaultValues = {
  description: "",
  url: "",
  batch: "",
};

export default function Uploader() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [selectedType, setSelectedType] = useState<"single" | "multiple">(
    "single"
  );
  const [isDone, setIsDone] = useState(true);

  const uploadForm = useForm<z.infer<typeof uploadSchema>>({
    resolver: zodResolver(
      selectedType === "single" ? uploadSchemaLeft : uploadSchemaRight
    ),
    defaultValues,
  });

  const { control, reset } = uploadForm;

  const onSubmit = (values: z.infer<typeof uploadSchema>) => {
    console.log({ values });

    const { batch, url, description } = values;

    if (batch) {
      // this is the batch, so get the parsed version
      const parsedText = parseRawText(batch);
      console.log("here, i parsed it: ", parsedText);

      // send this to backend as batch
      console.log("sending multiple entry batch to backend..");
      alert("this is out of scope for now");
      return;
    }
    // this is vanlig post, send as url and description
    console.log("sending single entry to backend..");
    startTransition(async () => {
      try {
        const res = await createPost(url, description);
        console.log("whao resposne: ", res);
        toast({
          title: "welldone",
          description: "your post is uploaded, thank you.",
        });
      } catch (err) {
        toast({
          title: "oups",
          description: `error happened: ${err}`,
        });
      } finally {
        setIsDone(true);
      }
    });
  };

  const handleReset = () => {
    reset();
    setIsDone(false);
  };

  if (isDone) {
    return (
      <div className="flex flex-col gap-4">
        <span> your post is uploaded. thank you.</span>
        <p>want to post something else?</p>
        <div className="flex gap-2 w-full justify-center">
          <Button
            variant={"blue"}
            className="flex-grow-[0.5]"
            onClick={handleReset}
          >
            yes
          </Button>
          <Button
            variant={"default"}
            className="flex-grow-[0.5]"
            onClick={() => router.push("./")}
          >
            no
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold p-4">Upload link and description</h1>
      {isPending ? (
        <div>loading...</div>
      ) : (
        <Tabs defaultValue="single" className="max-w-[500px] md:w-[500px]">
          <TabsList className="grid w-full grid-cols-2 bg-mainBgColor">
            <TabsTrigger
              value="single"
              onClick={() => setSelectedType("single")}
            >
              Single entry
            </TabsTrigger>
            <TabsTrigger
              value="multiple"
              onClick={() => setSelectedType("multiple")}
            >
              Multiple entry
            </TabsTrigger>
          </TabsList>
          <Form {...uploadForm}>
            <form
              onSubmit={uploadForm.handleSubmit(onSubmit)}
              className="p-2 rounded-md"
            >
              <TabsContent value="single" className="min-h-[200px] space-y-4">
                <FormField
                  control={control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Url</FormLabel>
                      <FormControl className="bg-white">
                        <Input placeholder="Url here" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description for the url</FormLabel>
                      <FormControl className="bg-white">
                        <Input
                          placeholder="Write what you found interesting in this one"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="multiple" className="min-h-[200px]">
                <FormField
                  control={control}
                  name="batch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description for the batch</FormLabel>
                      <FormControl className="bg-white">
                        <Textarea
                          placeholder="Paste all in this one"
                          {...field}
                          className="h-max"
                          rows={6}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <Button type="submit" variant={"blue"}>
                Upload
              </Button>
            </form>
          </Form>
        </Tabs>
      )}
    </div>
  );
}
