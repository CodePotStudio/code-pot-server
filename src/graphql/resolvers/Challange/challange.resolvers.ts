import { Resolvers } from "../../../@types/graphql";

const query: Resolvers = {
	Query: {
		findChallanges: async (_, __, { prisma }) => {
			return await prisma.challange.findMany();
		},
	},
};

export default query;
