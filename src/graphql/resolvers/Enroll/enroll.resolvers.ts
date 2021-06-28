import { Prisma } from ".prisma/client";
import { Resolvers } from "../../../@types/graphql";

const query: Resolvers = {
	Enroll: {
		challange: async (parent, _, { prisma }) => {
			return prisma.challange.findUnique({
				where: {
					id: parent.challangeId,
				},
			});
		},
	},
	Query: {
		findEnrolls: async (_, { filter }, { prisma }) => {
			const { userId } = filter;
			let andWhere: Prisma.EnrollWhereInput[] = [];

			if (userId) {
				andWhere.push({
					userId,
				});
			}
			return await prisma.enroll.findMany({
				where: {
					AND: andWhere,
				},
			});
		},
	},
};

export default query;
