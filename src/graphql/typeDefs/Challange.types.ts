import { gql } from "apollo-server-lambda";

const typeDefs = gql`
	enum ChallangeStatus {
		PREPARING
		RECRUITING
		RECRUITMENT_CLOSED
		INPROGRESS
		CLOSED
	}

	type Challange {
		id: Int!
		thumbnail: String!
		name: String!
		remarks: String!
		status: ChallangeStatus!
		startDateTime: Date!
		endDateTime: Date!
	}

	input ChallangeFilter {
		status: ChallangeStatus!
	}

	type Query {
		findChallanges(filter: ChallangeFilter): [Challange!]!
		getChallange(id: Int!): Challange
	}
`;

export default typeDefs;
