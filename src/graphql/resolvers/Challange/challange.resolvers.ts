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
	Mutation: {
		enrollChallange: async (_, { challangeId }, { prisma, user }) => {
			const userId = user!.id;
			return await prisma.enroll.create({
				data: {
					userId,
					challangeId,
				},
			});
		},
	},
};

export default query;
