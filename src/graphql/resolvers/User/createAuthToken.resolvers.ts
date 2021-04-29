import { ApolloError } from "apollo-server";
import { Resolvers } from "../../../@types/graphql";
import { createJWTToken, createRefreshToken } from "../../../utils/auth";

const resolver: Resolvers = {
	Mutation: {
		createAuthToken: async (_, __, { prisma, cookies, setCookies }) => {
			const refreshToken = cookies ? cookies["refreshToken"] : null;
			console.log(cookies);
			if (!refreshToken) {
				throw new ApolloError(
					"refresh token이 없습니다.",
					"INVALID_REFRESH_TOKEN"
				);
			}
			const user = await prisma.user.findUnique({
				where: {
					refreshToken,
				},
			});

			if (!user) {
				// refresh token 삭제
				setCookies.push({
					name: "refreshToken",
					value: "",
					options: {
						maxAge: 0,
					},
				});
				throw new ApolloError(
					"유효하지 않은 refresh token입니다.",
					"INVALID_REFRESH_TOKEN"
				);
			}
			// 새로운 refresh Token을 생성
			const newRefreshToken = createRefreshToken();
			// // 새로운 토큰을 set-cookie한다.
			setCookies.push({
				name: "refreshToken",
				value: newRefreshToken,
				options: {
					httpOnly: true,
					// 6시간 동안 유효하도록 처리
					maxAge: 6 * 60 * 60 * 1000,
				},
			});
			// 새로운 토큰 DB에 저장
			await prisma.user.update({
				where: {
					id: user.id,
				},
				data: {
					refreshToken: newRefreshToken,
				},
			});
			const accessToken = createJWTToken(user.id, user.email);
			return {
				token: accessToken,
			};
		},
	},
};

export default resolver;
