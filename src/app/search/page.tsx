import { query } from "@/lib/apollo-client";
import { SearchProductsByTermQuery } from "@/lib/queries";
import ProductCard from "../components/ProductCard";
import { getFragmentData } from "@/__generated__";
import { PaginatedProduct } from "@/lib/fragments";
import { Product } from "@/__generated__/graphql";

export default async function SearchPage() {
  const trendingProductsQuery = await query({
    query: SearchProductsByTermQuery,
    variables: { searchTerm: "app", first: 15 },
  });

  const extractTrendingProducts = () => {
    const paginated = getFragmentData(
      PaginatedProduct,
      trendingProductsQuery.data.searchProductsByTerm
    );
    const products = paginated.edges.map((e) => e.node as Product);
    return products;
  };

  return (
    <div className="min-h-screen max-w-screen-xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4">
        {extractTrendingProducts().map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
