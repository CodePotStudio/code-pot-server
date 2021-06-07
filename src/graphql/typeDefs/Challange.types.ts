import { gql } from "apollo-server-lambda";

const typeDefs = gql`
	type Challange {
		id: Int!
		thumbnail: String!
		name: String!
		remarks: String!
		status: String!
		startDateTime: Date!
		endDateTime: Date!
	}

	type Query {
		findChallanges: [Challange]!
		getChallange(id: Int!): Challange
	}
`;

export default typeDefs;
