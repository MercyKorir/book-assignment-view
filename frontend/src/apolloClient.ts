import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "https://book-assignment-view-s3v5.onrender.com",
  cache: new InMemoryCache(),
});

export default apolloClient;
