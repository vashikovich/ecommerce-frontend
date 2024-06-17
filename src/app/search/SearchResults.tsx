"use client";
import ProductCard from "../components/product-card/ProductCard";
import { Product } from "@/__generated__/graphql";

export default function SearchResults({ products }: { products: Product[] }) {
  return products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
}
