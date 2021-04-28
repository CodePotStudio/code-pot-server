import { mergeResolvers } from "@graphql-tools/merge";
import UserResolvers from "./User";

const resolvers = [...UserResolvers];
export default mergeResolvers(resolvers);
