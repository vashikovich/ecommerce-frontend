import { getFragmentData } from "@/__generated__";
import {
  ApolloQueryResult,
  QueryResult,
  UseSuspenseQueryResult,
} from "@apollo/client";
import { PaginatedProduct } from "./fragments";
import {
  Exact,
  Product,
  SearchProductsInput,
  SearchProductsQuery,
} from "@/__generated__/graphql";

export const extractSearchProductsQuery = (
  queryResult:
    | ApolloQueryResult<SearchProductsQuery>
    | UseSuspenseQueryResult<
        SearchProductsQuery,
        Exact<{
          input: SearchProductsInput;
        }>
      >
    | QueryResult<
        SearchProductsQuery,
        Exact<{
          input: SearchProductsInput;
        }>
      >
) => {
  if (!queryResult.data) return undefined;

  const paginated = getFragmentData(
    PaginatedProduct,
    queryResult.data.searchProducts
  );
  const products = paginated.edges.map((e) => e.node as Product);
  return products;
};
