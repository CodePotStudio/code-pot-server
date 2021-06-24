import { mergeTypeDefs } from "@graphql-tools/merge";
import UserTypeDefs from "./User.types";
import ChallangeTypeDefs from "./Challange.types";
import CustomScalarTypeDefs from "./customScalar.types";
import EnrollTypeDefs from "./Enroll.types";

// custom scalaType 추가
const typesArray = [
	CustomScalarTypeDefs,
	UserTypeDefs,
	ChallangeTypeDefs,
	EnrollTypeDefs,
];
export default mergeTypeDefs(typesArray);
