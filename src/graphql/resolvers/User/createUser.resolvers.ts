import { Resolvers } from "../../../@types/graphql";

const resolver: Resolvers = {
	Mutation: {
		createUser: async (_, { email, avatar, githubId }, { prisma }) => {
			const userExists = await prisma.user.findUnique({
				where: {
					email,
				},
			});
			if (userExists) {
				if (userExists.githubId !== githubId) {
					throw new Error(
						"이미 다른 소셜 로그인으로 회원 가입이 되어있는 이메일입니다."
					);
				}
				throw new Error("이미 회원 가입이 되어있는 이메일입니다.");
			} else {
				try {
					// 회원 가입 시, 유저 생성
					const user = await prisma.user.create({
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
					console.log(user);
					return user;
				} catch (e) {
					throw new Error(e);
				}
			}
		},
	},
};

export default resolver;
