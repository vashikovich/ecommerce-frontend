import { GetServerSideProps } from "next";
import Navbar from "../components/Navbar/Navbar";
import CategoryBar from "../components/Navbar/CategoryBar";
import Banner from "./_components/Banner";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import Link from "next/link";
import Input from "../components/Input";
import Button from "../components/Button";
import { query } from "@/lib/apollo-client";
import {
  GetCategoriesQuery,
  SearchProductsByCategoryQuery,
  SearchProductsByTermQuery,
} from "@/lib/queries";
import { getFragmentData } from "@/__generated__";
import { PaginatedProduct } from "@/lib/fragments";
import { Product } from "@/__generated__/graphql";
import Carousel from "./_components/Carousel";

const HomePage = async () => {
  const trendingProductsQuery = await query({
    query: SearchProductsByTermQuery,
    variables: { searchTerm: "app", first: 15 },
  });
  const newProductsQuery = await query({
    query: SearchProductsByCategoryQuery,
    variables: { categoryId: 14, first: 15 },
  });

  const extractTrendingProducts = () => {
    const paginated = getFragmentData(
      PaginatedProduct,
      trendingProductsQuery.data.searchProductsByTerm
    );
    const products = paginated.edges.map((e) => e.node as Product);
    return products;
  };

  const extractNewProducts = () => {
    const paginated = getFragmentData(
      PaginatedProduct,
      newProductsQuery.data.searchProductsByCategory
    );
    const products = paginated.edges.map((e) => e.node as Product);
    return products;
  };

  return (
    <main className="min-h-screen flex flex-col max-w-screen-xl mx-auto gap-6">
      <Banner
        title="Welcome to Our Store"
        subtitle="Get the best products here"
        buttonLabel="Shop Now"
      />

      <section className="px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Trending Products</h2>
        <Carousel
          list={extractTrendingProducts().map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        />
      </section>

      <Banner
        title="Special Offer"
        subtitle="Up to 50% off on selected items"
        buttonLabel="Check It Out"
      />

      <section className="p-4">
        <h2 className="text-2xl font-bold mb-4">New Products</h2>
        <Carousel
          list={extractNewProducts().map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        />
      </section>
    </main>
  );
};

export default HomePage;
