import { Product } from "@/__generated__/graphql";
import classNames from "classnames";
import Image from "next/image";
import React from "react";
import AtcButton from "./AtcButton";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  withoutAtc?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  withoutAtc = false,
}: ProductCardProps) => {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white border border-deep-blue p-4 rounded-lg shadow-lg w-full h-full flex flex-col">
        <div className="relative h-44">
          <Image
            src={product.imageUrls[0].small}
            fill
            alt={product.name}
            className="object-cover"
          />
        </div>
        <h5 className="text-xs text-medium-gray">
          {product.brand || "\u00A0"}
        </h5>
        <p className="flex-1 font-bold">{product.name}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-blue-900 font-bold">${product.price}</p>
          <p className="text-blue-900 font-bold">/</p>
          <h6 className="text-xs">{product.size}</h6>
        </div>
        {withoutAtc || (
          <div className="w-full mt-5">
            <AtcButton product={product} />
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
