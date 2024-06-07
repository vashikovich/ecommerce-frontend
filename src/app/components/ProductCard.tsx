import { Product } from "@/__generated__/graphql";
import classNames from "classnames";
import Image from "next/image";
import React from "react";

interface ProductCardProps {
  product: Product;
  cartCount: number;
  onIncCount: Function;
  onDecCount: Function;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  cartCount = 0,
  onIncCount,
  onDecCount,
}: ProductCardProps) => {
  return (
    <div className="bg-white border border-deep-blue p-4 rounded-lg shadow-lg w-full h-full flex flex-col">
      <div className="relative h-44">
        <Image
          src={product.imageUrls[0].small}
          fill
          alt={product.name}
          className="object-cover"
        />
      </div>
      <h5 className="text-xs text-medium-gray">{product.brand || "\u00A0"}</h5>
      <p className="flex-1 font-bold">{product.name}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-blue-900 font-bold">${product.price}</p>
        <p className="text-blue-900 font-bold">/</p>
        <h6 className="text-xs">{product.size}</h6>
      </div>
      <div className="w-full mt-5">
        {cartCount === 0 ? (
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
                <div>
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
        )}
      </div>
    </div>
  );
};

export default ProductCard;
