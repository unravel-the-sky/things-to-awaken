"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function GenericDialog({
  isOpen,
  onClose,
  children,
  preventInteractOutside = false,
}: {
  isOpen: boolean;
  onClose: (data: any) => void;
  children: React.ReactNode;
  preventInteractOutside?: boolean;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="w-[50%] min-w-[200px] min-h-[300px] flex flex-col justify-start max-h-dvh"
        onInteractOutside={(e) => {
          preventInteractOutside && e.preventDefault();
        }}
      >
        <DialogTitle hidden={true}>Edit box</DialogTitle>
        <ScrollArea className="max-h-dvh">{children}</ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
