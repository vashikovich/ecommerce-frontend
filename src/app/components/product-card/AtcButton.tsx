"use client";

import { Cart, Product } from "@/__generated__/graphql";
import classNames from "classnames";
import TrashCanSvg from "@/../public/svg/trash-can.svg";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ChangeCartProductQuantityMutation, GetCartQuery } from "@/lib/queries";
import { extractCartFragment } from "@/lib/queries.utils";
import { AuthContext } from "../providers/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AtcButtonProps {
  product: Product;
}

export default function AtcButton({ product }: AtcButtonProps) {
  const auth = useContext(AuthContext);
  const cartQuery = useQuery(GetCartQuery);
  const router = useRouter();

  const [changeQty, changeQtyQuery] = useMutation(
    ChangeCartProductQuantityMutation
  );

  const cart = cartQuery.data?.cart as Cart | undefined;

  const quantity =
    cart?.items.find((i) => i.productId === product.id)?.quantity ?? 0;

  const [temp, setTemp] = useState(quantity);

  useEffect(() => {
    setTemp(quantity);
  }, [quantity]);

  function handleChangeQty(qty: number) {
    changeQty({
      variables: {
        productId: product.id,
        quantity: qty,
      },
    });
  }

  return (
    <div
      className="h-10"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      {quantity === 0 ? (
        <div
          className={classNames(
            "flex items-center justify-center font-bold focus:outline-none rounded px-4 py-1 text-md h-full",
            (product?.stock ?? 0) > 0
              ? "border-blue-900 border-2 text-blue-900 hover:bg-blue-900 hover:text-white cursor-pointer"
              : "border-light-gray border-2 text-light-gray"
          )}
          onClick={() => {
            (product?.stock ?? 0) > 0 && handleChangeQty(quantity + 1);
          }}
        >
          <p>{(product?.stock ?? 0) > 0 ? "Add to Cart" : "Out of Stock"}</p>
        </div>
      ) : (
        <div className="flex items-center justify-center font-bold focus:outline-none outline-none rounded text-md border-blue-900 border-2 text-blue-900 h-full">
          <div
            className="flex w-1/4 items-center justify-center font-bold focus:outline-none text-lg bg-blue-900 text-white border-blue-900 border-2 cursor-pointer h-full"
            onClick={() => handleChangeQty(quantity - 1)}
          >
            {quantity > 1 ? (
              "-"
            ) : (
              <div className="w-6 h-6">
                <TrashCanSvg />
              </div>
            )}
          </div>
          <div className="flex-1">
            <input
              type="number"
              value={temp}
              onChange={(e) => setTemp(Number(e.target.value))}
              onBlur={() => handleChangeQty(temp)}
              className="w-full text-black text-center focus:outline-none [&::-webkit-inner-spin-button]:appearance-none"
            ></input>
          </div>
          <div
            className={classNames(
              "flex w-1/4 items-center justify-center font-bold focus:outline-none text-lg bg-blue-900 border-2 cursor-pointer h-full",
              (product?.stock ?? 0) > quantity
                ? "border-blue-900 text-white hover:bg-blue-900 hover:text-white"
                : "bg-light-gray border-light-gray text-white"
            )}
            onClick={() =>
              (product?.stock ?? 0) > quantity && handleChangeQty(quantity + 1)
            }
          >
            +
          </div>
        </div>
      )}
    </div>
  );
}
