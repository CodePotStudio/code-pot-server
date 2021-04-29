import { ApolloError } from "apollo-server";
import { Resolvers } from "../../../@types/graphql";

const resolver: Resolvers = {
	Mutation: {
		logout: async (_, __, { cookies, prisma, setCookies }) => {
			const refreshToken = cookies ? cookies["refreshToken"] : null;
			if (!refreshToken) {
				throw new ApolloError(
					"refresh token이 없습니다.",
					"INVALID_REFRESH_TOKEN"
				);
			}
			try {
				await prisma.user.update({
					where: {
						refreshToken,
					},
					data: {
						refreshToken: null,
					},
				});
				// refresh token 삭제
				setCookies.push({
					name: "refreshToken",
					value: "",
					options: {
						maxAge: 0,
					},
				});
			} catch {
				throw new ApolloError(
					"유효하지 않은 refresh token입니다.",
					"INVALID_REFRESH_TOKEN"
				);
			}
			return true;
		},
	},
};

export default resolver;
