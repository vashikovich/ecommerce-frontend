"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function UseEmailButton() {
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");

  return (
    <Link
      href={`/user/login/email${returnUrl ? `?returnUrl=${returnUrl}` : ""}`}
    >
      <p className="mb-8 text-blue-900 font-bold">
        Sign in using email instead
      </p>
    </Link>
  );
}
