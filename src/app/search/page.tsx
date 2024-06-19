"use client";

import {
  PaginatedProduct,
  Product,
  ProductSortType,
  SearchProductsInput,
} from "@/__generated__/graphql";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import SearchResults from "./SearchResults";
import { SearchParamsType } from "../components/providers/SearchProvider";
import SearchFilters from "./SearchFilters";
import { NetworkStatus, useQuery } from "@apollo/client";
import { SearchProductsQuery } from "@/lib/queries";
import { extractProductsFragment } from "@/lib/queries.utils";
import Button from "../components/Button";
import FilterSvg from "@/../public/svg/filter.svg";
import LoadingSvg from "@/../public/svg/loading-spinner.svg";
import classNames from "classnames";
import { useInView } from "react-intersection-observer";
import ProductCardSkeleton from "../components/skeletons/ProductCardSkeleton";
import SearchFiltersSkeleton from "../components/skeletons/SearchFiltersSkeleton";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const params = parseParams(searchParams);

  const inputVars = buildQueryVarFromParams(params);
  const resultsQuery = useQuery(SearchProductsQuery, {
    variables: { input: inputVars, first: 8 },
    notifyOnNetworkStatusChange: true,
  });
  const paginatedProduct = resultsQuery.data
    ?.searchProducts as PaginatedProduct;
  const results = resultsQuery.data
    ? extractProductsFragment(resultsQuery.data)
    : undefined;
  const lastCursor = paginatedProduct?.edges.slice(-1)[0]?.cursor;
  const hasMore = (resultsQuery.data?.searchProducts as PaginatedProduct)
    ?.pageInfo.hasMore;

  const [showFilterModal, setShowFilterModal] = useState(false);

  const [inViewRef, inView] = useInView();

  const searchTerm = searchParams.get("q") ?? "";
  useEffect(() => {
    setShowFilterModal(false);
  }, [searchTerm]);

  useEffect(() => {
    if (inView && !resultsQuery.loading && lastCursor && hasMore) {
      resultsQuery.fetchMore({ variables: { after: lastCursor } });
    }
  }, [inView, resultsQuery, lastCursor, hasMore]);

  return (
    <div className={classNames("flex max-w-screen-xl mx-auto gap-6")}>
      <div
        className={classNames(
          "hidden w-full lg:w-80 h-full lg:h-fit flex-shrink-0 lg:block z-10 bg-white lg:sticky lg:top-36"
        )}
      >
        {paginatedProduct ? (
          <SearchFilters params={params} paginatedProduct={paginatedProduct} />
        ) : (
          <SearchFiltersSkeleton />
        )}
      </div>
      {showFilterModal && (
        <div className="fixed w-full h-full z-10 bg-white overflow-scroll overscroll-contain pb-52 lg:hidden">
          {paginatedProduct ? (
            <div>
              <SearchFilters
                params={params}
                paginatedProduct={paginatedProduct}
              />
              <div className="fixed p-4 bottom-0 bg-white w-full">
                <Button
                  content="Apply"
                  fullWidth
                  onClick={() => setShowFilterModal(false)}
                />
              </div>
            </div>
          ) : (
            <SearchFiltersSkeleton />
          )}
        </div>
      )}

      <div className="flex flex-col flex-1">
        <div
          className={classNames(
            "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 px-4 h-fit "
          )}
        >
          {resultsQuery.loading &&
            resultsQuery.networkStatus !== NetworkStatus.fetchMore &&
            Array(8).fill(<ProductCardSkeleton />)}
          {results && Boolean(results?.length) && (
            <SearchResults products={results} />
          )}
        </div>
        {!resultsQuery.loading && hasMore && (
          <div className="w-10 h-10 mx-auto my-10 animate-spin" ref={inViewRef}>
            <LoadingSvg />
          </div>
        )}
      </div>

      {paginatedProduct && (
        <div className="fixed lg:hidden bottom-5 right-5">
          <Button
            content={
              <div className="w-6 h-6">
                <FilterSvg fill="white" />
              </div>
            }
            size="large"
            variant="primary"
            circular
            iconOnly
            onClick={() => setShowFilterModal(true)}
          />
        </div>
      )}
    </div>
  );
}

function parseParams(searchParams: ReadonlyURLSearchParams) {
  const params: SearchParamsType = {
    term: searchParams.get("q"),
    isLocal: searchParams.get("f")?.toLowerCase().split(",").includes("lc"),
    isPeak: searchParams.get("f")?.toLowerCase().split(",").includes("pk"),
    sort:
      searchParams.get("s")?.toLowerCase() === "pa"
        ? "price,asc"
        : searchParams.get("s")?.toLowerCase() === "pd"
        ? "price,desc"
        : "relevance",
    brands: searchParams
      .get("br")
      ?.split(",")
      .filter((b) => b),
    categories: searchParams
      .get("cat")
      ?.split(",")
      .map((s) => Number(s)),
  };
  return params;
}

function buildQueryVarFromParams(params: SearchParamsType) {
  const variables: SearchProductsInput = {};

  if (params.term) variables.searchTerm = params.term;

  if (params.isLocal)
    variables.filterBy = { ...variables.filterBy, local: true };

  if (params.isPeak) variables.filterBy = { ...variables.filterBy, peak: true };

  switch (params.sort) {
    case "relevance": {
      variables.sortBy = ProductSortType.Relevance;
      break;
    }
    case "price,asc": {
      variables.sortBy = ProductSortType.PriceAsc;
      break;
    }
    case "price,desc": {
      variables.sortBy = ProductSortType.PriceDesc;
      break;
    }
  }

  if (params.brands?.length) variables.brandFilter = params.brands;

  if (params.categories?.length) variables.categoryFilter = params.categories;

  return variables;
}
