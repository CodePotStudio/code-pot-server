import { AuthenticationError, Config } from "apollo-server-lambda";
import resolvers from "../graphql/resolvers";
import typeDefs from "../graphql/typeDefs";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { PrismaClient } from "@prisma/client";
import { Context } from "../@types/context";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { environment } from ".";
import {
	APIGatewayProxyEventV2 as LambdaEvent,
	APIGatewayProxyEventHeaders as LambdaHeader,
} from "aws-lambda";
import cookie from "cookie";
import customHeadersPlugin from "../plugins/customHeadersPlugin";
import { applyMiddleware } from "graphql-middleware";
import { permissions } from "../permissions";

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

const prisma = new PrismaClient();

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
	playground: {
		endpoint: "/graphql",
		settings: {
			"request.credentials": "include",
		},
	},
};

export default ApolloConfig;
