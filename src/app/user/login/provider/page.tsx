"use client";
export const dynamic = "force-dynamic";

import { AuthDispatchContext } from "@/app/components/providers/AuthProvider";
import { AuthResponse } from "@/lib/definitions";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";

export default function LoginProvider() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const authDispatch = useContext(AuthDispatchContext);

  const code = searchParams.get("code") ?? "";

  useEffect(() => {
    const str = Buffer.from(code, "base64").toString("ascii");
    const auth = JSON.parse(str) as AuthResponse;
    authDispatch({
      type: "SAVE_AUTH",
      payload: {
        user: auth.user,
        accessToken: auth.tokenInfo.accessToken,
        refreshToken: auth.tokenInfo.refreshToken,
      },
    });
    router.push("/");
  }, [authDispatch, code, router]);

  return null;
}
