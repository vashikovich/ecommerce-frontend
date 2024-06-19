"use client";

import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import { subscribe } from "@/lib/restApiHandlers";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    await subscribe({ email });
    alert("That's great, you have been subscribed to our newsletter! Please check your email");
  };

  return (
    <div>
      <Input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 rounded w-full bg-white text-black mb-2"
      />
      <Button
        onClick={handleSubmit}
        className="w-full bg-coral text-white py-2 px-4 rounded hover:bg-blue-900"
        content="Subscribe"
      />
    </div>
  );
}
