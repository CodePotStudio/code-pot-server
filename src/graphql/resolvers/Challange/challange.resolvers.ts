import { Prisma } from ".prisma/client";
import { Resolvers } from "../../../@types/graphql";

const query: Resolvers = {
	Query: {
		findChallanges: async (_, { filter }, { prisma }) => {
			const { statuses } = filter;
			let andWhere: Prisma.ChallangeWhereInput[] = [];

			if (statuses) {
				andWhere.push({
					status: {
						in: statuses,
					},
				});
			}
			return await prisma.challange.findMany({
				where: {
					AND: andWhere,
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
