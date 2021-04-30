import { rule } from "graphql-shield";
import { ApolloError } from "apollo-server-lambda";
import { Context } from "../@types/context";

// 인증 여부
export const isAuthenticated = rule({ cache: "contextual" })(
	async (_, __, { user }: Context, ___) => {
		return user !== null;
	}
);

// 계정 활성화 여부
export const isActivated = rule({ cache: "contextual" })(
	async (_, __, { user: { isActivated } }: Context, ___) => {
		if (!isActivated) {
			return new ApolloError("비활성화 계정입니다.", "ACCOUNT_NEED_ACTIVATED");
		} else {
			return true;
		}
	}
);
