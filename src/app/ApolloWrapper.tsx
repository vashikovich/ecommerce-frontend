"use client";

import { ApolloLink, HttpLink, from, fromPromise } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { retrieveAuth } from "./components/providers/AuthProvider";
import { onError } from "@apollo/link-error";
import { refresh } from "@/lib/authHandlers";
import { Product } from "@/__generated__/graphql";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        metadata: {
          keyArgs: false,
          merge(existing, incoming) {
            return incoming;
          },
          read(existing) {
            return existing;
          },
        },
        searchProducts: {
          keyArgs: false,
          merge(existing, incoming) {
            const existingEdges = existing?.edges || [];
            const incomingEdges = incoming?.edges || [];

            const edgeMap = new Map<
              string,
              { cursor: string; node: Product }
            >();

            existingEdges.forEach((edge: { cursor: string; node: Product }) => {
              edgeMap.set(edge.cursor, edge);
            });

            incomingEdges.forEach((edge: { cursor: string; node: Product }) => {
              edgeMap.set(edge.cursor, edge);
            });

            const mergedEdges = Array.from(edgeMap.values());

            return {
              ...incoming,
              edges: mergedEdges,
            };
          },
          read(existing) {
            return existing;
          },
        },
      },
    },
  },
});

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC__API_HOST + "/graphql",
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }: { headers: any }) => {
    const authInfo = retrieveAuth();
    return {
      headers: {
        authorization: "Bearer " + authInfo.accessToken,
        ...headers,
      },
    };
  });
  return forward(operation);
});

let isRefreshing = false;
let pendingRequests: (() => void)[] = [];

const resolvePendingRequests = () => {
  pendingRequests.map((callback) => callback());
  pendingRequests = [];
};

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case "UNAUTHENTICATED":
            let forward$;

            if (!isRefreshing) {
              isRefreshing = true;
              const auth = retrieveAuth();
              forward$ = fromPromise(
                refresh(auth.user, auth.refreshToken)
                  .then(() => {
                    resolvePendingRequests();
                  })
                  .catch((error) => {
                    pendingRequests = [];
                    // Handle token refresh errors e.g clear stored tokens, redirect to login, ...
                    return;
                  })
                  .finally(() => {
                    isRefreshing = false;
                  })
              ).filter((value) => Boolean(value));
            } else {
              // Will only emit once the Promise is resolved
              forward$ = fromPromise<void>(
                new Promise((resolve) => {
                  pendingRequests.push(() => resolve());
                })
              );
            }

            return forward$.flatMap(() => forward(operation));
        }
      }
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
      // if you would also like to retry automatically on
      // network errors, we recommend that you use
      // apollo-link-retry
    }
  }
);

function makeClient() {
  return new ApolloClient({
    cache: cache,
    link: from([errorLink, authLink, httpLink]),
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
