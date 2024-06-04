// components/ProductCard.tsx
import { Product } from "@/__generated__/graphql";
import Image from "next/image";
import React from "react";
import Button from "./Button";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
}: ProductCardProps) => {
  return (
    <div className="bg-white border border-deep-blue p-4 rounded-lg shadow-lg h-80 w-60 flex flex-col">
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
      <div className="flex justify-between items-end">
        <div className="flex flex-col justify-end gap-1">
          <h6 className="text-sm text-blue-900">{product.size}</h6>
          <h6 className="text-xs uppercase text-light-gray">{product.id}</h6>
        </div>
        <Button
          // onClick={onAddToCart}
          variant="ghost-secondary"
          iconOnly
          circular
          text="+"
        />
      </div>
    </div>
  );
};

export default ProductCard;
