"use client";
export const dynamic = "force-dynamic";

import { Cart } from "@/__generated__/graphql";
import {
  ChangeCartProductQuantityMutation,
  CreateOrderMutation,
  GetCartQuery,
} from "@/lib/queries";
import { useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import Button from "../components/Button";
import TrashCanSvg from "@/../public/svg/trash-can.svg";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoadingSvg from "@/../public/svg/loading-spinner.svg";
import { useEffect } from "react";
import AtcButtonWrapper from "../components/product-card/AtcButtonWrapper";

export default function CartPage() {
  const cartQuery = useQuery(GetCartQuery);
  const router = useRouter();

  const [changeQty, changeQtyQuery] = useMutation(
    ChangeCartProductQuantityMutation
  );

  const [createOrder, createOrderQuery] = useMutation(CreateOrderMutation, {
    refetchQueries: [GetCartQuery],
  });

  useEffect(() => {
    if (createOrderQuery.data) {
      router.push("/");
    }
  }, [createOrderQuery, router]);

  if (cartQuery.loading)
    return (
      <div className="flex flex-col items-center mx-auto gap-20 py-20">
        <div className="w-20 h-20">
          <LoadingSvg />
        </div>
      </div>
    );

  const cart = cartQuery.data?.cart as Cart;

  return (
    <div className="p-4 flex-col lg:max-w-screen-xl lg:mx-auto">
      <h2 className="text-3xl my-2 lg:my-10">Cart Items</h2>
      <div className="lg:flex lg:gap-6">
        <div className="w-full lg:border-2 lg:p-10">
          {!cart.items.length ? (
            <div className="flex flex-col items-center mx-auto gap-20 py-20">
              <p>You have not added anything yet</p>
              <Link href="/">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            cart.items.map((i) => (
              <div
                key={i.productId}
                className="flex py-3 items-center border-b-2 border-light-gray lg:py-10"
              >
                <div className="w-60">
                  <Image
                    src={i.product?.imageUrls[0].thumbnail ?? ""}
                    width={150}
                    height={150}
                    alt="img"
                  />
                </div>
                <div className="flex flex-col lg:flex-row lg:justify-between w-full lg:gap-20">
                  <div className="lg:w-1/2">
                    <h6 className="text-xs font-bold text-light-gray">
                      {i.product?.brand}
                    </h6>
                    <p className="text-lg">{i.product?.name}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex flex-col flex-1">
                        <p className="text-sm">${i.product?.price} /</p>
                        <div className="flex flex-wrap">
                          <h6 className="text-xs font-bold">
                            {i.product?.size}
                          </h6>
                        </div>
                      </div>
                      <p className="flex-1 text-right font-bold">
                        ${(i.product?.price ?? 0) * i.quantity}
                      </p>
                    </div>
                  </div>
                  <div>
                    {i.product && (
                      <div className="flex justify-between items-center mt-2">
                        <div className="w-1/2">
                          <AtcButtonWrapper product={i.product} />
                        </div>
                        <Button
                          circular
                          iconOnly
                          variant="ghost-primary"
                          size="small"
                          onClick={() =>
                            changeQty({
                              variables: {
                                productId: i.product?.id ?? "",
                                quantity: 0,
                              },
                            })
                          }
                        >
                          <div className="w-4 h-4">
                            <TrashCanSvg />
                          </div>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {Boolean(cart.items.length) && (
          <div className="flex flex-col lg:w-1/3 lg:border-2 lg:p-6 lg:h-fit">
            <div className="flex justify-between py-4">
              <p className="text-xl font-bold">Total</p>
              <div className="min-w-16">
                <p className="text-xl font-bold">
                  ${cart.items.reduce((a, b) => a + (b.product?.price ?? 0), 0)}
                </p>
              </div>
            </div>
            <Button fullWidth variant="secondary" onClick={() => createOrder()}>
              {createOrderQuery.loading ? (
                <div className="w-6 h-6">
                  <LoadingSvg />
                </div>
              ) : (
                "Place Order"
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
