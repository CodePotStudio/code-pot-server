import { gql } from "apollo-server-lambda";

const typeDefs = gql`
	enum EnrollStatus {
		PROCESSING
		COMPLETED
		CANCELED
	}

	type Enroll {
		id: Int!
		userId: Int!
		challangeId: Int!
		status: EnrollStatus!
		createdAt: Date!
		updatedAt: Date!
		challange: Challange
	}

	input EnrollFillter {
		userId: Int!
	}

	type Query {
		findEnrolls(filter: EnrollFillter!): [Enroll!]
	}
`;

export default typeDefs;
