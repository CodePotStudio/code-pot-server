import { rule } from "graphql-shield";
import { ApolloError, AuthenticationError } from "apollo-server-lambda";
import { Context } from "../@types/context";

// 인증 여부
export const isAuthenticated = rule({ cache: "contextual" })(
	async (_, __, { user }: Context, ___) => {
		return user
			? true
			: new AuthenticationError("인증이 반드시 필요한 접근입니다.");
	}
);

// 계정 활성화 여부
export const isActivated = rule({ cache: "contextual" })(
	async (_, __, { user }: Context, ___) => {
		return user!.isActive
			? true
			: new ApolloError("비활성화 계정입니다.", "ACCOUNT_NEED_ACTIVATED");
	}
);
