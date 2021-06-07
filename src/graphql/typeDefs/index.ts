import { mergeTypeDefs } from "@graphql-tools/merge";
import UserTypeDefs from "./User.types";
import { typeDefs as scalarTypeDefs } from "graphql-scalars";

// custom scalaType 추가
const typesArray = [...scalarTypeDefs, UserTypeDefs];
export default mergeTypeDefs(typesArray);
