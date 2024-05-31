import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://127.0.0.1:3001/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const createApolloClient = () => {
  return new ApolloClient({
    link: typeof window !== "undefined" ? authLink.concat(httpLink) : httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
