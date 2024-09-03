"use client";

import { createPost } from "@/app/serverActions/posts";
import Cursor from "@/app/utils/cursorHelper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import linkifyHtml from "linkify-html";
import * as linkify from "linkifyjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type ParsedPostObject = {
  description: string;
  url: string;
  source: string;
};

const parseRawText = (input: string): ParsedPostObject[] => {
  const lines = input.split(/\r?\n/).filter((line) => line.trim() !== "");

  const parsedArray: ParsedPostObject[] = [];
  let currentDescription: string | null = null;
  let currentUrl: string = "";
  let currentSource: string = "";

  //batch.replace(test[0].href.replace('http','https'), '').trim()

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

      currentUrl = trimmedLine;
      currentSource = source;
    } else {
      // It's a description
      if (currentDescription) {
        // Push the previous description and URLs to the parsed array
        parsedArray.push({
          description: currentDescription,
          url: currentUrl,
          source: currentSource,
        });
      }

      // Start a new description
      currentDescription = trimmedLine;
    }
  }

  // Push the last description and URLs (if any)
  if (currentDescription) {
    parsedArray.push({
      description: currentDescription,
      url: currentUrl,
      source: currentSource,
    });
  }

  return parsedArray;
};

const uploadSchema = z.object({
  batch: z.string(),
});

const defaultValues = {
  batch: "",
};

export default function Uploader() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [isDone, setIsDone] = useState(false);

  const uploadForm = useForm<z.infer<typeof uploadSchema>>({
    resolver: zodResolver(uploadSchema),
    defaultValues,
  });

  const { control, reset } = uploadForm;

  const onSubmit = (values: z.infer<typeof uploadSchema>) => {
    console.log({ values });

    const { batch } = values;

    if (batch) {
      // this is the batch, so get the parsed version
      const parsedText = parseRawText(batch);
      console.log("here, i parsed it: ", parsedText);

      const test = linkify.find(batch);
      console.log("linfiy result: ", test);

      // send this to backend as batch
      console.log("sending multiple entry batch to backend..");
      startTransition(async () => {
        try {
          const promises = parsedText.map(async (postItem) => {
            createPost(postItem);
          });
          await Promise.all(promises);
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
      return;
    }
  };

  const handleReset = () => {
    reset();
    setIsDone(false);
  };

  const contentEditableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === " " || event.key === "Enter") {
        convertUrlsToLinks();
      }
    };

    const contentEditableDiv = contentEditableRef.current;
    if (contentEditableDiv) {
      contentEditableDiv.addEventListener("keyup", handleKeyUp);
      // contentEditableDiv.addEventListener("paste", (e) => {
      //   e.preventDefault();
      //   const text = e.clipboardData.getData("text/plain");
      //   document.execCommand("insertHtml", false, text);
      // });
    }

    return () => {
      if (contentEditableDiv) {
        contentEditableDiv.removeEventListener("keyup", handleKeyUp);
      }
    };
  }, []);

  const stripHtml = (html: string): string => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.innerText;
  };
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  const convertUrlsToLinks = () => {
    const contentEditableDiv = contentEditableRef.current;
    if (contentEditableDiv) {
      const offset = Cursor.getCurrentCursorPosition(contentEditableDiv);

      const linkifiedVersion = linkifyHtml(contentEditableDiv.innerHTML, {});

      contentEditableDiv.innerHTML = linkifiedVersion;

      Cursor.setCurrentCursorPosition(offset, contentEditableDiv);
      contentEditableDiv.focus();
    }
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
    <div className="max-w-md mx-auto mt-10 flex flex-col gap-4 items-center">
      <h1 className="text-2xl font-bold">Upload link and description</h1>
      <Form {...uploadForm}>
        <form
          onSubmit={uploadForm.handleSubmit(onSubmit)}
          className="rounded-md flex flex-col gap-4 w-full"
        >
          {isPending ? (
            <div>loading...</div>
          ) : (
            <FormField
              control={control}
              name="batch"
              render={({ field }) => {
                // function onInputChange(e: FormEvent<HTMLElement>) {
                //   onChange((e.target as HTMLElement).textContent);
                // }
                return (
                  <FormItem>
                    <FormControl className="bg-white">
                      <Textarea
                        placeholder="what did you find out today.."
                        {...field}
                        className="h-max bg-white select-text rounded-md min-h-40 lg:w-[450px] whitespace-pre-wrap p-4 shadow-md"
                        rows={6}
                      />
                      {/* <div
                        contentEditable="true"
                        ref={contentEditableRef}
                        onInput={onInputChange}
                        data-placeholder={"what did you find out today.."}
                        className="bg-white select-text rounded-md min-h-40 w-[450px] whitespace-pre-wrap p-4 shadow-md"
                      /> */}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          )}
          <Button type="submit" variant={"blue"} className="w-fit">
            upload
          </Button>
        </form>
      </Form>
    </div>
  );
}
