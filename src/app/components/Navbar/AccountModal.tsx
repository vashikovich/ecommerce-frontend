import Button from "@/app/components/Button";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext, AuthDispatchContext } from "../providers/AuthProvider";
import { logout } from "@/lib/authHandlers";

export default function AccountModal() {
  const auth = useContext(AuthContext);
  const authDispatch = useContext(AuthDispatchContext);

  const handleLogout = async () => {
    const response = await logout(auth?.accessToken || "");
    if (!response.error) {
      authDispatch({ type: "CLEAR_AUTH" });
    }
  };

  return (
    <div className="p-4 bg-white">
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
            <div className="py-3 border-t-2 border-t-light-gray">
              <h6>Orders</h6>
            </div>
            <div className="py-3 border-t-2 border-t-light-gray">
              <h6>Account Settings</h6>
            </div>
            <div
              className="py-3 border-t-2 border-t-light-gray"
              onClick={handleLogout}
            >
              <h6>Sign out</h6>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-4">
          <Link href="/user/login">
            <Button text="Sign in" variant="ghost-primary" fullWidth />
          </Link>
        </div>
      )}
    </div>
  );
}
