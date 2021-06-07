import { mergeTypeDefs } from "@graphql-tools/merge";
import UserTypeDefs from "./User.types";

const typesArray = [UserTypeDefs];
export default mergeTypeDefs(typesArray);
