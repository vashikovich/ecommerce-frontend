import { GetServerSideProps } from "next";
import Navbar from "./_components/Navbar";
import CategoryBar from "./_components/CategoryBar";
import Banner from "./_components/Banner";
import ProductCard from "../components/ProductCard";
import Footer from "./_components/Footer";
import Link from "next/link";
import Input from "../components/Input";
import Button from "../components/Button";
import { query } from "@/lib/apollo-client";
import {
  GetCategoriesQuery,
  SEARCH_PRODUCTS_BY_CATEGORY_QUERY,
} from "@/lib/queries";
import { gql } from "@/__generated__/gql";
import { getFragmentData } from "@/__generated__";
import { ProductFragmentDoc } from "@/__generated__/graphql";
import { ProductFragment } from "@/lib/fragments";

const HomePage = async () => {
  const categories = await query({
    query: GetCategoriesQuery,
  });
  const trendingProducts = await query({
    query: SEARCH_PRODUCTS_BY_CATEGORY_QUERY,
    variables: { categoryId: 10 },
  });
  const newProducts = await query({
    query: SEARCH_PRODUCTS_BY_CATEGORY_QUERY,
    variables: { categoryId: 14 },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar categories={categories.data.metadata.categories} />

      <main className="flex-grow">
        <Banner
          title="Welcome to Our Store"
          subtitle="Get the best products here"
          buttonLabel="Shop Now"
        />

        <section className="p-4">
          <h2 className="text-2xl font-bold mb-4">Trending Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingProducts.data.searchProductsByCategory.map((product) => {
              const p = getFragmentData(ProductFragment, product);
              return <ProductCard key={p.id} product={p} />;
            })}
          </div>
        </section>

        <Banner
          title="Special Offer"
          subtitle="Up to 50% off on selected items"
          buttonLabel="Check It Out"
        />

        <section className="p-4">
          <h2 className="text-2xl font-bold mb-4">New Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {newProducts.data.searchProductsByCategory.map((product) => {
              const p = getFragmentData(ProductFragment, product);
              return <ProductCard key={p.id} product={p} />;
            })}
          </div>
        </section>
      </main>

      <Footer categories={categories.data.metadata.categories} />
    </div>
  );
};

export default HomePage;
