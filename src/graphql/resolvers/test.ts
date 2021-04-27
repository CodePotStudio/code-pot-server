import { environment } from "../../config";

export const resolvers = {
	Query: {
		testMessage: () => `Hello World! ${environment.env}`,
	},
};
