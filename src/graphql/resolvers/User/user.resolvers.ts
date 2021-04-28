import { Resolvers } from "../../../@types/graphql";

const query: Resolvers = {
	Query: {
		user: async (_, { id }, { prisma }, __) => {
			const user = await prisma.user.findUnique({ where: { id } });
			return user;
		},
	},
};

export default query;
