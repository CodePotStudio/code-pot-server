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

	input MyEnrollFillter {
		challangeStatuses: [ChallangeStatus!]
	}

	type Query {
		myEnrolls(filter: MyEnrollFillter!): [Enroll!]
	}
`;

export default typeDefs;
