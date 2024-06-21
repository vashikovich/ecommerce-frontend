"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function UseProviderButton() {
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");

  return (
    <Link href={`/user/login${returnUrl ? `?returnUrl=${returnUrl}` : ""}`}>
      <p className="mb-8 text-blue-900 font-bold">Sign in using providers</p>
    </Link>
  );
}
