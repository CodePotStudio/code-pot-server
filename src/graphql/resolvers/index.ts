import { mergeResolvers } from "@graphql-tools/merge";
import UserResolvers from "./User";
import ChallangeResolvers from "./Challange";
import { resolvers as scalarResolvers } from "graphql-scalars";

// custom scalar resolver 추가
const resolvers = [scalarResolvers, ...UserResolvers, ...ChallangeResolvers];
export default mergeResolvers(resolvers);
