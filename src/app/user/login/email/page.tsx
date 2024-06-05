"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import GoogleSvg from "@/../public/svg/google.svg";
import AppleSvg from "@/../public/svg/apple.svg";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="flex flex-col items-center px-4 lg:p-28 max-w-screen-sm mx-auto lg:border-2 lg:my-10">
      <h5 className="text-center font-bold text-xl mb-6">Welcome!</h5>
      <div className="mb-4 w-full flex flex-col">
        <div className="mb-4 space-y-1">
          <p>Email</p>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="someone@example.com"
          />
        </div>
        <div className="mb-6 space-y-1">
          <p>Password</p>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button text="Sign In" fullWidth />
      </div>
      <Link href="/user/login">
        <p className="mb-8 text-blue-900 font-bold">Sign in using providers</p>
      </Link>
      <p className="text-center">
        Don&apos;t have an account yet?{" "}
        <Link href="/user/register" className="text-coral font-bold">
          Register and start shopping!
        </Link>
      </p>
    </div>
  );
}
