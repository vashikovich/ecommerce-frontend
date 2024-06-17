import { getFragmentData } from "@/__generated__";
import {
  ApolloQueryResult,
  QueryResult,
  UseSuspenseQueryResult,
} from "@apollo/client";
import { CartFragment, PaginatedProductFragment } from "./fragments";
import {
  Cart,
  ChangeCartProductQuantityMutation,
  Exact,
  GetCartQuery,
  Product,
  SearchProductsInput,
  SearchProductsQuery,
} from "@/__generated__/graphql";

export const extractProductsFragment = (data: SearchProductsQuery) => {
  const paginated = getFragmentData(
    PaginatedProductFragment,
    data.searchProducts
  );
  const products = paginated.edges.map((e) => e.node as Product);
  return products;
};

export const extractCartFragment = (
  data: GetCartQuery | ChangeCartProductQuantityMutation
) => {
  const cart = getFragmentData(
    CartFragment,
    (data as GetCartQuery)?.cart ||
      (data as ChangeCartProductQuantityMutation)?.changeCartProductQuantity
  ) as Cart;
  return cart;
};
