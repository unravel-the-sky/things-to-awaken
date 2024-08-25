"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function AdminOrganisationsSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((searchVal: string) => {
    console.log("search: ", searchVal);
    const params = new URLSearchParams(searchParams);
    if (searchVal) {
      params.set("filter", searchVal);
    } else {
      params.delete("filter");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 10);

  return (
    <form className="w-full">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search orgs..."
          className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get("filter")?.toString()}
        />
      </div>
    </form>
  );
}
