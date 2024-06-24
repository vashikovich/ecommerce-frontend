import Banner from "./_components/Banner";
import ProductCard from "../components/product-card/ProductCard";
import { query } from "@/lib/apollo-client";
import Carousel from "../components/Carousel";
import { SearchProductsQuery } from "@/lib/queries";
import { extractProductsFragment } from "@/lib/queries.utils";
import ProductCardSkeleton from "../components/skeletons/ProductCardSkeleton";

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
      <div className="m-4 p-4 rounded bg-coral/70 border-red-500 border-2">
        <p className="font-bold">
          Notice: This website is a demo, and no actual deliveries will take
          place. Thank you for understanding.
        </p>
      </div>

      <Banner
        image="https://plus.unsplash.com/premium_photo-1661420226112-311050ce30da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Reduce Carbon, Choose Local!"
        subtitle="You can help the environment by helping the people around you"
        buttonLabel="Browse"
        buttonLink="/search?f=lc"
      />

      <section className="py-8">
        <h2 className="text-2xl font-bold mb-4 px-4">Local Products</h2>
        <Carousel
          gap={30}
          snap="start"
          snapMargin={16}
          list={extractProductsFragment(localProductsQuery.data).map(
            (product) => (
              <div className="w-60 h-80 mb-5" key={product.id}>
                <ProductCard product={product} />
              </div>
            )
          )}
        />
      </section>

      <Banner
        image="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="It's Peak Season!"
        subtitle="Grab these while they are abundant"
        buttonLabel="Grab 'em"
        buttonLink="/search?f=pk"
      />

      <section className="py-8">
        <h2 className="text-2xl font-bold mb-4 px-4">Peak Season</h2>
        <Carousel
          gap={30}
          snap="start"
          snapMargin={16}
          list={extractProductsFragment(peakProductsQuery.data).map(
            (product) => (
              <div className="w-60 h-80 mb-5" key={product.id}>
                <ProductCard product={product} />
              </div>
            )
          )}
        />
      </section>
    </main>
  );
};

export default HomePage;
