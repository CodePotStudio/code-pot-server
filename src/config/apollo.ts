import { Config } from "apollo-server-lambda";
import resolvers from "../graphql/resolvers";
import typeDefs from "../graphql/typeDefs";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { PrismaClient } from "@prisma/client";
import { Context } from "../@types/context";
import { Request, Response } from "express";

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

const setContext = ({ req, res }: { req: Request; res: Response }): Context => {
	const prisma = new PrismaClient();
	const context = {
		req,
		res,
		prisma,
	};
	return context;
};

const config: Config = {
	schema: schema,
	context: setContext,
	playground: {
		endpoint: "/dev/graphql",
		settings: {
			"request.credentials": "include",
		},
	},
};

export default config;
