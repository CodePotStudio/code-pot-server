import { not, shield } from "graphql-shield";
import { isActivated, isAuthenticated } from "./rules";

export const permissions = shield(
	{
		Query: {
			me: isAuthenticated,
			myEnrolls: isAuthenticated,
		},
		Mutation: {
			activateUser: not(isActivated),
			enrollChallange: isAuthenticated,
		},
	},
	{ allowExternalErrors: true }
);
