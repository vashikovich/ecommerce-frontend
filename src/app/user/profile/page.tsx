"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import {
  AuthContext,
  AuthDispatchContext,
} from "@/app/components/providers/AuthProvider";
import { User } from "@/lib/definitions";
import { UpdateUserMutation } from "@/lib/queries";
import { useMutation } from "@apollo/client";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function RegisterPage() {
  const auth = useContext(AuthContext);
  const authDispatch = useContext(AuthDispatchContext);
  const router = useRouter();

  const [name, setName] = useState(auth.user?.displayName);

  const [updateUser, updateUserQuery] = useMutation(UpdateUserMutation, {
    variables: {
      input: {
        displayName: name ?? "",
      },
    },
    onCompleted(data, clientOptions) {
      authDispatch({
        type: "SAVE_USER",
        payload: data.updateUser as User,
      });
    },
  });

  const handleSubmit = async () => {
    await updateUser();
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center px-4 lg:p-28 max-w-screen-sm mx-auto lg:border-2 lg:my-10">
      <h5 className="text-center font-bold text-xl mb-6">Account Profile</h5>
      <div className={classNames("flex flex-col mb-8 w-full")}>
        <div className="mb-4 space-y-1">
          <p>Email</p>
          <Input
            type="email"
            value={auth.user?.email}
            disabled
            placeholder="someone@example.com"
          />
        </div>
        <div className="mb-6 space-y-1">
          <p>Display Name</p>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <Button
          content="Save"
          variant="primary"
          onClick={handleSubmit}
          fullWidth
        />
      </div>
    </div>
  );
}
