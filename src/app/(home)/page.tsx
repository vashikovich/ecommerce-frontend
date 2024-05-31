import { getCategories } from "@/lib/data";
import { GetServerSideProps } from "next";
import Navbar from "./_components/Navbar";
import CategoryBar from "./_components/CategoryBar";
import Banner from "./_components/Banner";
import ProductCard from "../components/ProductCard";
import Footer from "./_components/Footer";
import Link from "next/link";
import Input from "../components/Input";
import Button from "../components/Button";

const HomePage = async () => {
  const categories = await getCategories();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar categories={categories} />

      <main className="flex-grow">
        <Banner
          title="Welcome to Our Store"
          subtitle="Get the best products here"
          buttonLabel="Shop Now"
        />

        <section className="p-4">
          <h2 className="text-2xl font-bold mb-4">Trending Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))} */}
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
            {/* {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))} */}
          </div>
        </section>
      </main>

      <Footer categories={categories} />
    </div>
  );
};

export default HomePage;
