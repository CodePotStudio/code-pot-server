import { mergeResolvers } from "@graphql-tools/merge";
import UserResolvers from "./User";
import ChallangeResolvers from "./Challange";
import customScalarResolvers from "./customScalar";
import EnrollResolvers from "./Enroll";

// custom scalar resolver 추가
const resolvers = [
	customScalarResolvers,
	...UserResolvers,
	...ChallangeResolvers,
	...EnrollResolvers,
];
export default mergeResolvers(resolvers);
