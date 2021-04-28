import { ApolloServer } from "apollo-server-lambda";
import { resolvers } from "./graphql/resolvers/test";
import { typeDefs } from "./graphql/typeDefs/test";

const apolloServer = new ApolloServer({
	resolvers,
	typeDefs,
	playground: {
		endpoint: "/dev/graphql",
	},
});
export const graphqlHandler = apolloServer.createHandler();
