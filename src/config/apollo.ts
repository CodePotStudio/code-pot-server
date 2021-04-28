import { Config } from "apollo-server-lambda";
import resolvers from "../graphql/resolvers";
import typeDefs from "../graphql/typeDefs";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { PrismaClient } from "@prisma/client";
import { Context } from "../@types/context";
import jwt from "jsonwebtoken";
import { environment } from ".";

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

const setContext = async ({ event }: any): Promise<Context> => {
	const prisma = new PrismaClient();
	const context = {
		prisma,
		user: await getUser(event.headers),
	};
	return context;
};

async function getUser(headers: any) {
	const prisma = new PrismaClient();
	const header = headers.authorization || "";
	if (header) {
		const token = header.replace("Bearer ", "");
		const decoded: any = jwt.verify(token, environment.jwtSecret);
		const user = await prisma.user.findUnique({
			where: { id: decoded.id },
		});
		return user;
	} else {
		return null;
	}
}

const ApolloConfig: Config = {
	schema: schema,
	context: setContext,
	playground: {
		endpoint: "/dev/graphql",
		settings: {
			"request.credentials": "include",
		},
	},
};

export default ApolloConfig;
