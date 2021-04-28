import { gql } from "apollo-server-core";

const typeDefs = gql`
	type User {
		id: Int!
		email: String!
		name: String
		mobile: String
		isActive: Boolean!
		RBankAccount: String
		RBankCode: String
	}

	type Profile {
		avatar: String
		bio: String
		githubUrl: String
	}

	type me {
		user: User!
		profile: Profile
	}

	type accessToken {
		token: String!
	}

	type Query {
		me: me
	}

	type Mutation {
		registerRefundAccount(bankCode: String!, bankAccount: String!): User!
		activateUser(mobile: String!, name: String!): User!
		logout: Boolean
		createAuthToken: accessToken
	}
`;

export default typeDefs;
