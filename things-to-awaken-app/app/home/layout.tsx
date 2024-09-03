import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { House, Infinity, NotebookPen } from "lucide-react";
import Link from "next/link";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="my-24 w-full">
      <div className="fixed flex bottom-0 space-x-3 gap-8 justify-center w-full py-4 bg-[#f3f3f3] z-20 shadow-[0px_-4px_12px_0px_#00000024]">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link href="/home">
                <House />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>home</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
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
