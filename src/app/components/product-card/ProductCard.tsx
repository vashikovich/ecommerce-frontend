import { Product } from "@/__generated__/graphql";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import AtcButtonWrapper from "./AtcButtonWrapper";

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
      <div className="relative bg-white border border-deep-blue p-4 rounded-lg shadow-lg w-full h-full flex flex-col">
        <div className="relative h-44">
          <Image
            src={product.imageUrls[0].small}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            alt={product.name}
            className="object-cover"
          />
        </div>
        <div className="absolute top-0 left-0">
          <div className="flex">
            {product.local && (
              <div className="bg-blue-900 w-fit border-2 border-blue-900 py-0.5 px-1">
                <h6 className="text-xs text-white">LOCAL</h6>
              </div>
            )}
            {product.peak && (
              <div className="border-blue-900 w-fit border-2 py-0.5 px-1">
                <h6 className="text-xs text-blue-900">PEAK</h6>
              </div>
            )}
          </div>
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
            <AtcButtonWrapper product={product} />
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
