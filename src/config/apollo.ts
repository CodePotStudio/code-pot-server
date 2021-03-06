import { Config } from "apollo-server-lambda";
import resolvers from "../graphql/resolvers";
import typeDefs from "../graphql/typeDefs";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { Context } from "../@types/context";
import jwt from "jsonwebtoken";
import { environment } from ".";
import {
	APIGatewayProxyEventV2 as LambdaEvent,
	APIGatewayProxyEventHeaders as LambdaHeader,
} from "aws-lambda";
import cookie from "cookie";
import customHeadersPlugin from "../plugins/customHeadersPlugin";
import { applyMiddleware } from "graphql-middleware";
import { permissions } from "../permissions";
import { createPrismaClient } from "../libs/prisma";

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

const prisma = createPrismaClient();

const setContext = async ({
	event,
}: {
	event: LambdaEvent;
}): Promise<Context> => {
	return {
		prisma,
		user: await getUser(event.headers),
		cookies: cookie.parse(event.headers.Cookie || ""),
		setCookies: [],
	};
};

async function getUser(headers: LambdaHeader) {
	const header = headers.Authorization || headers.authorization || "";
	if (header) {
		const token = header.replace("Bearer ", "");
		try {
			const decoded: any = jwt.verify(token, environment.jwtSecret);
			const user = await prisma.user.findUnique({
				where: { id: decoded.id },
			});
			return user;
		} catch (error) {
			console.log(error);
			return null;
		}
	} else {
		return null;
	}
}
const ApolloConfig: Config = {
	// grahql shield 적용
	schema: applyMiddleware(schema, permissions),
	context: setContext,
	plugins: [customHeadersPlugin],
	debug: environment.env === "local" ? true : false,
	playground: {
		endpoint: "/graphql",
		settings: {
			"request.credentials": "include",
		},
	},
};

export default ApolloConfig;
