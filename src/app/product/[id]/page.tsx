import {
  Product,
  SearchProductsQuery as SearchProductsQueryType,
} from "@/__generated__/graphql";
import { query } from "@/lib/apollo-client";
import { GetProductDetailsQuery, SearchProductsQuery } from "@/lib/queries";
import Image from "next/image";
import ShareSvg from "@/../public/svg/share.svg";
import Carousel from "@/app/components/Carousel";
import { ApolloQueryResult } from "@apollo/client";
import { getFragmentData } from "@/__generated__";
import { PaginatedProductFragment } from "@/lib/fragments";
import ProductCard from "@/app/components/product-card/ProductCard";
import { notFound } from "next/navigation";
import AtcButtonWrapper from "@/app/components/product-card/AtcButtonWrapper";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const productQuery = await query({
      query: GetProductDetailsQuery,
      variables: { id: params.id },
    });

    const product = productQuery.data.product as Product;

    const relatedProductsQuery = await query({
      query: SearchProductsQuery,
      variables: {
        input: {
          filterBy: {
            peak: true,
          },
        },
      },
    });

    const extractSearchProductsQuery = (
      queryResult: ApolloQueryResult<SearchProductsQueryType>
    ) => {
      const paginated = getFragmentData(
        PaginatedProductFragment,
        queryResult.data.searchProducts
      );
      const products = paginated.edges.map((e) => e.node as Product);
      return products;
    };

    return (
      <div className="flex flex-col max-w-screen-lg mx-auto">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="flex flex-col w-full">
            {/* <div className="w-6 h-6 self-end px-4 lg:hidden">
              <ShareSvg />
            </div> */}
            <div className="w-full">
              <Carousel
                visibleCount={1}
                scrollCount={1}
                snap="center"
                list={product.imageUrls.map((i) => (
                  <Image
                    src={i.original ?? i.small}
                    width={1000}
                    height={1000}
                    alt={product.name}
                    key={i.small}
                  />
                ))}
              />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between px-4 lg:hidden">
              <div className="flex flex-col">
                <h5 className="text-medium-gray">
                  {product.brand ?? `\u00A0`}
                </h5>
                <p className="text-3xl font-bold mb-2">{product.name}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-xl text-blue-900 font-bold">
                    ${product.price}
                  </p>
                  <p className="text-xl text-blue-900 font-bold">/</p>
                  <p className="text-lg">{product.size}</p>
                </div>
              </div>
              <div className="w-full mt-5 md:w-1/4 md:self-end">
                <AtcButtonWrapper product={product} />
              </div>
            </div>
            <div className="flex flex-col mt-6 pt-6 border-t-2 px-4">
              <h5 className="text-lg font-bold mb-2">
                More about this product
              </h5>
              <p>{product.description}</p>
              <div className="flex gap-4">
                <p className="font-bold">Size:</p>
                <p>{product.size}</p>
              </div>
              {product.origin && (
                <div className="flex gap-4">
                  <p className="font-bold">Country of Origin: </p>
                  <p>{product.origin}</p>
                </div>
              )}
              {product.ingredients && (
                <div className="flex gap-4">
                  <p className="font-bold">Ingredients: </p>
                  <p>{product.ingredients}</p>
                </div>
              )}
            </div>
          </div>

          <div className="hidden lg:flex flex-col border-2 p-8 h-fit min-w-96">
            <div className="flex flex-col">
              {/* <div className="w-6 h-6 self-end">
                <ShareSvg />
              </div> */}
              <h5 className="text-medium-gray">{product.brand ?? `\u00A0`}</h5>
              <p className="text-3xl font-bold mb-2">{product.name}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-xl text-blue-900 font-bold">
                  ${product.price}
                </p>
                <p className="text-xl text-blue-900 font-bold">/</p>
                <p className="text-lg">{product.size}</p>
              </div>
              <div className="w-full mt-5">
                <AtcButtonWrapper product={product} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-6 pt-6 border-t-2">
          <h5 className="text-lg font-bold mb-4 px-4">Related Products</h5>
          <Carousel
            gap={30}
            snap="start"
            snapMargin={16}
            list={extractSearchProductsQuery(relatedProductsQuery).map(
              (product) => (
                <div className="w-60 h-80 mb-5" key={product.id}>
                  <ProductCard product={product} withoutAtc />
                </div>
              )
            )}
          />
        </div>
      </div>
    );
  } catch (e) {
    return notFound();
  }
}
