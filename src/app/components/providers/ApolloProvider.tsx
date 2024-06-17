"use client";

import { ApolloLink, HttpLink, from, fromPromise } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import {
  AuthDispatchContext,
  AuthType,
  retrieveAuth,
  storeAuth,
} from "./AuthProvider";
import { onError } from "@apollo/link-error";
import { refresh } from "@/lib/authHandlers";
import { Product } from "@/__generated__/graphql";
import { createContext, useContext } from "react";
import { useRouter } from "next/navigation";

const cache = new InMemoryCache({
  typePolicies: {
    Cart: {
      keyFields: ["userId"],
    },
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
        ...headers,
        authorization: "Bearer " + authInfo.accessToken,
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

const errorLink = ({
  handleAuthError,
  handleAuthRefresh,
}: {
  handleAuthError: () => Promise<void>;
  handleAuthRefresh: (payload: AuthType) => void;
}) =>
  onError(({ graphQLErrors, networkError, operation, forward }) => {
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
                  .then((data) => {
                    handleAuthRefresh({
                      user: data.user,
                      accessToken: data.tokenInfo.accessToken,
                      refreshToken: data.tokenInfo.refreshToken,
                    });
                    resolvePendingRequests();
                    return data;
                  })
                  .catch((error) => {
                    pendingRequests = [];
                    return handleAuthError();
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
  });

function makeClient({
  handleAuthError,
  handleAuthRefresh,
}: {
  handleAuthError: () => Promise<void>;
  handleAuthRefresh: (payload: AuthType) => void;
}) {
  return new ApolloClient({
    cache: cache,
    link: from([
      errorLink({ handleAuthError, handleAuthRefresh }),
      authLink,
      httpLink,
    ]),
  });
}

export const ApolloContext = createContext<ApolloClient<unknown> | undefined>(
  undefined
);

export function ApolloProvider({ children }: React.PropsWithChildren) {
  const authDispatch = useContext(AuthDispatchContext);
  const router = useRouter();

  const handleAuthError = async () => {
    authDispatch({
      type: "CLEAR_AUTH",
    });
    router.push("/");
    await client.clearStore();
    await client.cache.reset();
  };

  const handleAuthRefresh = (auth: AuthType) => {
    storeAuth(auth);
  };

  const client = makeClient({ handleAuthError, handleAuthRefresh });
  client.onResetStore(async () => {
    console.log("reset");
  });
  client.onClearStore(async () => {
    console.log("clear");
  });

  return (
    <ApolloNextAppProvider makeClient={() => client}>
      <ApolloContext.Provider value={client}>{children}</ApolloContext.Provider>
    </ApolloNextAppProvider>
  );
}
