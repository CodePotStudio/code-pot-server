import { Prisma } from ".prisma/client";
import { Resolvers } from "../../../@types/graphql";

const query: Resolvers = {
	Enroll: {
		challange: async (parent, _, { prisma }) => {
			return prisma.enroll
				.findUnique({
					where: {
						id: parent.id,
					},
				})
				.challange();
		},
	},
	Query: {
		myEnrolls: async (_, { filter }, { prisma, user }) => {
			const { challangeStatuses, statuses } = filter;
			let andWhere: Prisma.EnrollWhereInput[] = [];

			if (user) {
				andWhere.push({
					userId: user.id,
				});
			}

			if (challangeStatuses) {
				andWhere.push({
					challange: {
						is: {
							status: {
								in: challangeStatuses,
							},
						},
					},
				});
			}

			if (statuses) {
				andWhere.push({
					status: {
						in: statuses,
					},
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
