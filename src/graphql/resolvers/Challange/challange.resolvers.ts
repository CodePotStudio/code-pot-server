import { Resolvers } from "../../../@types/graphql";

const query: Resolvers = {
	Query: {
		findChallanges: async (_, __, { prisma }) => {
			return await prisma.challange.findMany();
		},
		getChallange: async (_, { id }, { prisma }) => {
			return await prisma.challange.findUnique({ where: { id } });
		},
	},
};

export default query;
