import { mergeResolvers } from "@graphql-tools/merge";
import UserResolvers from "./User";
import ChallangeResolvers from "./Challange";
import customScalarResolvers from "./customScalar";

// custom scalar resolver 추가
const resolvers = [
	customScalarResolvers,
	...UserResolvers,
	...ChallangeResolvers,
];
export default mergeResolvers(resolvers);
