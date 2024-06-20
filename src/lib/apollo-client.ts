import { Product } from "@/__generated__/graphql";
import { HttpLink, from, fromPromise } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { onError } from "@apollo/link-error";

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC__API_HOST + "/graphql",
  fetchOptions: { cache: "no-store" },
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
      // if you would also like to retry automatically on
      // network errors, we recommend that you use
      // apollo-link-retry
    }
  }
);

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache,
    link: from([errorLink, httpLink]),
  });
});
