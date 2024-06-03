// components/ProductCard.tsx
import { ProductFragment } from "@/__generated__/graphql";
import { Product } from "@/lib/definitions";
import Image from "next/image";
import React from "react";

interface ProductCardProps {
  product: ProductFragment;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-snow-white border border-deep-blue p-4 rounded-lg shadow-lg">
      <Image
        src={product.imageUrls[0].small}
        width={100}
        height={100}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <div className="text-deep-blue font-bold text-lg mb-1">
        {product.name}
      </div>
      {product.brand && (
        <div className="text-deep-blue text-sm mb-1">{product.brand}</div>
      )}
      <div className="text-deep-blue text-sm mb-1">{product.size}</div>
      <div className="text-deep-blue text-xs mb-4">{product.id}</div>
      <button
        // onClick={onAddToCart}
        className="w-full bg-coral text-white py-2 px-4 rounded hover:bg-coral-light"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
