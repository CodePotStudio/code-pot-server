import { Resolvers } from "../../../@types/graphql";
import { createJWTToken } from "../../../utils/auth";

const resolver: Resolvers = {
	Mutation: {
		createUser: async (_, { email, avatar, githubId }, { prisma }) => {
			let user = await prisma.user.findUnique({
				where: {
					email,
				},
			});
			if (user) {
				if (user.githubId !== githubId) {
					throw new Error(
						"이미 다른 소셜 로그인으로 회원 가입이 되어있는 이메일입니다."
					);
				}
			} else {
				try {
					// 회원 가입 시, 유저 생성
					user = await prisma.user.create({
						data: {
							email,
							githubId,
							isActive: false,
							profile: {
								create: {
									avatar: avatar,
								},
							},
						},
					});
				} catch (e) {
					throw new Error(e);
				}
			}
			const token = createJWTToken(user.id, user.email);
			return { user, token };
		},
	},
};

export default resolver;
