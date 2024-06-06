import {
  ApolloLink,
  FetchResult,
  HttpLink,
  Observable,
  from,
  fromPromise,
} from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { onError } from "@apollo/link-error";
import { refresh } from "./authHandlers";
import { retrieveAuth } from "@/app/components/providers/AuthProvider";

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC__API_HOST + "/graphql",
  fetchOptions: { cache: "no-store" },
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }: { headers: any }) => {
    if (typeof window !== "undefined") {
      const authInfo = retrieveAuth();
      return {
        headers: {
          authorization: "Bearer " + authInfo.accessToken,
          ...headers,
        },
      };
    } else {
      return {
        headers,
      };
    }
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

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache,
    link: from([errorLink, authLink, httpLink]),
  });
});
