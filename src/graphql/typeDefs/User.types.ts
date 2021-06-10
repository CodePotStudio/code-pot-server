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

	type createUserResponse {
		token: accessToken!
		user: User!
	}

	type Query {
		me: me
	}

	type Mutation {
		registerRefundAccount(bankCode: String!, bankAccount: String!): User!
		activateUser(mobile: String!, name: String!): User!
		createUser(
			email: String!
			avatar: String
			githubId: Int!
		): createUserResponse!
	}
`;

export default typeDefs;
