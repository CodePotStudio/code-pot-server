import { Resolvers } from "../../../@types/graphql";

const query: Resolvers = {
	Query: {
		findChallanges: async (_, { filter }, { prisma }) => {
			return await prisma.challange.findMany({
				where: {
					...filter,
				},
			});
		},
		getChallange: async (_, { id }, { prisma }) => {
			return await prisma.challange.findUnique({ where: { id } });
		},
	},
};

export default query;
