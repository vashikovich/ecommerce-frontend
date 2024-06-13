import Banner from "./_components/Banner";
import ProductCard from "../components/ProductCard";
import { query } from "@/lib/apollo-client";
import Carousel from "../components/Carousel";
import { SearchProductsQuery } from "@/lib/queries";
import { extractSearchProductsQuery } from "@/lib/queries.utils";

const HomePage = async () => {
  const localProductsQuery = await query({
    query: SearchProductsQuery,
    variables: {
      input: {
        filterBy: {
          local: true,
        },
      },
      first: 10,
    },
  });
  const peakProductsQuery = await query({
    query: SearchProductsQuery,
    variables: {
      input: {
        filterBy: {
          peak: true,
        },
      },
      first: 10,
    },
  });

  return (
    <main className="min-h-screen flex flex-col max-w-screen-xl mx-auto gap-6">
      <Banner
        title="Welcome to Our Store"
        subtitle="Get the best products here"
        buttonLabel="Shop Now"
      />

      <section className="py-8">
        <h2 className="text-2xl font-bold mb-4 px-4">Local Products</h2>
        <Carousel
          gap={30}
          snap="start"
          snapMargin={16}
          list={extractSearchProductsQuery(localProductsQuery).map(
            (product) => (
              <div className="w-60 h-80 mb-5" key={product.id}>
                <ProductCard product={product} />
              </div>
            )
          )}
        />
      </section>

      <Banner
        title="Special Offer"
        subtitle="Up to 50% off on selected items"
        buttonLabel="Check It Out"
      />

      <section className="py-8">
        <h2 className="text-2xl font-bold mb-4 px-4">Peak Season</h2>
        <Carousel
          gap={30}
          snap="start"
          snapMargin={16}
          list={extractSearchProductsQuery(peakProductsQuery).map((product) => (
            <div className="w-60 h-80 mb-5" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        />
      </section>
    </main>
  );
};

export default HomePage;
