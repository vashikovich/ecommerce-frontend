"use client";

import { Product } from "@/__generated__/graphql";
import classNames from "classnames";
import TrashCanSvg from "@/../public/svg/trash-can.svg";

interface AtcButtonProps {
  product: Product;
}

export default function AtcButton({ product }: AtcButtonProps) {
  const cartCount = 0;
  const onIncCount = () => {};
  const onDecCount = () => {};

  return cartCount === 0 ? (
    <div
      className={classNames(
        "flex items-center justify-center font-bold focus:outline-none rounded px-4 py-1 text-md",
        product.stock > 0
          ? "border-blue-900 border-2 text-blue-900 hover:bg-blue-900 hover:text-white cursor-pointer"
          : "border-light-gray border-2 text-light-gray"
      )}
      onClick={() => product.stock > 0 && onIncCount()}
    >
      <p>Add to Cart</p>
    </div>
  ) : (
    <div className="flex items-center justify-center font-bold focus:outline-none outline-none rounded text-md border-blue-900 border-2 text-blue-900">
      <div
        className="flex w-1/4 items-center justify-center h-full font-bold focus:outline-none text-lg bg-blue-900 hover:bg-blue-900 text-white"
        onClick={() => onDecCount()}
      >
        {cartCount > 1 ? (
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
          className="w-full text-black text-center focus:outline-none"
        ></input>
      </div>
      <div
        className={classNames(
          "flex w-1/4 items-center justify-center h-full font-bold focus:outline-none text-lg bg-blue-900 hover:bg-blue-900 text-white",
          product.stock > cartCount
            ? "border-blue-900 border-2 text-blue-900 hover:bg-blue-900 hover:text-white cursor-pointer"
            : "border-light-gray border-2 text-light-gray"
        )}
        onClick={() => product.stock > cartCount && onIncCount()}
      >
        +
      </div>
    </div>
  );
}
