import { gql } from "apollo-server-lambda";

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
		user(id: Int!): User
	}

	type Mutation {
		registerRefundAccount(bankCode: String!, bankAccount: String!): User!
		activateUser(mobile: String!, name: String!): User!
		logout: Boolean
		createAuthToken: accessToken
		createUser(email: String!, avatar: String!, githubId: String!): User!
	}
`;

export default typeDefs;
