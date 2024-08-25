"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast, useToast } from "@/components/ui/use-toast";

type ParsedObject = {
  description: string;
  urls: { url: string; source: string }[];
};

const parseText = (input: string): ParsedObject[] => {
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
      if (trimmedLine.includes("youtube")) {
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

export default function Uploader() {
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ link, description });

    const parsedObject = parseText(description);
    console.log({ parsedObject });

    // try {
    //   const response = await fetch("/api/upload-link", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ link, description }),
    //   });

    //   if (response.ok) {
    //     toast({
    //       title: "Success",
    //       description: "Link and description uploaded successfully!",
    //     });
    //     setLink("");
    //     setDescription("");
    //   } else {
    //     throw new Error("Failed to upload");
    //   }
    // } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "Failed to upload link and description. Please try again.",
    //     variant: "destructive",
    //   });
    // }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Upload Link and Description</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="link"
            className="block text-sm font-medium text-gray-700"
          >
            Link
          </label>
          <Input
            type="url"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
            placeholder="https://example.com"
            className="mt-1"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Enter a description for the link"
            className="mt-1"
          />
        </div>
        <Button type="submit">Upload</Button>
      </form>
    </div>
  );
}
