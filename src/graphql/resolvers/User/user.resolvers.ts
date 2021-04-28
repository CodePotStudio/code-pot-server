import { Resolvers } from "../../../@types/graphql";
import { PrismaClient } from "@prisma/client";

const query: Resolvers = {
	Query: {
		user: async (_, { id }, context, __) => {
			const prisma = new PrismaClient();
			const user = await prisma.user.findUnique({ where: { id } });
			return user;
		},
	},
};

export default query;
