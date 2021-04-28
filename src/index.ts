import { ApolloServer } from "apollo-server-lambda";
import ApolloConfig from "./config/apollo";

const apolloServer = new ApolloServer(ApolloConfig);
export const graphqlHandler = apolloServer.createHandler();
