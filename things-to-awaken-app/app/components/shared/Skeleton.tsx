import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton({ numLines }: { numLines: number }) {
  const lol = "asdf";
  return (
    <div className="space-y-4 flex flex-col h-full items-center justify-center">
      {Array(numLines)
        .fill(true)
        .map((item, index) => (
          <Skeleton key={index} className="h-4 w-[60%]" />
        ))}
    </div>
  );
}
