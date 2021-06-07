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
	}
`;

export default typeDefs;
