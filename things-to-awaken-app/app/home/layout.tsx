import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Infinity, NotebookPen } from "lucide-react";
import Link from "next/link";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="my-24 w-full">
      <div className="fixed flex bottom-0 gap-8 justify-center w-full py-4 bg-[#f3f3f3] z-10 shadow-inner">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {" "}
              <Link href="/home/zen">
                <Infinity />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>gratitude</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              {" "}
              <Link href="/home/upload" className="flex gap-4">
                <NotebookPen />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>upload reflection</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="px-4">{children}</div>
    </div>
  );
}
