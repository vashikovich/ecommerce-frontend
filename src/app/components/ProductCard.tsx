// components/ProductCard.tsx
import Image from "next/image";
import React from "react";

interface ProductCardProps {
  image: string;
  name: string;
  brand?: string;
  size: string;
  sku: string;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  brand,
  size,
  sku,
  onAddToCart,
}) => {
  return (
    <div className="bg-snow-white border border-deep-blue p-4 rounded-lg shadow-lg">
      <Image
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <div className="text-deep-blue font-bold text-lg mb-1">{name}</div>
      {brand && <div className="text-deep-blue text-sm mb-1">{brand}</div>}
      <div className="text-deep-blue text-sm mb-1">{size}</div>
      <div className="text-deep-blue text-xs mb-4">SKU: {sku}</div>
      <button
        onClick={onAddToCart}
        className="w-full bg-coral text-white py-2 px-4 rounded hover:bg-coral-light"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
