"use client";

import Input from "@/app/components/Input";
import SearchSvg from "@/../public/svg/search.svg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { KeyboardEventHandler, useCallback, useEffect, useState } from "react";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryFromParams = searchParams.get("q") ?? "";

  const [search, setSearch] = useState(queryFromParams);

  useEffect(() => {
    setSearch(queryFromParams);
  }, [queryFromParams]);

  const createQueryString = useCallback(
    (name: string, value: string | undefined | null) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value ?? "");

      return params.toString();
    },
    [searchParams]
  );

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      router.push("/search?" + createQueryString("q", search));
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <Input
        type=""
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        endAdornment={
          <div className="h-full w-6">
            <SearchSvg fill="#888888" />
          </div>
        }
        className="w-full text-black"
      />
    </div>
  );
}
