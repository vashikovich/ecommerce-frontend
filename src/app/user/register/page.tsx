"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import GoogleSvg from "@/../public/svg/google.svg";
import AppleSvg from "@/../public/svg/apple.svg";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="flex flex-col items-center px-4 lg:p-28 max-w-screen-sm mx-auto lg:border-2 lg:my-10">
      <h5 className="text-center font-bold text-xl mb-6">
        Become a customer now and start shopping!
      </h5>
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
        <Button text="Register" variant="secondary" fullWidth />
      </div>
    </div>
  );
}
