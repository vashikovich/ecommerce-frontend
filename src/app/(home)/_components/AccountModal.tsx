import Button from "@/app/components/Button";
import Image from "next/image";
import Modal from "react-modal";

export default function AccountModal() {
  return (
    <div className="p-4 bg-white">
      <div className="mb-6 space-y-2">
        <p>Shopping for:</p>
        <div className="ml-4">
          <h5 className="text-xl">Indera Aji Waskitho</h5>
          <h6 className="text-sm">Email</h6>
        </div>
      </div>
      <div>
        <div className="py-3 border-t-2 border-t-light-gray">
          <h6>Orders</h6>
        </div>
        <div className="py-3 border-t-2 border-t-light-gray">
          <h6>Account Settings</h6>
        </div>
        <div className="py-3 border-t-2 border-t-light-gray">
          <h6>Sign out</h6>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Button text="Sign in" variant="ghost" fullWidth />
        <Button text="Become a Customer" variant="secondary" fullWidth />
      </div>
    </div>
  );
}
