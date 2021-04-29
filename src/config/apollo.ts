import { Config } from "apollo-server-lambda";
import resolvers from "../graphql/resolvers";
import typeDefs from "../graphql/typeDefs";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { PrismaClient } from "@prisma/client";
import { Context } from "../@types/context";
import jwt from "jsonwebtoken";
import { environment } from ".";
import {
	APIGatewayProxyEventV2 as LambdaEvent,
	APIGatewayProxyEventHeaders as LambdaHeader,
} from "aws-lambda";
import cookie from "cookie";
import customHeadersPlugin from "../plugins/customHeadersPlugin";

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

const setContext = async ({
	event,
}: {
	event: LambdaEvent;
}): Promise<Context> => {
	const prisma = new PrismaClient();
	return {
		prisma,
		user: await getUser(event.headers),
		cookies: cookie.parse(event.headers.Cookie || ""),
		setCookies: [],
	};
};

async function getUser(headers: LambdaHeader) {
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
	plugins: [customHeadersPlugin],
	playground: {
		endpoint: "/dev/graphql",
		settings: {
			"request.credentials": "include",
		},
	},
};

export default ApolloConfig;
