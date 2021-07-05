import { AuthenticationError } from "apollo-server-errors";
import { Resolvers } from "../../../@types/graphql";

const query: Resolvers = {
	Query: {
		me: async (_, __, { user, prisma }) => {
			if (!user) {
				throw new AuthenticationError("인증이 반드시 필요한 접근입니다.");
			}
			const profile = await prisma.profile.findUnique({
				where: {
					userId: user!.id,
				},
			});
			return {
				user,
				profile,
			};
		},
	},
};

export default query;
