"use client";

import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import AtcButton from "./AtcButton";

export default function AtcButtonWrapper(props: any) {
  const auth = useContext(AuthContext);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className="h-10"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      {auth.user ? (
        <AtcButton {...props} />
      ) : (
        <div
          className="flex items-center justify-center font-bold focus:outline-none rounded px-4 py-1 text-md border-blue-900 border-2 text-blue-900 hover:bg-blue-900 hover:text-white cursor-pointer h-full"
          onClick={(e) => router.push("/user/login?returnUrl=" + pathname)}
        >
          <p>Buy</p>
        </div>
      )}
    </div>
  );
}
