"use client";

import Button from "@/app/components/Button";
import Link from "next/link";
import { MouseEventHandler, useContext } from "react";
import { AuthContext, AuthDispatchContext } from "../providers/AuthProvider";
import { logout } from "@/lib/authHandlers";
import NavbarModal from "./NavbarModal";
import { useRouter } from "next/navigation";
import { ApolloContext } from "../providers/ApolloProvider";

export default function AccountModal({
  onDismissModal,
}: {
  onDismissModal: MouseEventHandler;
}) {
  const auth = useContext(AuthContext);
  const authDispatch = useContext(AuthDispatchContext);
  const apollo = useContext(ApolloContext);
  const router = useRouter();

  const handleLogout = async () => {
    const response = await logout(auth?.accessToken || "");
    if (!response.error) {
      authDispatch({ type: "CLEAR_AUTH" });
      router.push("/");
      await apollo?.clearStore();
    }
  };

  return (
    <NavbarModal onOverlayClick={onDismissModal}>
      <div className="p-4 bg-white max-h-screen overflow-y-auto pb-20 lg:pb-6 lg:w-80 lg:ml-auto lg:mr-10">
        {auth.user ? (
          <>
            <div className="mb-6 space-y-2">
              <p>Shopping for:</p>
              <div className="ml-4">
                <h5 className="text-xl">
                  {auth.user.displayName ?? auth.user.email}
                </h5>
                <h6 className="text-sm">
                  {auth.user.displayName ? auth.user.email : "\u00A0"}
                </h6>
              </div>
            </div>
            <div>
              <Link href="/orders" onClick={onDismissModal}>
                <div className="py-3 border-t-2 border-t-light-gray">
                  <h6>Orders & Invoices</h6>
                </div>
              </Link>
              <Link href="/user/profile" onClick={onDismissModal}>
                <div className="py-3 border-t-2 border-t-light-gray">
                  <h6>Account Profile</h6>
                </div>
              </Link>
              <div
                className="py-3 border-t-2 border-t-light-gray"
                onClick={(e) => {
                  handleLogout();
                  onDismissModal(e);
                }}
              >
                <h6>Sign out</h6>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-4">
            <Link href="/user/login" onClick={onDismissModal}>
              <Button content="Sign In" variant="ghost-primary" fullWidth />
            </Link>
          </div>
        )}
      </div>
    </NavbarModal>
  );
}
