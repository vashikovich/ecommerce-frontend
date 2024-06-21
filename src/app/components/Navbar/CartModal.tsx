"use client";

import Button from "@/app/components/Button";
import Image from "next/image";
import NavbarModal from "./NavbarModal";
import { MouseEventHandler, useContext } from "react";
import { useQuery } from "@apollo/client";
import { GetCartQuery } from "@/lib/queries";
import { Cart } from "@/__generated__/graphql";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartModal({
  onDismissModal,
}: {
  onDismissModal: MouseEventHandler;
}) {
  const cartQuery = useQuery(GetCartQuery);
  const router = useRouter();

  if (cartQuery.loading) return null;

  const cart = cartQuery.data?.cart as Cart;

  return (
    <NavbarModal onOverlayClick={onDismissModal}>
      <div className="p-4 bg-white max-h-screen overflow-y-auto pb-20 lg:pb-6 lg:w-80 lg:ml-auto lg:mr-40">
        {!cart.items?.length ? (
          <p className="text-center">You have not added anything yet</p>
        ) : (
          cart.items.map((i) => (
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
                <h6 className="text-xs font-bold text-light-gray">
                  {i.product?.brand}
                </h6>
                <p>{i.product?.name}</p>
              </div>
              <div className="flex flex-col items-end">
                <p>{i.quantity} ea.</p>
                <h6 className="text-xs font-bold">{i.product?.size}</h6>
              </div>
            </div>
          ))
        )}
        {Boolean(cart.items?.length) && (
          <>
            <div className="flex justify-between py-3">
              <p className="text-xl font-bold">Total</p>
              <div className="min-w-16">
                <p className="text-xl font-bold">
                  ${cart.items.reduce((a, b) => a + (b.product?.price ?? 0), 0)}
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                variant="secondary"
                fullWidth
                onClick={(e) => {
                  router.push("/cart");
                  onDismissModal(e);
                }}
              >
                View Cart
              </Button>
            </div>
          </>
        )}
      </div>
    </NavbarModal>
  );
}
