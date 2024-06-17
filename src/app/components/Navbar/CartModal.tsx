"use client";

import Button from "@/app/components/Button";
import Image from "next/image";
import NavbarModal from "./NavbarModal";
import { MouseEventHandler, useContext } from "react";
import { useQuery } from "@apollo/client";
import { GetCartQuery } from "@/lib/queries";
import { Cart } from "@/__generated__/graphql";

export default function CartModal({
  onDismissModal,
}: {
  onDismissModal: MouseEventHandler;
}) {
  const cartQuery = useQuery(GetCartQuery);

  if (cartQuery.loading) return null;

  const cart = cartQuery.data?.cart as Cart;

  return (
    <NavbarModal onOverlayClick={onDismissModal}>
      <div className="p-4 bg-white max-h-screen overflow-y-auto pb-20 lg:pb-6 lg:w-80 lg:ml-auto lg:mr-40">
        {cart.items.map((i) => (
          <div
            key={i.productId}
            className="flex py-3 items-center border-b-2 border-light-gray"
          >
            <Image
              src={i.product?.imageUrls[0].thumbnail ?? ""}
              width={35}
              height={35}
              alt="img"
            />
            <div className="flex-1 ml-2">
              <p>{i.product?.name}</p>
              <h6 className="text-xs font-bold">
                {i.product?.brand || `\u0010`}
              </h6>
            </div>
            <div className="flex flex-col items-center mr-5">
              <p>{i.quantity}</p>
              <h6 className="text-xs font-bold">{i.product?.size}</h6>
            </div>
            <div className="min-w-16">
              <p className="font-bold">${i.product?.price}</p>
            </div>
          </div>
        ))}
        <div className="flex justify-between py-3">
          <p className="text-xl font-bold">Total</p>
          <div className="min-w-16">
            <p className="text-xl font-bold">
              ${cart.items.reduce((a, b) => a + (b.product?.price ?? 0), 0)}
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <Button content="View Cart" variant="secondary" fullWidth />
        </div>
      </div>
    </NavbarModal>
  );
}
