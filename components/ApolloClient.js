import fetch from "node-fetch";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import {createHttpLink} from "apollo-link-http";
import clientConfig from "../client-config";

/*const client = new ApolloClient({
  link: createHttpLink({
    uri: "https://maxandlea.fr/graphql",
    fetch: fetch
  }),
  cache: new InMemoryCache()
});*/

const client = new ApolloClient({
  ssrMode: typeof window === "undefined", // set to true for SSR
  link: new HttpLink({
    uri: "https://maxandlea.fr/graphql/",
  }),
  cache: new InMemoryCache(),
});

export default client
