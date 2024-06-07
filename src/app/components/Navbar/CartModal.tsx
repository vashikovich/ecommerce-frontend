import Button from "@/app/components/Button";
import Image from "next/image";
import NavbarModal from "./NavbarModal";
import { MouseEventHandler } from "react";

export default function CartModal({
  onDismissModal,
}: {
  onDismissModal: MouseEventHandler;
}) {
  return (
    <NavbarModal onOverlayClick={onDismissModal}>
      <div className="p-4 bg-white max-h-screen overflow-y-scroll pb-20">
        {[1, 2, 3].map((x) => (
          <div
            key={x}
            className="flex py-3 items-center border-b-2 border-light-gray"
          >
            <Image
              src="https://cdn-endpoint-website.azureedge.net/uploads/PhotoModel/38422/image/pastadc19.search.jpg?t=1714407317"
              width={35}
              height={35}
              alt="img"
            />
            <div className="flex-1 ml-2">
              <p>Pasta magna charta</p>
              <h6 className="text-xs font-bold">DE CECCO</h6>
            </div>
            <div className="flex flex-col items-center mr-5">
              <p>4x</p>
              <h6 className="text-xs font-bold">24 OZ</h6>
            </div>
            <div className="min-w-16">
              <p className="font-bold">$300.00</p>
            </div>
          </div>
        ))}
        <div className="flex justify-between py-3">
          <p className="text-xl font-bold">Total</p>
          <div className="min-w-16">
            <p className="text-xl font-bold">$300.00</p>
          </div>
        </div>
        <div className="flex justify-center">
          <Button text="View Cart" variant="secondary" fullWidth />
        </div>
      </div>
    </NavbarModal>
  );
}
